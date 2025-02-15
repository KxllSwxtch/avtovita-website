import {
	FaPhone,
	FaEnvelope,
	FaMapMarkerAlt,
	FaWhatsapp,
	FaTelegram,
	FaInstagram,
	FaYoutube,
} from 'react-icons/fa'

const Contacts = () => {
	return (
		<div className='bg-black text-white mt-10'>
			{/* Заголовок */}
			<section className='py-16 px-6 text-center'>
				<h2 className='text-4xl font-bold text-red-500 mb-6'>
					Свяжитесь с нами
				</h2>
				<p className='text-lg text-gray-300 max-w-3xl mx-auto'>
					Вы можете позвонить, написать или приехать к нам. Мы всегда на связи!
				</p>
			</section>

			{/* Контакты */}
			<section className='py-16 px-6'>
				<div className='max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8'>
					{/* Контактная информация */}
					<div>
						<h3 className='text-3xl font-semibold text-red-500 mb-6'>
							Контактная информация
						</h3>
						<div className='space-y-4'>
							<div className='flex items-center gap-4'>
								<FaPhone className='text-red-500 text-2xl' />
								<div>
									<p className='text-lg font-semibold'>Телефоны</p>
									<p className='text-gray-400'>Виталий: +82 10-9344-1782</p>
									<p className='text-gray-400'>Ким Евгений: +82 10-4225-2627</p>
									<p className='text-gray-400'>Цой Юрий: +82 10-7609-7787</p>
									<p className='text-gray-400'>Цой Евгений: +82 10-4416-8778</p>
								</div>
							</div>

							<div className='flex items-center gap-4'>
								<FaEnvelope className='text-red-500 text-2xl' />
								<div>
									<p className='text-lg font-semibold'>E-mail</p>
									<a
										href='mailto:info@avtovita.com'
										className='text-gray-400 hover:text-red-500'
									>
										info@avtovita.com
									</a>
								</div>
							</div>

							<div className='flex items-center gap-4'>
								<FaMapMarkerAlt className='text-red-500 text-2xl' />
								<div>
									<p className='text-lg font-semibold'>Адрес</p>
									<p className='text-gray-400'>Южная Корея, г. Сеул</p>
								</div>
							</div>
						</div>
					</div>

					{/* Форма обратной связи */}
					<div className='bg-gray-900 p-6 rounded-lg shadow-lg'>
						<h3 className='text-3xl font-semibold text-red-500 mb-4'>
							Напишите нам
						</h3>
						<form className='space-y-4'>
							<input
								type='text'
								placeholder='Ваше имя'
								className='w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-red-500 focus:outline-none'
							/>
							<input
								type='email'
								placeholder='Ваш e-mail'
								className='w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-red-500 focus:outline-none'
							/>
							<textarea
								rows='4'
								placeholder='Ваше сообщение'
								className='w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-red-500 focus:outline-none'
							></textarea>
							<button
								type='submit'
								className='w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-lg transition'
							>
								Отправить
							</button>
						</form>
					</div>
				</div>
			</section>

			{/* Соцсети */}
			<section className='py-10 px-6 text-center'>
				<h3 className='text-3xl font-semibold text-red-500 mb-6'>
					Мы в соцсетях
				</h3>
				<div className='flex justify-center gap-6 text-3xl'>
					<a
						href='https://wa.me/821093441782'
						className='text-green-400 hover:text-green-500 transition'
					>
						<FaWhatsapp />
					</a>
					<a
						href='https://t.me/avtovita'
						className='text-blue-400 hover:text-blue-500 transition'
					>
						<FaTelegram />
					</a>
					<a
						href='https://instagram.com/avtovita'
						className='text-pink-500 hover:text-pink-600 transition'
					>
						<FaInstagram />
					</a>
					<a
						href='https://youtube.com/avtovita'
						className='text-red-500 hover:text-red-600 transition'
					>
						<FaYoutube />
					</a>
				</div>
			</section>

			{/* Карта */}
			<section className='py-16 px-6'>
				<h3 className='text-3xl font-semibold text-red-500 text-center mb-6'>
					Наше местоположение
				</h3>
				<div className='max-w-6xl mx-auto'>
					<iframe
						title='Google Map'
						className='w-full h-80 rounded-lg shadow-lg'
						src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12659.658538940635!2d126.97837454677705!3d37.56667917975745!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca2a4e1682af5%3A0x9f32ef0b34f4e2b8!2z0JzQnNCcIC0g0KHQsNC50LTQvtC9INC60LjRh9C10YHQutCw0Y8g0YLQtdCw0YLRjNC10L3QvdC-0Lkg0LrQvtC80L_QtdGB0LrQvtCz0LjRh9C10YHRgtGMLCDQmNCy0L3QsNGC!5e0!3m2!1sru!2skr!4v1618461203745!5m2!1sru!2skr'
						allowFullScreen=''
						loading='lazy'
					></iframe>
				</div>
			</section>
		</div>
	)
}

export default Contacts
