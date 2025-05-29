import {
  Command,
  CommandList,
  CommandItem,
  CommandInput,
  CommandGroup,
  CommandShortcut,
  CommandEmpty,
} from '@/components/ui/command.tsx';
import {useStockSearch} from "@/hooks/useStockSearch.ts";
import { useState } from 'react';

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

interface SearchResultProps {
  stock: Stock;
  onSelect: (stock: Stock) => void;
};

const SearchResult = ({ stock, onSelect }: SearchResultProps) => (
  <CommandItem onSelect={() => onSelect(stock)} className="cursor-pointer" value={stock.longname + '___' + stock.exchange} key={stock.longname + '___' + stock.exchange}>
    {stock.longname}
    <CommandShortcut>
      {stock.exchange}
    </CommandShortcut>
  </CommandItem>
);

export interface StockSearchProps {
  onSelect: (stock: Stock) => void;
}

export const StockSearch = ({ onSelect }: StockSearchProps) => {
  // CODEALONG 02.01: change the input into a controlled input + link with search query
  const [searchTerm, setSearchTerm] = useState('');
  // CODEALONG 02.02: change the input into a controlled input + link with search query
  const { results, loading } = useStockSearch(searchTerm);
  return (
    <div>
      <Command className="w-full border">
        <CommandInput
          placeholder="Search stocks by name or symbol..."
          value={searchTerm} // let the input accept the searchTerm
          onValueChange={setSearchTerm} // update the state when input is changed
          className="w-full h-10 px-3 text-sm"
        />
        {loading && (
          <div className="p-4 text-center text-sm text-gray-500">
            Loading...
          </div>
        )}
        {!loading && results.length > 0 && (
          <CommandList className="max-h-60 overflow-y-auto">
            <CommandGroup>
              {/* CODEALONG 02.03 */}
              {results.map((stock) => (
                <SearchResult
                  stock={stock}
                  onSelect={onSelect}
                  key={stock.symbol + '_' + stock.exchange}
                />
              ))}
            </CommandGroup>
          </CommandList>
        )}
        {!loading && searchTerm && results.length === 0 && (
          <CommandEmpty>
            No results found
          </CommandEmpty>
        )}
      </Command>
    </div>
  );
};

