
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const waterData = [
  { month: 'Jan', waterSaved: 400 },
  { month: 'Feb', waterSaved: 800 },
  { month: 'Mar', waterSaved: 1400 },
  { month: 'Apr', waterSaved: 2000 },
  { month: 'May', waterSaved: 2600 },
  { month: 'Jun', waterSaved: 3300 },
  { month: 'Jul', waterSaved: 3900 },
  { month: 'Aug', waterSaved: 4500 },
  { month: 'Sep', waterSaved: 5200 },
  { month: 'Oct', waterSaved: 6000 },
  { month: 'Nov', waterSaved: 6800 },
  { month: 'Dec', waterSaved: 7800 },
];

const moneyData = [
  { month: 'Jan', moneySaved: 20 },
  { month: 'Feb', moneySaved: 40 },
  { month: 'Mar', moneySaved: 70 },
  { month: 'Apr', moneySaved: 100 },
  { month: 'May', moneySaved: 130 },
  { month: 'Jun', moneySaved: 165 },
  { month: 'Jul', moneySaved: 195 },
  { month: 'Aug', moneySaved: 225 },
  { month: 'Sep', moneySaved: 260 },
  { month: 'Oct', moneySaved: 300 },
  { month: 'Nov', moneySaved: 340 },
  { month: 'Dec', moneySaved: 390 },
];

const chartConfig = {
  waterSaved: {
    label: "Water Saved (L)",
    color: "hsl(var(--primary))",
  },
  moneySaved: {
    label: "Money Saved (INR)",
    color: "hsl(var(--chart-2))",
  },
};


export function SavingsCharts() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Projected Savings Over Time</CardTitle>
        <CardDescription>
          Estimated water and financial savings over a 12-month period.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div>
              <h3 className="text-center font-semibold mb-4">Water Saved Over Time</h3>
               <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                <LineChart data={waterData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={(value) => `${value / 1000}k`} />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="line" />}
                  />
                  <Line type="monotone" dataKey="waterSaved" stroke="var(--color-waterSaved)" strokeWidth={2} dot={true} />
                </LineChart>
              </ChartContainer>
            </div>
             <div>
              <h3 className="text-center font-semibold mb-4">Money Saved Over Time</h3>
              <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                <LineChart data={moneyData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                   <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="line" />}
                  />
                  <Line type="monotone" dataKey="moneySaved" stroke="var(--color-moneySaved)" strokeWidth={2} dot={true}/>
                </LineChart>
              </ChartContainer>
            </div>
        </div>
      </CardContent>
    </Card>
  )
}
