import {
    Command,
    CommandList,
    CommandItem,
    CommandInput, CommandGroup
} from "@/components/ui/command.tsx";
import {useStockSearch} from "@/views/stock-search/useStockSearch.ts";

export interface Stock {
    name: string;
    symbol: string;
    price: number;
    changePercent: number;
    volume: number;
    trend: "up" | "down";
}

export const StockSearch = () => {
    const {results, query, setQuery, loading} = useStockSearch()
    return (
        <div className="relative w-64 ">
            <Command className="rounded-md border">
                <CommandInput placeholder="Search stocks by name or symbol..."
                              value={query}
                              onValueChange={setQuery}/>
                {!loading && results.length > 0 && (
                    <CommandList className="absolute left-0 right-0 z-10 bg-white border mt-10 rounded-md max-h-60 overflow-y-auto">
                        {results.map((stock) => (
                            <CommandGroup key={stock.symbol}>
                                <CommandItem>
                                    {stock.name}
                                </CommandItem>
                            </CommandGroup>
                        ))}
                    </CommandList>
                )
                }
            </Command>
        </div>
    )
}