'use client';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { useRef, useEffect } from 'react';
import StaggeredReveal from '../motion/staggered-reveal';

const projects = [
  {
    title: 'MERN E-commerce Platform',
    description: 'A full-featured e-commerce site built with the MERN stack, including product listings, shopping cart, and user authentication.',
    image: 'https://placehold.co/600x400.png',
    tags: ['React', 'Node.js', 'Express', 'MongoDB'],
    liveUrl: '#',
    repoUrl: '#',
    aiHint: 'ecommerce website',
  },
  {
    title: 'ML Movie Recommender',
    description: 'A recommendation system using collaborative filtering to suggest movies to users based on their ratings history.',
    image: 'https://placehold.co/600x400.png',
    tags: ['Python', 'scikit-learn', 'Pandas', 'Flask'],
    liveUrl: '#',
    repoUrl: '#',
    aiHint: 'movie database',
  },
  {
    title: 'Data Structures Visualizer',
    description: 'An interactive web app to visualize common data structures and algorithms, helping students learn computer science concepts.',
    image: 'https://placehold.co/600x400.png',
    tags: ['Java', 'Spring Boot', 'React', 'DSA'],
    liveUrl: '#',
    repoUrl: '#',
    aiHint: 'data algorithm',
  },
   {
    title: 'Personal Portfolio Website',
    description: 'My personal space on the internet. You are here right now! Built with Next.js, Tailwind CSS, and Three.js for 3D animations.',
    image: 'https://placehold.co/600x400.png',
    tags: ['Next.js', 'React', 'Tailwind CSS', 'Three.js'],
    liveUrl: '#',
    repoUrl: '#',
    aiHint: 'abstract code',
  },
];


const ProjectCard = ({ project }: { project: typeof projects[0] }) => {
    const cardRef = useRef<HTMLDivElement>(null);
  
    useEffect(() => {
      const card = cardRef.current;
      if (!card) return;
  
      const onMouseMove = (e: MouseEvent) => {
        const { left, top, width, height } = card.getBoundingClientRect();
        const x = (e.clientX - left - width / 2) / (width / 2);
        const y = (e.clientY - top - height / 2) / (height / 2);
        card.style.transform = `perspective(1000px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) scale3d(1.05, 1.05, 1.05)`;
      };
  
      const onMouseLeave = () => {
        card.style.transform = 'perspective(1000px) rotateY(0) rotateX(0) scale3d(1, 1, 1)';
      };
  
      card.addEventListener('mousemove', onMouseMove);
      card.addEventListener('mouseleave', onMouseLeave);
  
      return () => {
        card.removeEventListener('mousemove', onMouseMove);
        card.removeEventListener('mouseleave', onMouseLeave);
      };
    }, []);
  
    return (
        <Card ref={cardRef} className="flex flex-col overflow-hidden transition-all duration-200 ease-out will-change-transform bg-card/80 backdrop-blur-sm border-transparent hover:shadow-2xl hover:shadow-accent/20">
             <CardHeader>
               <div className="relative h-60 w-full mb-4 overflow-hidden rounded-lg">
                  <Image src={project.image} alt={project.title} fill className="object-cover rounded-t-lg" data-ai-hint={project.aiHint} />
               </div>
               <CardTitle className="font-headline">{project.title}</CardTitle>
               <CardDescription>{project.description}</CardDescription>
             </CardHeader>
             <CardContent className="flex-grow">
               <div className="flex flex-wrap gap-2">
                 {project.tags.map((tag) => (
                   <Badge key={tag} variant="secondary">{tag}</Badge>
                 ))}
               </div>
             </CardContent>
             <CardFooter>
               <Button asChild variant="outline">
                 <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                   <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                 </a>
               </Button>
               <Button asChild variant="link" className="ml-auto text-accent">
                   <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">View Code</a>
               </Button>
             </CardFooter>
        </Card>
    )
}

export default function Projects() {
  return (
    <>
      <div className="grid md:grid-cols-2 gap-8">
        {projects.map((project, i) => (
          <StaggeredReveal key={project.title} style={{ transitionDelay: `${i * 150}ms` }}>
             <ProjectCard project={project} />
          </StaggeredReveal>
        ))}
      </div>
      <StaggeredReveal className="mt-16 text-center">
        <Button asChild size="lg">
          <a href="https://github.com/sanjaychetry" target="_blank" rel="noopener noreferrer">
            View More on GitHub <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </StaggeredReveal>
    </>
  );
}
