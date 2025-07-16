import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Hero from '@/components/sections/hero';
import Projects from '@/components/sections/projects';
import Skills from '@/components/sections/skills';
import Blog from '@/components/sections/blog';
import Contact from '@/components/sections/contact';
import { Separator } from '@/components/ui/separator';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <section id="projects" className="container py-16 md:py-24">
          <h2 className="text-3xl font-bold text-center font-headline mb-12">
            My Projects
          </h2>
          <Projects />
        </section>
        <section id="skills" className="bg-primary/10 py-16 md:py-24">
           <div className="container">
              <h2 className="text-3xl font-bold text-center font-headline mb-12">
                Skills & Expertise
              </h2>
              <Skills />
           </div>
        </section>
        <section id="blog" className="container py-16 md:py-24">
          <h2 className="text-3xl font-bold text-center font-headline mb-4">
            Tech Blog Tools
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Leveraging GenAI to refine blog titles and generate summaries. Try it out below.
          </p>
          <Blog />
        </section>
        <Separator />
        <section id="contact" className="container py-16 md:py-24">
           <h2 className="text-3xl font-bold text-center font-headline mb-12">
            Get In Touch
          </h2>
          <Contact />
        </section>
      </main>
      <Footer />
    </div>
  );
}
