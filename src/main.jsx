import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import App from './App.jsx'
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

createRoot(document.getElementById('root')).render(
	<Router>
		<QueryClientProvider client={queryClient}>
			<App />
		</QueryClientProvider>
	</Router>,
)
