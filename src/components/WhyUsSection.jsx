import { motion } from 'framer-motion'
import {
	FaTruck,
	FaDollarSign,
	FaHandshake,
	FaCheckCircle,
} from 'react-icons/fa'

const benefits = [
	{
		icon: FaTruck,
		title: 'Прямые поставки',
		text: 'Автомобили напрямую из Южной Кореи без посредников.',
	},
	{
		icon: FaDollarSign,
		title: 'Честные цены',
		text: 'Прозрачная стоимость без скрытых комиссий и переплат.',
	},
	{
		icon: FaHandshake,
		title: 'Полный цикл услуг',
		text: 'От подбора авто до доставки и таможенного оформления.',
	},
	{
		icon: FaCheckCircle,
		title: 'Гарантия качества',
		text: 'Только проверенные автомобили с полной историей.',
	},
]

const BenefitsSection = () => {
	return (
		<section className='bg-[#1a1a1a] border-t border-avtoVitaGold/10 py-20 px-6'>
			<div className='max-w-6xl mx-auto'>
				<motion.h2
					initial={{ opacity: 0, y: 40 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, amount: 0.2 }}
					transition={{ duration: 0.6, ease: 'easeOut' }}
					className='text-4xl font-bold text-white text-center mb-12'
				>
					Почему выбирают{' '}
					<span className='text-avtoVitaGold'>нас?</span>
				</motion.h2>

				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
					{benefits.map((item, index) => (
						<motion.div
							key={item.title}
							initial={{ opacity: 0, x: -30 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true, amount: 0.2 }}
							transition={{
								duration: 0.5,
								delay: index * 0.15,
								ease: 'easeOut',
							}}
							className='border-l-2 border-avtoVitaGold pl-6 py-4 bg-white/[0.02] hover:border-avtoVitaGold hover:bg-avtoVitaGold/[0.03] hover:shadow-[0_0_20px_rgba(255,215,0,0.06)] transition duration-300'
						>
							<item.icon className='text-avtoVitaGold text-3xl mb-4' />
							<h3 className='text-lg font-semibold text-white mb-2'>
								{item.title}
							</h3>
							<p className='text-gray-500 text-sm leading-relaxed'>
								{item.text}
							</p>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	)
}

export default BenefitsSection
