import {
	FaTruck,
	FaDollarSign,
	FaHandshake,
	FaCheckCircle,
} from 'react-icons/fa'

const BenefitsSection = () => {
	return (
		<section className='bg-gray-200 text-black py-16 px-6'>
			<div className='max-w-6xl mx-auto text-center'>
				<h2 className='text-4xl font-bold text-black mb-8'>
					Почему выбирают нас?
				</h2>

				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
					{/* Прямая поставка */}
					<div className='p-6 bg-gray-900 rounded-xl shadow-lg flex flex-col items-center text-center'>
						<FaTruck className='text-red-500 text-5xl mb-4' />
						<h3 className='text-xl font-semibold text-white'>
							Прямые поставки
						</h3>
						<p className='text-gray-400 mt-2'>
							Автомобили напрямую из Южной Кореи без посредников.
						</p>
					</div>

					{/* Честные цены */}
					<div className='p-6 bg-gray-900 rounded-xl shadow-lg flex flex-col items-center text-center'>
						<FaDollarSign className='text-red-500 text-5xl mb-4' />
						<h3 className='text-xl font-semibold text-white'>Честные цены</h3>
						<p className='text-gray-400 mt-2'>
							Прозрачная стоимость без скрытых комиссий и переплат.
						</p>
					</div>

					{/* Полный цикл услуг */}
					<div className='p-6 bg-gray-900 rounded-xl shadow-lg flex flex-col items-center text-center'>
						<FaHandshake className='text-red-500 text-5xl mb-4' />
						<h3 className='text-xl font-semibold text-white'>
							Полный цикл услуг
						</h3>
						<p className='text-gray-400 mt-2'>
							От подбора авто до доставки и таможенного оформления.
						</p>
					</div>

					{/* Гарантия качества */}
					<div className='p-6 bg-gray-900 rounded-xl shadow-lg flex flex-col items-center text-center'>
						<FaCheckCircle className='text-red-500 text-5xl mb-4' />
						<h3 className='text-xl font-semibold text-white'>
							Гарантия качества
						</h3>
						<p className='text-gray-400 mt-2'>
							Только проверенные автомобили с полной историей.
						</p>
					</div>
				</div>
			</div>
		</section>
	)
}

export default BenefitsSection
