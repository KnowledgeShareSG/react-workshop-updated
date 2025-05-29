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
  // CODEALONG 02.01: HMMMMMMMMMMMMMMM Setting the user serachTerm
  let searchTerm = '';
  // CODEALONG 02.02: We need to use the useStockSearch hook to get the results we need based on the searchTerm, 
  // to get the result and the loading state
  const results = []
  const loading = false
  return (
    <div>
      <Command className="w-full border">
        <CommandInput
          placeholder="Search stocks by name or symbol..."
          value={''} // let the input accept the searchTerm
          onValueChange={() => { /* do nothing */}} // update the state when input is changed
          className="w-full h-10 px-3 text-sm"
          onValueChange={undefined}
        />
        {/* CODEALONG 02.01.PSST: You might be missing something above!*/}
        {loading && (
          <div className="p-4 text-center text-sm text-gray-500">
            Loading...
          </div>
        )}
        {!loading && results.length > 0 && (
          <CommandList className="max-h-60 overflow-y-auto">
            <CommandGroup>
              {/* CODEALONG 02.03: Iterate through the results to render each SearchResult*/}
              
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

