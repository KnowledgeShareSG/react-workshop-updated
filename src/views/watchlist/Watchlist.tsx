import { Button } from "@/components/ui/button.tsx";
import { SquarePen, Trash2, X } from "lucide-react";
import { StockSearch, type Stock } from "@/views/stock-search/StockSearch.tsx";
import { useEffect, useState } from "react";
import { WatchlistTable } from "@/views/watchlist/WatchlistTable.tsx";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog.tsx";
import { useWatchlist } from "./WatchlistContext";
const WATCHLIST_KEY = "watchlist";

export const Watchlist = () => {
    //const [watchlist, setWatchlistContext] = useState<Stock[]>([]);
    const [open, setOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [selected, setSelected] = useState<string[]>([]);
    const { watchlistContext, setWatchlistContext } = useWatchlist();


    useEffect(() => {
        const stored = localStorage.getItem(WATCHLIST_KEY);
        if (stored) {
            try {
                const parsed: Stock[] = JSON.parse(stored);
                setWatchlistContext(parsed);
            } catch {
                setWatchlistContext([]);
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(WATCHLIST_KEY, JSON.stringify(watchlistContext));
    }, [watchlistContext]);

    const handleStockAdd = (stock: Stock) => {
        setWatchlistContext((prev) => {
            const alreadyExists = prev.some((s) => s.symbol === stock.symbol);
            if (alreadyExists) return prev;
            return [...prev, stock];
        });
    };

    const handleSelect = (symbol: string) => {
        setSelected((prev) =>
            prev.includes(symbol)
                ? prev.filter((s) => s !== symbol)
                : [...prev, symbol]
        );
    };

    const handleDelete = () => {
        setWatchlistContext((prev) => prev.filter((s) => !selected.includes(s.symbol)));
        setSelected([]);
        setEditMode(false);
    };

    const handleCancel = () => {
        setSelected([]);
        setEditMode(false);
    };

    return (
        <div className="w-full px-5 mt-15">
            <div className="flex flex-wrap justify-between items-center gap-y-4">
                <h1 className="w-full text-center sm:w-auto sm:text-left text-2xl font-bold text-gray-800">
                    Watchlist
                </h1>
                <div className="flex flex-row items-center gap-3 sm:w-auto justify-center sm:justify-end">
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
                    {!editMode ? (
                        <Button
                            className="flex items-center whitespace-nowrap"
                            onClick={() => setEditMode(true)}
                            icon={<SquarePen className="size-4 mr-2"/>}
                        >
                            Edit
                        </Button>
                    ) : (
                        <>
                            <Button
                                variant="outline"
                                className="flex items-center whitespace-nowrap"
                                onClick={handleCancel}
                                icon={<X className="size-4 mr-2" />}
                            >
                                
                                Cancel
                            </Button>
                            <Button
                                variant="destructive"
                                className="flex items-center whitespace-nowrap"
                                onClick={handleDelete}
                                disabled={selected.length === 0}
                                icon={<Trash2 className="size-4 mr-2" />}
                            >
                                
                                Delete
                            </Button>
                        </>
                    )}
                </div>
            </div>
            <div className="mt-5 bg-white px-0 py-6 overflow-x-auto">
                <WatchlistTable
                    watchListData={watchlistContext || []}
                    editMode={editMode}
                    selected={selected}
                    onSelect={handleSelect}
                />
            </div>
        </div>
    );
};
