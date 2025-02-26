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
					bg-[#4A422F] text-white shadow-md fixed top-0 left-0 w-full z-50 transition-transform duration-500
					${
						location.pathname === '/'
							? isVisible
								? 'translate-y-0'
								: '-translate-y-full'
							: 'translate-y-0'
					}
			`}
		>
			<div>
				{/* Номер факса */}
				<p className='text-white absolute right-5 top-2 text-xs hidden md:block'>
					Факс: <a className='text-red-500 hover:underline'>031-8084-7144</a>
				</p>
			</div>
			<div className='container mx-auto flex justify-between items-center px-6'>
				{/* Логотип */}
				<Link to='/' className='flex items-center'>
					<img
						src='https://res.cloudinary.com/pomegranitedesign/image/upload/v1740473345/avtovita/Logo.png'
						alt='AVTOVITA Logo'
						className='h-22 md:h-26'
					/>
				</Link>

				{/* Контакты посередине */}
				<div className='flex flex-col md:flex-row items-center text-center space-y-1 md:space-y-0 md:space-x-10 text-xs md:text-sm mr-5 md:mr-0'>
					<p className='text-white'>
						Цой Юрий:{' '}
						<a
							href='tel:+821076097787'
							className='text-red-500 hover:underline'
						>
							+82 (10)-7609-7787
						</a>
					</p>
					<p className='text-white'>
						Ким Евгений:{' '}
						<a
							href='tel:+821042252627'
							className='text-red-500 hover:underline'
						>
							+82 (10)-4225-2627
						</a>
					</p>
					<p className='text-white'>
						Югай Виталий:{' '}
						<a
							href='tel:+821093441782'
							className='text-red-500 hover:underline'
						>
							+82 (10)-9344-1782
						</a>
					</p>

					{/* <p className='text-white'>
						Цой Евгений:{' '}
						<a
							href='tel:+821044168778'
							className='text-red-500 hover:underline'
						>
							+82 (10)-4416-8778
						</a>
					</p> */}
				</div>

				{/* Меню (Desktop) */}
				<nav className='hidden md:flex gap-6 text-lg font-medium'>
					<Link
						to='/catalog'
						className='text-white hover:text-red-500 transition duration-300'
					>
						Каталог
					</Link>
					<Link
						to='/about'
						className='text-white hover:text-red-500 transition duration-300'
					>
						О нас
					</Link>
					<Link
						to='/contacts'
						className='text-white hover:text-red-500 transition duration-300'
					>
						Контакты
					</Link>
				</nav>

				{/* Бургер-меню (Mobile) */}
				<div className='md:hidden'>
					<button
						onClick={() => setMenuOpen(!menuOpen)}
						className='text-white focus:outline-none cursor-pointer'
					>
						<FaBars size={26} />
					</button>
				</div>
			</div>

			{/* Мобильное меню */}
			<div
				className={`text-center fixed top-0 left-0 w-full h-screen bg-[#4A422F] text-gray-800 flex flex-col items-center justify-center z-50 transition-transform duration-300 ${
					menuOpen ? 'translate-y-0' : '-translate-y-full'
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
						className='text-white hover:text-red-500 transition duration-300'
						onClick={() => setMenuOpen(false)}
					>
						Каталог
					</Link>
					<Link
						to='/about'
						className='text-white hover:text-red-500 transition duration-300'
						onClick={() => setMenuOpen(false)}
					>
						О нас
					</Link>
					<Link
						to='/contacts'
						className='text-white hover:text-red-500 transition duration-300'
						onClick={() => setMenuOpen(false)}
					>
						Контакты
					</Link>
					{/* Номер факса */}
					<p className='text-white text-sm'>
						Факс: <a className='text-red-500 hover:underline'>031-8084-7144</a>
					</p>
				</nav>
			</div>
		</header>
	)
}

export default Header
