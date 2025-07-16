import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Code, Database, Bot, Settings2 } from "lucide-react";

const skillCategories = [
    {
        title: "Languages",
        icon: <Code className="h-6 w-6 text-accent" />,
        skills: [
            { name: "C / C++", level: 90 },
            { name: "Java", level: 85 },
            { name: "Python", level: 95 },
            { name: "JavaScript / TypeScript", level: 80 },
        ],
    },
    {
        title: "Frontend & Backend",
        icon: <Settings2 className="h-6 w-6 text-accent" />,
        skills: [
            { name: "MERN Stack (MongoDB, Express, React, Node.js)", level: 85 },
            { name: "Next.js", level: 80 },
            { name: "HTML & CSS", level: 95 },
            { name: "SQL Databases", level: 75 },
        ],
    },
    {
        title: "Machine Learning",
        icon: <Bot className="h-6 w-6 text-accent" />,
        skills: [
            { name: "Scikit-learn", level: 90 },
            { name: "TensorFlow / Keras", level: 70 },
            { name: "Pandas & NumPy", level: 95 },
            { name: "Data Science & Analysis", level: 85 },
        ],
    },
    {
        title: "Core Concepts",
        icon: <Database className="h-6 w-6 text-accent" />,
        skills: [
            { name: "Data Structures & Algorithms (DSA)", level: 90 },
            { name: "Object-Oriented Programming (OOP)", level: 85 },
            { name: "Database Management Systems (DBMS)", level: 80 },
            { name: "Operating Systems", level: 70 },
        ],
    },
];

export default function Skills() {
    return (
        <div className="grid md:grid-cols-2 gap-8">
            {skillCategories.map((category) => (
                <Card key={category.title} className="bg-card/50 backdrop-blur-sm">
                    <CardHeader className="flex flex-row items-center gap-4">
                        {category.icon}
                        <CardTitle className="font-headline">{category.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-4">
                            {category.skills.map((skill) => (
                                <li key={skill.name}>
                                    <div className="flex justify-between mb-1">
                                        <span className="text-sm font-medium text-foreground/80">{skill.name}</span>
                                        <span className="text-sm text-muted-foreground">{skill.level}%</span>
                                    </div>
                                    <Progress value={skill.level} className="h-2 [&>div]:bg-accent" />
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
