'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [cursorType, setCursorType] = useState('default');
  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(true);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsHidden(false);

      const target = e.target as HTMLElement;
      
      const isInteractive = target.closest(
        'a, button, [role="button"], input, textarea, [data-cursor-interactive]'
      );
      setIsPointer(!!isInteractive);
      
      const section = target.closest('[data-cursor]');
      if (section) {
        setCursorType(section.getAttribute('data-cursor') || 'default');
      } else {
        setCursorType('default');
      }
    };

    const onMouseLeave = () => {
      setIsHidden(true);
    };

    const onMouseEnter = () => {
      setIsHidden(false);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.body.addEventListener('mouseleave', onMouseLeave);
    document.body.addEventListener('mouseenter', onMouseEnter);
    
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.body.removeEventListener('mouseleave', onMouseLeave);
      document.body.removeEventListener('mouseenter', onMouseEnter);
    };
  }, []);

  return (
    <div
      className={cn(
        'custom-cursor fixed top-0 left-0 pointer-events-none z-[9999] transition-transform duration-200 ease-out',
        isHidden && 'opacity-0'
      )}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
    >
        <div
            className={cn(
                'cursor-element relative -translate-x-1/2 -translate-y-1/2 transition-all duration-300',
                isPointer ? 'scale-150' : 'scale-100'
            )}
        >
            {/* Default Orb */}
            <div className={cn('absolute inset-0 transition-all duration-300', cursorType === 'default' ? 'opacity-100' : 'opacity-0 scale-0')}>
                <div className={cn(
                    'w-6 h-6 rounded-full bg-accent/30 border-2 border-accent transition-all duration-300',
                    isPointer ? 'w-10 h-10 bg-accent/20' : ''
                )}></div>
            </div>

            {/* Block Cursor */}
             <div className={cn('absolute inset-0 transition-all duration-300', cursorType === 'block' ? 'opacity-100' : 'opacity-0 scale-0')}>
                <div className={cn(
                    'w-3 h-3 bg-accent transition-all duration-300',
                    isPointer ? 'scale-150 rotate-45' : ''
                )}></div>
            </div>

            {/* Shuttle Cursor */}
            <div className={cn('absolute inset-0 transition-all duration-300', cursorType === 'shuttle' ? 'opacity-100' : 'opacity-0 scale-0')}>
                 <svg 
                    width="48" 
                    height="48"
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="hsl(var(--accent))" 
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={cn('transition-transform duration-500', isPointer ? '-rotate-45 scale-125' : '')}
                 >
                    <path d="M12.5 4.5l6-2.5-2.5 6-1.5-1.5-3 3-1-1 3-3-1.5-1.5z"/>
                    <path d="M12.5 4.5l-5 5"/>
                    <path d="M4 14l-1 5 5-1 4-4-4-4z"/>
                    <path d="M12.5 4.5l1.5 1.5"/>
                    <path d="M16 8l3 3"/>
                 </svg>
            </div>
        </div>
    </div>
  );
};

export default CustomCursor;
