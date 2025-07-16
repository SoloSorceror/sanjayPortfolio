'use client';

import { Button } from '@/components/ui/button';
import HeroAnimation from '@/components/3d/hero-animation';
import { useEffect, useRef, useState } from 'react';

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const [opacity, setOpacity] = useState(1);
  const [transform, setTransform] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const heroHeight = heroRef.current.offsetHeight;
        const scrollPosition = window.scrollY;
        const newOpacity = Math.max(0, 1 - (scrollPosition / (heroHeight * 0.8)));
        setOpacity(newOpacity);
      }
    };

    const handleMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event;
      const x = (clientX / window.innerWidth - 0.5) * 2;
      const y = (clientY / window.innerHeight - 0.5) * 2;
      setTransform({ x, y });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetElement = document.querySelector(href);
    if (targetElement) {
      const top = targetElement.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({
          top: top,
          behavior: 'smooth'
      });
    }
  }

  return (
    <section 
      id="hero" 
      ref={heroRef}
      className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden transition-opacity duration-300"
      style={{ opacity }}
    >
       <div className="absolute inset-0 z-0">
        <HeroAnimation />
       </div>
      <div 
        className="container relative z-10 flex flex-col items-center text-center transition-transform duration-300 ease-out"
        style={{ transform: `translate(${transform.x * 10}px, ${transform.y * 10}px)` }}
      >
        <h1 
          className="text-4xl md:text-6xl lg:text-7xl font-bold font-headline tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500 fade-in-up transition-transform duration-300 ease-out"
          data-cursor-text
          style={{ transform: `translate(${transform.x * 20}px, ${transform.y * 20}px)` }}
        >
          Sanjay Chetry
        </h1>
        <p 
          className="max-w-2xl text-lg md:text-xl text-muted-foreground mb-8 fade-in-up animation-delay-300 transition-transform duration-300 ease-out"
          style={{ transform: `translate(${transform.x * 15}px, ${transform.y * 15}px)` }}
        >
          Full-Stack Engineer with a specialization in Machine Learning, building intelligent applications from front-end to deployment.
        </p>
        <div 
          className="flex space-x-4 fade-in-up animation-delay-600 transition-transform duration-300 ease-out"
          style={{ transform: `translate(${transform.x * 10}px, ${transform.y * 10}px)` }}
        >
          <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground" data-cursor-interactive>
            <a href="#projects" onClick={(e) => handleLinkClick(e, '#projects')}>View My Work</a>
          </Button>
          <Button asChild size="lg" variant="outline" data-cursor-interactive>
            <a href="#contact" onClick={(e) => handleLinkClick(e, '#contact')}>Get In Touch</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
