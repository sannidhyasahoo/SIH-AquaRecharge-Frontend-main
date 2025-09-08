
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
          <div className="absolute inset-0 bg-primary/10">
            <WaterRippleAnimation />
          </div>
          <div className="relative z-10 flex flex-col items-center space-y-8 p-4 text-center text-foreground">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl font-headline">
              Conserve Water, Sustain Life
            </h1>
            <div className="max-w-[700px] text-lg md:text-xl text-muted-foreground">
              <p>
                AquaRecharge provides intelligent, AI-powered solutions for
                rooftop rainwater harvesting and groundwater recharge.
              </p>
            </div>
            <Link href="/signup">
              <Button size="lg" className="group text-lg py-7 px-8">
                Start Your Water-Saving Journey
                <MoveRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
          <div className="absolute bottom-0 left-0 w-full">
            <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1440 120H0V26.2933C153 -23.1326 405.2 6.37264 577.5 45.4214C749.8 84.4702 888.5 91.562 1044 56.7093C1215.1 18.0673 1345.8 -2.15599 1440 26.2933V120Z" fill="hsl(var(--background))"/>
            </svg>
          </div>
        </section>

        <section id="features" className="py-12 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">
                Why AquaRecharge?
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-xl">
                Harness the power of nature and technology to build a sustainable water future.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Droplet className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold">Personalized Plans</h3>
                <p className="mt-2 text-muted-foreground">
                  Get AI-driven recommendations tailored to your specific location, roof type, and water needs.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Lightbulb className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold">Eco-Friendly</h3>
                <p className="mt-2 text-muted-foreground">
                  Reduce your reliance on municipal water, lower your carbon footprint, and help replenish vital groundwater sources.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <TrendingUp className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold">Cost-Effective</h3>
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
