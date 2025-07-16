import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Hero from '@/components/sections/hero';
import About from '@/components/sections/about';
import Projects from '@/components/sections/projects';
import Skills from '@/components/sections/skills';
import Testimonials from '@/components/sections/testimonials';
import Contact from '@/components/sections/contact';
import { Separator } from '@/components/ui/separator';
import StaggeredReveal from '@/components/motion/staggered-reveal';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <section id="about" className="container py-16 md:py-24">
            <StaggeredReveal as="h2" className="text-3xl font-bold text-center font-headline mb-12">
                About Me
            </StaggeredReveal>
            <StaggeredReveal>
              <About />
            </StaggeredReveal>
        </section>
        <section id="projects" className="bg-primary/5 py-16 md:py-24" data-cursor="block">
          <div className="container">
            <StaggeredReveal as="h2" className="text-3xl font-bold text-center font-headline mb-12">
              My Projects
            </StaggeredReveal>
            <Projects />
          </div>
        </section>
        <Skills />
        <section id="testimonials" className="container py-16 md:py-24" data-cursor="block">
          <StaggeredReveal as="h2" className="text-3xl font-bold text-center font-headline mb-4">
            What Others Say
          </StaggeredReveal>
          <StaggeredReveal as="p" className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            A few kind words from colleagues and collaborators.
          </StaggeredReveal>
          <StaggeredReveal>
            <Testimonials />
          </StaggeredReveal>
        </section>
        <Separator />
        <section id="contact" className="container py-16 md:py-24" data-cursor="block">
           <StaggeredReveal as="h2" className="text-3xl font-bold text-center font-headline mb-12">
            Get In Touch
          </StaggeredReveal>
          <StaggeredReveal>
            <Contact />
          </StaggeredReveal>
        </section>
      </main>
      <Footer />
    </div>
  );
}
