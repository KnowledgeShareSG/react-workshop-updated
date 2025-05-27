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

  const { data, loading } = useWatchlistPerformance(watchListData);

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
  return (
    <Table>
      <TableCaption>A list of your recent watchlist.</TableCaption>
      <TableHeader>
        <TableRow className="h-24 xl:h-12 cursor-pointer">
          <TableHead className={clsx('w-[40px] p-0', !editMode && 'hidden')}>
            {editMode && (
              <div className="flex items-center justify-center h-full">
                <input
                  checked={allSelected}
                  type="checkbox"
                  className="form-checkbox"
                  onChange={() => {
                    toggleAll();
                  }}
                />
              </div>
            )}
          </TableHead>
          <TableHead className="text-left xl:table-cell">Name</TableHead>
          <TableHead className="text-left xl:table-cell">Exchange</TableHead>
          <TableHead className="text-left xl:table-cell">Type</TableHead>
          <TableHead className="text-left xl:table-cell">Price</TableHead>
          <TableHead className="text-left xl:table-cell">Change(%)</TableHead>
          <TableHead className="text-left hidden xl:table-cell">
            Performance
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {data &&
          data.map((data) => (
            <TableRow className="h-24 xl:h-12" key={data.symbol}>
              <TableCell
                className={clsx('w-[40px] p-0', !editMode && 'hidden')}
              >
                {editMode && (
                  <div className="flex items-center justify-center h-full">
                    <input
                      checked={listOfSymbolToggles[data.symbol]}
                      type="checkbox"
                      className="form-checkbox"
                      onChange={() => {
                        toggleOne(
                          data.symbol,
                          !listOfSymbolToggles[data.symbol],
                        );
                      }}
                    />
                  </div>
                )}
              </TableCell>
              <TableCell
                className="text-left xl:table-cell cursor-pointer"
                onClick={() =>
                  navigate({
                    to: '/details/$symbol',
                    params: { symbol: data.symbol },
                  })
                }
              >
                {data.shortname}
              </TableCell>
              <TableCell className="text-left xl:table-cell">
                {data.exchange}
              </TableCell>
              <TableCell className="text-left hidden xl:table-cell">
                {data.quoteType}
              </TableCell>
              <TableCell className="text-left xl:table-cell">
                ${data.currentPrice?.toFixed(2)}
              </TableCell>
              <TableCell
                className={clsx(
                  'text-left xl:table-cell ',
                  data.changeInPercent >= 0 ? 'text-green-600' : 'text-red-600',
                )}
              >
                {`${data.changeInPercent >= 0 ? '+' : ''}${data.changeInPercent}%`}
              </TableCell>
              <TableCell className="text-left hidden xl:table-cell max-w-4">
                <MarketChartSmall
                  symbol={data.symbol}
                  color={
                    data.changeInPercent >= 0
                      ? 'green'
                      : 'red'
                  }
                />
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};
