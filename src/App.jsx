import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'

import { Header, Footer, Loader } from './components'

const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const ExportCatalog = lazy(() => import('./pages/ExportCatalog'))
const CarDetails = lazy(() => import('./pages/CarDetails'))
const Contacts = lazy(() => import('./pages/Contacts'))

const App = () => {
	return (
		<div className='flex flex-col min-h-screen'>
			<Header />
			<main className='flex-grow'>
				<Suspense fallback={<Loader />}>
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='/about' element={<About />} />
						<Route path='/catalog' element={<ExportCatalog />} />
						<Route path='/contacts' element={<Contacts />} />
						<Route path='/catalog/:carId' element={<CarDetails />} />
						<Route
							path='*'
							element={
								<div className='container mx-auto p-4'>
									Страница не найдена
								</div>
							}
						/>
					</Routes>
				</Suspense>
			</main>
			<Footer />
		</div>
	)
}

export default App
