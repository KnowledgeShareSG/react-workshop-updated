import './styles/App.css'
import { useState } from "react";
import { Watchlist } from "@/views/watchlist/Watchlist.tsx";
import { TrendingStocks } from "@/views/trending/TrendingStocks";
import { NavMain } from "@/components/nav-main";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Bookmark, TrendingUp } from "lucide-react";

function App() {
    const [page, setPage] = useState<"watchlist" | "trending">("watchlist");

    const sidebarItems = [
        {
            title: "Watchlist",
            url: "/watchlist",
            icon: Bookmark,
            isActive: page === "watchlist",
            onClick: () => setPage("watchlist"),
        },
        {
            title: "Trending Stocks",
            url: "/trending",
            icon: TrendingUp,
            isActive: page === "trending",
            onClick: () => setPage("trending"),
        },
    ];

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-gray-800 via-gray-900 to-black z-50">
            <div className="relative w-full max-w-5xl h-[90vh] bg-white rounded-2xl shadow-2xl flex overflow-hidden border border-gray-200">
                <SidebarProvider>
                    <aside className="w-64 border-r bg-white flex-shrink-0 h-full">
                        <NavMain items={sidebarItems} />
                    </aside>
                    <main className="flex-1 px-5 py-8 flex flex-col overflow-y-auto h-full">
                        {page === "watchlist" && <Watchlist />}
                        {page === "trending" && <TrendingStocks />}
                    </main>
                </SidebarProvider>
            </div>
        </div>
    );
}

export default App;
