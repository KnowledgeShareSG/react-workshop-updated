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
        <div className="max-w-md mx-auto mt-10">
            <Command>
                <CommandInput placeholder="Search stocks by name or symbol..."
                              value={query}
                              onValueChange={setQuery}/>
                {!loading && results.length > 0 && (
                    <CommandList>
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