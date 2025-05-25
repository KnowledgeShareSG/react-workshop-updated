import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow} from "@/components/ui/table.tsx";
import type {Stock} from "@/views/stock-search/StockSearch.tsx";

export interface WatchlistTableProps {
    watchListData: Stock[]
}
export const WatchlistTable = ({watchListData}: WatchlistTableProps) => {
    return <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
            <TableRow className="h-24 xl:h-12">
                <TableHead className="text-left xl:table-cell">Name</TableHead>
                <TableHead className="text-left hidden xl:table-cell">Type</TableHead>
                <TableHead className="text-left xl:table-cell">Price</TableHead>
                <TableHead className="text-left xl:table-cell">Change(%)</TableHead>
                <TableHead className="text-left hidden xl:table-cell">Performance</TableHead>
            </TableRow>
        </TableHeader>

        <TableBody>
            {watchListData && watchListData.map((stock) => (
                <TableRow className="h-24 xl:h-12">
                    <TableCell className="text-left xl:table-cell">{stock.shortname}</TableCell>
                    <TableCell className="text-left hidden xl:table-cell">{stock.quoteType}</TableCell>
                    <TableCell className="text-left xl:table-cell">{stock.score}</TableCell>
                    <TableCell className="text-left xl:table-cell">{stock.score}</TableCell>
                    <TableCell className="text-left hidden xl:table-cell">{stock.index}</TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>;
}