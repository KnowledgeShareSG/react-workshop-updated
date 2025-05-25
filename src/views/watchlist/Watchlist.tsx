import {Button} from "@/components/ui/button.tsx";
import {SquarePen} from "lucide-react";
import {StockSearch, type Stock} from "@/views/stock-search/StockSearch.tsx";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {useState} from "react";


export const Watchlist = ({ setPage }) => {
    const [watchlist, setWatchlist] = useState<Stock[]>([]);
    console.log(watchlist);
    const handleStockAdd = (stock: Stock) => {
        setWatchlist((prev) => {
            const alreadyExists = prev.some((s) => s.symbol === stock.symbol);
            if (alreadyExists) return prev;
            return [...prev, stock];
        });
    };

    // const sidebarItems = [ // Removed sidebarItems
    //   {
    //     title: "Watchlist",
    //     url: "/watchlist",
    //     icon: Bookmark,
    //     isActive: true,
    //     onClick: () => setPage("watchlist"),
    //     items: [
    //       { title: "My Stocks", url: "/watchlist/stocks" },
    //     ],
    //   },
    //   {
    //     title: "Trending Stocks",
    //     url: "/trending",
    //     icon: TrendingUp,
    //     isActive: false,
    //     onClick: () => setPage("trending"),
    //     items: [{ title: "Trending", url: "/trending" }],
    //   },
    // ];

    return (
        <div>
            {/* Only Watchlist content here, no sidebar */}
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Watchlist</h1>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
                <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto justify-center sm:justify-end">
                    <div className="w-full sm:w-[280px]">
                        <StockSearch onSelect={handleStockAdd} />
                    </div>
                    <Button
                        icon={<SquarePen className="size-4" />}
                        className="sm:w-auto whitespace-nowrap"
                    >
                        Edit
                    </Button>
                </div>
            </div>
            <div className="bg-white px-0 py-6 overflow-x-auto flex-1">
                <Table>
                    <TableCaption>A list of your recent invoices.</TableCaption>
                    <TableHeader>
                        <TableRow className="h-24 xl:h-12">
                            <TableHead className="text-left xl:table-cell">Invoice</TableHead>
                            <TableHead className="text-left hidden xl:table-cell">Status</TableHead>
                            <TableHead className="text-left xl:table-cell">Method</TableHead>
                            <TableHead className="text-left xl:table-cell">Date</TableHead>
                            <TableHead className="text-left hidden xl:table-cell">Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow className="h-24 xl:h-12">
                            <TableCell className="text-left xl:table-cell">INV001</TableCell>
                            <TableCell className="text-left hidden xl:table-cell">Paid</TableCell>
                            <TableCell className="text-left xl:table-cell">Credit Card</TableCell>
                            <TableCell className="text-left xl:table-cell">May 21, 2025</TableCell>
                            <TableCell className="text-left hidden xl:table-cell">$250.00</TableCell>
                        </TableRow>
                        <TableRow className="h-24 xl:h-12">
                            <TableCell className="text-left xl:table-cell">INV001</TableCell>
                            <TableCell className="text-left hidden xl:table-cell">Paid</TableCell>
                            <TableCell className="text-left xl:table-cell">Credit Card</TableCell>
                            <TableCell className="text-left xl:table-cell">May 21, 2025</TableCell>
                            <TableCell className="text-left hidden xl:table-cell">$250.00</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}