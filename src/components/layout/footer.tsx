import { Github, Linkedin, Mail, Code, BarChart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const socialLinks = [
  { name: 'GitHub', icon: Github, url: 'https://github.com/SoloSorceror' },
  { name: 'LinkedIn', icon: Linkedin, url: 'https://www.linkedin.com/in/sanjaychetry/' },
  { name: 'LeetCode', icon: Code, url: 'https://leetcode.com/u/SoLoSorceror/' },
  { name: 'Kaggle', icon: BarChart, url: 'https://www.kaggle.com/sanjaychetry' },
  { name: 'Email', icon: Mail, url: 'mailto:sanjaychetry1043@gmail.com' },
];

export default function Footer() {
  return (
    <footer className="bg-primary/5">
      <div className="container py-8 flex flex-col md:flex-row items-center justify-between text-center md:text-left">
        <div className="mb-4 md:mb-0">
            <p className="text-sm text-muted-foreground">
                &copy; {new Date().getFullYear()} Sanjay Chetry. All rights reserved.
            </p>
            <p className="text-sm text-accent italic mt-1">
              "Code with clarity. Build with balance. Grow with intent."
            </p>
        </div>
        <div className="flex items-center space-x-2">
          {socialLinks.map((link) => (
             <Button key={link.name} variant="ghost" size="icon" asChild>
                <a href={link.url} target="_blank" rel="noopener noreferrer" aria-label={link.name}>
                    <link.icon className="h-5 w-5" />
                </a>
            </Button>
          ))}
        </div>
      </div>
    </footer>
  );
}
