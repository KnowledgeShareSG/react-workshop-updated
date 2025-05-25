import {
    Command,
    CommandList,
    CommandItem,
    CommandInput, CommandGroup
} from "@/components/ui/command.tsx";
import {useStockSearch} from "@/views/stock-search/useStockSearch.ts";

export interface Stock {
    exchange: string;
    shortname: string;
    quoteType: string;
    symbol: string;
    index: string;
    score: number;
    typeDisp: string;
    longname: string;
    exchDisp: string;
    sector: string;
    sectorDisp: string;
    industry: string;
    industryDisp: string;
    dispSecIndFlag: boolean;
    isYahooFinance: boolean;
}

export const StockSearch = () => {
    const {results, query, setQuery, loading} = useStockSearch();
    console.log(results);
    return (
        <div>
            <Command className="w-full border">
                <CommandInput
                    placeholder="Search stocks by name or symbol..."
                    value={query}
                    onValueChange={setQuery}
                    className="w-full h-10 px-3 text-sm"
                />
                {loading && (
                    <div className="p-4 text-center text-sm text-gray-500">
                        Loading...
                    </div>
                )}
                {!loading && results.length > 0 && (
                    <CommandList className="absolute left-0 right-0 z-10 bg-white border border-zinc-200 mt-11 rounded-md shadow-md max-h-60 overflow-y-auto">
                        {results.map((stock) => (
                            <CommandGroup key={stock.symbol}>
                                <CommandItem>
                                    {stock.longname}
                                </CommandItem>
                            </CommandGroup>
                        ))}
                    </CommandList>
                )}
                {!loading && query && results.length === 0 && (
                    <div className="p-4 text-center text-sm text-gray-500">
                        No results found
                    </div>
                )}
            </Command>
        </div>
    )
}
