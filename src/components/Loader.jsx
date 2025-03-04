import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const Loader = ({ onComplete }) => {
	const [isVisible, setIsVisible] = useState(true)

	useEffect(() => {
		// Симулируем загрузку (например, 2 секунды)
		const timeout = setTimeout(() => {
			setIsVisible(false)
			onComplete() // Сообщаем, что загрузка завершена
		}, 2000)

		return () => clearTimeout(timeout)
	}, [onComplete])

	// Анимация исчезновения
	const loaderVariants = {
		initial: { opacity: 1 },
		exit: { opacity: 0, transition: { duration: 0.8, ease: 'easeOut' } },
	}

	return isVisible ? (
		<motion.div
			className='fixed inset-0 flex items-center justify-center bg-[#1A1A1A] z-50'
			variants={loaderVariants}
			initial='initial'
			animate='initial'
			exit='exit'
		>
			<motion.img
				src='https://res.cloudinary.com/pomegranitedesign/image/upload/v1740639186/avtovita/Logo2.png'
				alt='Loading Logo'
				className='w-32 md:w-48'
				initial={{ opacity: 0, scale: 0.8 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 1, ease: 'easeOut' }}
			/>
		</motion.div>
	) : null
}

export default Loader
