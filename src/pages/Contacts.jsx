import {
	FaMapMarkerAlt,
	FaWhatsapp,
	FaTelegram,
	FaInstagram,
	FaYoutube,
} from 'react-icons/fa'

const Contacts = () => {
	return (
		<div className='bg-gray-50 text-gray-800 mt-30'>
			{/* Заголовок */}
			<section className='py-10 px-6 text-center'>
				<h2 className='text-5xl font-bold text-red-600 mb-6'>
					Свяжитесь с нами
				</h2>
				<p className='text-lg text-gray-600 max-w-3xl mx-auto'>
					Вы можете позвонить, написать или приехать к нам. Мы всегда на связи!
				</p>
			</section>

			{/* Контакты */}
			<section className='py-16 px-6'>
				<div className='max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12'>
					{/* Контактная информация */}
					<div className='bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 space-y-10'>
						{/* Главный офис */}
						<div>
							<h3 className='text-3xl font-semibold text-red-600 mb-4'>
								Головной офис
							</h3>
							<img
								src='https://res.cloudinary.com/dt0nkqowc/image/upload/v1743116189/AvtoVita/avtodome_logo_wuwh07.jpg'
								alt='Главный офис'
								className='w-full h-auto rounded-lg mb-4'
							/>
							<div className='space-y-2 text-lg text-gray-800'>
								<p className='flex items-center gap-2'>
									<FaMapMarkerAlt className='text-red-600' /> Republic of Korea,
									경기 안산시 단원구 풍전로 53, 451호 The중고차
								</p>
								<p className='flex items-center gap-2'>
									📞 <span className='font-semibold'>Цой Юрий:</span>{' '}
									<a
										href='tel:+821076097787'
										className='text-red-600 hover:underline'
									>
										+82 (10)-7609-7787
									</a>
								</p>
								<p className='flex items-center gap-2'>
									📞 <span className='font-semibold'>Ким Евгений:</span>{' '}
									<a
										href='tel:+821042252627'
										className='text-red-600 hover:underline'
									>
										+82 (10)-4225-2627
									</a>
								</p>
								<p className='flex items-center gap-2'>
									📞 <span className='font-semibold'>Югай Виталий:</span>{' '}
									<a
										href='tel:+821093441782'
										className='text-red-600 hover:underline'
									>
										+82 (10)-9344-1782
									</a>
								</p>
								<div className='flex gap-4 text-2xl mt-2'>
									<a href='#' className='text-blue-400 hover:text-blue-500'>
										<FaTelegram />
									</a>
									<a href='#' className='text-green-500 hover:text-green-600'>
										<FaWhatsapp />
									</a>
									<a href='#' className='text-pink-500 hover:text-pink-600'>
										<FaInstagram />
									</a>
								</div>
							</div>
						</div>
					</div>

					{/* Форма обратной связи */}
					<div className='bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300'>
						<h3 className='text-3xl font-semibold text-red-600 mb-4'>
							Напишите нам
						</h3>
						<form className='space-y-6'>
							<input
								type='text'
								placeholder='Ваше имя'
								className='w-full p-4 rounded-lg bg-gray-100 border border-gray-300 focus:border-red-600 focus:outline-none transition'
							/>
							<input
								type='email'
								placeholder='Ваш e-mail'
								className='w-full p-4 rounded-lg bg-gray-100 border border-gray-300 focus:border-red-600 focus:outline-none transition'
							/>
							<textarea
								rows='4'
								placeholder='Ваше сообщение'
								className='w-full p-4 rounded-lg bg-gray-100 border border-gray-300 focus:border-red-600 focus:outline-none transition'
							></textarea>
							<button
								type='submit'
								className='w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-4 rounded-lg transition'
							>
								Отправить
							</button>
						</form>
					</div>
				</div>
			</section>

			{/* Соцсети */}
			<section className='py-10 px-6 text-center'>
				<h3 className='text-4xl font-semibold text-red-600 mb-6'>
					Мы в соцсетях
				</h3>
				<div className='flex justify-center gap-8 text-4xl'>
					{/* <a
						href='https://wa.me/821093441782'
						className='text-green-500 hover:text-green-600 transition-transform transform hover:scale-110'
					>
						<FaWhatsapp />
					</a> */}
					<a
						target='_blank'
						rel='noopener noreferer'
						href='https://t.me/avtovita'
						className='text-blue-400 hover:text-blue-500 transition-transform transform hover:scale-110'
					>
						<FaTelegram />
					</a>
					<a
						target='_blank'
						rel='noopener noreferer'
						href='https://instagram.com/avtovita'
						className='text-pink-500 hover:text-pink-600 transition-transform transform hover:scale-110'
					>
						<FaInstagram />
					</a>
					{/* <a
						href='https://youtube.com/avtovita'
						className='text-red-600 hover:text-red-700 transition-transform transform hover:scale-110'
					>
						<FaYoutube />
					</a> */}
				</div>
			</section>

			{/* Карта */}
			<section className='px-6'>
				<div className='max-w-6xl mx-auto rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300'>
					<iframe
						title='Google map'
						src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3172.765035298867!2d126.789744675919!3d37.32439303797588!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357b6e2df9e21c1d%3A0x8a17213e594f3685!2s53%20Pungjeon-ro%2C%20Danwon-gu%2C%20Ansan-si%2C%20Gyeonggi-do!5e0!3m2!1sen!2skr!4v1739839720681!5m2!1sen!2skr'
						width='600'
						height='450'
						className='w-full h-100 rounded-lg'
						allowFullScreen=''
						loading='lazy'
						referrerPolicy='no-referrer-when-downgrade'
					></iframe>
				</div>
			</section>
		</div>
	)
}

export default Contacts
