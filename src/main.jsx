import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import App from './App.jsx'
import {
  fetchManufacturers,
  MANUFACTURERS_QUERY_KEY,
  MANUFACTURERS_STALE_TIME,
} from './hooks/useManufacturers'
import './index.css'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 5 * 60 * 1000,
			cacheTime: 10 * 60 * 1000,
			refetchOnWindowFocus: false,
			retry: 1,
		},
	},
})

// Prefetch manufacturers at boot. Serves two purposes:
//  1. Wakes the Render free-tier proxy (cold start is 25-60s) while the JS
//     bundle is still parsing, so the first visible catalog render has a
//     head start.
//  2. Fills React Query's cache under the same key `useManufacturers` reads,
//     so the brand dropdown is populated instantly on mount.
// Fire-and-forget; a failure here must never block the app boot.
queryClient
	.prefetchQuery(MANUFACTURERS_QUERY_KEY, fetchManufacturers, {
		staleTime: MANUFACTURERS_STALE_TIME,
	})
	.catch(() => {})

createRoot(document.getElementById('root')).render(
	<Router>
		<QueryClientProvider client={queryClient}>
			<App />
		</QueryClientProvider>
	</Router>,
)
