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
import { clsx } from 'clsx';
import { useNavigate } from 'react-router-dom';

export interface WatchlistTableProps {
  watchListData: Stock[];
}
export const WatchlistTable = ({ watchListData }: WatchlistTableProps) => {
  const navigate = useNavigate();
  const { data, loading } = useWatchlistPerformance(watchListData);
  if (loading) return <div>Loading watchlist...</div>;
  return (
    <Table>
      <TableCaption>A list of your recent watchlist.</TableCaption>
      <TableHeader>
        <TableRow className="h-24 xl:h-12">
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
        {data &&
          data.map((data) => (
            <TableRow
              className="h-24 xl:h-12"
              onClick={() => navigate(`/details/${data.symbol}`)}
            >
              <TableCell className="text-left xl:table-cell">
                {data.shortname}
              </TableCell>
              <TableCell className="text-left hidden xl:table-cell">
                {data.quoteType.toLowerCase()}
              </TableCell>
              <TableCell className="text-left xl:table-cell">
                ${data.currentPrice?.toFixed(2)}
              </TableCell>
              <TableCell
                className={clsx(
                  'text-left xl:table-cell',
                  data.changeInPercent >= 0 ? 'text-green-600' : 'text-red-600',
                )}
              >
                {data.changeInPercent}%
              </TableCell>
              <TableCell className="text-left hidden xl:table-cell">
                {data.index}
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};
