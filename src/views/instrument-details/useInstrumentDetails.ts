import { useQuery } from '@tanstack/react-query';

interface Quote {
  volume: number[];
  low: number[];
  close: number[];
  open: number[];
  high: number[];
}

export interface ChartResult {
  meta: {
    currency: string;
    symbol: string;
    fullExchangeName: string;
    instrumentType: string;
    exchangeTimezoneName: string;
    regularMarketPrice: number;
    fiftyTwoWeekHigh: number;
    fiftyTwoWeekLow: number;
    regularMarketDayHigh: number;
    regularMarketDayLow: number;
    regularMarketVolume: number;
    longName: string;
    chartPreviousClose: number;
  };
  timestamp: number[];
  indicators: {
    quote: Quote[];
  };
}

interface ChartResponse {
  chart: {
    result: ChartResult[];
  };
}

const fetchInstrumentDetails = async (symbol: string): Promise<ChartResult> => {
  const response = await fetch(`https://octopus-app-3grc6.ondigitalocean.app/yahoo/chart/${symbol}`,);
  if (!response.ok) throw new Error(`API error: ${response.status}`);
  const data: ChartResponse = await response.json();
  return data.chart?.result[0];
};

export function useInstrumentDetails(symbol: string) {
  return useQuery<ChartResult>({
    queryKey: ['instrumentDetails', symbol],
    queryFn: () => fetchInstrumentDetails(symbol),
  });
}
