import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const HeroSection = () => {
	const [imageLoaded, setImageLoaded] = useState(false)

	// URL логотипа
	const logoUrl =
		'https://res.cloudinary.com/pomegranitedesign/image/upload/v1740639186/avtovita/Logo2.png'

	useEffect(() => {
		// Создаём новый объект Image для предзагрузки
		const img = new Image()
		img.src = logoUrl
		img.onload = () => setImageLoaded(true) // Когда загружено → обновляем состояние
	}, [])

	return (
		<section className='relative h-screen'>
			{/* Видео на заднем плане */}
			<video
				className='absolute top-0 left-0 w-full h-full object-cover'
				src='https://res.cloudinary.com/pomegranitedesign/video/upload/v1739440671/avtovita/herovideo.mp4'
				autoPlay
				loop
				muted
				playsInline
			/>

			{/* Затемняющий слой */}
			<div className='absolute inset-0 bg-black opacity-70'></div>

			{/* Контент */}
			<div className='relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4'>
				{/* Логотип */}
				{imageLoaded ? (
					<motion.img
						src={logoUrl}
						alt='AVTOVITA Logo'
						className='w-32 md:w-40 mb-4'
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 1, ease: 'easeOut' }}
					/>
				) : (
					// Лоадер вместо логотипа
					<div className='w-32 md:w-40 mb-4 h-16 flex items-center justify-center'>
						<div className='w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin'></div>
					</div>
				)}

				{/* Заголовок с эффектом появления и увеличения */}
				<motion.h1
					className='text-5xl md:text-6xl font-black mb-4'
					initial={{ opacity: 0, scale: 0.8 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
				>
					AVTOVITA
				</motion.h1>

				{/* Описание с плавным появлением */}
				<motion.p
					className='text-lg md:text-2xl mb-8 md:w-1/2'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1, ease: 'easeOut', delay: 0.4 }}
				>
					Уже много лет занимается продажами автомобилей на внутренем рынке
					Южной Кореи и поставками автомобилей из Южной Кореи. <br />
					<br /> Отточенная до мелочей система доставки и многолетний опыт
					позволяют нам доставить автомобиль в сжатые сроки. Мы не берем никаких
					дополнительных или скрытых комиссий за наши услуги, и в договоре у нас
					нет мелкого шрифта.
				</motion.p>

				{/* Кнопка с анимацией появления и hover-эффектами */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1, ease: 'easeOut', delay: 0.6 }}
				>
					<Link
						to='/catalog'
						className='bg-red-500 hover:bg-red-700 transition-transform duration-300 text-white font-semibold py-3 px-6 rounded-full transform hover:scale-105'
					>
						Смотреть Каталог
					</Link>
				</motion.div>
			</div>
		</section>
	)
}

export default HeroSection
