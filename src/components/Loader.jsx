import { motion } from 'framer-motion'

const Loader = () => {
	// Анимация движения автомобиля
	const carVariants = {
		initial: { x: -100, opacity: 0 },
		animate: {
			x: [0, 15, 0, 15, 0], // Легкое покачивание машины
			opacity: 1,
			transition: {
				x: {
					duration: 1.5,
					repeat: Infinity,
					ease: 'easeInOut',
				},
				opacity: { duration: 0.5 },
			},
		},
	}

	// Анимация вращения колес
	const wheelVariants = {
		initial: { rotate: 0 },
		animate: {
			rotate: 360,
			transition: {
				duration: 1,
				repeat: Infinity,
				ease: 'linear',
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
				{/* Анимация автомобиля */}
				<motion.div
					variants={carVariants}
					initial='initial'
					animate='animate'
					className='relative mb-6'
				>
					{/* Кузов автомобиля */}
					<svg
						width='120'
						height='50'
						viewBox='0 0 120 50'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						{/* Кузов */}
						<motion.path
							d='M30,35 L25,20 L40,12 L70,12 L90,20 L95,35 Z'
							fill='#0e2cc2'
							stroke='#0e2cc2'
							strokeWidth='2'
						/>
						{/* Окна */}
						<path
							d='M40,20 L45,13 L65,13 L70,20 Z'
							fill='white'
							opacity='0.7'
						/>

						{/* Передние фары */}
						<circle cx='25' cy='30' r='3' fill='#ffcc00' />
						<circle cx='95' cy='30' r='3' fill='#ffcc00' />

						{/* Колеса */}
						<motion.g variants={wheelVariants}>
							<circle cx='35' cy='35' r='10' fill='#333' />
							<circle cx='35' cy='35' r='5' fill='#aaa' />
							<path
								d='M35,30 L35,40 M30,35 L40,35'
								stroke='white'
								strokeWidth='1.5'
							/>
						</motion.g>

						<motion.g variants={wheelVariants}>
							<circle cx='85' cy='35' r='10' fill='#333' />
							<circle cx='85' cy='35' r='5' fill='#aaa' />
							<path
								d='M85,30 L85,40 M80,35 L90,35'
								stroke='white'
								strokeWidth='1.5'
							/>
						</motion.g>
					</svg>
				</motion.div>

				{/* Текст загрузки */}
				<motion.div
					className='flex flex-col items-center gap-2'
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.5 }}
				>
					<div className='text-lg font-medium text-[#0e2cc2]'>Загрузка</div>

					{/* Индикатор загрузки */}
					<div className='w-48 h-1.5 bg-gray-100 rounded-full overflow-hidden'>
						<motion.div
							className='h-full bg-gradient-to-r from-[#0e2cc2] to-[#a330f0]'
							initial={{ width: 0 }}
							animate={{ width: '100%' }}
							transition={{
								duration: 2,
								repeat: Infinity,
								repeatType: 'reverse',
								ease: 'easeInOut',
							}}
						/>
					</div>
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
