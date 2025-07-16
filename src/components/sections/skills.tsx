'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { SkillIcon } from "@/components/3d/skill-icon";
import StaggeredReveal from "../motion/staggered-reveal";
import { useEffect, useRef } from "react";
import SectionBackground from "../3d/section-background";

const skillCategories = [
    {
        title: "Programming Languages",
        iconType: "code",
        skills: [
            { name: "C++", level: 90 },
            { name: "Java", level: 85 },
            { name: "Python", level: 95 },
            { name: "JavaScript (ES6+)", level: 80 },
        ],
    },
    {
        title: "Web Development",
        iconType: "settings",
        skills: [
            { name: "React.js, Next.js", level: 85 },
            { name: "Node.js, Express.js", level: 80 },
            { name: "HTML, CSS, Tailwind", level: 95 },
            { name: "MongoDB, REST APIs", level: 75 },
        ],
    },
    {
        title: "AI & Machine Learning",
        iconType: "bot",
        skills: [
            { name: "Scikit-learn, Pandas, NumPy", level: 90 },
            { name: "LangChain, OpenAI API", level: 80 },
            { name: "Prompt Engineering", level: 85 },
            { name: "Vector DBs (Chroma, Pinecone)", level: 70 },
        ],
    },
    {
        title: "DevOps & Core Concepts",
        iconType: "database",
        skills: [
            { name: "Git, GitHub Actions, CI/CD", level: 85 },
            { name: "Docker", level: 75 },
            { name: "DSA & Problem Solving", level: 90 },
            { name: "Clean Architecture", level: 80 },
        ],
    },
] as const;

const SkillCard = ({ category, i }: { category: typeof skillCategories[0], i: number }) => {
    const cardRef = useRef<HTMLDivElement>(null);
  
    useEffect(() => {
      const card = cardRef.current;
      if (!card) return;
  
      const onMouseMove = (e: MouseEvent) => {
        const { left, top, width, height } = card.getBoundingClientRect();
        const x = (e.clientX - left - width / 2) / (width / 2);
        const y = (e.clientY - top - height / 2) / (height / 2);
        card.style.transform = `perspective(1000px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg) scale3d(1.02, 1.02, 1.02)`;
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
        <StaggeredReveal key={category.title} style={{transitionDelay: `${i * 150}ms`}}>
            <Card ref={cardRef} className="bg-card/50 backdrop-blur-sm h-full transition-all duration-200 ease-out will-change-transform">
                <CardHeader className="flex flex-row items-center gap-4">
                    <SkillIcon icon={category.iconType} size={40} className="shrink-0" />
                    <CardTitle className="font-headline">{category.title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-4">
                        {category.skills.map((skill, j) => (
                            <StaggeredReveal as="li" key={skill.name} style={{transitionDelay: `${(i * 150) + ((j + 1) * 75)}ms`}}>
                                <div className="flex justify-between mb-1">
                                    <span className="text-sm font-medium text-foreground/80">{skill.name}</span>
                                    <span className="text-sm text-muted-foreground">{skill.level}%</span>
                                </div>
                                <Progress value={skill.level} className="h-2 [&>div]:bg-accent" />
                            </StaggeredReveal>
                        ))}
                    </ul>
                </CardContent>
            </Card>
        </StaggeredReveal>
    )
}

export default function Skills() {
    return (
        <section id="skills" className="relative bg-primary/10 py-16 md:py-24 overflow-hidden" data-cursor="block">
            <SectionBackground effect="particles" />
            <div className="container relative z-10">
                <StaggeredReveal as="h2" className="text-3xl font-bold text-center font-headline mb-12">
                    Skills & Expertise
                </StaggeredReveal>
                <div className="grid md:grid-cols-2 gap-8">
                    {skillCategories.map((category, i) => (
                       <SkillCard key={category.title} category={category} i={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
