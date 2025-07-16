'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Jane Doe',
    title: 'Project Manager, Tech Solutions Inc.',
    image: 'https://placehold.co/100x100.png',
    aiHint: 'woman face',
    quote: "Sanjay is a remarkable developer with an incredible work ethic. His ability to quickly grasp complex concepts and deliver high-quality code was a huge asset to our team. He's a pleasure to work with.",
  },
  {
    name: 'John Smith',
    title: 'Lead Researcher, Innovate AI Labs',
    image: 'https://placehold.co/100x100.png',
    aiHint: 'man portrait',
    quote: "His enthusiasm for machine learning is contagious. Sanjay's contributions to our research project were invaluable, and his analytical skills are top-notch. I highly recommend him.",
  },
  {
    name: 'Emily White',
    title: 'Professor, University of Technology',
    image: 'https://placehold.co/100x100.png',
    aiHint: 'woman portrait',
    quote: "One of the brightest students I've had the pleasure of teaching. Sanjay consistently demonstrated a deep understanding of computer science principles and a passion for solving real-world problems.",
  },
];

export default function Testimonials() {
  return (
    <Carousel
      opts={{
        align: 'start',
        loop: true,
      }}
      className="w-full max-w-4xl mx-auto"
    >
      <CarouselContent>
        {testimonials.map((testimonial, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/2">
            <div className="p-1">
              <Card className="h-full bg-card/80 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src={testimonial.image} alt={testimonial.name} data-ai-hint={testimonial.aiHint} />
                      <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Quote className="text-accent h-6 w-6 mb-4" />
                  <p className="text-muted-foreground italic">&quot;{testimonial.quote}&quot;</p>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
