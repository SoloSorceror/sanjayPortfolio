
'use client';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github } from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type Project = {
    title: string;
    description: string;
    image: string;
    tags: string[];
    liveUrl: string;
    repoUrl: string;
    aiHint: string;
};

const projectsData: Project[] = [
  {
    title: 'DayFlow.ai – Smart Productivity Tracker',
    description: 'A full-featured productivity platform that blends smart planning with mindful living. Helps users structure their day, stay focused, and reflect effectively.',
    image: 'https://images.unsplash.com/photo-1518976024611-28bf4b48222e?q=80&w=685&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    tags: ['Next.js', 'LangChain', 'OpenAI', 'MongoDB', 'Docker', 'GitHub Actions'],
    liveUrl: '#',
    repoUrl: 'https://github.com/SoloSorceror/DayFlow.ai',
    aiHint: 'productivity dashboard AI',
  },
  {
    title: 'Spotify Recommender',
    description: 'A personalized music recommendation system using content-based filtering to suggest songs tailored to user preferences. Built to explore recommendation engines and lightweight ML logic.',
    image: 'https://images.unsplash.com/photo-1458560871784-56d23406c091?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bXVzaWN8ZW58MHx8MHx8fDA%3D',
    tags: ['Python', 'Pandas', 'scikit-learn', 'Streamlit'],
    liveUrl: '#',
    repoUrl: '#',
    aiHint: 'music streaming interface',
  },
  {
    title: 'Medical Diagnosis ML App',
    description: 'Predicts potential diseases based on patient biological data using logistic regression. Focused on preprocessing, feature scaling, and accuracy.',
    image: 'https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?q=80&w=1170&auto=format&fit=crop',
    tags: ['Python', 'scikit-learn', 'Pandas', 'Matplotlib'],
    liveUrl: '#',
    repoUrl: '#',
    aiHint: 'medical data chart',
  },
   {
    title: 'Personal Portfolio Website',
    description: 'Fully responsive, animated personal website to showcase my work and skills. Designed with simplicity, accessibility, and fluid user experience in mind.',
    image: 'https://images.unsplash.com/photo-1516249181155-bbf89a130f77?q=80&w=2071&auto=format&fit=crop',
    tags: ['Next.js', 'React', 'Tailwind CSS', 'Three.js', 'Framer Motion'],
    liveUrl: '#',
    repoUrl: '#',
    aiHint: 'abstract code animation',
  },
];


const ProjectDetails = ({ project }: { project: Project | null }) => {
    if (!project) return null;

    return (
        <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="w-full h-full p-1 md:p-2"
        >
            <div className="relative aspect-video w-full mb-4 overflow-hidden rounded-lg shadow-lg">
                <Image src={project.image} alt={project.title} fill className="object-cover" data-ai-hint={project.aiHint} />
            </div>
            <h3 className="font-headline text-xl md:text-2xl mb-2">{project.title}</h3>
            <p className="text-muted-foreground mb-4 text-sm">{project.description}</p>
            <div className="flex flex-wrap gap-2 py-4">
                {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
            </div>
            <div className="flex justify-end gap-2 mt-4">
                <Button asChild variant="outline" size="sm">
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" /> Live
                    </a>
                </Button>
                <Button asChild variant="ghost" size="sm">
                    <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-4 w-4"/> Source
                    </a>
                </Button>
            </div>
        </motion.div>
    );
};

const Projects = () => {
    const [selectedProject, setSelectedProject] = useState<Project>(projectsData[0]);
    
    return (
        <section id="projects" className="relative py-16 md:py-24 z-10 min-h-screen flex flex-col justify-center">
             <div className="container text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-center font-headline mb-4">
                My Projects
              </h2>
              <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
                A showcase of my work. Click on a project title to see the details.
              </p>
            </div>
            <div className="container grid md:grid-cols-3 gap-8 items-start">
                <div className="relative md:col-span-1">
                    <div className="sticky top-24">
                        <ul className="space-y-2">
                           {projectsData.map((project) => (
                               <li key={project.title}>
                                   <button 
                                     onClick={() => setSelectedProject(project)}
                                     className={cn(
                                         "w-full text-left p-4 rounded-lg transition-all duration-300",
                                         selectedProject.title === project.title 
                                         ? "bg-primary/10 text-accent font-semibold scale-105"
                                         : "hover:bg-primary/5 text-muted-foreground"
                                     )}
                                   >
                                     {project.title}
                                   </button>
                               </li>
                           ))}
                        </ul>
                    </div>
                </div>
                <div className="md:col-span-2 relative w-full h-full min-h-[60vh] bg-primary/5 rounded-lg flex items-center justify-center backdrop-blur-sm border border-border/20 p-4">
                    <AnimatePresence mode="wait">
                       <ProjectDetails project={selectedProject} />
                    </AnimatePresence>
                </div>
            </div>
            <div className="container text-center mt-12">
                <Button asChild>
                    <a href="https://github.com/SoloSorceror" target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-4 w-4"/> View All Projects on GitHub
                    </a>
                </Button>
            </div>
        </section>
    );
};

export default Projects;
