import { motion } from 'framer-motion'
import {
	FaSearch,
	FaFileContract,
	FaTruck,
	FaFlagCheckered,
} from 'react-icons/fa'

const steps = [
	{
		num: '1',
		icon: FaSearch,
		title: 'Выбор авто',
		text: 'Выбирайте автомобиль из каталога или оставьте заявку на подбор.',
	},
	{
		num: '2',
		icon: FaFileContract,
		title: 'Оформление сделки',
		text: 'Подписываем договор и вносим предоплату.',
	},
	{
		num: '3',
		icon: FaTruck,
		title: 'Доставка',
		text: 'Организуем быструю доставку в ваш регион.',
	},
	{
		num: '4',
		icon: FaFlagCheckered,
		title: 'Получение авто',
		text: 'Вы получаете автомобиль и подписываете документы.',
	},
]

const HowItWorks = () => {
	return (
		<section className='bg-avtoVitaBlack py-20 px-6'>
			<div className='max-w-6xl mx-auto'>
				<motion.div
					initial={{ opacity: 0, y: 40 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, amount: 0.2 }}
					transition={{ duration: 0.6, ease: 'easeOut' }}
					className='text-center mb-14'
				>
					<h2 className='text-4xl font-bold text-white mb-4'>
						Как <span className='text-avtoVitaGold'>мы</span> работаем
					</h2>
					<p className='text-lg text-gray-400 max-w-3xl mx-auto'>
						Процесс покупки автомобиля у нас прост и прозрачен.
					</p>
				</motion.div>

				{/* Desktop: horizontal timeline */}
				<div className='hidden md:block relative'>
					{/* Connecting line */}
					<motion.div
						initial={{ scaleX: 0 }}
						whileInView={{ scaleX: 1 }}
						viewport={{ once: true, amount: 0.3 }}
						transition={{ duration: 0.8, ease: 'easeOut' }}
						className='absolute top-6 left-[12.5%] right-[12.5%] h-0.5 bg-avtoVitaGold/30 origin-left'
					/>

					<div className='grid grid-cols-4 gap-8'>
						{steps.map((step, index) => (
							<motion.div
								key={step.num}
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true, amount: 0.2 }}
								transition={{
									duration: 0.5,
									delay: 0.3 + index * 0.2,
									ease: 'easeOut',
								}}
								className='flex flex-col items-center text-center'
							>
								{/* Numbered circle */}
								<div className='w-12 h-12 rounded-full border-2 border-avtoVitaGold bg-avtoVitaBlack flex items-center justify-center mb-5 relative z-10'>
									<span className='text-avtoVitaGold font-bold text-lg'>
										{step.num}
									</span>
								</div>

								{/* Icon */}
								<step.icon className='text-avtoVitaGold text-2xl mb-3' />

								{/* Content */}
								<h3 className='text-lg font-semibold text-white mb-2'>
									{step.title}
								</h3>
								<p className='text-gray-500 text-sm leading-relaxed'>
									{step.text}
								</p>
							</motion.div>
						))}
					</div>
				</div>

				{/* Mobile: vertical timeline */}
				<div className='md:hidden relative pl-10'>
					{/* Vertical line */}
					<motion.div
						initial={{ scaleY: 0 }}
						whileInView={{ scaleY: 1 }}
						viewport={{ once: true, amount: 0.1 }}
						transition={{ duration: 0.8, ease: 'easeOut' }}
						className='absolute left-[18px] top-0 bottom-0 w-0.5 bg-avtoVitaGold/30 origin-top'
					/>

					<div className='space-y-10'>
						{steps.map((step, index) => (
							<motion.div
								key={step.num}
								initial={{ opacity: 0, x: -20 }}
								whileInView={{ opacity: 1, x: 0 }}
								viewport={{ once: true, amount: 0.2 }}
								transition={{
									duration: 0.5,
									delay: index * 0.15,
									ease: 'easeOut',
								}}
								className='relative'
							>
								{/* Numbered circle on the line */}
								<div className='absolute -left-10 top-0 w-10 h-10 rounded-full border-2 border-avtoVitaGold bg-avtoVitaBlack flex items-center justify-center z-10'>
									<span className='text-avtoVitaGold font-bold text-sm'>
										{step.num}
									</span>
								</div>

								{/* Content */}
								<div className='pl-4'>
									<div className='flex items-center gap-3 mb-2'>
										<step.icon className='text-avtoVitaGold text-xl' />
										<h3 className='text-lg font-semibold text-white'>
											{step.title}
										</h3>
									</div>
									<p className='text-gray-500 text-sm leading-relaxed'>
										{step.text}
									</p>
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</div>
		</section>
	)
}

export default HowItWorks
