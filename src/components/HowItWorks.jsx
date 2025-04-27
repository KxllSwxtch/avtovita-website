import {
	FaSearch,
	FaFileContract,
	FaTruck,
	FaFlagCheckered,
} from 'react-icons/fa'

const HowItWorks = () => {
	return (
		<section className='bg-white text-black py-16 px-6'>
			<div className='max-w-6xl mx-auto text-center'>
				<h2 className='text-4xl font-bold text-[#0e2cc2] mb-6'>
					Как <span className='text-[#a330f0]'>мы</span> работаем
				</h2>
				<p className='text-lg text-[#4a4a7b] max-w-3xl mx-auto'>
					Процесс покупки автомобиля у нас прост и прозрачен.
				</p>

				{/* Шаги процесса */}
				<div className='grid grid-cols-1 md:grid-cols-4 gap-8 mt-10'>
					{/* Шаг 1 */}
					<div className='p-6 bg-[#f0f0ff] rounded-lg shadow-md hover:shadow-lg transition duration-300 flex flex-col items-center text-center border border-[#0e2cc2]/10'>
						<FaSearch className='text-[#a330f0] text-4xl mb-4' />
						<h3 className='text-xl font-semibold text-[#0e2cc2]'>
							1. Выбор авто
						</h3>
						<p className='text-[#4a4a7b] mt-2'>
							Выбирайте автомобиль из каталога или оставьте заявку на подбор.
						</p>
					</div>

					{/* Шаг 2 */}
					<div className='p-6 bg-[#f0f0ff] rounded-lg shadow-md hover:shadow-lg transition duration-300 flex flex-col items-center text-center border border-[#0e2cc2]/10'>
						<FaFileContract className='text-[#a330f0] text-4xl mb-4' />
						<h3 className='text-xl font-semibold text-[#0e2cc2]'>
							2. Оформление сделки
						</h3>
						<p className='text-[#4a4a7b] mt-2'>
							Подписываем договор и вносим предоплату.
						</p>
					</div>

					{/* Шаг 3 */}
					<div className='p-6 bg-[#f0f0ff] rounded-lg shadow-md hover:shadow-lg transition duration-300 flex flex-col items-center text-center border border-[#0e2cc2]/10'>
						<FaTruck className='text-[#a330f0] text-4xl mb-4' />
						<h3 className='text-xl font-semibold text-[#0e2cc2]'>
							3. Доставка
						</h3>
						<p className='text-[#4a4a7b] mt-2'>
							Организуем быструю доставку в ваш регион.
						</p>
					</div>

					{/* Шаг 4 */}
					<div className='p-6 bg-[#f0f0ff] rounded-lg shadow-md hover:shadow-lg transition duration-300 flex flex-col items-center text-center border border-[#0e2cc2]/10'>
						<FaFlagCheckered className='text-[#a330f0] text-4xl mb-4' />
						<h3 className='text-xl font-semibold text-[#0e2cc2]'>
							4. Получение авто
						</h3>
						<p className='text-[#4a4a7b] mt-2'>
							Вы получаете автомобиль и подписываете документы.
						</p>
					</div>
				</div>
			</div>
		</section>
	)
}

export default HowItWorks
