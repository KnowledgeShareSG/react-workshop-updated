import './styles/App.css';
import { Watchlist } from '@/views/watchlist/Watchlist.tsx';
import { TrendingStocks } from '@/views/trending/TrendingStocks';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { DetailsWithErrorBoundary } from '@/views/instrument-details/DetailsView.tsx';
import { NavMain } from "@/components/nav-main";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Bookmark, TrendingUp } from "lucide-react";

const sidebarItems = [
  {
    title: "Watchlist",
    url: "/",
    icon: Bookmark,
    isActive: false,
    onClick: undefined, // Navigation is handled by <a> or NavLink in NavMain
  },
  {
    title: "Trending Stocks",
    url: "/trending",
    icon: TrendingUp,
    isActive: false,
    onClick: undefined,
  },
];

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false, retry: false },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HashRouter>
        <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-gray-800 via-gray-900 to-black z-50">
          <div className="relative w-full max-w-5xl h-[90vh] bg-white rounded-2xl shadow-2xl flex overflow-hidden border border-gray-200">
            <SidebarProvider>
              <aside className="w-20 border-r bg-white flex-shrink-0 h-full flex flex-col items-center py-6">
                <NavMain items={sidebarItems} />
              </aside>
              <main className="flex-1 px-5 py-8 flex flex-col overflow-y-auto h-full">
                <Routes>
                  <Route path="/" element={<Watchlist />} />
                  <Route path="/trending" element={<TrendingStocks />} />
                  <Route
                    path="/details/:symbol"
                    element={<DetailsWithErrorBoundary />}
                  />
                </Routes>
              </main>
            </SidebarProvider>
          </div>
        </div>
      </HashRouter>
    </QueryClientProvider>
  );
}
export default App;
