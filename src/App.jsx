import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

// Local imports
import { Header, Footer, Loader } from './components'
import { Home, About, Catalog, CarDetails, Contacts } from './pages'

const App = () => {
	const [loading, setLoading] = useState(true)

	const handleLoadComplete = () => {
		setLoading(false) // Убираем лоадер после загрузки
	}

	return (
		<Router>
			<AnimatePresence>
				{loading && <Loader onComplete={handleLoadComplete} />}
			</AnimatePresence>

			{!loading && (
				<div className='flex flex-col min-h-screen'>
					<Header />
					<main className='flex-grow'>
						<Routes>
							<Route path='/' element={<Home />} />
							<Route path='/about' element={<About />} />
							<Route path='/catalog' element={<Catalog />} />
							<Route path='/contacts' element={<Contacts />} />
							<Route path='/catalog/:slug/:carId' element={<CarDetails />} />
							<Route
								path='*'
								element={
									<div className='container mx-auto p-4'>
										Страница не найдена
									</div>
								}
							/>
						</Routes>
					</main>
					<Footer />
				</div>
			)}
		</Router>
	)
}

export default App
