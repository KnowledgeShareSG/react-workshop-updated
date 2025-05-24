import {Button} from "@/components/ui/button.tsx";
import {SquarePen} from "lucide-react";
import {StockSearch} from "@/views/stock-search/StockSearch.tsx";

export const WatchlistPage = () => {
    return (
        <div className='p-6 mx-auto'>
            <div className='flex items-center justify-between gap-4 flex-wrap mb-6'>
                <h1 className='text-3xl font-bold text-gray-800'>Watchlist</h1>
                <div className='flex items-center gap-3 sm:gap-4'>
                    <StockSearch />
                    <Button 
                        variant="outline" 
                        icon={<SquarePen className="size-4" />}
                        className="whitespace-nowrap"
                    >
                        Edit
                    </Button>
                </div>
            </div>

            <div className="mt-8 bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                <p className="text-gray-500 text-center py-8">No stocks in your watchlist yet. Use the search above to add stocks.</p>
            </div>
        </div>
    )
}
