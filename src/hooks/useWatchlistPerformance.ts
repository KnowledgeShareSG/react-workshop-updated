import type {Stock} from "@/views/stock-search/StockSearch.tsx";
import {useEffect, useState} from "react";

export interface WatchListStock extends Stock {
    closedPrice: number[];
    changeInPercent: number;
    currentPrice: number | null;
    timestampList: number[];
}

export const useWatchlistPerformance = (stocks: Stock[]) => {
    const [data, setData] = useState<WatchListStock[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!stocks.length) return;

        async function load() {
            const fetchPerformanceData: WatchListStock[] = await Promise.all(
                stocks.map(async (stock) => {
                    const response = await fetch(
                        `https://octopus-app-3grc6.ondigitalocean.app/yahoo/chart/${stock.symbol}`
                    );
                    if (!response.ok) {
                        throw new Error(`API error: ${response.status}`);
                    }
                    const data = await response.json();
                    console.log(data);
                    const chart = data.chart?.result?.[0];
                    const closes =
                        chart?.indicators?.quote?.[0]?.close?.filter((v: number) => v != null) || [];
                    const currentPrice = closes.at(-1) ?? null;
                    const timestamps = chart?.timestamp || [];

                    const changePercent =
                        closes.length >= 2
                            ? parseFloat((((closes.at(-1)! - closes[0]) / closes[0]) * 100).toFixed(2))
                            : 0;

                    return {
                        ...stock,
                        closedPrice: closes,
                        changeInPercent: changePercent,
                        currentPrice: currentPrice,
                        timestampList: timestamps
                    }
                }));
            setData(fetchPerformanceData);
            setLoading(false);
        }

        load();
    }, [stocks]);
    return {data, loading};
}