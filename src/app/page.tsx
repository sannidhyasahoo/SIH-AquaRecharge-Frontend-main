
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import WaterRippleAnimation from '@/components/water-ripple-animation';
import { MoveRight, Droplet, Lightbulb, TrendingUp } from 'lucide-react';
import { LandingHeader } from '@/components/layout/landing-header';
import { LandingFooter } from '@/components/layout/landing-footer';

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <LandingHeader />
      <main className="flex-1">
        <section className="relative flex h-[calc(100vh-4rem)] min-h-[500px] items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/10 to-primary/5 dark:from-blue-900/20 dark:via-blue-600/10 dark:to-cyan-500/20">
            <WaterRippleAnimation />
          </div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent dark:from-blue-600/20"></div>
          <div className="relative z-10 flex flex-col items-center space-y-8 p-4 text-center text-foreground">
            <div className="mb-4">
              <Droplet className="h-16 w-16 text-primary mx-auto animate-droplet" />
            </div>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl font-headline bg-gradient-to-r from-primary via-primary/80 to-primary/60 dark:from-blue-400 dark:via-blue-300 dark:to-cyan-300 bg-clip-text text-transparent">
              Conserve Water, Sustain Life
            </h1>
            <div className="max-w-[700px] text-lg md:text-xl text-muted-foreground">
              <p>
                MeghMalhaar provides intelligent, AI-powered solutions for
                rooftop rainwater harvesting and groundwater recharge.
              </p>
            </div>
            <Link href="/signup">
              <Button size="lg" className="group text-lg py-7 px-8 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg shadow-primary/25 hover:shadow-primary/30 transition-all duration-300">
                Start Your Water-Saving Journey
                <MoveRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
          <div className="absolute bottom-0 left-0 w-full">
            <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1440 120H0V26.2933C153 -23.1326 405.2 6.37264 577.5 45.4214C749.8 84.4702 888.5 91.562 1044 56.7093C1215.1 18.0673 1345.8 -2.15599 1440 26.2933V120Z" fill="hsl(var(--background))" />
            </svg>
          </div>
        </section>

        <section id="features" className="py-12 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">
                Why MeghMalhaar?
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-xl">
                Harness the power of nature and technology to build a sustainable water future.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center text-center p-6 rounded-xl glass-card hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 group card-hover">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-primary/30 text-primary group-hover:scale-110 transition-transform duration-300">
                  <Droplet className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Personalized Plans</h3>
                <p className="mt-2 text-muted-foreground">
                  Get AI-driven recommendations tailored to your specific location, roof type, and water needs.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-6 rounded-xl glass-card hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 group card-hover">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-primary/30 text-primary group-hover:scale-110 transition-transform duration-300">
                  <Lightbulb className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Eco-Friendly</h3>
                <p className="mt-2 text-muted-foreground">
                  Reduce your reliance on municipal water, lower your carbon footprint, and help replenish vital groundwater sources.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-6 rounded-xl glass-card hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 group card-hover">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-primary/30 text-primary group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Cost-Effective</h3>
                <p className="mt-2 text-muted-foreground">
                  Save money on your water bills and increase your property's value with a smart, sustainable investment.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <LandingFooter />
    </div>
  );
}
