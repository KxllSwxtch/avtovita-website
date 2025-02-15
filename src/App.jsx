import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// Local imports
import { Header, Footer } from './components'
import { Home, About, Catalog, CarDetails, Contacts } from './pages'

const App = () => {
	return (
		<Router>
			<div className='flex flex-col min-h-screen'>
				<Header />
				<main className='flex-grow'>
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='/about' element={<About />} />
						<Route path='/catalog' element={<Catalog />} />
						<Route path='/contacts' element={<Contacts />} />
						<Route path='/car/:carId' element={<CarDetails />} />
						<Route
							path='*'
							element={
								<div className='container mx-auto p-4'>Страница не найдена</div>
							}
						/>
					</Routes>
				</main>
				<Footer />
			</div>
		</Router>
	)
}

export default App
