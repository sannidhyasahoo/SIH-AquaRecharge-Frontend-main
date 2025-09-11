
'use client';

import Link from 'next/link';
import { Droplet, Menu } from 'lucide-react';
import { LanguageSwitcher } from './language-switcher';
import { SidebarTrigger, useSidebar } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';

export function AppHeader() {
  const { isMobile } = useSidebar();

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between gap-4 border-b border-border/40 bg-background/95 px-4 backdrop-blur-md md:px-6 transition-colors duration-300">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="md:group-data-[collapsible=icon]:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle Sidebar</span>
        </SidebarTrigger>
        {isMobile && (
          <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
            <Droplet className="h-6 w-6 text-primary" />
            <span className="sr-only">MeghMalhaar</span>
          </Link>
        )}
      </div>
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <LanguageSwitcher />
        <Button variant="outline" asChild>
          <Link href="/">Logout</Link>
        </Button>
      </div>
    </header>
  );
}
