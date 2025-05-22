export interface Stock {
    name: string;           // Company name like "Apple Inc."
    symbol: string;         // Stock symbol like "AAPL"
    price: number;          // Current price
    changePercent: number;  // Percentage change (positive or negative)
    volume: number;         // Trading volume
    trend: 'up' | 'down' | 'flat'; // Trend direction for graph display
}  