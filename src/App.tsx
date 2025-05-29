import './styles/App.css';
import { Watchlist } from '@/views/watchlist/Watchlist.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { DetailsWithErrorBoundary } from '@/views/instrument-details/DetailsView.tsx';
import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  RouterProvider,
} from '@tanstack/react-router';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
});

const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Watchlist,
});

const detailsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/details/$symbol',
  component: DetailsWithErrorBoundary,
});

const routeTree = rootRoute.addChildren([indexRoute, detailsRoute]);

const router = createRouter({ routeTree });

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
export default App;
