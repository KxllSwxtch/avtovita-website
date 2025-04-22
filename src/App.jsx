import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Routes, Route, useLocation } from 'react-router-dom'

// Local imports
import { Header, Footer, Loader, LogoLoader } from './components'
import { Home, About, Catalog, CarDetails, Contacts } from './pages'

const App = () => {
	const [loading, setLoading] = useState(true)

	// Определяем, на какой странице находится пользователь
	const location = useLocation()

	useEffect(() => {
		// Показываем лоадер при каждом изменении маршрута
		setLoading(true)
		const timeout = setTimeout(() => {
			setLoading(false) // Скрываем лоадер через 2 секунды
		}, 2000)

		return () => clearTimeout(timeout)
	}, [location])

	return (
		<>
			<AnimatePresence>
				{loading &&
					(location.pathname === '/' ? (
						<Loader onComplete={() => setLoading(false)} />
					) : (
						<Loader />
					))}
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
		</>
	)
}

export default App
