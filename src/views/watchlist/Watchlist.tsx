import {Button} from "@/components/ui/button.tsx";
import {SquarePen} from "lucide-react";
import {StockSearch, type Stock} from "@/views/stock-search/StockSearch.tsx";

import {useState} from "react";
import {WatchlistTable} from "@/views/watchlist/WatchlistTable.tsx";

export const Watchlist = () => {
    const [watchlist, setWatchlist] = useState<Stock[]>([]);
    console.log(watchlist);
    const handleStockAdd = (stock: Stock) => {
        setWatchlist((prev) => {
            const alreadyExists = prev.some((s) => s.symbol === stock.symbol);
            if (alreadyExists) return prev;
            return [...prev, stock];
        });
    };

    return (
        <div className="w-full px-5 mt-15">
            <div className="flex flex-wrap justify-between items-center gap-y-4">
                <h1 className="w-full text-center sm:w-auto sm:text-left text-2xl font-bold text-gray-800">
                    Watchlist
                </h1>

                <div className="flex items-center gap-3 w-full sm:w-auto justify-center sm:justify-end">
                    <div className="w-full sm:w-[280px]">
                        <StockSearch onSelect={handleStockAdd}/>
                    </div>
                    <Button
                        icon={<SquarePen className="size-4"/>}
                        className="sm:w-auto whitespace-nowrap"
                    >
                        Edit
                    </Button>
                </div>
            </div>
            <div className="mt-5 bg-white px-0 py-6 overflow-x-auto">
                <WatchlistTable watchListData={watchlist}/>
            </div>
        </div>
    )
}