import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import CustomCursor from '@/components/ui/custom-cursor';

export const metadata: Metadata = {
  title: 'SanjayChetry.IO',
  description: 'Personal portfolio of Sanjay Chetry, showcasing projects and skills.',
    openGraph: {
    title: 'SanjayChetry.IO',
    description: 'Personal portfolio of Sanjay Chetry, showcasing projects and skills.',
    url: 'https://sanjay-portfolio-my6y.vercel.app/', // Replace with your actual domain
    siteName: 'SanjayChetry.IO',
    images: [
      {
        url: 'https://sanjay-portfolio-my6y.vercel.app/preview.png',
        width: 1200,
        height: 630,
      },
    
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Space+Grotesk:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <CustomCursor />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
