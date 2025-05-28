import type { Stock } from '@/views/stock-search/StockSearch.tsx';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

export interface WatchListStock extends Stock {
  closedPrice: number[];
  changeInPercent: number;
  currentPrice: number | null;
  timestampList: number[];
}

async function loadStocks(
  stocks: Array<Stock>,
): Promise<Array<WatchListStock>> {
  return await Promise.all(
    stocks.map(async (stock) => {
      const response = await fetch(
        `https://octopus-app-3grc6.ondigitalocean.app/yahoo/chart/${stock.symbol}`,
      );
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      const data = await response.json();
      const chart = data.chart?.result?.[0];
      const closes =
        chart?.indicators?.quote?.[0]?.close?.filter(
          (v: number) => v != null,
        ) ?? [];
      const currentPrice = closes.at(-1) ?? null;
      const timestamps = chart?.timestamp ?? [];

      const changePercent =
        closes.length >= 2
          ? parseFloat(
              (((closes.at(-1)! - closes[0]) / closes[0]) * 100).toFixed(2),
            )
          : 0;

      return {
        ...stock,
        closedPrice: closes,
        changeInPercent: changePercent,
        currentPrice: currentPrice,
        timestampList: timestamps,
      };
    }),
  );
}

export const useWatchlistPerformance = (stocks: Stock[]) => {
  // we need to preserve the order of the stocks for react-query key purposes
  const stockSymbols = useMemo<string[]>(
    () => [...stocks.map((stock) => stock.symbol)],
    [stocks],
  );

  const { data, isLoading: loading } = useQuery({
    queryFn: () => loadStocks(stocks),
    queryKey: ['listPerformance', ...stockSymbols],
  });

  return { data: data ?? [], loading };
};
