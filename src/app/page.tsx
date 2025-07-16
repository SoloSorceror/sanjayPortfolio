'use client';

import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Hero from '@/components/sections/hero';
import About from '@/components/sections/about';
import Projects from '@/components/sections/projects';
import Skills from '@/components/sections/skills';
import Contact from '@/components/sections/contact';
import Testimonials from '@/components/sections/testimonials';
import { ScrollAnimation } from '@/components/motion/scroll-animation';
import SectionBackground from '@/components/3d/section-background';
import { useEffect, useRef, forwardRef } from 'react';
import { InteractiveAsteroids } from '@/components/3d/interactive-asteroids';

const FadingHero = forwardRef<HTMLElement>((props, ref) => {
    return <Hero ref={ref} />;
});
FadingHero.displayName = 'FadingHero';


export default function Home() {
    const heroRef = useRef<HTMLElement>(null);
    const mainContentRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        const handleScroll = () => {
            if (heroRef.current) {
                const heroHeight = heroRef.current.offsetHeight;
                const scrollY = window.scrollY;
                const opacity = Math.max(0, 1 - (scrollY / (heroHeight * 0.7)));
                heroRef.current.style.opacity = `${opacity}`;
            }

            if (mainContentRef.current) {
                const heroHeight = heroRef.current?.offsetHeight || window.innerHeight;
                const scrollY = window.scrollY;
                const contentOpacity = Math.min(1, Math.max(0, (scrollY - heroHeight * 0.5) / (heroHeight * 0.4)));
                 mainContentRef.current.style.opacity = `${contentOpacity}`;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Initial call

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <FadingHero ref={heroRef} />

        <div ref={mainContentRef} className="relative opacity-0">
          <SectionBackground effect="particles" />
          <ScrollAnimation as="section" id="about" className="relative z-10">
              <About />
          </ScrollAnimation>
          
          <Projects />
          
          <ScrollAnimation as="div" id="skills" className="relative z-10">
            <Skills />
          </ScrollAnimation>

          <ScrollAnimation as="section" id="testimonials" className="relative py-16 md:py-24 z-10">
             <div className="container">
                <h2 className="text-3xl md:text-4xl font-bold text-center font-headline mb-12">
                    What People Say
                </h2>
                <Testimonials />
             </div>
          </ScrollAnimation>

          <section id="asteroid-game" className="relative py-16 md:py-24 z-10">
            <div className="container text-center">
              <h2 className="text-3xl md:text-4xl font-bold font-headline mb-4">
                Feeling Adventurous?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Take a break and click on the asteroids to watch them explode. A small demo of interactive 3D graphics.
              </p>
              <div className="relative w-full h-[50vh] rounded-lg overflow-hidden border border-border/20 bg-primary/5">
                <InteractiveAsteroids />
              </div>
            </div>
          </section>

          <ScrollAnimation as="section" id="contact" className="relative py-16 md:py-24 z-10">
             <div className="container">
              <h2 className="text-3xl md:text-4xl font-bold text-center font-headline mb-12">
                  Get In Touch
              </h2>
              <Contact />
             </div>
          </ScrollAnimation>
        </div>
      </main>
      <Footer />
    </div>
  );
}
