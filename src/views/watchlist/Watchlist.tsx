import {Button} from "@/components/ui/button.tsx";
import {SquarePen} from "lucide-react";
import {StockSearch} from "@/views/stock-search/StockSearch.tsx";

export const Watchlist = () => {
    return (
        <div className="w-full px-5">
            <div className="flex flex-wrap justify-between items-center gap-y-4">
                <h1 className="w-full text-center sm:w-auto sm:text-left text-2xl font-bold text-gray-800">
                    Watchlist
                </h1>

                <div className="flex items-center gap-3 w-full sm:w-auto justify-center sm:justify-end">
                    <div className="w-full sm:w-[280px]">
                        <StockSearch />
                    </div>
                    <Button
                        icon={<SquarePen className="size-4" />}
                        className="sm:w-auto whitespace-nowrap"
                    >
                        Edit
                    </Button>
                </div>
            </div>
            <div className="mt-8 bg-white px-0 py-6">
                <p className="text-gray-500 text-center py-8">No stocks in your watchlist yet. Use the search above to add stocks.</p>
            </div>
        </div>
    )
}