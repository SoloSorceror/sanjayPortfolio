import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Hero from '@/components/sections/hero';
import About from '@/components/sections/about';
import Projects from '@/components/sections/projects';
import Skills from '@/components/sections/skills';
import Testimonials from '@/components/sections/testimonials';
import Contact from '@/components/sections/contact';
import { Separator } from '@/components/ui/separator';
import { ScrollAnimation } from '@/components/motion/scroll-animation';
import SectionBackground from '@/components/3d/section-background';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <Hero />

        <ScrollAnimation as="section" id="about" className="relative py-16 md:py-24 min-h-screen flex flex-col justify-center">
            <SectionBackground effect="orbs" />
            <div className="container relative z-10">
              <h2 className="text-3xl font-bold text-center font-headline mb-12">
                  About Me
              </h2>
              <About />
            </div>
        </ScrollAnimation>

        <ScrollAnimation as="section" id="projects" className="relative bg-primary/5 py-16 md:py-24 min-h-screen flex flex-col justify-center">
          <SectionBackground effect="orbs" />
          <div className="container relative z-10">
            <h2 className="text-3xl font-bold text-center font-headline mb-12">
              My Projects
            </h2>
            <Projects />
          </div>
        </ScrollAnimation>

        <ScrollAnimation as="div" id="skills" className="min-h-screen flex flex-col justify-center">
          <Skills />
        </ScrollAnimation>

        <ScrollAnimation as="section" id="testimonials" className="relative py-16 md:py-24 min-h-screen flex flex-col justify-center">
          <SectionBackground effect="particles" />
          <div className="container relative z-10">
            <h2 className="text-3xl font-bold text-center font-headline mb-4">
              What Others Say
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              A few kind words from colleagues and collaborators.
            </p>
            <Testimonials />
          </div>
        </ScrollAnimation>
        
        <ScrollAnimation as="section" id="contact" className="relative py-16 md:py-24 min-h-screen flex flex-col justify-center">
           <SectionBackground effect="particles" />
           <div className="container relative z-10">
            <h2 className="text-3xl font-bold text-center font-headline mb-12">
                Get In Touch
            </h2>
            <Contact />
           </div>
        </ScrollAnimation>
      </main>
      <Footer />
    </div>
  );
}
