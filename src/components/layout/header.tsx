'use client';
import { CodeXml, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#testimonials', label: 'Testimonials' },
  { href: '#contact', label: 'Contact' },
];

export default function Header() {
  const [isMounted, setIsMounted] = useState(false);
  const [activeLink, setActiveLink] = useState('');
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const sectionsRef = useRef<Map<string, HTMLElement> | null>(null);

  useEffect(() => {
    setIsMounted(true);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveLink(`#${entry.target.id}`);
          }
        });
      },
      {
        rootMargin: "-40% 0px -60% 0px",
        threshold: 0,
      }
    );

    const allNavLinks = [...navLinks, { href: '#hero', label: 'Hero' }];
    const elements = allNavLinks.map(link => document.querySelector(link.href)).filter(Boolean) as HTMLElement[];
    
    elements.forEach((el) => {
        if (el) {
          observer.observe(el);
        }
    });

    return () => {
        elements.forEach((el) => {
            if (el) {
                observer.unobserve(el);
            }
        });
    };

  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetElement = document.querySelector(href);
    if (targetElement) {
        let top = targetElement.getBoundingClientRect().top + window.scrollY;
        // Adjust for sticky header height if not the hero section
        if (href !== '#hero') {
            top -= 80;
        }

        window.scrollTo({
            top: top,
            behavior: 'smooth'
        });

        // Manually set active link for immediate feedback
        setActiveLink(href);
        setIsSheetOpen(false);
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <a href="#hero" onClick={(e) => handleLinkClick(e, '#hero')} className="mr-6 flex items-center space-x-2">
          <CodeXml className="h-6 w-6 text-accent" />
          <span className="font-bold font-headline">SanjayChetry.IO</span>
        </a>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="hidden md:flex space-x-1 bg-muted/50 p-1 rounded-full">
            {navLinks.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={cn(
                  "px-4 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-300 rounded-full",
                  activeLink === link.href && "bg-background text-foreground shadow-sm",
                  isMounted ? 'animate-nav-item-fall' : 'opacity-0'
                )}
                style={{ animationDelay: `${index * 100 + 300}ms` }}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="md:hidden">
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="grid gap-6 text-lg font-medium mt-8">
                  <a href="#hero" onClick={(e) => handleLinkClick(e, '#hero')} className="text-muted-foreground hover:text-foreground">
                    Home
                  </a>
                  {navLinks.map((link) => (
                    <a key={link.href} href={link.href} onClick={(e) => handleLinkClick(e, link.href)} className="text-muted-foreground hover:text-foreground">
                      {link.label}
                    </a>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
