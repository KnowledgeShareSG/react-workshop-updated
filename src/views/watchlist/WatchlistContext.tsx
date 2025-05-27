import { createContext, useContext, useEffect, useState } from "react";
import type { Stock } from "@/views/stock-search/StockSearch.tsx";

const WATCHLIST_KEY = "watchlist";

type WatchlistContextType = {
  watchlistContext: Stock[];
  setWatchlistContext: React.Dispatch<React.SetStateAction<Stock[]>>;
};

const WatchlistContext = createContext<WatchlistContextType | undefined>(undefined);

export const WatchlistProvider = ({ children }: { children: React.ReactNode }) => {
  const [watchlistContext, setWatchlistContext] = useState<Stock[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(WATCHLIST_KEY);
    if (stored) {
      try {
        setWatchlistContext(JSON.parse(stored));
      } catch {
        setWatchlistContext([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(WATCHLIST_KEY, JSON.stringify(watchlistContext));
  }, [watchlistContext]);

  return (
    <WatchlistContext.Provider value={{ watchlistContext, setWatchlistContext }}>
      {children}
    </WatchlistContext.Provider>
  );
};

export const useWatchlist = () => {
  const ctx = useContext(WatchlistContext);
  if (!ctx) throw new Error("useWatchlist must be used within WatchlistProvider");
  return ctx;
};