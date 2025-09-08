
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import WaterRippleAnimation from '@/components/water-ripple-animation';
import {
  MoveRight,
  ClipboardList,
  Lightbulb,
  Droplets,
  Leaf,
  Users,
  TrendingUp,
  CheckCircle,
  PlusCircle,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function DashboardPage() {
  const [userName, setUserName] = useState<string | null>(null);
  const [waterSaved, setWaterSaved] = useState('');
  const [logSubmitted, setLogSubmitted] = useState(false);

  useEffect(() => {
    // In a real app, you'd fetch the user's name from your auth provider
    setUserName('Alex');
  }, []);
  
  const handleLogSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (waterSaved) {
        setLogSubmitted(true);
        // Reset after a few seconds
        setTimeout(() => {
            setLogSubmitted(false);
            setWaterSaved('');
        }, 3000);
    }
  };


  return (
    <div className="flex flex-1 flex-col">
      <section className="bg-secondary py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
            {userName ? `Welcome back, ${userName}!` : 'Welcome!'}
          </h1>
          <p className="mt-2 text-muted-foreground md:text-lg">
            Ready to explore your sustainable water solutions?
          </p>
        </div>
      </section>

      <section id="quick-actions" className="py-12">
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Log Your Water Savings</CardTitle>
                        <CardDescription>Enter the amount of water you've saved recently.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {logSubmitted ? (
                            <div className="flex flex-col items-center justify-center h-full text-center p-4 bg-green-50 rounded-lg">
                                <CheckCircle className="h-12 w-12 text-green-600 mb-2" />
                                <p className="font-semibold text-green-700">Thank you for your contribution!</p>
                                <p className="text-sm text-green-600">Your savings have been logged.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleLogSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="water-saved">Water Saved (in Liters)</Label>
                                    <Input 
                                        id="water-saved" 
                                        type="number" 
                                        placeholder="e.g., 500" 
                                        value={waterSaved}
                                        onChange={(e) => setWaterSaved(e.target.value)}
                                        required 
                                    />
                                </div>
                                <Button type="submit" className="w-full">
                                    <PlusCircle className="mr-2" />
                                    Log Savings
                                </Button>
                            </form>
                        )}
                    </CardContent>
                </Card>
                 <Card className="flex flex-col">
                    <CardHeader>
                        <CardTitle>View Your Impact</CardTitle>
                        <CardDescription>See how your efforts translate into achievements and badges.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col items-center justify-center text-center p-6 bg-primary/10">
                        <p className="text-lg font-semibold mb-4">You're making a real difference!</p>
                         <Link href="/achievements">
                            <Button size="lg">
                                Go to Achievements
                                <MoveRight className="ml-2" />
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        </div>
      </section>

      <section id="cta" className="py-12 md:py-20 bg-primary/10">
        <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">Ready to Make a Difference?</h2>
            <p className="mt-4 max-w-2xl mx-auto md:text-xl text-muted-foreground">
                Get your free, personalized rainwater harvesting plan today and take the first step towards a sustainable future.
            </p>
            <Link href="/recommend" className="mt-8 inline-block">
                <Button size="lg" className="group text-lg py-7 px-8">
                    Start Your Water-Saving Journey
                    <MoveRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
            </Link>
        </div>
       </section>

      <section id="how-it-works" className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">
              How It Works
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-xl">
              Get a personalized rainwater harvesting recommendation in three
              simple steps.
            </p>
          </div>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <ClipboardList className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold">1. Provide Details</h3>
              <p className="mt-2 text-muted-foreground">
                Fill out a simple form about your location, property, and water needs.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Lightbulb className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold">2. Get Your Recommendation</h3>
              <p className="mt-2 text-muted-foreground">
                Our AI analyzes your data to suggest the most suitable
                rainwater harvesting system.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Droplets className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold">3. Start Conserving Water</h3>
              <p className="mt-2 text-muted-foreground">
                Implement the solution to start recharging groundwater and
                saving on water bills.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="why-us" className="bg-secondary py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">
              Why Choose AquaRecharge?
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-xl">
              We provide smart, sustainable, and simple solutions for a water-secure future.
            </p>
          </div>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            <Card>
              <CardHeader className="items-center">
                <Leaf className="h-10 w-10 text-green-500 mb-2" />
                <CardTitle>Eco-Friendly</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p>
                  Reduce your carbon footprint and promote a healthier
                  environment by conserving a vital natural resource.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="items-center">
                <TrendingUp className="h-10 w-10 text-blue-500 mb-2" />
                <CardTitle>Cost-Effective</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p>
                  Lower your water bills and increase your property value with
                  a sustainable water management system.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="items-center">
                <Users className="h-10 w-10 text-purple-500 mb-2" />
                <CardTitle>Community-Focused</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p>
                  Join a growing community dedicated to responsible water
                  management and groundwater replenishment.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="testimonials" className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">
              What Our Users Say
            </h2>
          </div>
          <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start space-x-4">
                  <Avatar>
                    <AvatarImage
                      src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                      alt="User 1"
                    />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="italic">
                      &ldquo;AquaRecharge gave me a clear, actionable plan. The
                      recharge pit is working great!&rdquo;
                    </p>
                    <p className="mt-2 font-semibold">- Jane Doe, Bangalore</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start space-x-4">
                  <Avatar>
                    <AvatarImage
                      src="https://i.pravatar.cc/150?u=a042581f4e29026704e"
                      alt="User 2"
                    />
                    <AvatarFallback>RS</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="italic">
                      &ldquo;The AI recommendation was surprisingly accurate. It
                      took all the guesswork out of the process.&rdquo;
                    </p>
                    <p className="mt-2 font-semibold">- Ramesh S., Chennai</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start space-x-4">
                  <Avatar>
                    <AvatarImage
                      src="https://i.pravatar.cc/150?u=a042581f4e29026704f"
                      alt="User 3"
                    />
                    <AvatarFallback>AK</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="italic">
                      &ldquo;A must-have tool for anyone serious about saving
                      water. Highly recommended!&rdquo;
                    </p>
                    <p className="mt-2 font-semibold">- Anjali K., Pune</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}

    