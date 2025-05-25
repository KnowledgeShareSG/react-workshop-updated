import {useEffect, useState} from "react";
import type {Stock} from "@/views/stock-search/StockSearch.tsx";

export const useStockSearch = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<Stock[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if(!query.trim()) {
            setResults([]);
            return;
        }

        const fetchStocks = async () => {
            setLoading(true);

            try {
                const response = await fetch(
                    `https://octopus-app-3grc6.ondigitalocean.app/yahoo/search?q=${encodeURIComponent(query)}`
                );

                if (!response.ok) {
                    throw new Error(`API error: ${response.status}`);
                }

                const data = await response.json();
                setResults(data.quotes || []);
            } catch (err) {
                console.error('Error fetching stock data:', err);
                setResults([]);
            } finally {
                setLoading(false);
            }
        };

        fetchStocks();

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
