import {Button} from "@/components/ui/button.tsx";
import {SquarePen} from "lucide-react";
import {StockSearch} from "@/views/stock-search/StockSearch.tsx";

export const WatchlistPage = () => {
    return (
        <div className='p-6'>
            <div className='flex items-center justify-between gap-4 flex-wrap mb-6'>
                <h1 className='text-3xl font-bold'>Watchlist</h1>
                <div className='flex items-center gap-2'>
                    <StockSearch />
                    <Button>
                        <SquarePen />
                        Edit
                    </Button>
                </div>
            </div>
        </div>
    )
}