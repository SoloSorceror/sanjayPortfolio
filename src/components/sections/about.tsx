'use client';
import { Briefcase, GraduationCap, User, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { OrbitingOrb } from '../3d/orbiting-orb';
import StaggeredReveal from '../motion/staggered-reveal';

const aboutData = {
    bio: {
      title: "Digital Architect & AI Innovator",
      paragraphs: [
        "I'm a Computer Science student at Lovely Professional University, driven by a passion for transforming complex challenges into elegant, intelligent solutions. My journey is focused on the intersection of full-stack development and artificial intelligence, where I specialize in building robust, scalable applications with the MERN stack.",
        "From designing clean, responsive user interfaces to architecting backend systems and integrating sophisticated AI agents, I thrive on the entire development lifecycle. My goal is to not just write code, but to build systems that are efficient, intuitive, and impactful.",
        "When I’m not deep in a project, I’m optimizing my workflow, learning from top engineers, and cultivating the discipline needed for long-term excellence. I believe in coding with clarity, building with balance, and growing with intent."
      ]
    },
    experience: [
        {
            company: 'Smart India Hackathon',
            role: 'Participant & Innovator',
            duration: '2023',
            description: 'Engaged in a high-intensity, collaborative environment to brainstorm and develop innovative solutions to real-world challenges under strict deadlines. This experience honed my rapid prototyping, team collaboration, and problem-solving abilities.'
        },
        {
            company: 'Collaborative Projects',
            role: 'Full-Stack Developer',
            duration: 'Ongoing',
            description: 'Actively contribute to peer-led projects that explore advanced technical concepts, sharpening my skills in AI agent integration, clean architecture, and end-to-end application development.'
        }
    ],
    education: [
        {
            institution: 'Lovely Professional University',
            degree: 'Bachelor of Technology in Computer Science',
            duration: '2023 - Present',
            description: 'Specializing in Data Structures & Algorithms, Object-Oriented Programming, and other core CS principles to build a robust theoretical and practical foundation.'
        },
        {
            institution: 'Pearl Academy',
            degree: 'Higher Secondary (PCMB)',
            duration: '2020 - 2022',
            description: 'Completed my higher secondary education with a focus on Physics, Chemistry, Mathematics, and Biology.'
        },
        {
            institution: 'Stella Maris School',
            degree: 'Secondary School',
            duration: 'Completed 2020',
            description: 'Established my foundational education, culminating in the completion of Class 10.'
        }
    ]
}

export default function About() {
  return (
    <div className="container py-16 md:py-24 min-h-screen flex flex-col justify-center">
       <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
            <div className="relative h-64 md:h-[500px] w-full">
                <OrbitingOrb />
            </div>
            <StaggeredReveal>
                 <Tabs defaultValue="bio" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 mb-6 bg-transparent p-0">
                        <TabsTrigger value="bio" className="data-[state=active]:bg-primary/10 data-[state=active]:shadow-none rounded-md"><User className="mr-2 h-4 w-4" />Bio</TabsTrigger>
                        <TabsTrigger value="experience" className="data-[state=active]:bg-primary/10 data-[state=active]:shadow-none rounded-md"><Briefcase className="mr-2 h-4 w-4" />Experience</TabsTrigger>
                        <TabsTrigger value="education" className="data-[state=active]:bg-primary/10 data-[state=active]:shadow-none rounded-md"><GraduationCap className="mr-2 h-4 w-4" />Education</TabsTrigger>
                    </TabsList>
                    <TabsContent value="bio">
                        <Card className="bg-transparent border-none shadow-none">
                            <CardContent className="p-1">
                                <StaggeredReveal>
                                    <h2 className="text-3xl md:text-4xl font-bold font-headline mb-4">{aboutData.bio.title}</h2>
                                    {aboutData.bio.paragraphs.map((p, i) => (
                                        <p key={i} className="text-muted-foreground leading-relaxed mb-4">{p}</p>
                                    ))}
                                </StaggeredReveal>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="experience">
                         <div className="space-y-6 min-h-[420px]">
                            <StaggeredReveal>
                                {aboutData.experience.map((item, index) => (
                                    <div key={index} className="relative pl-6 mb-6">
                                        <div className="absolute left-0 top-1.5 h-3 w-3 rounded-full bg-accent" />
                                        <p className="font-semibold">{item.role}</p>
                                        <p className="text-sm text-accent">{item.company}</p>
                                        <p className="text-xs text-muted-foreground mb-2">{item.duration}</p>
                                        <p className="text-sm text-muted-foreground">{item.description}</p>
                                    </div>
                                ))}
                            </StaggeredReveal>
                        </div>
                    </TabsContent>
                    <TabsContent value="education">
                        <div className="space-y-6 min-h-[420px]">
                            <StaggeredReveal>
                                {aboutData.education.map((item, index) => (
                                    <div key={index} className="relative pl-6 mb-6">
                                        <div className="absolute left-0 top-1.5 h-3 w-3 rounded-full bg-accent" />
                                        <p className="font-semibold">{item.degree}</p>
                                        <p className="text-sm text-accent">{item.institution}</p>
                                        <p className="text-xs text-muted-foreground mb-2">{item.duration}</p>
                                        <p className="text-sm text-muted-foreground">{item.description}</p>
                                    </div>
                                ))}
                            </StaggeredReveal>
                             <Button asChild className="mt-6" variant="outline">
                                <a href="https://www.linkedin.com/in/sanjaychetry/details/certifications/" target="_blank" rel="noopener noreferrer">
                                    <ExternalLink className="mr-2 h-4 w-4"/> View Certificates
                                </a>
                            </Button>
                        </div>
                    </TabsContent>
                </Tabs>
            </StaggeredReveal>
       </div>
    </div>
  );
}
