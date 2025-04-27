import {
	FaTruck,
	FaDollarSign,
	FaHandshake,
	FaCheckCircle,
} from 'react-icons/fa'

const BenefitsSection = () => {
	return (
		<section className='bg-[#f0f0ff] text-black py-16 px-6'>
			<div className='max-w-6xl mx-auto text-center'>
				<h2 className='text-4xl font-bold text-[#0e2cc2] mb-8'>
					Почему выбирают нас?
				</h2>

				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
					{/* Прямая поставка */}
					<div className='p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 flex flex-col items-center text-center border border-[#0e2cc2]/10'>
						<FaTruck className='text-[#a330f0] text-5xl mb-4' />
						<h3 className='text-xl font-semibold text-[#0e2cc2]'>
							Прямые поставки
						</h3>
						<p className='text-[#4a4a7b] mt-2'>
							Автомобили напрямую из Южной Кореи без посредников.
						</p>
					</div>

					{/* Честные цены */}
					<div className='p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 flex flex-col items-center text-center border border-[#0e2cc2]/10'>
						<FaDollarSign className='text-[#a330f0] text-5xl mb-4' />
						<h3 className='text-xl font-semibold text-[#0e2cc2]'>
							Честные цены
						</h3>
						<p className='text-[#4a4a7b] mt-2'>
							Прозрачная стоимость без скрытых комиссий и переплат.
						</p>
					</div>

					{/* Полный цикл услуг */}
					<div className='p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 flex flex-col items-center text-center border border-[#0e2cc2]/10'>
						<FaHandshake className='text-[#a330f0] text-5xl mb-4' />
						<h3 className='text-xl font-semibold text-[#0e2cc2]'>
							Полный цикл услуг
						</h3>
						<p className='text-[#4a4a7b] mt-2'>
							От подбора авто до доставки и таможенного оформления.
						</p>
					</div>

					{/* Гарантия качества */}
					<div className='p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 flex flex-col items-center text-center border border-[#0e2cc2]/10'>
						<FaCheckCircle className='text-[#a330f0] text-5xl mb-4' />
						<h3 className='text-xl font-semibold text-[#0e2cc2]'>
							Гарантия качества
						</h3>
						<p className='text-[#4a4a7b] mt-2'>
							Только проверенные автомобили с полной историей.
						</p>
					</div>
				</div>
			</div>
		</section>
	)
}

export default BenefitsSection
