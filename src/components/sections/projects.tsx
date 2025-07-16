'use client';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github, ArrowLeft, ArrowRight } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const projects = [
  {
    title: 'DayFlow.ai – Smart Productivity Tracker',
    description: 'A full-featured productivity platform that blends smart planning with mindful living. Helps users structure their day, stay focused, and reflect effectively.',
    image: 'https://placehold.co/600x400.png',
    tags: ['Next.js', 'LangChain', 'OpenAI', 'MongoDB', 'Docker', 'GitHub Actions'],
    liveUrl: '#',
    repoUrl: 'https://github.com/SoloSorceror/DayFlow.ai',
    aiHint: 'productivity dashboard AI',
  },
  {
    title: 'Spotify Recommender',
    description: 'A personalized music recommendation system using content-based filtering to suggest songs tailored to user preferences. Built to explore recommendation engines and lightweight ML logic.',
    image: 'https://placehold.co/600x400.png',
    tags: ['Python', 'Pandas', 'scikit-learn', 'Streamlit'],
    liveUrl: '#',
    repoUrl: '#',
    aiHint: 'music streaming interface',
  },
  {
    title: 'Medical Diagnosis ML App',
    description: 'Predicts potential diseases based on patient biological data using logistic regression. Focused on preprocessing, feature scaling, and accuracy.',
    image: 'https://placehold.co/600x400.png',
    tags: ['Python', 'scikit-learn', 'Pandas', 'Matplotlib'],
    liveUrl: '#',
    repoUrl: '#',
    aiHint: 'medical data chart',
  },
   {
    title: 'Personal Portfolio Website',
    description: 'Fully responsive, animated personal website to showcase my work and skills. Designed with simplicity, accessibility, and fluid user experience in mind.',
    image: 'https://placehold.co/600x400.png',
    tags: ['Next.js', 'React', 'Tailwind CSS', 'Three.js', 'Framer Motion'],
    liveUrl: '#',
    repoUrl: '#',
    aiHint: 'abstract code animation',
  },
];

const ProjectCard = ({ project }: { project: typeof projects[0] }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateY = (x / rect.width - 0.5) * 20; // Rotate up to 10 degrees
    const rotateX = (0.5 - y / rect.height) * 20; // Rotate up to 10 degrees
    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
  };
  
  const handleMouseEnter = () => {
    setIsHovered(true);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="w-full"
    >
        <Card
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={handleMouseEnter}
            style={{
                transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(${isHovered ? 1.05 : 1}, ${isHovered ? 1.05 : 1}, ${isHovered ? 1.05 : 1})`,
                transition: 'transform 0.3s ease-out',
                willChange: 'transform',
            }}
            className="flex flex-col h-full overflow-hidden bg-card/50 backdrop-blur-sm border-transparent shadow-lg transition-all duration-300 hover:shadow-2xl hover:shadow-accent/20"
        >
            <CardHeader>
            <div className="relative h-48 md:h-56 w-full mb-4 overflow-hidden rounded-lg">
                <Image src={project.image} alt={project.title} layout="fill" className="object-cover" data-ai-hint={project.aiHint} />
            </div>
            <CardTitle className="font-headline">{project.title}</CardTitle>
            <CardDescription>{project.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col justify-end">
            <div className="flex flex-wrap gap-2 pt-4">
                {project.tags.map((tag) => (
                <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
            </div>
            </CardContent>
            <CardFooter className="flex-shrink-0 pt-6 justify-between">
                <Button asChild variant="outline">
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" /> Live
                    </a>
                </Button>
                <Button asChild variant="ghost" className="text-accent">
                    <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-4 w-4"/> Source
                    </a>
                </Button>
            </CardFooter>
        </Card>
    </motion.div>
  );
};

export default function Projects() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + projects.length) % projects.length);
    };

    return (
        <div className="flex flex-col items-center">
            <div className="w-full max-w-2xl min-h-[650px] flex items-center justify-center">
                <AnimatePresence mode="wait">
                    <ProjectCard key={currentIndex} project={projects[currentIndex]} />
                </AnimatePresence>
            </div>
            <div className="flex justify-center gap-4 mt-8">
                <Button onClick={handlePrev} size="icon" variant="outline">
                    <ArrowLeft className="h-4 w-4" />
                    <span className="sr-only">Previous Project</span>
                </Button>
                <Button onClick={handleNext} size="icon" variant="outline">
                    <ArrowRight className="h-4 w-4" />
                    <span className="sr-only">Next Project</span>
                </Button>
            </div>
        </div>
    );
}