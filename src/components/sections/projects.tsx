import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, ExternalLink } from 'lucide-react';

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

export default function Projects() {
  return (
    <>
      <div className="grid md:grid-cols-2 gap-8">
        {projects.map((project) => (
          <Card key={project.title} className="flex flex-col overflow-hidden transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-2xl hover:shadow-accent/20 border-transparent hover:border-accent/30 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <div className="relative h-60 w-full mb-4 overflow-hidden rounded-lg">
                 <Image src={project.image} alt={project.title} fill className="object-cover rounded-t-lg transition-transform duration-500 group-hover:scale-105" data-ai-hint={project.aiHint} />
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
        ))}
      </div>
      <div className="mt-16 text-center">
        <Button asChild size="lg">
          <a href="#" target="_blank" rel="noopener noreferrer">
            View More on GitHub <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </div>
    </>
  );
}
