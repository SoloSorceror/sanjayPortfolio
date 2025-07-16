'use client';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, ExternalLink, Github } from 'lucide-react';
import { useState, useCallback, useEffect } from 'react';
import useEmblaCarousel, { EmblaCarouselType } from 'embla-carousel-react';
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

const TWEEN_FACTOR = 1.2;

const numberWithinRange = (number: number, min: number, max: number): number =>
  Math.min(Math.max(number, min), max);

export default function Projects() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'center',
    skipSnaps: false,
  });
  const [tweenValues, setTweenValues] = useState<number[]>([]);

  const onScroll = useCallback(() => {
    if (!emblaApi) return;

    const engine = emblaApi.internalEngine();
    const scrollProgress = emblaApi.scrollProgress();

    const styles = emblaApi.scrollSnapList().map((scrollSnap, index) => {
      let diffToTarget = scrollSnap - scrollProgress;

      if (engine.options.loop) {
        engine.slideLooper.loopPoints.forEach((loopItem) => {
          const target = loopItem.target();
          if (index === loopItem.index && target !== 0) {
            const sign = Math.sign(target);
            if (sign === -1) diffToTarget = scrollSnap - (1 + scrollProgress);
            if (sign === 1) diffToTarget = scrollSnap + (1 - scrollProgress);
          }
        });
      }
      const tweenValue = 1 - Math.abs(diffToTarget * TWEEN_FACTOR);
      return numberWithinRange(tweenValue, 0, 1);
    });
    setTweenValues(styles);
  }, [emblaApi, setTweenValues]);

  useEffect(() => {
    if (!emblaApi) return;
    onScroll();
    emblaApi.on('scroll', onScroll).on('reInit', onScroll);
  }, [emblaApi, onScroll]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex" style={{ perspective: '1000px' }}>
          {projects.map((project, index) => (
            <div
              className="flex-shrink-0 flex-grow-0 basis-full md:basis-1/2 lg:basis-1/3 min-w-0 pl-4"
              key={index}
              style={{
                transform: `rotateY(${(tweenValues[index] || 0) * -20}deg) scale(${(tweenValues[index] || 0) * 0.2 + 0.8})`,
                opacity: tweenValues[index] || 0,
                transformStyle: 'preserve-3d',
                transition: 'transform 0.5s ease-out, opacity 0.5s ease-out',
                transformOrigin: `${(tweenValues[index] || 0) > 0.5 ? '50% 50%' : `${100 * Math.sign(tweenValues[index] - 0.5)}% 50%`}`,
              }}
            >
              <Card className="flex flex-col h-full overflow-hidden bg-card/80 backdrop-blur-sm border-transparent transition-all duration-300 hover:shadow-2xl hover:shadow-accent/20">
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
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center gap-4 mt-8">
            <Button onClick={scrollPrev} size="icon" variant="outline">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Previous Project</span>
            </Button>
            <Button onClick={scrollNext} size="icon" variant="outline">
                <ArrowRight className="h-4 w-4" />
                <span className="sr-only">Next Project</span>
            </Button>
        </div>
    </div>
  );
}
