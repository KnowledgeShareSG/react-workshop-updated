import {useEffect, useState} from "react";
import type {Stock} from "@/views/stock-search/StockSearch.tsx";
import {mockStockResults} from "@/views/stock-search/mock.ts";

export const useStockSearch = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<Stock[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if(!query.trim()) {
            setResults([]);
            return;
        }
        setTimeout(async () => {
            setLoading(true);
            const filteredResults = mockStockResults.filter(stock =>
                stock.name.toLowerCase().includes(query.toLowerCase()) ||
                stock.symbol.toLowerCase().includes(query.toLowerCase())
            );
            setResults(filteredResults);
            setLoading(false);
        }, 300)
        return () => {
            setLoading(false);
        };
    }, [query]);

    return {
        query,
        setQuery,
        results,
        loading
    }
}