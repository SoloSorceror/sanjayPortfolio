import { CodeXml, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#testimonials', label: 'Testimonials' },
  { href: '#contact', label: 'Contact' },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <a href="#" className="mr-6 flex items-center space-x-2">
          <CodeXml className="h-6 w-6 text-accent" />
          <span className="font-bold font-headline">SanjayChetry.IO</span>
        </a>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="hidden md:flex space-x-4">
            {navLinks.map((link) => (
              <Button key={link.href} asChild variant="link" className="text-foreground/80 hover:text-accent">
                <a href={link.href}>{link.label}</a>
              </Button>
            ))}
          </nav>
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="grid gap-6 text-lg font-medium mt-8">
                  {navLinks.map((link) => (
                    <a key={link.href} href={link.href} className="text-muted-foreground hover:text-foreground">
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
