import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { SimpleDialog } from "@/components/ui/simple-dialog";

export const TrendingStocks = () => {
  const [stocks, setStocks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStock, setSelectedStock] = useState<any | null>(null);
  const [stockDetails, setStockDetails] = useState<any | null>(null);
  const [detailsLoading, setDetailsLoading] = useState(false);

  useEffect(() => {
    fetch("https://api.marketstack.com/v1/tickers?access_key=db38a273bdab439d7d16d17f658c1051")
      .then((res) => res.json())
      .then((data) => {
        setStocks(data.data || []);
        setLoading(false);
      });
  }, []);

  // Fetch details when selectedStock changes
  useEffect(() => {
    if (selectedStock) {
      setDetailsLoading(true);
      setStockDetails(null);
      fetch(`https://api.marketstack.com/v1/tickers/${selectedStock.symbol}?access_key=db38a273bdab439d7d16d17f658c1051`)
        .then((res) => res.json())
        .then((data) => {
          setStockDetails(data || null);
          setDetailsLoading(false);
        })
        .catch(() => setDetailsLoading(false));
    }
  }, [selectedStock]);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Trending Stocks</h1>
      {loading ? (
        <div className="text-center text-gray-500">Loading...</div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Symbol</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Exchange</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stocks.slice(0, 20).map((stock) => (
              <TableRow
                key={stock.symbol}
                className="cursor-pointer hover:bg-gray-100"
                onClick={() => setSelectedStock(stock)}
              >
                <TableCell>{stock.symbol}</TableCell>
                <TableCell>{stock.name}</TableCell>
                <TableCell>{stock.stock_exchange?.acronym}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <SimpleDialog open={!!selectedStock} onClose={() => setSelectedStock(null)}>
        {detailsLoading ? (
          <div className="text-center text-gray-500">Loading details...</div>
        ) : stockDetails ? (
          <div>
            <h2 className="text-xl font-bold mb-2">
              {stockDetails.name} ({stockDetails.symbol})
            </h2>
            <div className="mb-2">
              <strong>Exchange:</strong> {stockDetails.stock_exchange?.name} ({stockDetails.stock_exchange?.acronym})
            </div>
            <div className="mb-2">
              <strong>MIC:</strong> {stockDetails.stock_exchange?.mic}
            </div>
            <div className="mb-2">
              <strong>Country:</strong> {stockDetails.stock_exchange?.country_code ?? "N/A"}
            </div>
            <div className="mb-2">
              <strong>Currency:</strong> {stockDetails.stock_exchange?.currency ?? "N/A"}
            </div>
            <div className="mb-2">
              <strong>Symbol:</strong> {stockDetails.symbol}
            </div>
            <div className="mb-2">
              <strong>Has Intraday:</strong> {stockDetails.has_intraday ? "Yes" : "No"}
            </div>
            <div className="mb-2">
              <strong>Has End of Day:</strong> {stockDetails.has_eod ? "Yes" : "No"}
            </div>
            <div className="mb-2">
              <strong>Website:</strong>{" "}
              {stockDetails.stock_exchange?.website ? (
                <a
                  href={`https://${stockDetails.stock_exchange.website.replace(/^https?:\/\//, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  {stockDetails.stock_exchange.website}
                </a>
              ) : (
                "N/A"
              )}
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-500">No details found.</div>
        )}
      </SimpleDialog>
    </div>
  );
};