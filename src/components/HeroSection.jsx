import { Link } from 'react-router-dom'
import { motion, useAnimation, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

const HeroSection = () => {
	const controls = useAnimation()
	const [letterIndex, setLetterIndex] = useState(0)
	const title = 'AVTOVITA'

	// Запуск анимаций при монтировании компонента
	useEffect(() => {
		controls.start({
			opacity: 1,
			y: 0,
			transition: { duration: 0.8 },
		})

		// Анимация появления букв
		const intervalId = setInterval(() => {
			setLetterIndex((prev) => {
				if (prev < title.length - 1) {
					return prev + 1
				}
				clearInterval(intervalId)
				return prev
			})
		}, 150)

		return () => clearInterval(intervalId)
	}, [controls])

	return (
		<section className='relative h-screen overflow-hidden'>
			{/* Видео на заднем плане */}
			<motion.div
				initial={{ scale: 1.1 }}
				animate={{ scale: 1 }}
				transition={{ duration: 20, ease: 'easeOut' }}
				className='absolute inset-0'
			>
				<video
					className='absolute top-0 left-0 w-full h-full object-cover'
					src='https://cdn.pixabay.com/video/2023/09/21/181537-866999852_large.mp4'
					autoPlay
					loop
					muted
					playsInline
				/>
			</motion.div>

			{/* Затемняющий слой с минимальным градиентом и анимацией */}
			<motion.div
				className='absolute inset-0 bg-gradient-to-b from-black/80 to-black/70'
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 1.5 }}
			></motion.div>

			{/* Плавающие частицы */}
			<div className='absolute inset-0 z-[1] overflow-hidden pointer-events-none'>
				{[...Array(10)].map((_, i) => (
					<motion.div
						key={i}
						className='absolute w-2 h-2 rounded-full bg-white/10'
						initial={{
							x: Math.random() * window.innerWidth,
							y: Math.random() * window.innerHeight,
							opacity: Math.random() * 0.5 + 0.3,
						}}
						animate={{
							y: [null, Math.random() * -300 - 100],
							opacity: [null, 0],
						}}
						transition={{
							duration: Math.random() * 15 + 10,
							repeat: Infinity,
							ease: 'linear',
						}}
					/>
				))}
			</div>

			{/* Контент */}
			<div className='relative z-10 flex flex-col items-center justify-center h-full text-white px-6 max-w-4xl mx-auto'>
				{/* Заголовок с анимацией по буквам */}
				<motion.h1
					className='text-6xl md:text-7xl font-bold mb-8 relative'
					initial={{ opacity: 0, y: -20 }}
					animate={controls}
				>
					{title.split('').map((letter, index) => (
						<motion.span
							key={index}
							className={index >= 4 ? 'text-[#a330f0]' : 'text-white'}
							initial={{ opacity: 0, y: -20 }}
							animate={
								index <= letterIndex
									? { opacity: 1, y: 0 }
									: { opacity: 0, y: -20 }
							}
							transition={{
								duration: 0.3,
								type: 'spring',
								stiffness: 200,
								damping: 10,
							}}
							whileHover={{
								scale: 1.2,
								rotate: [-5, 5, 0],
								transition: { duration: 0.3 },
							}}
						>
							{letter}
						</motion.span>
					))}
				</motion.h1>

				{/* Описание */}
				<motion.div
					className='text-base md:text-lg text-gray-200 mb-10 space-y-4 max-w-2xl text-center'
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{
						duration: 0.7,
						delay: 0.8,
						type: 'spring',
						stiffness: 100,
					}}
				>
					<motion.p
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.5, delay: 1.0 }}
					>
						Уже много лет занимается продажами автомобилей на внутренем рынке
						Южной Кореи и поставками автомобилей из Южной Кореи.
					</motion.p>
					<motion.p
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.5, delay: 1.3 }}
					>
						<motion.span
							className='text-white'
							whileHover={{ color: '#a330f0' }}
						>
							Отточенная до мелочей система доставки и многолетний опыт
							позволяют нам доставить автомобиль в сжатые сроки.
						</motion.span>{' '}
						Мы не берем никаких дополнительных или скрытых комиссий за наши
						услуги, и в договоре у нас нет мелкого шрифта.
					</motion.p>
				</motion.div>

				{/* Кнопка с продвинутой анимацией */}
				<motion.div
					initial={{ opacity: 0, scale: 0.8 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.5, delay: 1.6, type: 'spring' }}
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
				>
					<Link
						to='/catalog'
						className='group relative overflow-hidden bg-[#0e2cc2] hover:bg-[#0e2cc2c4] transition-all duration-300 text-white font-medium py-3 px-8 rounded-md shadow-sm hover:shadow-lg inline-block'
					>
						<motion.span
							className='absolute inset-0 bg-[#a330f0] transform origin-left'
							initial={{ scaleX: 0 }}
							whileHover={{
								scaleX: 1,
								transition: { duration: 0.3, ease: 'easeInOut' },
							}}
						/>
						<span className='relative z-10'>Смотреть Каталог</span>
					</Link>
				</motion.div>
			</div>
		</section>
	)
}

export default HeroSection
