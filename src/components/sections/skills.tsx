import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { SkillIcon } from "@/components/3d/skill-icon";
import StaggeredReveal from "../motion/staggered-reveal";
import SkillsBackground from "../3d/skills-background";

const skillCategories = [
    {
        title: "Languages",
        iconType: "code",
        skills: [
            { name: "C / C++", level: 90 },
            { name: "Java", level: 85 },
            { name: "Python", level: 95 },
            { name: "JavaScript / TypeScript", level: 80 },
        ],
    },
    {
        title: "Frontend & Backend",
        iconType: "settings",
        skills: [
            { name: "MERN Stack (MongoDB, Express, React, Node.js)", level: 85 },
            { name: "Next.js", level: 80 },
            { name: "HTML & CSS", level: 95 },
            { name: "SQL Databases", level: 75 },
        ],
    },
    {
        title: "Machine Learning",
        iconType: "bot",
        skills: [
            { name: "Scikit-learn", level: 90 },
            { name: "TensorFlow / Keras", level: 70 },
            { name: "Pandas & NumPy", level: 95 },
            { name: "Data Science & Analysis", level: 85 },
        ],
    },
    {
        title: "Core Concepts",
        iconType: "database",
        skills: [
            { name: "Data Structures & Algorithms (DSA)", level: 90 },
            { name: "Object-Oriented Programming (OOP)", level: 85 },
            { name: "Database Management Systems (DBMS)", level: 80 },
            { name: "Operating Systems", level: 70 },
        ],
    },
] as const;

export default function Skills() {
    return (
        <section id="skills" className="relative bg-primary/10 py-16 md:py-24 overflow-hidden" data-cursor="block">
            <SkillsBackground />
            <div className="container relative z-10">
                <StaggeredReveal as="h2" className="text-3xl font-bold text-center font-headline mb-12">
                    Skills & Expertise
                </StaggeredReveal>
                <div className="grid md:grid-cols-2 gap-8">
                    {skillCategories.map((category, i) => (
                        <StaggeredReveal key={category.title} style={{transitionDelay: `${i * 150}ms`}}>
                            <Card className="bg-card/50 backdrop-blur-sm h-full">
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
                    ))}
                </div>
            </div>
        </section>
    );
}
