'use client';

import { useState, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(true);

  const onMouseMove = useCallback((e: MouseEvent) => {
    setPosition({ x: e.clientX, y: e.clientY });
    setIsHidden(false);

    const target = e.target as HTMLElement;
    const interactive = target.closest(
      'a, button, [role="button"], input, textarea, [data-cursor-interactive]'
    );
    setIsPointer(!!interactive);
  }, []);

  const onMouseLeave = useCallback(() => setIsHidden(true), []);
  const onMouseEnter = useCallback(() => setIsHidden(false), []);

  useEffect(() => {
    document.addEventListener('mousemove', onMouseMove);
    document.body.addEventListener('mouseleave', onMouseLeave);
    document.body.addEventListener('mouseenter', onMouseEnter);
    
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.body.removeEventListener('mouseleave', onMouseLeave);
      document.body.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [onMouseMove, onMouseLeave, onMouseEnter]);

  return (
    <div
      className={cn(
        'fixed top-0 left-0 pointer-events-none z-[9999] transition-opacity duration-300',
        isHidden && 'opacity-0'
      )}
      style={{ transform: `translate3d(${position.x}px, ${position.y}px, 0)` }}
    >
      <div
        className={cn(
          'absolute w-8 h-8 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-accent transition-transform duration-300 ease-out',
          isPointer ? 'scale-150' : 'scale-100'
        )}
      />
      <div
        className={cn(
          'absolute w-2 h-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent transition-transform duration-300 ease-out',
          isPointer ? 'scale-0' : 'scale-100'
        )}
      />
    </div>
  );
};

export default CustomCursor;
