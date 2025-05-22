import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Stock } from '../types/stock';

interface StockCardProps {
  stock: Stock;
}

export const StockCard: React.FC<StockCardProps> = ({ stock }) => {
  
  // TODO: Create helper function to format volume numbers
  const formatVolume = (volume: number): string => {
    // Convert large numbers to readable format
    // Examples: 52847392 → "52.8M", 1500000 → "1.5M", 750000 → "750K"
    // YOUR CODE HERE
    return volume.toString(); // Replace this line
  };

  // TODO: Create helper function to format price
  const formatPrice = (price: number): string => {
    // Format price with dollar sign and 2 decimal places
    // Example: 175.84 → "$175.84"
    // YOUR CODE HERE
    return price.toString(); // Replace this line
  };

  // TODO: Determine if the stock change is positive or negative
  const isPositive = false; // Replace with actual logic

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          {/* TODO: Display company name */}
          <div className="flex flex-col">
            <span className="text-lg font-semibold">
              {/* Display stock.name here */}
            </span>
            <span className="text-sm text-muted-foreground">
              {/* Display stock.symbol here */}
            </span>
          </div>
          
          {/* TODO: Display trend emoji based on stock.trend */}
          <div className="text-2xl">
            {/* Show 📈 for 'up', 📉 for 'down', ➡️ for 'flat' */}
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* TODO: Display formatted price */}
        <div className="text-3xl font-bold">
          {/* Use formatPrice function here */}
        </div>

        {/* TODO: Display percentage change with appropriate badge color */}
        <Badge variant={/* Use "default" for positive, "destructive" for negative */}>
          {/* Show percentage with + or - sign, e.g., "+1.39%" or "-1.28%" */}
        </Badge>

        {/* TODO: Display volume information */}
        <div className="flex justify-between items-center text-sm">
          <span className="text-muted-foreground">Volume</span>
          <span className="font-medium">
            {/* Use formatVolume function here */}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};