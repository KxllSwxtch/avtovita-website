import {
	FaCheckCircle,
	FaUsers,
	FaHandshake,
	FaQuestionCircle,
} from 'react-icons/fa'

const About = () => {
	return (
		<div className='bg-white text-gray-800 mt-20'>
			{/* Введение */}
			<section className='py-16 px-6 text-center'>
				<div className='max-w-4xl mx-auto'>
					<h2 className='text-5xl font-bold text-[#0e2cc2] mb-6'>О нас</h2>
					<p className='text-lg text-gray-600 leading-relaxed'>
						Мы — компания{' '}
						<span className='text-[#a330f0] font-semibold'>AVTOVITA</span>,
						специализируемся на экспорте автомобилей из Южной Кореи в Россию,
						Казахстан, Кыргызстан и другие страны. Помогаем клиентам находить
						качественные автомобили по выгодным ценам, сопровождаем на всех
						этапах сделки.
					</p>
				</div>
			</section>

			{/* Наша миссия */}
			<section className='py-16 px-6 border-t border-gray-100'>
				<div className='max-w-4xl mx-auto'>
					<h3 className='text-4xl font-semibold text-[#0e2cc2] mb-4 text-center'>
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
			<section className='py-16 px-6 bg-gray-50'>
				<div className='max-w-6xl mx-auto'>
					<h3 className='text-4xl font-semibold text-[#0e2cc2] mb-12 text-center'>
						Почему выбирают нас?
					</h3>
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
						<div className='p-6 flex flex-col justify-center items-center'>
							<FaCheckCircle className='text-[#a330f0] text-5xl mb-4' />
							<h4 className='text-2xl font-semibold text-gray-800'>
								Прозрачность
							</h4>
							<p className='text-gray-600 mt-2 text-center'>
								Работаем официально, без скрытых платежей.
							</p>
						</div>
						<div className='p-6 flex flex-col justify-center items-center'>
							<FaUsers className='text-[#a330f0] text-5xl mb-4' />
							<h4 className='text-2xl font-semibold text-gray-800'>
								Опытная команда
							</h4>
							<p className='text-gray-600 mt-2 text-center'>
								Наши специалисты знают рынок Кореи изнутри.
							</p>
						</div>
						<div className='p-6 flex flex-col justify-center items-center'>
							<FaHandshake className='text-[#a330f0] text-5xl mb-4' />
							<h4 className='text-2xl font-semibold text-gray-800'>Гарантии</h4>
							<p className='text-gray-600 mt-2 text-center'>
								Проверяем автомобили перед покупкой, работаем только с
								проверенными продавцами.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Команда */}
			<section className='py-16 px-6'>
				<div className='max-w-6xl mx-auto'>
					<h3 className='text-4xl font-semibold text-[#0e2cc2] mb-8 text-center'>
						Наша команда
					</h3>
					<p className='text-lg text-gray-600 mb-10 text-center'>
						Наши специалисты всегда готовы помочь вам.
					</p>
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
						<div className='p-6 border-l-4 border-[#0e2cc2] bg-gray-50'>
							<img src="/team/yevgenii.jpeg" alt="Ким Евгений" className="w-full h-48 object-cover mb-4 rounded-lg" />
							<h4 className='text-2xl font-semibold text-gray-800'>
								Ким Евгений
							</h4>
						</div>
						<div className='p-6 border-l-4 border-[#0e2cc2] bg-gray-50'>
							<img src="/team/vitalii.jpeg" alt="Югай Виталий" className="w-full h-48 object-cover mb-4 rounded-lg" />
							<h4 className='text-2xl font-semibold text-gray-800'>
								Югай Виталий
							</h4>
						</div>
						<div className='p-6 border-l-4 border-[#0e2cc2] bg-gray-50'>
							<img src="/team/konstantin.jpeg" alt="Ким Константин" className="w-full h-48 object-cover mb-4 rounded-lg" />
							<h4 className='text-2xl font-semibold text-gray-800'>
								Ким Константин
							</h4>
						</div>
						<div className='p-6 border-l-4 border-[#0e2cc2] bg-gray-50'>
							<img src="/team/sergey.jpeg" alt="Пак Сергей" className="w-full h-48 object-cover mb-4 rounded-lg" />
							<h4 className='text-2xl font-semibold text-gray-800'>
								Пак Сергей
							</h4>
						</div>
					</div>
				</div>
			</section>

			{/* Частые вопросы (FAQ) */}
			<section className='py-16 px-6 bg-gray-50'>
				<div className='max-w-6xl mx-auto'>
					<h3 className='text-4xl font-semibold text-[#0e2cc2] mb-12 text-center'>
						Частые вопросы
					</h3>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
						<div className='p-6 border-b border-gray-200 text-left'>
							<h4 className='text-2xl font-semibold text-gray-800 flex items-center gap-2'>
								<FaQuestionCircle className='text-[#a330f0]' />
								Как выбрать авто?
							</h4>
							<p className='text-gray-600 mt-2'>
								Вы можете воспользоваться нашим каталогом и фильтрами поиска.
							</p>
						</div>
						<div className='p-6 border-b border-gray-200 text-left'>
							<h4 className='text-2xl font-semibold text-gray-800 flex items-center gap-2'>
								<FaQuestionCircle className='text-[#a330f0]' />
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
