'use client';

import { Briefcase, GraduationCap, User } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const aboutData = {
    bio: "I'm a Computer Science student on a journey to bridge software engineering with intelligent systems. I specialize in full-stack development with the MERN stack and am building a solid foundation in machine learning and DevOps. Whether it's designing a clean, responsive UI or integrating AI into real-world tools, I love turning complex ideas into usable, efficient systems. My goal is to create impactful tech and secure high-performing roles where I can grow, contribute, and lead.",
    experience: [
        {
            company: 'Smart India Hackathon',
            role: 'Participant',
            duration: '2023',
            description: 'Collaborated intensively in a team environment to develop innovative solutions for real-world problems under a tight deadline. This experience sharpened my problem-solving, teamwork, and rapid prototyping skills.'
        },
        {
            company: 'Collaborative Projects',
            role: 'Developer & Collaborator',
            duration: 'Ongoing',
            description: 'Actively engage in projects with peers that push technical boundaries and sharpen my skills in areas like AI integration, clean architecture, and full-stack development.'
        }
    ],
    education: [
        {
            institution: 'Lovely Professional University',
            degree: 'Bachelor of Technology in Computer Science',
            duration: 'Ongoing',
            description: 'Building a strong foundation in Data Structures & Algorithms, Object-Oriented Programming, and other core Computer Science principles.'
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
