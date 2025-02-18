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
							{[
								{ name: 'Виталий', number: '+82 10-9344-1782' },
								{ name: 'Ким Евгений', number: '+82 10-4225-2627' },
								{ name: 'Цой Юрий', number: '+82 10-7609-7787' },
								{ name: 'Цой Евгений', number: '+82 10-4416-8778' },
							].map((contact, index) => (
								<p key={index} className='text-lg'>
									<span className='font-semibold text-white'>
										{contact.name}:{' '}
									</span>
									<a
										href={`tel:${contact.number}`}
										className='text-red-400 hover:text-red-300'
									>
										{contact.number}
									</a>
								</p>
							))}

							{/* <div className='flex items-center gap-4'>
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
							</div> */}

							<div className='flex items-center gap-4'>
								<FaMapMarkerAlt className='text-red-500 text-2xl' />
								<div>
									<p className='text-lg font-semibold'>Адрес</p>
									<p className='text-gray-400'>경기 안산시 단원구 풍전로 53</p>
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
						title='Google map'
						src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3172.765035298867!2d126.789744675919!3d37.32439303797588!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357b6e2df9e21c1d%3A0x8a17213e594f3685!2s53%20Pungjeon-ro%2C%20Danwon-gu%2C%20Ansan-si%2C%20Gyeonggi-do!5e0!3m2!1sen!2skr!4v1739839720681!5m2!1sen!2skr'
						width='600'
						height='450'
						className='w-full h-100 rounded-lg shadow-lg'
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
