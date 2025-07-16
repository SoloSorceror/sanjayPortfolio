'use client';

import { useState, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Rocket } from 'lucide-react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const [isHero, setIsHero] = useState(false);

  const onMouseMove = useCallback((e: MouseEvent) => {
    setTargetPosition({ x: e.clientX, y: e.clientY });
    setIsHidden(false);

    const target = e.target as HTMLElement;
    const interactive = target.closest(
      'a, button, [role="button"], input, textarea, [data-cursor-interactive]'
    );
    const heroSection = target.closest('#hero');
    setIsPointer(!!interactive);
    setIsHero(!!heroSection);
  }, []);

  const onMouseLeave = useCallback(() => setIsHidden(true), []);
  const onMouseEnter = useCallback(() => setIsHidden(false), []);

  useEffect(() => {
    document.addEventListener('mousemove', onMouseMove);
    document.body.addEventListener('mouseleave', onMouseLeave);
    document.body.addEventListener('mouseenter', onMouseEnter);

    let animationFrameId: number;

    const animate = () => {
      setPosition(prevPosition => ({
        x: prevPosition.x + (targetPosition.x - prevPosition.x) * 0.15,
        y: prevPosition.y + (targetPosition.y - prevPosition.y) * 0.15,
      }));
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.body.removeEventListener('mouseleave', onMouseLeave);
      document.body.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(animationFrameId);
    };
  }, [onMouseMove, onMouseLeave, onMouseEnter, targetPosition]);

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
            isPointer ? 'scale-150 opacity-50' : 'scale-100',
            isHero ? 'opacity-0' : 'opacity-100',
          )}
        />
        <div
          className={cn(
            'absolute w-2 h-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent transition-transform duration-300 ease-out',
            isPointer ? 'scale-0' : 'scale-100',
            isHero ? 'opacity-0' : 'opacity-100',
          )}
        />
        <Rocket 
           className={cn(
            'absolute -translate-x-1/2 -translate-y-1/2 text-accent transition-all duration-300 ease-out',
            isHero ? 'opacity-100 scale-125' : 'opacity-0 scale-0'
           )}
        />
    </div>
  );
};

export default CustomCursor;
