import { motion } from 'framer-motion'
import { FaShieldAlt, FaShippingFast, FaBalanceScale } from 'react-icons/fa'

const cards = [
	{
		icon: FaShieldAlt,
		title: 'Проверенные авто',
		text: 'Только проверенные автомобили с прозрачной историей и полной документацией.',
	},
	{
		icon: FaShippingFast,
		title: 'Быстрая доставка',
		text: 'Оптимизированная логистика позволяет доставить авто в кратчайшие сроки.',
	},
	{
		icon: FaBalanceScale,
		title: 'Честные цены',
		text: 'Прозрачное ценообразование без скрытых платежей и комиссий.',
	},
]

const AboutUs = () => {
	return (
		<section className='bg-avtoVitaBlack py-20 px-6'>
			<div className='max-w-6xl mx-auto text-center'>
				<motion.div
					initial={{ opacity: 0, y: 40 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, amount: 0.2 }}
					transition={{ duration: 0.6, ease: 'easeOut' }}
				>
					<h2 className='text-4xl font-bold text-white mb-6'>
						О <span className='text-avtoVitaGold'>AVTOVITA</span>
					</h2>
					<p className='text-lg text-gray-400 max-w-3xl mx-auto'>
						Мы – компания, занимающаяся экспортом автомобилей из Южной Кореи.
						Предлагаем широкий выбор автомобилей по выгодным ценам и с полной
						прозрачностью на всех этапах покупки.
					</p>
				</motion.div>

				<div className='grid grid-cols-1 md:grid-cols-3 gap-8 mt-12'>
					{cards.map((card, index) => (
						<motion.div
							key={card.title}
							initial={{ opacity: 0, y: 40 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, amount: 0.2 }}
							transition={{
								duration: 0.5,
								delay: index * 0.15,
								ease: 'easeOut',
							}}
							className='p-8 bg-[#1e1e1e] rounded-xl border border-avtoVitaGold/20 hover:border-avtoVitaGold/40 hover:shadow-[0_0_20px_rgba(255,215,0,0.08)] transition duration-300'
						>
							<div className='w-14 h-14 bg-avtoVitaGold/10 rounded-full flex items-center justify-center mx-auto mb-5'>
								<card.icon className='text-avtoVitaGold text-2xl' />
							</div>
							<h3 className='text-xl font-semibold text-white mb-2'>
								{card.title}
							</h3>
							<p className='text-gray-400'>{card.text}</p>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	)
}

export default AboutUs
