
'use client';

import { useState } from 'react';
import { AlertTriangle, Bell, CheckCircle, Construction, HardHat, Leaf, ShieldAlert, Siren, Wind } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const initialAlerts = {
    serious: [
        { id: 's1', icon: <Siren className="h-6 w-6 text-destructive" />, title: "Heavy Rainfall & Flood Warning", description: "The meteorological department has predicted extremely heavy rainfall in your area in the next 48 hours. Ensure all outlets and overflow pipes are clear to prevent waterlogging and potential flooding.", resolved: false },
        { id: 's2', icon: <ShieldAlert className="h-6 w-6 text-destructive" />, title: "Immediate Filter Clogging Risk", description: "Based on the recent dust storm and high pollen count, your primary filters are at high risk of being completely clogged. This can damage your system. Inspect and clean immediately.", resolved: false },
    ],
    moderate: [
        { id: 'm1', icon: <Wind className="h-6 w-6 text-yellow-500" />, title: "Check for Debris Post-Storm", description: "A recent thunderstorm may have washed leaves, twigs, and other debris onto your rooftop catchment area. Clear it to ensure water quality.", resolved: false },
        { id: 'm2', icon: <Construction className="h-6 w-6 text-yellow-500" />, title: "Inspect Gutters and Downpipes", description: "Seasonal changes can cause gutters to sag or get blocked. A quick inspection can prevent major issues during the next rainfall.", resolved: false },
        { id: 'm3', icon: <Bell className="h-6 w-6 text-yellow-500" />, title: "Pre-Monsoon System Check", description: "The monsoon season is approaching. It's a good time to give your entire system a once-over to ensure everything is in working order.", resolved: false },
    ],
    monthly: [
        { id: 'c1', icon: <CheckCircle className="h-6 w-6 text-green-500" />, title: "Leakage Check", description: "Perform a visual inspection of all pipes, joints, and the storage tank for any signs of leaks or dampness.", resolved: false },
        { id: 'c2', icon: <Leaf className="h-6 w-6 text-green-500" />, title: "First-Flush Diverter Cleaning", description: "Empty and clean the first-flush diverter to ensure it's ready to capture initial runoff from the next rain.", resolved: false },
    ]
};

type AlertCategory = 'serious' | 'moderate' | 'monthly';

export default function AlertsPage() {
    const [alerts, setAlerts] = useState(initialAlerts);

    const handleResolve = (category: AlertCategory, id: string) => {
        setAlerts(prevAlerts => ({
            ...prevAlerts,
            [category]: prevAlerts[category].map(alert =>
                alert.id === id ? { ...alert, resolved: !alert.resolved } : alert
            )
        }));
    };
    
    const seriousAlertsCount = alerts.serious.filter(a => !a.resolved).length;
    const moderateAlertsCount = alerts.moderate.filter(a => !a.resolved).length;

    return (
        <div className="container mx-auto max-w-5xl py-8 px-4">
             <header className="mb-8">
                <h1 className="text-4xl font-bold tracking-tight font-headline">System Alerts</h1>
                <p className="mt-2 text-lg text-muted-foreground">
                    Stay updated with important system checks and weather warnings.
                </p>
            </header>

            <div className="space-y-8">
                {/* Serious Alerts */}
                <Card className="border-destructive/50">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-destructive flex items-center gap-2">
                                <Siren /> Serious Alerts
                            </CardTitle>
                            <Badge variant="destructive">{seriousAlertsCount} Active</Badge>
                        </div>
                        <CardDescription>
                            These issues require your immediate attention to prevent system damage or safety risks.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {alerts.serious.map(alert => (
                           <AlertItem key={alert.id} alert={alert} onResolve={() => handleResolve('serious', alert.id)} />
                        ))}
                    </CardContent>
                </Card>

                {/* Moderate Alerts */}
                <Card>
                    <CardHeader>
                         <div className="flex items-center justify-between">
                            <CardTitle className="text-yellow-600 flex items-center gap-2">
                                <AlertTriangle /> Moderate Alerts
                            </CardTitle>
                            <Badge variant="secondary">{moderateAlertsCount} Active</Badge>
                        </div>
                        <CardDescription>
                           Recommended checks to ensure optimal performance and longevity of your system.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {alerts.moderate.map(alert => (
                           <AlertItem key={alert.id} alert={alert} onResolve={() => handleResolve('moderate', alert.id)} />
                        ))}
                    </CardContent>
                </Card>

                {/* Monthly Checks */}
                 <Card>
                    <CardHeader>
                        <CardTitle className="text-primary flex items-center gap-2">
                           <HardHat /> Routine Monthly Checks
                        </CardTitle>
                        <CardDescription>
                           Regular maintenance tasks to keep your system in top shape. Mark them as you complete them each month.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {alerts.monthly.map(alert => (
                           <AlertItem key={alert.id} alert={alert} onResolve={() => handleResolve('monthly', alert.id)} />
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

interface AlertItemProps {
    alert: {
        id: string;
        icon: React.ReactNode;
        title: string;
        description: string;
        resolved: boolean;
    };
    onResolve: () => void;
}

function AlertItem({ alert, onResolve }: AlertItemProps) {
    return (
        <div className={`p-4 rounded-lg flex items-start gap-4 transition-all ${alert.resolved ? 'bg-muted/50 opacity-60' : 'bg-secondary/30'}`}>
            <div className="flex-shrink-0 mt-1">{alert.icon}</div>
            <div className="flex-1">
                <h4 className="font-semibold">{alert.title}</h4>
                <p className="text-sm text-muted-foreground">{alert.description}</p>
            </div>
            <Button
                variant={alert.resolved ? "outline" : "default"}
                size="sm"
                onClick={onResolve}
                className="self-center"
            >
                {alert.resolved ? 'Mark as Unresolved' : 'Mark as Resolved'}
            </Button>
        </div>
    )
}
