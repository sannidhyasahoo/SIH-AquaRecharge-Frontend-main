
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, MapPin, Map } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const recommendationSchema = z.object({
  name: z.string().min(1, 'Name is required.'),
  location: z.string().min(1, 'Location is required.'),
  propertyType: z.enum([
    'Residential',
    'Agricultural',
    'Institutional',
    'Commercial',
  ]),
  roofMaterial: z.enum([
    'Concrete/Asphalt',
    'Tiled',
    'Metal Sheets',
    'Lawns(Sandy)',
    'Lawns(Heavy clay soil)',
    'Bare Earth',
  ]),
  roofArea: z.coerce.number().min(1, 'Roof area must be greater than 0.'),
  numberOfDwellers: z.coerce
    .number()
    .int()
    .min(1, 'Number of dwellers must be at least 1.'),
  pavedLand: z.enum(['Paved', 'Unpaved']),
  existingWaterSource: z.enum([
    'Municipal Supply',
    'Private Borewell',
    'Community Well',
    'Water Tankers',
  ]),
  monthlyWaterCost: z.coerce.number().min(0, 'Monthly water cost must be 0 or greater.'),
  waterConsumption: z.coerce.number().min(1, 'Daily water consumption must be greater than 0.'),
  economicData: z.string().optional(),
});

type RecommendationFormValues = z.infer<typeof recommendationSchema>;

export function RecommendationForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<RecommendationFormValues>({
    resolver: zodResolver(recommendationSchema),
    defaultValues: {
      name: '',
      location: '',
      roofArea: 100,
      numberOfDwellers: 4,
      monthlyWaterCost: 500,
      waterConsumption: 200,
      economicData: '',
    },
  });

  async function onSubmit(data: RecommendationFormValues) {
    setIsLoading(true);
    // In a real app, you might send this data to a server.
    // For now, we'll just simulate a delay and redirect with query params.
    const query = new URLSearchParams(data as any).toString();
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    router.push(`/recommend/results?${query}`);
  }

  return (
    <div className="space-y-8">
      <Card className="border-none shadow-none md:border md:shadow-sm">
        <CardHeader>
          <CardTitle className="font-headline text-3xl">
            Find Your Solution
          </CardTitle>
          <CardDescription>
            Fill out the form below to get a personalized rainwater harvesting
            recommendation.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <Input
                      placeholder="Enter your name"
                      {...field}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Location */}
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Enter your address"
                        className="pl-10"
                        {...field}
                      />
                    </div>
                    <FormDescription>
                      GPS detection coming soon. Try locations like "Industrial Area, Mumbai" or "Rural Village, Kerala" to see different recommendations.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                {/* Property Type */}
                <FormField
                  control={form.control}
                  name="propertyType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Property Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select property type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Residential">Residential</SelectItem>
                          <SelectItem value="Agricultural">Agricultural</SelectItem>
                          <SelectItem value="Institutional">Institutional</SelectItem>
                          <SelectItem value="Commercial">Commercial</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Roof Material */}
                <FormField
                  control={form.control}
                  name="roofMaterial"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Roof Material</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select roof material" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Concrete/Asphalt">Concrete/Asphalt</SelectItem>
                          <SelectItem value="Tiled">Tiled</SelectItem>
                          <SelectItem value="Metal Sheets">Metal Sheets</SelectItem>
                          <SelectItem value="Lawns(Sandy)">Lawns (Sandy)</SelectItem>
                          <SelectItem value="Lawns(Heavy clay soil)">Lawns (Heavy clay soil)</SelectItem>
                          <SelectItem value="Bare Earth">Bare Earth</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                {/* Roof Area */}
                <FormField
                  control={form.control}
                  name="roofArea"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Roof Area (in square meters)</FormLabel>
                      <Input type="number" placeholder="e.g., 150" {...field} />
                      <FormDescription className="flex items-center gap-2">
                        Need help measuring?
                        <Link href="/map-tools" className="text-primary hover:underline flex items-center gap-1">
                          <Map className="h-3 w-3" />
                          Use our map tool
                        </Link>
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Number of Dwellers */}
                <FormField
                  control={form.control}
                  name="numberOfDwellers"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Number of People in Household</FormLabel>
                      <Input type="number" placeholder="e.g., 4" {...field} />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                {/* Paved/Unpaved Land */}
                <FormField
                  control={form.control}
                  name="pavedLand"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Surrounding Land</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="Paved" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Mostly Paved (e.g., concrete, asphalt)
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="Unpaved" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Mostly Unpaved (e.g., garden, soil)
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Existing Water Source */}
                <FormField
                  control={form.control}
                  name="existingWaterSource"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Primary Existing Water Source</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select water source" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Municipal Supply">Municipal Supply</SelectItem>
                          <SelectItem value="Private Borewell">Private Borewell</SelectItem>
                          <SelectItem value="Community Well">Community Well</SelectItem>
                          <SelectItem value="Water Tankers">Water Tankers</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Water Cost and Consumption */}
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                {/* Monthly Water Cost */}
                <FormField
                  control={form.control}
                  name="monthlyWaterCost"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Monthly Water Bill (INR)</FormLabel>
                      <Input
                        type="number"
                        placeholder="e.g., 500"
                        {...field}
                      />
                      <FormDescription>
                        Your current monthly water expenses
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Daily Water Consumption */}
                <FormField
                  control={form.control}
                  name="waterConsumption"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Daily Water Usage (Liters)</FormLabel>
                      <Input
                        type="number"
                        placeholder="e.g., 200"
                        {...field}
                      />
                      <FormDescription>
                        Approximate daily household water consumption
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Economic Data */}
              <FormField
                control={form.control}
                name="economicData"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Economic Considerations (Optional)</FormLabel>
                    <Textarea
                      placeholder="e.g., 'Looking for a budget-friendly solution', 'Willing to invest for long-term benefits'"
                      {...field}
                    />
                    <FormDescription>
                      Any cost restrictions or financial goals?
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {isLoading ? 'Analyzing...' : 'Get My Recommendation'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
