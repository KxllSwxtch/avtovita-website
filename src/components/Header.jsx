import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FaBars, FaTimes } from 'react-icons/fa'

const Header = () => {
	const [menuOpen, setMenuOpen] = useState(false)
	const [isVisible, setIsVisible] = useState(false)
	const location = useLocation()

	// Отслеживание прокрутки
	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 50) {
				setIsVisible(true)
			} else {
				setIsVisible(false)
			}
		}

		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	return (
		<header
			className={`
        bg-black text-white shadow-md fixed top-0 left-0 w-full z-50 transition-transform duration-500
        ${
					location.pathname === '/'
						? isVisible
							? 'translate-y-0'
							: '-translate-y-full'
						: 'translate-y-0'
				}
    `}
		>
			<div className='container mx-auto flex justify-between items-center px-6 py-4'>
				{/* Логотип */}
				<Link to='/' className='flex items-center gap-3'>
					<img
						src='https://res.cloudinary.com/pomegranitedesign/image/upload/v1739602704/avtovita/Black_Modern_Car_Auto_Services_Logo.png'
						alt='AVTOVITA Logo'
						className='h-16 p-0'
					/>
				</Link>

				{/* Меню (Desktop) */}
				<nav className='hidden md:flex gap-6 text-lg font-medium'>
					<Link to='/catalog' className='hover:text-red-500 transition'>
						Каталог
					</Link>
					<Link to='/about' className='hover:text-red-500 transition'>
						О нас
					</Link>
					<Link to='/contacts' className='hover:text-red-500 transition'>
						Контакты
					</Link>
				</nav>

				{/* Бургер-меню (Mobile) */}
				<div className='md:hidden'>
					<button
						onClick={() => setMenuOpen(!menuOpen)}
						className='text-white focus:outline-none'
					>
						{menuOpen ? <FaTimes size={26} /> : <FaBars size={26} />}
					</button>
				</div>
			</div>

			{/* Мобильное меню */}
			<div
				className={`md:hidden fixed top-0 left-0 w-full h-full bg-black bg-opacity-90 flex flex-col items-center justify-center transform transition-transform duration-300 ${
					menuOpen ? 'translate-x-0' : '-translate-x-full'
				}`}
			>
				<button
					onClick={() => setMenuOpen(false)}
					className='absolute top-6 right-6 text-white text-2xl'
				>
					<FaTimes />
				</button>
				<nav className='flex flex-col gap-6 text-lg'>
					<Link
						to='/catalog'
						className='hover:text-red-500'
						onClick={() => setMenuOpen(false)}
					>
						Каталог
					</Link>
					<Link
						to='/about'
						className='hover:text-red-500'
						onClick={() => setMenuOpen(false)}
					>
						О нас
					</Link>
					<Link
						to='/contacts'
						className='hover:text-red-500'
						onClick={() => setMenuOpen(false)}
					>
						Контакты
					</Link>
				</nav>
			</div>
		</header>
	)
}

export default Header
