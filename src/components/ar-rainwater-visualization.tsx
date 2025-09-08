'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    Eye,
    RotateCcw,
    Layers,
    Droplets,
    Home,
    ArrowDown,
    Zap,
    Settings
} from 'lucide-react';

interface ARVisualizationProps {
    recommendedStructure?: string;
    area?: number;
    harvestingType?: 'recharge' | 'storage';
}

export function ARRainwaterVisualization({
    recommendedStructure = "Recharge Trench",
    area = 100,
    harvestingType = 'recharge'
}: ARVisualizationProps) {
    const [activeView, setActiveView] = useState<'overview' | 'cross-section' | 'components'>('overview');
    const [isARActive, setIsARActive] = useState(false);

    const structures = {
        // Groundwater Recharge Structures
        'Recharge Trench': {
            description: 'A linear excavation filled with filter media to enhance groundwater recharge',
            components: ['Inlet Chamber', 'Filter Media (Gravel)', 'Perforated Pipes', 'Overflow System'],
            dimensions: `${Math.sqrt(area * 0.15).toFixed(1)}m × 1.5m × 1.2m`,
            capacity: `${(area * 0.8 * 0.001).toFixed(1)} cubic meters per hour`,
            type: 'recharge'
        },
        'Recharge Well': {
            description: 'A vertical structure that directly channels water to aquifer layers',
            components: ['Collection Chamber', 'Filter Layers', 'Casing Pipe', 'Screen Assembly'],
            dimensions: `Ø${Math.sqrt(area * 0.01).toFixed(1)}m × ${(area * 0.05).toFixed(1)}m depth`,
            capacity: `${(area * 1.2 * 0.001).toFixed(1)} cubic meters per hour`,
            type: 'recharge'
        },
        'Percolation Tank': {
            description: 'A surface storage structure allowing gradual water infiltration',
            components: ['Embankment', 'Spillway', 'Inlet Structure', 'Silt Trap'],
            dimensions: `${Math.sqrt(area * 0.3).toFixed(1)}m × ${Math.sqrt(area * 0.3).toFixed(1)}m × 2.5m`,
            capacity: `${(area * 2.5 * 0.001).toFixed(1)} cubic meters storage`,
            type: 'recharge'
        },
        // Water Storage Structures
        'Storage Tank System': {
            description: 'Above-ground or underground tanks for safe rainwater storage and distribution',
            components: ['Collection Tank', 'First Flush Diverter', 'Filtration System', 'Distribution Pump'],
            dimensions: `${Math.sqrt(area * 0.2).toFixed(1)}m × ${Math.sqrt(area * 0.2).toFixed(1)}m × 3m`,
            capacity: `${(area * 3 * 0.001).toFixed(1)} cubic meters storage`,
            type: 'storage'
        },
        'Modular Storage': {
            description: 'Flexible modular tank system for scalable water storage solutions',
            components: ['Modular Tanks', 'Interconnecting Pipes', 'Control Valves', 'Monitoring System'],
            dimensions: `Multiple ${Math.sqrt(area * 0.1).toFixed(1)}m × ${Math.sqrt(area * 0.1).toFixed(1)}m units`,
            capacity: `${(area * 2 * 0.001).toFixed(1)} cubic meters total storage`,
            type: 'storage'
        },
        'Underground Cistern': {
            description: 'Underground concrete or plastic cistern for protected water storage',
            components: ['Concrete/Plastic Tank', 'Access Cover', 'Pump System', 'Overflow Outlet'],
            dimensions: `${Math.sqrt(area * 0.25).toFixed(1)}m × ${Math.sqrt(area * 0.25).toFixed(1)}m × 2.5m`,
            capacity: `${(area * 2.5 * 0.001).toFixed(1)} cubic meters storage`,
            type: 'storage'
        }
    };

    const currentStructure = structures[recommendedStructure as keyof typeof structures] ||
        (harvestingType === 'storage' ? structures['Storage Tank System'] : structures['Recharge Trench']);

    const toggleAR = () => {
        setIsARActive(!isARActive);
    };

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Eye className="h-5 w-5" />
                    AR {harvestingType === 'storage' ? 'Water Storage' : 'Groundwater Recharge'} Visualization
                </CardTitle>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Badge variant="outline">
                            Structure: {recommendedStructure}
                        </Badge>
                        <Badge variant="secondary">
                            Area: {area} m²
                        </Badge>
                    </div>
                    <Button
                        variant={isARActive ? "default" : "outline"}
                        size="sm"
                        onClick={toggleAR}
                    >
                        <Eye className="h-4 w-4 mr-1" />
                        {isARActive ? "AR Active" : "Start AR View"}
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <Tabs value={activeView} onValueChange={(value) => setActiveView(value as any)}>
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="cross-section">Cross Section</TabsTrigger>
                        <TabsTrigger value="components">Components</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="space-y-4">
                        <div className={`relative h-80 w-full rounded-lg border-2 ${isARActive ? 'border-blue-500 bg-gradient-to-b from-blue-50 to-blue-100' : 'border-gray-200 bg-gray-50'} overflow-hidden`}>
                            {isARActive ? (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="text-center space-y-4">
                                        <div className="relative">
                                            {/* Simulated AR View */}
                                            <div className="w-64 h-48 bg-gradient-to-b from-sky-200 to-green-200 rounded-lg border-2 border-blue-400 relative overflow-hidden">
                                                {/* House representation */}
                                                <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
                                                    <Home className="h-8 w-8 text-gray-700" />
                                                </div>

                                                {/* Water flow animation */}
                                                <div className="absolute top-12 left-1/2 transform -translate-x-1/2 animate-bounce">
                                                    <ArrowDown className="h-4 w-4 text-blue-600" />
                                                </div>

                                                {/* Structure based on type */}
                                                {harvestingType === 'storage' ? (
                                                    <>
                                                        {/* Storage Tank */}
                                                        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 w-20 h-16 bg-gray-600 rounded-lg opacity-80 border-2 border-gray-800">
                                                            <div className="absolute inset-0 flex items-center justify-center">
                                                                <Droplets className="h-6 w-6 text-blue-400" />
                                                            </div>
                                                        </div>
                                                        {/* Tank Base */}
                                                        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-24 h-4 bg-gray-700 rounded opacity-60"></div>
                                                    </>
                                                ) : (
                                                    <>
                                                        {/* Recharge structure */}
                                                        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-blue-600 rounded opacity-80">
                                                            <div className="absolute inset-0 flex items-center justify-center">
                                                                <Droplets className="h-4 w-4 text-white" />
                                                            </div>
                                                        </div>
                                                        {/* Ground layers */}
                                                        <div className="absolute bottom-0 w-full h-8 bg-gradient-to-r from-amber-600 to-amber-700 opacity-60"></div>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                        <Badge variant="default" className="animate-pulse">
                                            AR View Active - {recommendedStructure}
                                        </Badge>
                                    </div>
                                </div>
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="text-center space-y-4">
                                        <Layers className="h-16 w-16 text-gray-400 mx-auto" />
                                        <p className="text-gray-500">Click "Start AR View" to visualize the rainwater harvesting structure</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="space-y-2">
                                <h4 className="font-semibold">Structure Details</h4>
                                <p className="text-muted-foreground">{currentStructure.description}</p>
                            </div>
                            <div className="space-y-2">
                                <h4 className="font-semibold">Specifications</h4>
                                <p className="text-muted-foreground">Dimensions: {currentStructure.dimensions}</p>
                                <p className="text-muted-foreground">Capacity: {currentStructure.capacity}</p>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="cross-section" className="space-y-4">
                        <div className="h-80 w-full rounded-lg border bg-gradient-to-b from-sky-100 to-amber-100 relative overflow-hidden">
                            {/* Cross-section visualization */}
                            <div className="absolute inset-0 p-4">
                                {/* Surface */}
                                <div className="absolute top-0 w-full h-16 bg-green-200 border-b-2 border-green-400">
                                    <div className="absolute top-2 left-4 text-xs font-medium">Surface Level</div>
                                </div>

                                {/* Structure */}
                                <div className="absolute top-16 left-1/4 w-1/2 h-24 bg-blue-300 border-2 border-blue-500 rounded">
                                    <div className="absolute inset-0 flex items-center justify-center text-xs font-medium">
                                        {recommendedStructure}
                                    </div>
                                    {/* Filter media representation */}
                                    <div className="absolute bottom-0 w-full h-8 bg-gray-400 opacity-60 rounded-b"></div>
                                </div>

                                {/* Soil layers */}
                                <div className="absolute top-40 w-full h-16 bg-amber-300 border-y border-amber-500">
                                    <div className="absolute top-2 left-4 text-xs font-medium">Soil Layer</div>
                                </div>

                                {/* Aquifer */}
                                <div className="absolute bottom-0 w-full h-24 bg-blue-200 border-t-2 border-blue-400">
                                    <div className="absolute top-2 left-4 text-xs font-medium">Aquifer Layer</div>
                                    <div className="absolute bottom-2 right-4 text-xs text-blue-700">Groundwater Recharge Zone</div>
                                </div>

                                {/* Water flow arrows */}
                                <div className="absolute top-20 left-1/2 transform -translate-x-1/2">
                                    <ArrowDown className="h-4 w-4 text-blue-600 animate-bounce" />
                                </div>
                                <div className="absolute top-32 left-1/2 transform -translate-x-1/2">
                                    <ArrowDown className="h-4 w-4 text-blue-600 animate-bounce" style={{ animationDelay: '0.2s' }} />
                                </div>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="components" className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            {currentStructure.components.map((component, index) => (
                                <Card key={index} className="p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Settings className="h-4 w-4 text-blue-600" />
                                        <h4 className="font-medium text-sm">{component}</h4>
                                    </div>
                                    <div className="h-16 bg-gradient-to-r from-blue-100 to-blue-200 rounded border flex items-center justify-center">
                                        <Zap className="h-6 w-6 text-blue-600" />
                                    </div>
                                </Card>
                            ))}
                        </div>

                        <div className="text-xs text-muted-foreground space-y-1">
                            <p>• Each component plays a crucial role in the rainwater harvesting system</p>
                            <p>• Proper installation and maintenance ensure optimal performance</p>
                            <p>• Components are sized based on your calculated area and local conditions</p>
                        </div>
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
}