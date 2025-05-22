import type { Stock } from '../types/stock';

export const mockStocks: Stock[] = [
  {
    name: "Apple Inc.",
    symbol: "AAPL",
    price: 175.84,
    changePercent: 1.39,
    volume: 52847392,
    trend: "up"
  },
  {
    name: "Tesla, Inc.",
    symbol: "TSLA",
    price: 248.50,
    changePercent: -1.28,
    volume: 41523678,
    trend: "down"
  },
  {
    name: "Microsoft Corporation",
    symbol: "MSFT",
    price: 378.85,
    changePercent: 1.52,
    volume: 23456789,
    trend: "up"
  },
  {
    name: "Amazon.com, Inc.",
    symbol: "AMZN",
    price: 142.30,
    changePercent: -0.85,
    volume: 35678912,
    trend: "down"
  },
  {
    name: "Alphabet Inc.",
    symbol: "GOOGL",
    price: 138.21,
    changePercent: 0.69,
    volume: 28456123,
    trend: "up"
  },
  {
    name: "Meta Platforms, Inc.",
    symbol: "META",
    price: 352.96,
    changePercent: -1.15,
    volume: 19847562,
    trend: "down"
  }
];