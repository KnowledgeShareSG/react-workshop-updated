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
        <div>
            <Command className="w-full border">
                <CommandInput
                    placeholder="Search stocks by name or symbol..."
                    value={query}
                    onValueChange={setQuery}
                    className="w-full h-10 px-3 text-sm"
                />
                {!loading && results.length > 0 && (
                    <CommandList className="absolute left-0 right-0 z-10 bg-white border border-zinc-200 mt-11 rounded-md shadow-md max-h-60 overflow-y-auto">
                        {results.map((stock) => (
                            <CommandGroup key={stock.symbol}>
                                <CommandItem>{stock.name}</CommandItem>
                            </CommandGroup>
                        ))}
                    </CommandList>
                )}
            </Command>
        </div>
    )
}