import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table.tsx';
import { MarketChartSmall } from '@/components/chart/chart';
import type { Stock } from '@/views/stock-search/StockSearch.tsx';
import { useWatchlistPerformance } from '@/hooks/useWatchlistPerformance.ts';
import { useToggleList } from '@/hooks/useToggleList';
import { clsx } from 'clsx';
import { useNavigate } from '@tanstack/react-router';
import { useMemo, useEffect } from 'react';

export interface WatchlistTableProps {
  watchListData: Stock[];
  setSelectedSymbols: (stocks: Array<string>) => void;
  editMode: boolean;
}

export const WatchlistTable = (props: WatchlistTableProps) => {
  const navigate = useNavigate();
  const { watchListData, editMode, setSelectedSymbols } = props;

  // CODEALONG 03.01: populate the search results
  // const { data, loading } = useWatchlistPerformance(watchListData);
  const data: Array<WatchListStock> = [] , loading = false;

  const symbols = useMemo(() => watchListData.map((item) => item.symbol) , [watchListData]);

  const { allSelected, listOfSymbolToggles, toggleAll, toggleOne, updateSymbols } =
    useToggleList(symbols);

  useEffect(() => {
    updateSymbols(symbols);
    // eslint-disable-next-line react-hooks/exhaustive-deps 
  }, [symbols]);

  useEffect(() => {
    const symbolsToDelete = Object.entries(listOfSymbolToggles)
      .filter(([, checked]) => checked)
      .map(([symbol]) => symbol);

    setSelectedSymbols(symbolsToDelete)
  }, [listOfSymbolToggles, setSelectedSymbols]);

  if (loading) return <div>Loading watchlist...</div>;
  // CODEALONG 03.02: populate the table
  return (
    <div>{watchListData
      .map((stock,index) => (
        <a
          key={stock.symbol}
          href="javascript:void(0)"
          onClick={() =>
            navigate({
              to: '/details/$symbol',
              params: { symbol: stock.symbol },
            })
         }>{index > 0 ? ' , ':''}{stock.symbol}</a>
      ))}
    </div>
  );
};
