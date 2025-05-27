import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table.tsx';
import type { Stock } from '@/views/stock-search/StockSearch.tsx';
import { useWatchlistPerformance } from '@/hooks/useWatchlistPerformance.ts';
import { useToggleList } from '@/hooks/useToggleList';
import { clsx } from 'clsx';
import { useNavigate } from '@tanstack/react-router';
import { useMemo, useEffect } from 'react';

export interface WatchlistTableProps {
  watchListData: Stock[];
  editMode?: boolean;
  selected?: string[];
  onSelect?: (symbol: string) => void;
}

export const WatchlistTable = ({
  watchListData = [],
  editMode = false,
  selected = [],
  onSelect,
}: WatchlistTableProps) => {
  const navigate = useNavigate();
  const { data, loading } = useWatchlistPerformance(watchListData);

  const symbols = useMemo(() => watchListData.map((item) => item.symbol) , [watchListData]);

  const { allSelected, listOfSymbolToggles, toggleAll, toggleOne, updateSymbols } =
    useToggleList(symbols);

  useEffect(() => {
    updateSymbols(symbols);
    // eslint-disable-next-line react-hooks/exhaustive-deps 
  }, [symbols]);

  if (loading) return <div>Loading watchlist...</div>;

  return (
    <Table>
      <TableCaption>A list of your recent watchlist.</TableCaption>
      <TableHeader>
        <TableRow className="h-24 xl:h-12">
          <TableHead className={clsx("w-[40px] p-0", !editMode && "hidden")}>
            {editMode && (
                <div className="flex items-center justify-center h-full">
                  <input
                  checked={allSelected}
                      type="checkbox"
                      className="form-checkbox"
                      onChange={() => {toggleAll()}}
                  />
                </div>
            )}
          </TableHead>
          <TableHead className="text-left xl:table-cell">Name</TableHead>
          <TableHead className="text-left hidden xl:table-cell">Type</TableHead>
          <TableHead className="text-left xl:table-cell">Price</TableHead>
          <TableHead className="text-left xl:table-cell">Change(%)</TableHead>
          <TableHead className="text-left hidden xl:table-cell">
            Performance
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {data && data.length > 0 ? (
          data.map((row) => (
            <TableRow
              key={row.symbol}
              className={clsx(
                'h-24 xl:h-12',
                editMode ? 'cursor-default' : 'cursor-pointer',
              )}
              onClick={
                !editMode
                  ? () =>
                      navigate({
                        to: '/details/$symbol',
                        params: { symbol: row.symbol },
                      })
                  : undefined
              }
            >
              {editMode && (
                <TableCell className="w-12">
                  <input
                    type="checkbox"
                    checked={selected?.includes(row.symbol)}
                    onChange={() => onSelect?.(row.symbol)}
                    onClick={(e) => e.stopPropagation()}
                  />
                </TableCell>
              )}
              <TableCell className="text-left xl:table-cell">
                {row.shortname}
              </TableCell>
              <TableCell className="text-left hidden xl:table-cell">
                {row.quoteType?.toLowerCase?.()}
              </TableCell>
              <TableCell className="text-left xl:table-cell">
                ${row.currentPrice?.toFixed(2)}
              </TableCell>
              <TableCell
                className={clsx(
                  'text-left xl:table-cell',
                  row.changeInPercent >= 0 ? 'text-green-600' : 'text-red-600',
                )}
              >
                {row.changeInPercent}%
              </TableCell>
              <TableCell className="text-left hidden xl:table-cell">
                {row.index}
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell
              colSpan={editMode ? 6 : 5}
              className="text-center text-gray-400"
            >
              No stocks in your watchlist.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
