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
				<h2 className='text-4xl font-bold text-blac mb-6'>
					Как <span className='text-red-500'>мы</span> работаем
				</h2>
				<p className='text-lg text-black max-w-3xl mx-auto'>
					Процесс покупки автомобиля у нас прост и прозрачен.
				</p>

				{/* Шаги процесса */}
				<div className='grid grid-cols-1 md:grid-cols-4 gap-8 mt-10'>
					{/* Шаг 1 */}
					<div className='p-6 bg-black rounded-lg shadow-lg flex flex-col items-center text-center'>
						<FaSearch className='text-red-500 text-4xl mb-4' />
						<h3 className='text-xl font-semibold text-white'>1. Выбор авто</h3>
						<p className='text-gray-400 mt-2'>
							Выбирайте автомобиль из каталога или оставьте заявку на подбор.
						</p>
					</div>

					{/* Шаг 2 */}
					<div className='p-6 bg-black rounded-lg shadow-lg flex flex-col items-center text-center'>
						<FaFileContract className='text-red-500 text-4xl mb-4' />
						<h3 className='text-xl font-semibold text-white'>
							2. Оформление сделки
						</h3>
						<p className='text-gray-400 mt-2'>
							Подписываем договор и вносим предоплату.
						</p>
					</div>

					{/* Шаг 3 */}
					<div className='p-6 bg-black rounded-lg shadow-lg flex flex-col items-center text-center'>
						<FaTruck className='text-red-500 text-4xl mb-4' />
						<h3 className='text-xl font-semibold text-white'>3. Доставка</h3>
						<p className='text-gray-400 mt-2'>
							Организуем быструю доставку в ваш регион.
						</p>
					</div>

					{/* Шаг 4 */}
					<div className='p-6 bg-black rounded-lg shadow-lg flex flex-col items-center text-center'>
						<FaFlagCheckered className='text-red-500 text-4xl mb-4' />
						<h3 className='text-xl font-semibold text-white'>
							4. Получение авто
						</h3>
						<p className='text-gray-400 mt-2'>
							Вы получаете автомобиль и подписываете документы.
						</p>
					</div>
				</div>
			</div>
		</section>
	)
}

export default HowItWorks
