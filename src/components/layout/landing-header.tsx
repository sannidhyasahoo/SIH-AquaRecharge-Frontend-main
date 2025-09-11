
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Droplet } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';

export function LandingHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80 transition-colors duration-300">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-semibold group">
          <Droplet className="h-6 w-6 text-primary group-hover:text-primary/80 transition-colors" />
          <span className="text-lg font-headline text-foreground group-hover:text-foreground/80 transition-colors">MeghMalhaar</span>
        </Link>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Button variant="ghost" asChild className="hover:bg-primary/10">
            <Link href="/login">Log In</Link>
          </Button>
          <Button asChild className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg shadow-primary/25">
            <Link href="/signup">Sign Up</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
