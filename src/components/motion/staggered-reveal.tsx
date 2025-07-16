'use client';

import React, { useRef, useEffect, useState, forwardRef, Children, cloneElement, isValidElement, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface StaggeredRevealProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  staggerDelay?: number;
}

const StaggeredReveal = forwardRef<HTMLElement, StaggeredRevealProps>(
  ({ as: Component = 'div', className, children, staggerDelay = 100, ...props }, ref) => {
    const internalRef = useRef<HTMLElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
      const targetRef = (ref || internalRef) as React.RefObject<HTMLElement>;
      if (!targetRef.current) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        },
        { root: null, rootMargin: '0px', threshold: 0.1 }
      );

      observer.observe(targetRef.current);

      return () => {
        if (targetRef.current) {
          observer.unobserve(targetRef.current);
        }
      };
    }, [ref]);

    const renderChildren = (nodes: ReactNode, delayBase: number): ReactNode[] => {
      return Children.map(nodes, (child, index) => {
        if (!isValidElement(child)) {
          return child;
        }

        const newDelay = delayBase + index * staggerDelay;
        const childProps = {
          ...child.props,
          className: cn(
            child.props.className,
            'transition-all duration-500 ease-out',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          ),
          style: {
            ...child.props.style,
            transitionDelay: `${newDelay}ms`,
          },
        };

        if (child.props.children) {
          const grandChildren = renderChildren(child.props.children, newDelay);
          return cloneElement(child, childProps, grandChildren);
        }
        
        return cloneElement(child, childProps);
      });
    };

    if(Children.count(children) > 1 || (isValidElement(children) && Children.count(children.props.children) > 1)) {
       return (
         <Component ref={ref || internalRef} className={className} {...props}>
          {renderChildren(children, 0)}
        </Component>
       );
    }

    return (
      <Component
        ref={ref || internalRef}
        className={cn(
          'transition-all duration-700 ease-out',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5',
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

StaggeredReveal.displayName = 'StaggeredReveal';
export default StaggeredReveal;
