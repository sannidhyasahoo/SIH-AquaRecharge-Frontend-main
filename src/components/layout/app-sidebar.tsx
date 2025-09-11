
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Droplet, Home, Info, FileText, Award, Bell, Map } from 'lucide-react';
import {
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarMenuBadge,
} from '@/components/ui/sidebar';
import { useState } from 'react';

const links = [
  { href: '/dashboard', icon: Home, label: 'Dashboard' },
  { href: '/recommend', icon: Droplet, label: 'Get Recommendation' },
  { href: '/recommend/results', icon: FileText, label: 'My Recommendation' },
  { href: '/map-tools', icon: Map, label: 'Map & AR Tools' },
  { href: '/achievements', icon: Award, label: 'Achievements' },
  { href: '/alerts', icon: Bell, label: 'Alerts', badge: 2 },
  { href: '/about', icon: Info, label: 'FAQs & About' },
];

export function AppSidebar() {
  const pathname = usePathname();
  // In a real app, this would come from a global state/provider
  const [seriousAlertsCount, setSeriousAlertsCount] = useState(2);


  return (
    <>
      <SidebarHeader className="border-b">
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold group">
          <Droplet className="h-6 w-6 text-primary group-hover:text-primary/80 transition-colors" />
          <span className="text-lg font-headline text-foreground group-hover:text-foreground/80 transition-colors">MeghMalhaar</span>
        </Link>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          {links.map((link) => (
            <SidebarMenuItem key={link.label}>
              <Link href={link.href}>
                <SidebarMenuButton
                  tooltip={link.label}
                  isActive={pathname === link.href}
                >
                  <link.icon className="h-4 w-4" />
                  <span>{link.label}</span>
                  {link.badge && seriousAlertsCount > 0 && (
                    <SidebarMenuBadge>{seriousAlertsCount}</SidebarMenuBadge>
                  )}
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <p className="px-4 text-center text-xs text-muted-foreground">
          © 2025 MeghMalhaar
        </p>
      </SidebarFooter>
    </>
  );
}
