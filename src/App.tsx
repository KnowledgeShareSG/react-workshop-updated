import './styles/App.css';
import { Watchlist } from '@/views/watchlist/Watchlist.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { DetailsWithErrorBoundary } from '@/views/instrument-details/DetailsView.tsx';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false, retry: false },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Watchlist />} />
          <Route
            path="/details/:symbol"
            element={<DetailsWithErrorBoundary />}
          />
        </Routes>
      </HashRouter>
    </QueryClientProvider>
  );
}
export default App;
