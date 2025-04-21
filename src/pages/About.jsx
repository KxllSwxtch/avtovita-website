import {
	FaCheckCircle,
	FaUsers,
	FaHandshake,
	FaQuestionCircle,
} from 'react-icons/fa'

const About = () => {
	return (
		<div className='bg-gradient-to-b from-white via-gray-50 to-white text-gray-800 mt-20'>
			{/* Введение */}
			<section className='py-16 px-6 text-center'>
				<div className='max-w-4xl mx-auto'>
					<h2 className='text-5xl font-bold text-red-600 mb-6'>О нас</h2>
					<p className='text-lg text-gray-600 leading-relaxed'>
						Мы — компания{' '}
						<span className='text-red-600 font-semibold'>AVTOVITA</span>,
						специализируемся на экспорте автомобилей из Южной Кореи в Россию,
						Казахстан, Кыргызстан и другие страны. Помогаем клиентам находить
						качественные автомобили по выгодным ценам, сопровождаем на всех
						этапах сделки.
					</p>
				</div>
			</section>

			{/* Наша миссия */}
			<section className='py-16 px-6 bg-white text-center shadow-md'>
				<div className='max-w-4xl mx-auto'>
					<h3 className='text-4xl font-semibold text-red-600 mb-4'>
						Наша миссия
					</h3>
					<p className='text-lg text-gray-600 leading-relaxed'>
						Мы стремимся сделать покупку авто из Кореи прозрачной, доступной и
						безопасной. Наша цель — помочь каждому клиенту найти идеальный
						автомобиль без переплат и рисков.
					</p>
				</div>
			</section>

			{/* Наши преимущества */}
			<section className='py-16 px-6 text-center'>
				<div className='max-w-6xl mx-auto'>
					<h3 className='text-4xl font-semibold text-red-600 mb-8'>
						Почему выбирают нас?
					</h3>
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
						<div className='p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col justify-center items-center'>
							<FaCheckCircle className='text-red-600 text-5xl mb-4' />
							<h4 className='text-2xl font-semibold text-gray-800'>
								Прозрачность
							</h4>
							<p className='text-gray-600 mt-2'>
								Работаем официально, без скрытых платежей.
							</p>
						</div>
						<div className='p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col justify-center items-center'>
							<FaUsers className='text-red-600 text-5xl mb-4' />
							<h4 className='text-2xl font-semibold text-gray-800'>
								Опытная команда
							</h4>
							<p className='text-gray-600 mt-2'>
								Наши специалисты знают рынок Кореи изнутри.
							</p>
						</div>
						<div className='p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col justify-center items-center'>
							<FaHandshake className='text-red-600 text-5xl mb-4' />
							<h4 className='text-2xl font-semibold text-gray-800'>Гарантии</h4>
							<p className='text-gray-600 mt-2'>
								Проверяем автомобили перед покупкой, работаем только с
								проверенными продавцами.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Команда */}
			<section className='py-16 px-6 bg-white text-center shadow-md'>
				<div className='max-w-6xl mx-auto'>
					<h3 className='text-4xl font-semibold text-red-600 mb-8'>
						Наша команда
					</h3>
					<p className='text-lg text-gray-600 mb-6'>
						Наши специалисты всегда готовы помочь вам.
					</p>
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
						<div className='p-6 bg-gray-100 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300'>
							<h4 className='text-2xl font-semibold text-gray-800'>Виталий</h4>
							<p className='text-gray-600'>Менеджер по продажам</p>
						</div>
						<div className='p-6 bg-gray-100 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300'>
							<h4 className='text-2xl font-semibold text-gray-800'>
								Ким Евгений
							</h4>
							<p className='text-gray-600'>Специалист по логистике</p>
						</div>
						<div className='p-6 bg-gray-100 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300'>
							<h4 className='text-2xl font-semibold text-gray-800'>Цой Евгений</h4>
							<p className='text-gray-600'>Финансовый консультант</p>
						</div>
					</div>
				</div>
			</section>

			{/* Частые вопросы (FAQ) */}
			<section className='py-16 px-6 text-center'>
				<div className='max-w-6xl mx-auto'>
					<h3 className='text-4xl font-semibold text-red-600 mb-8'>
						Частые вопросы
					</h3>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
						<div className='p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 text-left'>
							<h4 className='text-2xl font-semibold text-gray-800 flex items-center gap-2'>
								<FaQuestionCircle className='text-red-600' />
								Как выбрать авто?
							</h4>
							<p className='text-gray-600 mt-2'>
								Вы можете воспользоваться нашим каталогом и фильтрами поиска.
							</p>
						</div>
						<div className='p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 text-left'>
							<h4 className='text-2xl font-semibold text-gray-800 flex items-center gap-2'>
								<FaQuestionCircle className='text-red-600' />
								Какие гарантии у меня есть?
							</h4>
							<p className='text-gray-600 mt-2'>
								Мы проверяем все авто перед отправкой и работаем только с
								проверенными продавцами.
							</p>
						</div>
					</div>
				</div>
			</section>
		</div>
	)
}

export default About
