import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const LogoLoader = ({ onComplete }) => {
	const [isVisible, setIsVisible] = useState(true)

	useEffect(() => {
		// Симулируем загрузку (например, 2 секунды)
		const timeout = setTimeout(() => {
			setIsVisible(false)
			// Проверяем, что onComplete существует и является функцией
			if (typeof onComplete === 'function') {
				onComplete() // Сообщаем, что загрузка завершена
			}
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
			className='fixed inset-0 flex items-center justify-center bg-[#b8b8b8] z-50'
			variants={loaderVariants}
			initial='initial'
			animate='initial'
			exit='exit'
		>
			<motion.img
				src='logo.png'
				alt='Loading Logo'
				className='w-50 md:w-100'
				initial={{ opacity: 0, scale: 0.8 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 1, ease: 'easeOut' }}
			/>
		</motion.div>
	) : null
}

export default LogoLoader
