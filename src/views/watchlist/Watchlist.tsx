import { Button } from '@/components/ui/button.tsx';
import { CircleX, SquarePen, Trash2 } from 'lucide-react';
import { StockSearch, type Stock } from '@/views/stock-search/StockSearch.tsx';

import { useCallback, useEffect, useState } from 'react';
import { WatchlistTable } from '@/views/watchlist/WatchlistTable.tsx';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog.tsx';

const WATCHLIST_KEY = 'watchlist';

export const Watchlist = () => {
  const [watchlist, setWatchlist] = useState<Stock[]>([]);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const [selectedSymbols, setSelectedSymbols] = useState<Array<string>>([]);

  const deleteHandler = useCallback(() => {
    const newList = watchlist.filter((stock) => {
      // remove any symbols that are selected
      return !selectedSymbols.includes(stock.symbol);
    });

    setWatchlist(newList);
    setEditMode(false);
  }, [watchlist, selectedSymbols]);

  //  load stocks from local storage
  useEffect(() => {
    const stored = localStorage.getItem(WATCHLIST_KEY);
    if (stored) {
      try {
        const parsed: Stock[] = JSON.parse(stored);
        setWatchlist((prev) => [...prev, ...parsed]);
      } catch {
        setWatchlist([]);
      }
    }
  }, []);

  // update stocks from local storage
  useEffect(() => {
    localStorage.setItem(WATCHLIST_KEY, JSON.stringify(watchlist));
  }, [watchlist]);

  const handleStockAdd = (stock: Stock) => {
    setWatchlist((prev) => {
      const alreadyExists = prev.some((s) => s.symbol === stock.symbol);
      if (alreadyExists) return prev;
      return [...prev, stock];
    });
  };

  return (
    <div className="w-full px-5 mt-15">
      <div className="flex flex-wrap justify-between items-center gap-y-4">
        <h1 className="w-full text-center sm:w-auto sm:text-left text-2xl font-bold text-gray-800">
          Watchlist
        </h1>
        <div className="flex items-center gap-3 w-full sm:w-auto justify-center sm:justify-end">
          {!editMode && (
            <div className="w-full sm:w-[280px]">
              <Dialog
                open={open}
                onOpenChange={(opened) => {
                  // CODEALONG 01
                  // open the dialog
                  setOpen(opened);
                }}
              >
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-muted-foreground"
                  >
                    Search stocks...
                  </Button>
                </DialogTrigger>

                <DialogContent
                  className="w-screen h-screen max-w-none max-h-none p-0 m-0 rounded-none overflow-hidden sm:w-[500px] sm:h-auto sm:rounded-lg sm:max-w-md sm:top-34 sm:translate-y-0"
                >
                  <DialogTitle className="sr-only">Search Stocks</DialogTitle>
                  <StockSearch
                    onSelect={(stock) => {
                      handleStockAdd(stock);
                      setOpen(false);
                    }}
                  />
                </DialogContent>
              </Dialog>
            </div>
          )}
          {editMode && (
            <>
              <Button
                onClick={() => {
                  setEditMode(false);
                }}
                icon={<CircleX />}
                variant="secondary"
                className="hidden sm:inline-flex sm:w-auto whitespace-nowrap"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  deleteHandler();
                }}
                icon={<Trash2 />}
                className="hidden sm:inline-flex sm:w-auto whitespace-nowrap"
              >
                Delete
              </Button>
            </>
          )}
          {!editMode && (
            <Button
              onClick={() => {
                setEditMode((prevState) => !prevState);
              }}
              icon={<SquarePen className="size-4" />}
              className="sm:w-auto whitespace-nowrap cursor-pointer"
            >
              <span className="hidden md:inline">Edit</span>
            </Button>
          )}
        </div>
      </div>
      <div className="mt-5 bg-white px-0 py-6 overflow-x-auto">
        <WatchlistTable
          watchListData={watchlist}
          editMode={editMode}
          setSelectedSymbols={setSelectedSymbols}
        />
      </div>
      {editMode && (
        <div className="flex gap-3 mt-4 sm:hidden justify-center w-full">
          <Button
            onClick={() => {
              setEditMode(false);
            }}
            variant="secondary"
            className="whitespace-nowrap cursor-pointer"
            icon={<CircleX />}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              deleteHandler();
            }}
            className="sm:w-auto whitespace-nowrap cursor-pointer"
            icon={<Trash2 />}
          >
            Delete
          </Button>
        </div>
      )}
    </div>
  );
};
