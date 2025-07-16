'use client';

import { Button } from '@/components/ui/button';
import HeroAnimation from '@/components/3d/hero-animation';

export default function Hero() {
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
    <section id="hero" className="relative w-full h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
       <div className="absolute inset-0 z-0">
        <HeroAnimation />
       </div>
      <div className="container relative z-10 flex flex-col items-center text-center">
        <h1 
          className="text-4xl md:text-6xl lg:text-7xl font-bold font-headline tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500 fade-in-up"
          data-cursor-text
        >
          Sanjay Chetry
        </h1>
        <p className="max-w-2xl text-lg md:text-xl text-muted-foreground mb-8 fade-in-up animation-delay-300">
          Full-Stack Developer & Machine Learning Enthusiast. I build modern, scalable web applications and explore the frontiers of AI.
        </p>
        <div className="flex space-x-4 fade-in-up animation-delay-600">
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
