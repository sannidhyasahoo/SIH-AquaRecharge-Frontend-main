
'use client';

import Link from 'next/link';
import { Droplet, Menu } from 'lucide-react';
import { LanguageSwitcher } from './language-switcher';
import { SidebarTrigger, useSidebar } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';

export function AppHeader() {
  const { isMobile } = useSidebar();

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between gap-4 border-b bg-background/90 px-4 backdrop-blur-sm md:px-6">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="md:group-data-[collapsible=icon]:hidden">
           <Menu className="h-6 w-6" />
           <span className="sr-only">Toggle Sidebar</span>
        </SidebarTrigger>
        {isMobile && (
          <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
            <Droplet className="h-6 w-6 text-primary" />
            <span className="sr-only">AquaRecharge</span>
          </Link>
        )}
      </div>
      <div className="flex items-center gap-2">
        <LanguageSwitcher />
        <Button variant="outline" asChild>
            <Link href="/">Logout</Link>
        </Button>
      </div>
    </header>
  );
}
