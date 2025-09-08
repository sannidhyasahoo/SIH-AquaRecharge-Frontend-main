'use client';

import { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calculator, RotateCcw, MapPin, Map } from 'lucide-react';

// Simple coordinate type
interface Coordinate {
  lat: number;
  lng: number;
}

interface AreaCalculationMapProps {
  onAreaCalculated?: (area: number) => void;
}

export function AreaCalculationMap({ onAreaCalculated }: AreaCalculationMapProps) {
  const [points, setPoints] = useState<Coordinate[]>([]);
  const [area, setArea] = useState<number>(0);
  const [isCalculating, setIsCalculating] = useState(false);

  // Calculate area using the shoelace formula (approximate for small areas)
  const calculateArea = (coordinates: Coordinate[]): number => {
    if (coordinates.length < 3) return 0;

    // Convert to meters approximately (this is a simplified calculation)
    const earthRadius = 6371000; // Earth's radius in meters
    let area = 0;

    for (let i = 0; i < coordinates.length; i++) {
      const j = (i + 1) % coordinates.length;
      const lat1 = coordinates[i].lat * Math.PI / 180;
      const lat2 = coordinates[j].lat * Math.PI / 180;
      const lng1 = coordinates[i].lng * Math.PI / 180;
      const lng2 = coordinates[j].lng * Math.PI / 180;

      area += (lng2 - lng1) * (2 + Math.sin(lat1) + Math.sin(lat2));
    }

    area = Math.abs(area * earthRadius * earthRadius / 2);
    return area;
  };

  const handleMapClick = useCallback((coordinate: Coordinate) => {
    const newPoints = [...points, coordinate];
    setPoints(newPoints);

    if (newPoints.length >= 3) {
      setIsCalculating(true);
      setTimeout(() => {
        const calculatedArea = calculateArea(newPoints);
        setArea(calculatedArea);
        onAreaCalculated?.(calculatedArea);
        setIsCalculating(false);
      }, 500);
    }
  }, [points, onAreaCalculated]);

  const resetPoints = useCallback(() => {
    setPoints([]);
    setArea(0);
    onAreaCalculated?.(0);
  }, [onAreaCalculated]);

  // Simulate map interaction with a grid-based approach
  const handleGridClick = (row: number, col: number) => {
    // Convert grid position to approximate coordinates (India region)
    const lat = 20.5937 + (row - 5) * 0.5; // Rough latitude range
    const lng = 78.9629 + (col - 5) * 0.5; // Rough longitude range

    const coordinate = { lat, lng };
    handleMapClick(coordinate);
  };

  const formatArea = (areaInSqMeters: number): string => {
    if (areaInSqMeters < 10000) {
      return `${areaInSqMeters.toFixed(2)} m²`;
    } else {
      return `${(areaInSqMeters / 10000).toFixed(2)} hectares`;
    }
  };

  // Create a simple grid to simulate map interaction
  const renderMapGrid = () => {
    const grid = [];
    for (let row = 0; row < 10; row++) {
      const rowCells = [];
      for (let col = 0; col < 10; col++) {
        const isPoint = points.some(point => {
          const pointRow = Math.round((point.lat - 20.5937) / 0.5 + 5);
          const pointCol = Math.round((point.lng - 78.9629) / 0.5 + 5);
          return pointRow === row && pointCol === col;
        });

        rowCells.push(
          <div
            key={`${row}-${col}`}
            className={`w-8 h-8 border border-gray-300 cursor-pointer transition-colors ${isPoint
                ? 'bg-blue-500 border-blue-600'
                : 'bg-green-100 hover:bg-green-200'
              }`}
            onClick={() => handleGridClick(row, col)}
          />
        );
      }
      grid.push(
        <div key={row} className="flex">
          {rowCells}
        </div>
      );
    }
    return grid;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          Area Calculation Tool
        </CardTitle>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          Click on the map grid to mark points and calculate area
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge variant="outline">
              Points: {points.length}
            </Badge>
            {area > 0 && (
              <Badge variant="default">
                Area: {formatArea(area)}
              </Badge>
            )}
            {isCalculating && (
              <Badge variant="secondary">
                Calculating...
              </Badge>
            )}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={resetPoints}
            disabled={points.length === 0}
          >
            <RotateCcw className="h-4 w-4 mr-1" />
            Reset
          </Button>
        </div>

        <div className="h-96 w-full rounded-lg overflow-hidden border bg-gradient-to-br from-green-50 to-blue-50 p-4">
          <div className="flex flex-col items-center justify-center h-full space-y-4">
            <div className="text-center space-y-2">
              <Map className="h-8 w-8 text-blue-600 mx-auto" />
              <h3 className="font-semibold text-lg">Interactive Area Calculator</h3>
              <p className="text-sm text-muted-foreground">Click on the grid below to mark measurement points</p>
            </div>

            {/* Simulated Map Grid */}
            <div className="border-2 border-gray-400 rounded-lg p-2 bg-white shadow-lg">
              <div className="space-y-0">
                {renderMapGrid()}
              </div>
            </div>

            {points.length > 0 && (
              <div className="text-center space-y-1">
                <p className="text-sm font-medium">
                  {points.length < 3
                    ? `Add ${3 - points.length} more point${3 - points.length > 1 ? 's' : ''} to calculate area`
                    : `Area calculated: ${formatArea(area)}`
                  }
                </p>
                {points.length >= 3 && (
                  <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
                    <span>Lat: {points[0].lat.toFixed(4)}</span>
                    <span>Lng: {points[0].lng.toFixed(4)}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="text-xs text-muted-foreground space-y-1">
          <p>• Click on the grid squares to add measurement points</p>
          <p>• Minimum 3 points required for area calculation</p>
          <p>• Area calculation is approximate and suitable for planning purposes</p>
          <p>• Each grid square represents approximately 0.5° latitude/longitude</p>
        </div>
      </CardContent>
    </Card>
  );
}