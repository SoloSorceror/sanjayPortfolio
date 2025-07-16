'use client';

import { Briefcase, GraduationCap, User } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const aboutData = {
    bio: "I'm a passionate Full-Stack Developer with a knack for building elegant and efficient solutions. With a strong foundation in computer science and a love for continuous learning, I thrive on tackling complex challenges and creating impactful applications. I'm particularly interested in the intersection of web development and machine learning, always seeking opportunities to innovate and grow.",
    experience: [
        {
            company: 'Tech Solutions Inc.',
            role: 'Software Engineer Intern',
            duration: 'May 2023 - Aug 2023',
            description: 'Worked on the development of a scalable web application using the MERN stack. Implemented key features, optimized database queries, and collaborated with a team of developers to deliver a high-quality product.'
        },
        {
            company: 'Innovate AI Labs',
            role: 'Machine Learning Research Assistant',
            duration: 'Jan 2023 - Apr 2023',
            description: 'Assisted in research on natural language processing models. Cleaned and preprocessed large datasets, and contributed to the development of a sentiment analysis tool.'
        }
    ],
    education: [
        {
            institution: 'University of Technology',
            degree: 'Bachelor of Science in Computer Science',
            duration: '2020 - 2024',
            description: 'Focused on algorithms, data structures, and software engineering principles. Completed a final year project on a real-time data visualization dashboard.'
        },
        {
            institution: 'Online Learning Platforms',
            degree: 'Various Certifications',
            duration: 'Ongoing',
            description: 'Completed courses in Full-Stack Web Development, Deep Learning, and Cloud Computing on platforms like Coursera and Udemy.'
        }
    ]
}

export default function About() {
  return (
    <Card className="max-w-4xl mx-auto bg-card/80 backdrop-blur-sm" data-cursor-interactive>
      <CardContent className="p-6">
        <Tabs defaultValue="bio" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="bio"><User className="mr-2 h-4 w-4" />Bio</TabsTrigger>
            <TabsTrigger value="experience"><Briefcase className="mr-2 h-4 w-4" />Experience</TabsTrigger>
            <TabsTrigger value="education"><GraduationCap className="mr-2 h-4 w-4" />Education</TabsTrigger>
          </TabsList>
          <TabsContent value="bio">
             <p className="text-muted-foreground leading-relaxed">{aboutData.bio}</p>
          </TabsContent>
          <TabsContent value="experience">
            <div className="space-y-6">
                {aboutData.experience.map((item, index) => (
                    <div key={index} className="relative pl-6">
                        <div className="absolute left-0 top-1.5 h-3 w-3 rounded-full bg-accent" />
                        <p className="font-semibold">{item.role}</p>
                        <p className="text-sm text-accent">{item.company}</p>
                        <p className="text-xs text-muted-foreground mb-2">{item.duration}</p>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                ))}
            </div>
          </TabsContent>
          <TabsContent value="education">
          <div className="space-y-6">
                {aboutData.education.map((item, index) => (
                    <div key={index} className="relative pl-6">
                        <div className="absolute left-0 top-1.5 h-3 w-3 rounded-full bg-accent" />
                        <p className="font-semibold">{item.degree}</p>
                        <p className="text-sm text-accent">{item.institution}</p>
                        <p className="text-xs text-muted-foreground mb-2">{item.duration}</p>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
