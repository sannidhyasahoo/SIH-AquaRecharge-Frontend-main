
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  ArrowLeft,
  Download,
  AlertTriangle,
  CheckCircle2,
  Sprout,
  Info,
  Link as LinkIcon,
  Loader2,
  Map,
  Eye,
  Droplets,
  Shield,
  XCircle,
} from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { SavingsCharts } from './_components/savings-charts';


function ResultsPageContent() {
  const searchParams = useSearchParams();
  const [potentialScore, setPotentialScore] = useState(0);
  const [summary, setSummary] = useState<React.ReactNode | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Hardcoded groundwater analysis (as requested)
  const location = searchParams.get('location') || 'Unknown Location';
  const groundwaterAnalysis = {
    isContaminated: location.toLowerCase().includes('industrial') ||
      location.toLowerCase().includes('city') ||
      location.toLowerCase().includes('urban'),
    contaminationLevel: location.toLowerCase().includes('industrial') ? 'High' :
      location.toLowerCase().includes('city') ? 'Medium' : 'Low',
    recommendationType: location.toLowerCase().includes('industrial') ||
      location.toLowerCase().includes('city') ? 'storage' : 'recharge',
    contaminants: location.toLowerCase().includes('industrial')
      ? ['Heavy Metals', 'Chemical Pollutants', 'Industrial Waste']
      : location.toLowerCase().includes('city')
        ? ['Nitrates', 'Bacterial Contamination', 'Urban Runoff']
        : ['Minimal Contamination'],
  };

  // Water savings and investment recovery calculations
  const monthlyWaterCost = parseFloat(searchParams.get('monthlyWaterCost') || '500');
  const dailyWaterConsumption = parseFloat(searchParams.get('waterConsumption') || '200');
  const roofArea = parseFloat(searchParams.get('roofArea') || '100');
  const waterSource = searchParams.get('existingWaterSource') || 'Municipal Supply';

  // Calculate rainwater harvesting potential
  const annualRainfall = 1200; // mm (hardcoded average for India)
  const collectionEfficiency = 0.8; // 80% collection efficiency
  const annualHarvestPotential = (roofArea * annualRainfall * collectionEfficiency) / 1000; // cubic meters
  const dailyHarvestPotential = annualHarvestPotential * 1000 / 365; // liters per day

  // Calculate percentage of water needs met
  const waterNeedsMetPercentage = Math.min((dailyHarvestPotential / dailyWaterConsumption) * 100, 100);

  // Calculate annual savings
  const annualWaterCost = monthlyWaterCost * 12;
  const annualSavings = (annualWaterCost * waterNeedsMetPercentage) / 100;

  // Calculate investment recovery (using total cost from financial data)
  const totalInvestment = 38250; // Will be calculated from financialData
  const investmentRecoveryYears = totalInvestment / annualSavings;

  useEffect(() => {
    // Animate the progress bar on component mount
    const timer = setTimeout(() => setPotentialScore(83), 500);
    return () => clearTimeout(timer);
  }, []);

  const financialData = [
    {
      item: 'Excavation (10m x 1m x 1.5m)',
      quantity: '15 cubic meters',
      cost: 'INR 6,250',
      details: 'at ~INR 417/cubic meter',
    },
    {
      item: 'PVC Piping (150mm dia)',
      quantity: '10 meters',
      cost: 'INR 5,000',
      details: 'at INR 500/meter',
    },
    {
      item: 'Filter Media (Gravel, Sand)',
      quantity: '15 cubic meters',
      cost: 'INR 27,000',
      details: 'at INR 1,800/cubic meter',
    },
  ];

  const totalCost = financialData.reduce(
    (acc, item) => acc + parseFloat(item.cost.replace(/[^0-9.-]+/g, '')),
    0
  );

  // Dynamic recommendations based on groundwater analysis
  const recommendedApproach = groundwaterAnalysis.recommendationType === 'storage'
    ? {
      type: 'Water Storage Based Harvesting',
      structure: 'Storage Tank System',
      reason: 'Due to groundwater contamination in your area',
      advantages: [
        'Safe water storage above ground level.',
        'No risk of contaminating existing water sources.',
        'Easy maintenance and water quality control.',
        'Immediate access to harvested rainwater.'
      ],
      considerations: [
        'Requires regular tank cleaning and maintenance.',
        'Limited storage capacity compared to ground recharge.',
        'Higher initial investment for storage infrastructure.',
        'Need for proper filtration system.'
      ]
    }
    : {
      type: 'Groundwater Recharge Based Harvesting',
      structure: 'Recharge Trench',
      reason: 'Clean groundwater conditions detected',
      advantages: [
        'Effective for improving groundwater levels.',
        'Good aquifer storage potential in your area.',
        'Natural filtration through soil layers.',
        'Long-term water security for the community.'
      ],
      considerations: [
        'Suitable for larger catchments.',
        'Requires regular maintenance to prevent waterlogging.',
        'Depends on soil permeability.',
        'Seasonal variations in recharge rates.'
      ]
    };

  const pointsToConsider = recommendedApproach.considerations;
  const advantages = recommendedApproach.advantages;

  const handleGenerateSummary = () => {
    const roofArea = 100; // Hard-coded as requested
    const summaryContent = (
      <div className="space-y-4">
        <div>
          <h4 className="font-bold text-lg mb-2">Personalized Recommendation Summary</h4>
          <p className="text-sm text-muted-foreground">For a roof area of {roofArea} sq. meters.</p>
        </div>
        <hr />
        <div>
          <h4 className="font-semibold">Feasibility Score: {potentialScore}/100</h4>
          <p className="text-xs text-muted-foreground">Your property shows high potential for RWH.</p>
        </div>
        <hr />
        <div>
          <h4 className="font-semibold">Groundwater Analysis</h4>
          <p className="text-xs text-muted-foreground mb-2">
            Contamination Level: {groundwaterAnalysis.contaminationLevel} |
            Approach: {recommendedApproach.type}
          </p>
        </div>
        <hr />
        <div>
          <h4 className="font-semibold">Recommended Structure: {recommendedApproach.structure}</h4>
          <p className="text-xs text-muted-foreground mb-2">{recommendedApproach.reason}</p>
          <div className="mt-2 text-xs">
            <p className="font-semibold">Advantages:</p>
            <ul className="list-disc pl-4 text-muted-foreground">
              {advantages.map((point, i) => <li key={`sum-adv-${i}`}>{point}</li>)}
            </ul>
          </div>
          <div className="mt-2 text-xs">
            <p className="font-semibold">Points to Consider:</p>
            <ul className="list-disc pl-4 text-muted-foreground">
              {pointsToConsider.map((point, i) => <li key={`sum-con-${i}`}>{point}</li>)}
            </ul>
          </div>
        </div>
        <hr />
        <div>
          <h4 className="font-semibold">Financial Analysis</h4>
          <p className="text-xs font-semibold">Total Estimated Cost: INR {totalCost.toLocaleString('en-IN')}</p>
        </div>
        <hr />
        <div>
          <h4 className="font-semibold">Water Savings & ROI</h4>
          <div className="text-xs space-y-1">
            <p>• Water needs met: <span className="font-semibold text-green-600">{waterNeedsMetPercentage.toFixed(1)}%</span></p>
            <p>• Annual savings: <span className="font-semibold text-green-600">₹{annualSavings.toFixed(0)}</span></p>
            <p>• Investment recovery: <span className="font-semibold text-purple-600">{investmentRecoveryYears.toFixed(1)} years</span></p>
          </div>
        </div>
        <hr />
        <p className="font-semibold italic text-primary">
          By implementing this solution, you'll save ₹{annualSavings.toFixed(0)} annually and recover your investment in {investmentRecoveryYears.toFixed(1)} years. Start your journey to water independence today!
        </p>
      </div>
    );
    setSummary(summaryContent);
    setIsDialogOpen(true);
  };

  const handleActualDownload = () => {
    // In a real app, this would trigger a PDF generation service.
    // For now, we'll just log to the console.
    console.log("Downloading PDF with summary:", summary);
    alert("PDF download functionality is not implemented yet.");
  };

  return (
    <div className="container mx-auto max-w-4xl py-8 px-4">
      <div className="space-y-8">
        <header>
          <h1 className="text-4xl font-bold tracking-tight font-headline">
            Your Personalized Recommendation
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Based on your input, here is our AI-powered analysis and
            recommendation.
          </p>
        </header>

        {/* Feasibility Score */}
        <Card>
          <CardHeader>
            <CardTitle>Feasibility & Potential Score</CardTitle>
            <CardDescription>
              This score represents the suitability of your property for
              rainwater harvesting.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <Progress value={potentialScore} className="h-4 flex-1" />
              <span className="text-2xl font-bold text-primary">
                {potentialScore}/100
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Groundwater Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Droplets className="h-5 w-5 text-blue-600" />
              Groundwater Quality Analysis
            </CardTitle>
            <CardDescription>
              Analysis of local groundwater conditions to determine the best harvesting approach.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  {groundwaterAnalysis.isContaminated ? (
                    <XCircle className="h-5 w-5 text-red-500" />
                  ) : (
                    <Shield className="h-5 w-5 text-green-500" />
                  )}
                  <span className="font-semibold">
                    Contamination Level: {groundwaterAnalysis.contaminationLevel}
                  </span>
                </div>
                <div className="text-sm text-muted-foreground">
                  <p className="font-medium mb-2">Detected Contaminants:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    {groundwaterAnalysis.contaminants.map((contaminant, i) => (
                      <li key={i}>{contaminant}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="space-y-3">
                <div className={`p-4 rounded-lg border-2 ${groundwaterAnalysis.recommendationType === 'storage'
                  ? 'border-orange-200 bg-orange-50'
                  : 'border-green-200 bg-green-50'
                  }`}>
                  <h4 className="font-semibold text-lg mb-2">
                    Recommended Approach
                  </h4>
                  <p className="text-sm font-medium text-primary mb-1">
                    {recommendedApproach.type}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {recommendedApproach.reason}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recommended Structure */}
        <Card>
          <CardHeader>
            <CardTitle>Recommended Structure: {recommendedApproach.structure}</CardTitle>
            <CardDescription>
              Based on groundwater analysis: {recommendedApproach.type}
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg flex items-center">
                <CheckCircle2 className="mr-2 h-5 w-5 text-green-500" />
                Advantages
              </h3>
              <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                {advantages.map((point, i) => <li key={i}>{point}</li>)}
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold text-lg flex items-center">
                <AlertTriangle className="mr-2 h-5 w-5 text-destructive" />
                Points to Consider
              </h3>
              <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                {pointsToConsider.map((point, i) => <li key={i}>{point}</li>)}
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Financial Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Financial Analysis</CardTitle>
            <CardDescription>
              Estimated cost for a recharge trench for a 100 sq meter concrete
              catchment area.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Component</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead className="text-right">Cost (INR)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {financialData.map((row) => (
                  <TableRow key={row.item}>
                    <TableCell>
                      <p className="font-medium">{row.item}</p>
                      <p className="text-xs text-muted-foreground">{row.details}</p>
                    </TableCell>
                    <TableCell>{row.quantity}</TableCell>
                    <TableCell className="text-right">{row.cost}</TableCell>
                  </TableRow>
                ))}
                <TableRow className="font-bold">
                  <TableCell colSpan={2}>Total Estimated Cost</TableCell>
                  <TableCell className="text-right text-lg">INR {totalCost.toLocaleString('en-IN')}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <p className="text-xs text-muted-foreground mt-4 italic">
              Disclaimer: All costs are indicative and may vary based on local material availability, labor rates, and site conditions.
            </p>
          </CardContent>
        </Card>

        {/* Water Savings & Investment Recovery */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Droplets className="h-5 w-5 text-blue-600" />
              Water Savings & Investment Recovery
            </CardTitle>
            <CardDescription>
              Analysis of water savings potential and return on investment based on your current usage.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Current Water Profile */}
              <div className="space-y-4">
                <h4 className="font-semibold text-lg">Current Water Profile</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-muted-foreground">Water Source:</span>
                    <span className="font-medium">{waterSource}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-muted-foreground">Monthly Cost:</span>
                    <span className="font-medium">₹{monthlyWaterCost.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-muted-foreground">Daily Usage:</span>
                    <span className="font-medium">{dailyWaterConsumption} L</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-muted-foreground">Annual Cost:</span>
                    <span className="font-medium text-red-600">₹{annualWaterCost.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              {/* Rainwater Harvesting Potential */}
              <div className="space-y-4">
                <h4 className="font-semibold text-lg">Rainwater Harvesting Potential</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="text-sm text-muted-foreground">Annual Harvest:</span>
                    <span className="font-medium">{annualHarvestPotential.toFixed(0)} m³</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="text-sm text-muted-foreground">Daily Potential:</span>
                    <span className="font-medium">{dailyHarvestPotential.toFixed(0)} L</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-200">
                    <span className="text-sm text-muted-foreground">Water Needs Met:</span>
                    <span className="font-bold text-green-700 text-lg">{waterNeedsMetPercentage.toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-200">
                    <span className="text-sm text-muted-foreground">Annual Savings:</span>
                    <span className="font-bold text-green-700">₹{annualSavings.toFixed(0)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Investment Recovery */}
            <div className="border-t pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                  <div className="text-center">
                    <h4 className="font-semibold text-blue-800">Total Investment</h4>
                    <p className="text-2xl font-bold text-blue-900">₹{totalCost.toLocaleString('en-IN')}</p>
                    <p className="text-xs text-blue-600">One-time setup cost</p>
                  </div>
                </Card>

                <Card className="p-4 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                  <div className="text-center">
                    <h4 className="font-semibold text-green-800">Annual Savings</h4>
                    <p className="text-2xl font-bold text-green-900">₹{annualSavings.toFixed(0)}</p>
                    <p className="text-xs text-green-600">Yearly water bill reduction</p>
                  </div>
                </Card>

                <Card className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                  <div className="text-center">
                    <h4 className="font-semibold text-purple-800">Recovery Period</h4>
                    <p className="text-2xl font-bold text-purple-900">{investmentRecoveryYears.toFixed(1)} years</p>
                    <p className="text-xs text-purple-600">Break-even timeline</p>
                  </div>
                </Card>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <p className="font-medium text-amber-800 mb-1">Key Benefits:</p>
                  <ul className="text-amber-700 space-y-1">
                    <li>• Reduce water bills by {waterNeedsMetPercentage.toFixed(1)}% annually</li>
                    <li>• Save ₹{annualSavings.toFixed(0)} per year on water costs</li>
                    <li>• Recover your investment in {investmentRecoveryYears.toFixed(1)} years</li>
                    <li>• Contribute to water conservation and sustainability</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Subsidies and Mandates */}
        <Card>
          <CardHeader>
            <CardTitle>Relevant Subsidies & Mandates</CardTitle>
            <CardDescription>
              Explore government schemes and regulations that may apply to you.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-4 p-4 rounded-lg border bg-secondary/50">
              <Info className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold">Krishi Bhagya Scheme (For Farmers)</h4>
                <p className="text-sm text-muted-foreground mb-2">Provides subsidies for constructing agricultural ponds and other water conservation structures.</p>
                <a href="https://www.yogiyojana.co.in/2024/02/krishi-bhagya-scheme.html?utm_source=chatgpt.com" target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline flex items-center">
                  Learn More <LinkIcon className="ml-1 h-3 w-3" />
                </a>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-lg border bg-secondary/50">
              <Info className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold">Industrial Subsidy</h4>
                <p className="text-sm text-muted-foreground mb-2">Incentives for industries to adopt rainwater harvesting and reduce freshwater consumption.</p>
                <a href="https://yuvakanaja.in/industry-commerce-en/rainwater-harvesting/?utm_source=chatgpt.com" target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline flex items-center">
                  Learn More <LinkIcon className="ml-1 h-3 w-3" />
                </a>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-lg border bg-secondary/50">
              <Info className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold">Government Mandates</h4>
                <p className="text-sm text-muted-foreground mb-2">Many municipalities mandate RWH for new buildings and offer guidance for retrofitting.</p>
                <a href="https://timesofindia.indiatimes.com/city/mangaluru/rainwater-harvesting-must-for-all-govt-wells-says-udupi-dc/articleshow/121698402.cms?utm_source=chatgpt.com" target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline flex items-center">
                  Read News <LinkIcon className="ml-1 h-3 w-3" />
                </a>
              </div>
            </div>
          </CardContent>
        </Card>


        {/* Environmental Impact */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Sprout className="mr-2 h-6 w-6 text-green-600" />
              Environmental Impact
            </CardTitle>
            <CardDescription>
              An AI-generated summary of the positive environmental effects.
            </CardDescription>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none text-muted-foreground">
            <p>
              Implementing a recharge trench is a significant step towards
              environmental stewardship. By capturing and infiltrating rainwater,
              you actively reduce stormwater runoff, which mitigates local
              flooding and decreases the pollution entering nearby rivers and
              lakes.
            </p>
            <p>
              More importantly, you are directly replenishing local groundwater
              aquifers. This helps maintain a stable water table, ensuring
              water availability for your community and local ecosystems during
              dry seasons. It also reduces the energy consumed in pumping and
              treating municipal water, lowering your region's overall carbon
              footprint. Your single action contributes to a more resilient,
              water-secure future for everyone.
            </p>
          </CardContent>
        </Card>

        {/* Projected Savings Charts */}
        <SavingsCharts />

        {/* Interactive Tools */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Map className="mr-2 h-6 w-6 text-blue-600" />
              Interactive Planning Tools
            </CardTitle>
            <CardDescription>
              Use our advanced tools to visualize and plan your rainwater harvesting system.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold flex items-center">
                <Map className="mr-2 h-4 w-4 text-blue-500" />
                Area Calculation Map
              </h4>
              <p className="text-sm text-muted-foreground">
                Measure your roof or land area precisely using our interactive map tool.
                Get accurate calculations for optimal system sizing.
              </p>
              <Link href="/map-tools">
                <Button variant="outline" size="sm" className="w-full">
                  <Map className="mr-2 h-4 w-4" />
                  Open Map Tools
                </Button>
              </Link>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold flex items-center">
                <Eye className="mr-2 h-4 w-4 text-green-500" />
                AR Structure Visualization
              </h4>
              <p className="text-sm text-muted-foreground">
                Experience augmented reality visualization of your recommended
                rainwater harvesting structure before installation.
              </p>
              <Link href="/map-tools">
                <Button variant="outline" size="sm" className="w-full">
                  <Eye className="mr-2 h-4 w-4" />
                  View in AR
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-end pt-4">
          <Link href="/recommend">
            <Button variant="outline" className="w-full sm:w-auto">
              <ArrowLeft className="mr-2 h-4 w-4" /> Go Back & Edit
            </Button>
          </Link>
          <Button onClick={handleGenerateSummary} className="w-full sm:w-auto">
            <Download className="mr-2 h-4 w-4" />
            Download PDF Summary
          </Button>
        </div>
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Your Personalized Summary</DialogTitle>
            <DialogDescription>
              Here is a summary of your rainwater harvesting recommendation. You can download this as a PDF.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 text-sm">
            {summary ? (
              summary
            ) : (
              <div className="flex items-center justify-center">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating your summary...
              </div>
            )}
          </div>
          <DialogFooter className="sm:justify-end">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
            <Button onClick={handleActualDownload} disabled={!summary}>
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default function ResultsPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    }>
      <ResultsPageContent />
    </Suspense>
  )
}
