import './styles/App.css';
import { Watchlist } from '@/views/watchlist/Watchlist.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
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
    queries: { refetchOnWindowFocus: false, retry: false },
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
    </QueryClientProvider>
  );
}
export default App;
