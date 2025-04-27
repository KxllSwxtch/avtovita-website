import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const Loader = () => {
	const [progress, setProgress] = useState(0)

	useEffect(() => {
		const timer = setInterval(() => {
			setProgress((oldProgress) => {
				const newProgress = Math.min(oldProgress + Math.random() * 10, 100)
				if (newProgress === 100) {
					clearInterval(timer)
				}
				return newProgress
			})
		}, 200)

		return () => {
			clearInterval(timer)
		}
	}, [])

	const circleVariants = {
		initial: { scale: 0, opacity: 0 },
		animate: {
			scale: 1,
			opacity: 1,
			transition: {
				duration: 0.5,
				type: 'spring',
				stiffness: 260,
				damping: 20,
			},
		},
	}

	const dotsVariants = {
		initial: { opacity: 0 },
		animate: {
			opacity: 1,
			transition: {
				staggerChildren: 0.2,
			},
		},
	}

	const dotVariant = {
		initial: { y: 0 },
		animate: {
			y: [0, -10, 0],
			transition: {
				duration: 0.8,
				repeat: Infinity,
				ease: 'easeInOut',
			},
		},
	}

	return (
		<motion.div
			className='fixed inset-0 flex flex-col items-center justify-center z-50'
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
		>
			{/* Затемнение с размытием */}
			<div className='absolute inset-0 bg-white/90 backdrop-blur-sm'></div>

			<div className='relative flex flex-col items-center z-10'>
				{/* Прогресс бар */}
				<motion.div
					className='w-48 h-1.5 bg-gray-200 rounded-full mt-8 overflow-hidden'
					initial={{ width: 0, opacity: 0 }}
					animate={{ width: 192, opacity: 1 }}
					transition={{ delay: 0.5, duration: 0.5 }}
				>
					<motion.div
						className='h-full bg-black'
						style={{ width: `${progress}%` }}
						initial={{ width: '0%' }}
						animate={{ width: `${progress}%` }}
						transition={{ duration: 0.3 }}
					/>
				</motion.div>

				{/* Текст загрузки с анимированными точками */}
				<motion.div
					className='mt-6 text-lg font-medium text-black flex items-center'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.7 }}
				>
					<span>Загрузка</span>
					<motion.div
						className='flex ml-1 items-center'
						variants={dotsVariants}
						initial='initial'
						animate='animate'
					>
						{[0, 1, 2].map((i) => (
							<motion.span
								key={i}
								variants={dotVariant}
								className='w-1 h-1 mx-0.5 bg-black rounded-full'
							/>
						))}
					</motion.div>
				</motion.div>
			</div>
		</motion.div>
	)
}

// Добавляем новую анимацию в Tailwind
// Вы можете добавить это в ваш tailwind.config.js
// module.exports = {
//   theme: {
//     extend: {
//       animation: {
//         'spin-slow': 'spin 3s linear infinite reverse',
//       }
//     },
//   },
// }

export default Loader
