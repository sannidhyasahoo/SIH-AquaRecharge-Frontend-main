'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Map, Eye } from 'lucide-react';
import Link from 'next/link';

// Dynamically import map components to avoid SSR issues
const AreaCalculationMap = dynamic(
  () => import('@/components/area-calculation-map').then(mod => ({ default: mod.AreaCalculationMap })),
  {
    ssr: false,
    loading: () => (
      <Card className="w-full">
        <CardContent className="h-96 flex items-center justify-center">
          <div className="text-center space-y-2">
            <Map className="h-8 w-8 text-muted-foreground mx-auto" />
            <p className="text-muted-foreground">Loading map...</p>
          </div>
        </CardContent>
      </Card>
    )
  }
);

const ARRainwaterVisualization = dynamic(
  () => import('@/components/ar-rainwater-visualization').then(mod => ({ default: mod.ARRainwaterVisualization })),
  {
    ssr: false,
    loading: () => (
      <Card className="w-full">
        <CardContent className="h-96 flex items-center justify-center">
          <div className="text-center space-y-2">
            <Eye className="h-8 w-8 text-muted-foreground mx-auto" />
            <p className="text-muted-foreground">Loading AR visualization...</p>
          </div>
        </CardContent>
      </Card>
    )
  }
);

export default function MapToolsPage() {
  const [calculatedArea, setCalculatedArea] = useState<number>(0);
  const [recommendedStructure, setRecommendedStructure] = useState<string>('Recharge Trench');

  const handleAreaCalculated = (area: number) => {
    setCalculatedArea(area);

    // Simple logic to recommend structure based on area
    if (area < 50) {
      setRecommendedStructure('Recharge Well');
    } else if (area < 200) {
      setRecommendedStructure('Recharge Trench');
    } else {
      setRecommendedStructure('Percolation Tank');
    }
  };

  return (
    <div className="container mx-auto max-w-6xl py-8 px-4">
      <div className="space-y-8">
        <header className="space-y-4">
          <div className="flex items-center gap-4">
            <Link href="/recommend">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back
              </Button>
            </Link>
            <div>
              <h1 className="text-4xl font-bold tracking-tight font-headline">
                Interactive Map Tools
              </h1>
              <p className="mt-2 text-lg text-muted-foreground">
                Calculate area and visualize rainwater harvesting structures
              </p>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Area Calculation Map */}
          <div className="space-y-4">
            <AreaCalculationMap onAreaCalculated={handleAreaCalculated} />

            {calculatedArea > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Area Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Calculated Area:</span>
                    <span className="font-medium">
                      {calculatedArea < 10000
                        ? `${calculatedArea.toFixed(2)} m²`
                        : `${(calculatedArea / 10000).toFixed(2)} hectares`
                      }
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Recommended Structure:</span>
                    <span className="font-medium">{recommendedStructure}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Estimated Capacity:</span>
                    <span className="font-medium">
                      {(calculatedArea * 0.8 * 0.001).toFixed(1)} m³/hour
                    </span>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* AR Visualization */}
          <div className="space-y-4">
            <ARRainwaterVisualization
              recommendedStructure={recommendedStructure}
              area={calculatedArea || 100}
              harvestingType="recharge"
            />
          </div>
        </div>

        {/* Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Map className="h-5 w-5 text-blue-600" />
                Area Calculation
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              <p>Click points on the map to measure your roof or land area. The tool calculates the area automatically and suggests the best rainwater harvesting structure.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Eye className="h-5 w-5 text-green-600" />
                AR Visualization
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              <p>Experience augmented reality visualization of rainwater harvesting structures. See how they would look and function on your property.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <ArrowLeft className="h-5 w-5 text-purple-600" />
                Integration
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              <p>Use these tools alongside our recommendation system for a complete rainwater harvesting solution tailored to your specific needs.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}