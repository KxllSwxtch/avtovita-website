import { motion } from 'framer-motion'

const Loader = () => {
	// Анимация для индикатора загрузки
	const loaderVariants = {
		animate: {
			rotate: 360,
			transition: {
				duration: 1.5,
				repeat: Infinity,
				ease: 'linear',
			},
		},
	}

	// Анимация для точек загрузки
	const dotsVariants = {
		animate: {
			opacity: [0.3, 1, 0.3],
			transition: {
				duration: 1.2,
				repeat: Infinity,
				ease: 'easeInOut',
				times: [0, 0.5, 1],
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
			{/* Полупрозрачный фон */}
			<div className='absolute inset-0 bg-white/90 backdrop-blur-sm'></div>

			<div className='relative flex flex-col items-center z-10'>
				{/* Круговой индикатор загрузки */}
				<motion.div
					variants={loaderVariants}
					animate='animate'
					className='w-16 h-16 mb-4'
				>
					<svg viewBox='0 0 50 50' xmlns='http://www.w3.org/2000/svg'>
						<circle
							cx='25'
							cy='25'
							r='20'
							fill='none'
							stroke='#f0f0f0'
							strokeWidth='4'
						/>
						<circle
							cx='25'
							cy='25'
							r='20'
							fill='none'
							stroke='#0e2cc2'
							strokeWidth='4'
							strokeLinecap='round'
							strokeDasharray='125'
							strokeDashoffset='75'
						/>
					</svg>
				</motion.div>

				{/* Текст загрузки с анимированными точками */}
				<div className='flex items-center text-[#0e2cc2] font-medium'>
					<span>Загрузка</span>
					<motion.span
						variants={dotsVariants}
						animate='animate'
						className='ml-1'
					>
						.
					</motion.span>
					<motion.span
						variants={dotsVariants}
						animate='animate'
						transition={{ delay: 0.2 }}
						className='ml-0.5'
					>
						.
					</motion.span>
					<motion.span
						variants={dotsVariants}
						animate='animate'
						transition={{ delay: 0.4 }}
						className='ml-0.5'
					>
						.
					</motion.span>
				</div>
			</div>
		</motion.div>
	)
}

export default Loader
