
'use client';

import Link from 'next/link';
import { Sparkles, Bot, MapPin, HomeIcon as PgHomeIcon, IndianRupee, Briefcase, Users, Menu, Camera, Settings, UserCircle, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import React from 'react'; // Import React for Fragment shorthand

const allNavItems = [
  { href: '/local-assistant', label: 'AI Assistant', icon: Bot },
  { href: '/vibe-tracker', label: 'Vibe Tracker', icon: MapPin },
  { href: '/city-moments', label: 'City Moments', icon: Camera },
  { href: '/connect', label: 'Connect', icon: Users },
  { href: '/fare-estimator', label: 'Fare Estimator', icon: IndianRupee },
  { href: '/services-directory', label: 'Services', icon: Briefcase },
  { href: '/pg-finder', label: 'PG', icon: PgHomeIcon },
];

export function AppHeader() {
  const { toast } = useToast();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-primary flex-shrink-0"><><Sparkles className="h-7 w-7 flex-shrink-0" /><span className="hidden sm:inline">VibinGo</span></></Link>

        <div className="flex items-center gap-2">
          <nav className="hidden md:flex flex-grow justify-center items-center gap-1 lg:space-x-2">
            {allNavItems.map((item) => (
              <Button key={item.label} variant="ghost" asChild size="sm" className="px-3">
                <Link href={item.href} className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary">
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              </Button>
            ))}
          </nav>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
                <span className="sr-only">Open settings</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => toast({ title: "Profile Details", description: "Navigating to profile details..." })}>
                <UserCircle className="mr-2 h-4 w-4" />
                <span>Profile Details</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => toast({ title: "Privacy Details", description: "Navigating to privacy settings..." })}>
                <span>Privacy Details</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => toast({ title: "Sign Out", description: "Signing out..." })}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sign Out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] sm:w-[320px]">
                <nav className="grid gap-6 text-lg font-medium mt-8">
                  <Link href="/" className="flex items-center gap-2 text-xl font-bold text-primary mb-4">
                    <>
                      <Sparkles className="h-7 w-7 flex-shrink-0" />
                      <span>VibinGo</span>
                    </>
                  </Link>
                  {allNavItems.map((item) => ( 
                    <Link
                      key={item.label}
                      href={item.href}
                      className="flex items-center gap-4 px-2.5 text-foreground hover:text-primary"
                    >
                      <item.icon className="h-5 w-5" />
                      {item.label}
                    </Link>
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
