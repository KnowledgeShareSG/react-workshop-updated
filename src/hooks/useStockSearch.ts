import { useState} from "react";
import type {Stock} from "@/views/stock-search/StockSearch.tsx";
import { useQuery } from "@tanstack/react-query";


async function fetchSearchResults(query: string): Promise<Array<Stock>> {
    try {
        const response = await fetch(
            `https://octopus-app-3grc6.ondigitalocean.app/yahoo/search?q=${encodeURIComponent(query)}`
        );
        const data = await response.json();
        return data.quotes ?? [];
    } catch (err) {
        throw new Error('Error fetching stock data: ' + err);
    }
};

export const useStockSearch = () => {
    const [query, setQuery] = useState("");

    const { data, isLoading } = useQuery<Array<Stock>>({
        queryKey: [query],
        queryFn: () => fetchSearchResults(query)
    })

    return {
        query,
        setQuery,
        results: data ?? [],
        loading: isLoading,
    }
}
