'use client';

import React, { useRef, useEffect, useState, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface ScrollAnimationProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
}

export const ScrollAnimation = forwardRef<HTMLElement, ScrollAnimationProps>(
  ({ as: Component = 'div', className, children, ...props }, ref) => {
    const internalRef = useRef<HTMLElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
      const targetRef = (ref || internalRef) as React.RefObject<HTMLElement>;
      if (!targetRef.current) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          // Trigger the animation when the top of the element is visible
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        },
        {
          root: null,
          rootMargin: '0px',
          threshold: 0.1, // Start animation when 10% of the element is visible
        }
      );

      observer.observe(targetRef.current);

      return () => {
        if (targetRef.current) {
          observer.unobserve(targetRef.current);
        }
      };
    }, [ref]);

    return (
      <Component
        ref={ref || internalRef}
        className={cn('transition-opacity duration-1000', isVisible ? 'fade-in-up' : 'opacity-0', className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

ScrollAnimation.displayName = 'ScrollAnimation';
