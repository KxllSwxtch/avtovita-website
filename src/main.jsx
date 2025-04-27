import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import App from './App.jsx'
import './index.css'

// Создаем экземпляр QueryClient
const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
	<Router>
		<QueryClientProvider client={queryClient}>
			<App />
		</QueryClientProvider>
	</Router>,
)
