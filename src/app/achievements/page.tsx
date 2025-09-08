
'use client';

import { useState, useEffect } from 'react';
import { Award, CheckCircle, Circle, Droplet, Leaf, Shield, Star, Zap, ArrowRight, PartyPopper } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

const chartConfig = {
  waterSaved: {
    label: "Water Saved (L)",
    color: "hsl(var(--primary))",
  },
};
const chartData = [
  { month: "Jan", waterSaved: 1860 },
  { month: "Feb", waterSaved: 3050 },
  { month: "Mar", waterSaved: 2370 },
  { month: "Apr", waterSaved: 730 },
  { month: "May", waterSaved: 2090 },
  { month: "Jun", waterSaved: 2140 },
];

const initialAchievements = [
    { id: 1, text: "Complete Your Profile", points: 50, completed: false },
    { id: 2, text: "Get First Recommendation", points: 75, completed: false },
    { id: 3, text: "Install a Recharge Structure", points: 200, completed: false },
    { id: 4, text: "Clean Your Filters", points: 75, completed: false },
    { id: 5, text: "Log Water Savings for 1 Month", points: 150, completed: false },
];

const badges = [
    { name: "Water Droplet", level: 1, icon: <Droplet className="h-10 w-10" /> },
    { name: "Eco Starter", level: 2, icon: <Leaf className="h-10 w-10" /> },
    { name: "Aqua Saver", level: 3, icon: <Shield className="h-10 w-10" /> },
    { name: "Sustainability Star", level: 4, icon: <Star className="h-10 w-10" /> },
    { name: "Hydro Champion", level: 5, icon: <Award className="h-10 w-10" /> },
];

const POINTS_PER_LEVEL = 200;

export default function AchievementsPage() {
    const [achievements, setAchievements] = useState(initialAchievements);
    const [userXp, setUserXp] = useState(0);
    const [isLevelUpDialogOpen, setIsLevelUpDialogOpen] = useState(false);
    const [earnedBadge, setEarnedBadge] = useState<(typeof badges[0]) | null>(null);

    useEffect(() => {
        const completedXp = achievements
            .filter(a => a.completed)
            .reduce((sum, a) => sum + a.points, 0);
        setUserXp(completedXp);
    }, [achievements]);

    const handleToggleAchievement = (id: number) => {
        const oldLevel = Math.floor(userXp / POINTS_PER_LEVEL) + 1;

        const newAchievements = achievements.map(ach => 
            ach.id === id ? { ...ach, completed: !ach.completed } : ach
        );

        const newXp = newAchievements
            .filter(a => a.completed)
            .reduce((sum, a) => sum + a.points, 0);
            
        setAchievements(newAchievements);
        
        const newLevel = Math.floor(newXp / POINTS_PER_LEVEL) + 1;

        if (newLevel > oldLevel) {
            const newBadge = badges.find(b => b.level === newLevel);
            if (newBadge) {
                setEarnedBadge(newBadge);
                setIsLevelUpDialogOpen(true);
            }
        }
    };

    const currentLevel = Math.floor(userXp / POINTS_PER_LEVEL) + 1;
    const currentLevelXp = userXp % POINTS_PER_LEVEL;
    const pointsToNextLevel = POINTS_PER_LEVEL - currentLevelXp;
    
    const currentBadge = badges.find(b => b.level === currentLevel) ?? badges[0];
    const nextBadge = badges.find(b => b.level === currentLevel + 1);
    
    const totalWaterSaved = chartData.reduce((acc, item) => acc + item.waterSaved, 0);
    const treesSustained = Math.floor(totalWaterSaved / 1000);

    return (
        <div className="container mx-auto max-w-6xl py-8 px-4">
            <header className="mb-8 text-center">
                <h1 className="text-4xl font-bold tracking-tight font-headline">Your Achievements</h1>
                <p className="mt-2 text-lg text-muted-foreground">
                    Track your progress, earn badges, and see your impact grow.
                </p>
            </header>
            
            <Card className="mb-8">
                <CardHeader>
                    <CardTitle>Your Progress</CardTitle>
                    <CardDescription>You are currently Level {currentLevel}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-4">
                       <Progress value={(currentLevelXp / POINTS_PER_LEVEL) * 100} className="w-full h-3" />
                       <span className="font-semibold text-primary">{userXp} XP</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2 text-center">
                        {nextBadge ? `${pointsToNextLevel} XP to Level ${currentLevel + 1}` : "Max Level Reached!"}
                    </p>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                <div className="md:col-span-2">
                    <Card className="h-full">
                        <CardHeader>
                            <CardTitle>Tasks & Achievements</CardTitle>
                            <CardDescription>Click tasks to mark them as complete and earn XP.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-4">
                                {achievements.map((ach) => (
                                    <li key={ach.id} className="flex items-center justify-between cursor-pointer hover:bg-muted/50 p-2 rounded-md transition-colors" onClick={() => handleToggleAchievement(ach.id)}>
                                        <div className="flex items-center gap-4">
                                            {ach.completed ? <CheckCircle className="text-green-500" /> : <Circle className="text-muted-foreground" />}
                                            <span className={`${ach.completed ? 'text-muted-foreground' : ''}`}>{ach.text}</span>
                                        </div>
                                        <div className={`font-semibold ${ach.completed ? 'text-primary' : 'text-muted-foreground'}`}>
                                            {ach.points} XP
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                </div>

                <div className="md:col-span-1">
                     <Card className="h-full flex flex-col">
                        <CardHeader className="text-center">
                            <CardTitle>Your Badge</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col items-center justify-center flex-1">
                            <div className="text-primary mb-2">{currentBadge.icon}</div>
                            <p className="font-semibold text-lg">{currentBadge.name}</p>
                            {nextBadge && (
                                <div className="text-center mt-6 border-t pt-4 w-full">
                                    <p className="text-sm text-muted-foreground mb-2">Next up:</p>
                                    <div className="flex items-center justify-center gap-2 mt-2 text-muted-foreground/80">
                                        <div className="text-primary scale-75">{nextBadge.icon}</div>
                                        <p className="font-semibold text-sm">{nextBadge.name}</p>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>

            <Card>
                <CardHeader>
                        <CardTitle>Your Impact</CardTitle>
                    <CardDescription>Visualizing your contribution to water conservation.</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="order-last md:order-first">
                        <h3 className="text-center font-semibold mb-4">Total Water Saved</h3>
                        <ChartContainer config={chartConfig} className="min-h-[250px] w-full">
                            <BarChart accessibilityLayer data={chartData}>
                                <CartesianGrid vertical={false} />
                                <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
                                <YAxis tickFormatter={(value) => `${value / 1000}kL`} />
                                <ChartTooltip
                                    cursor={false}
                                    content={<ChartTooltipContent indicator="line" />}
                                />
                                <Bar dataKey="waterSaved" fill="var(--color-waterSaved)" radius={8} />
                            </BarChart>
                        </ChartContainer>
                    </div>
                     <div className="order-first md:order-last flex flex-col items-center justify-center p-4 bg-primary/10 rounded-lg h-full">
                        <h3 className="font-semibold text-lg mb-2 text-center">You've saved enough water to sustain:</h3>
                        <div className="flex items-center justify-center gap-4 text-green-600">
                            <Leaf className="h-16 w-16" />
                            <span className="text-5xl font-bold">{treesSustained}</span>
                        </div>
                        <p className="text-muted-foreground mt-2 text-center">trees for a month!</p>
                    </div>
                </CardContent>
            </Card>

            <Dialog open={isLevelUpDialogOpen} onOpenChange={setIsLevelUpDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="text-center text-2xl font-headline">Level Up!</DialogTitle>
                        <DialogDescription className="text-center">
                            Congratulations! You've reached Level {earnedBadge?.level} and earned a new badge.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col items-center justify-center py-6 text-center">
                        <div className="relative">
                            <div className="p-4 bg-primary/10 rounded-full mb-4 inline-block text-primary scale-150 transform transition-transform duration-500">
                                {earnedBadge?.icon}
                            </div>
                        </div>
                        <p className="font-semibold text-xl mt-4">{earnedBadge?.name}</p>
                        <p className="text-muted-foreground">Keep up the great work!</p>
                    </div>
                    <DialogFooter>
                        <Button onClick={() => setIsLevelUpDialogOpen(false)} className="w-full">Continue</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
