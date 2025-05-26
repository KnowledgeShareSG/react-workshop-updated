import { Button } from "@/components/ui/button.tsx";
import { SquarePen } from "lucide-react";
import { StockSearch, type Stock } from "@/views/stock-search/StockSearch.tsx";
import { useEffect, useState } from "react";
import { WatchlistTable } from "@/views/watchlist/WatchlistTable.tsx";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog.tsx";

const WATCHLIST_KEY = "watchlist";

export const Watchlist = () => {
    const [watchlist, setWatchlist] = useState<Stock[]>([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem(WATCHLIST_KEY);
        if (stored) {
            try {
                const parsed: Stock[] = JSON.parse(stored);
                setWatchlist(parsed);
            } catch {
                setWatchlist([]);
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(WATCHLIST_KEY, JSON.stringify(watchlist));
    }, [watchlist]);

    const handleStockAdd = (stock: Stock) => {
        setWatchlist((prev) => {
            const alreadyExists = prev.some((s) => s.symbol === stock.symbol);
            if (alreadyExists) return prev;
            return [...prev, stock];
        });
    };

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Watchlist</h1>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
                <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto justify-center sm:justify-end">
                    <div className="w-full sm:w-[280px]">
                        <Dialog open={open} onOpenChange={setOpen}>
                            <DialogTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="w-full justify-start text-muted-foreground"
                                >
                                    Search stocks...
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="p-0 max-w-md w-full sm:w-[500px] top-34 translate-y-0 overflow-hidden">
                                <DialogTitle className="sr-only">Search Stocks</DialogTitle>
                                <StockSearch
                                    onSelect={(stock) => {
                                        handleStockAdd(stock);
                                        setOpen(false);
                                    }}
                                />
                            </DialogContent>
                        </Dialog>
                    </div>
                    <Button>
                        <SquarePen className="size-4 mr-2" />
                        Edit
                    </Button>
                </div>
            </div>
            <div className="mt-5 bg-white px-0 py-6 overflow-x-auto">
                <WatchlistTable watchListData={watchlist} />
            </div>
        </div>
    );
};