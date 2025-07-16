'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Rocket } from 'lucide-react';

interface Particle {
  id: number;
  x: number;
  y: number;
  opacity: number;
  size: number;
}

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [targetPosition, setTargetPosition] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isText, setIsText] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const [isHero, setIsHero] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  
  const animationFrameRef = useRef<number>();
  const lastParticleTime = useRef(0);
  const isPointerRef = useRef(false);
  const isHeroRef = useRef(false);

  useEffect(() => {
    isPointerRef.current = isPointer;
    isHeroRef.current = isHero;
  }, [isPointer, isHero]);
  
  const onMouseMove = useCallback((e: MouseEvent) => {
    setTargetPosition({ x: e.clientX, y: e.clientY });
    
    const target = e.target as HTMLElement;
    const isInput = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA';
    
    setIsHidden(isInput);

    if (isInput) {
        setIsPointer(false);
        setIsHero(false);
        setIsText(false);
        return;
    }

    setIsHidden(false);
    const interactive = target.closest('[data-cursor-interactive]');
    const heroSection = target.closest('#hero');
    const textTarget = target.closest('[data-cursor-text]');
    
    setIsPointer(!!interactive);
    setIsHero(!!heroSection);
    setIsText(!!textTarget);

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

  useEffect(() => {
    const animate = () => {
        setPosition(prevPos => ({
            x: prevPos.x + (targetPosition.x - prevPos.x) * 0.15,
            y: prevPos.y + (targetPosition.y - prevPos.y) * 0.15
        }));
        
        setParticles(prevParticles => {
            const now = Date.now();
            let newParticles = [...prevParticles];

            const distance = Math.hypot(targetPosition.x - position.x, targetPosition.y - position.y);

            if (isHeroRef.current && !isPointerRef.current && distance > 1 && now - lastParticleTime.current > 16) {
                lastParticleTime.current = now;
                newParticles.push({
                    id: now,
                    x: position.x,
                    y: position.y,
                    opacity: 1,
                    size: Math.random() * 2 + 1,
                });
            }

            return newParticles
                .map(p => ({ ...p, opacity: p.opacity - 0.03, size: p.size * 0.97 }))
                .filter(p => p.opacity > 0);
        });
        
        animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
        }
    };
}, [targetPosition, position.x, position.y]);
  
  const showRocket = isHero && !isPointer;

  return (
    <>
      {particles.map(p => (
        <div
          key={p.id}
          className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full bg-accent/50"
          style={{
            transform: `translate3d(${p.x}px, ${p.y}px, 0)`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            transition: 'opacity 0.1s ease-out, width 0.1s ease-out, height 0.1s ease-out',
          }}
        />
      ))}
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
              showRocket ? 'opacity-0 scale-0' : 'opacity-100',
            )}
          />
          <div
            className={cn(
              'absolute w-2 h-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent transition-transform duration-300 ease-out',
              isPointer ? 'scale-0' : 'scale-100',
              showRocket ? 'opacity-0 scale-0' : 'opacity-100',
            )}
          />
          <Rocket 
             className={cn(
              'absolute -translate-x-1/2 -translate-y-1/2 text-accent transition-all duration-300 ease-out',
              showRocket ? 'opacity-100' : 'opacity-0 scale-0',
              isText ? 'scale-150 -translate-y-8' : 'scale-100'
             )}
          />
      </div>
    </>
  );
};

export default CustomCursor;
