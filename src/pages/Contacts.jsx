import {
	FaMapMarkerAlt,
	FaWhatsapp,
	FaTelegram,
	FaInstagram,
	FaYoutube,
} from 'react-icons/fa'

const Contacts = () => {
	return (
		<div className='bg-gray-50 text-gray-800 mt-20'>
			{/* Заголовок */}
			<section className='py-16 px-6 text-center'>
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
					<div className='bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300'>
						<h3 className='text-3xl font-semibold text-red-600 mb-6'>
							Контактная информация
						</h3>
						<div className='space-y-6'>
							{[
								{
									name: 'Цой Юрий',
									number: '+82 10-7609-7787',
									photoUrl:
										'https://scontent-gmp1-1.xx.fbcdn.net/v/t39.30808-6/410289674_6799485666826883_5977297296240849656_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=TsVoir1CQy8Q7kNvgEdSxIW&_nc_oc=AdhOheLSInKLdlsutWv23lp9AkOrDBlVYvN2bBvu7ACtKoDfS8HsmftL56KEZZUPKKA&_nc_zt=23&_nc_ht=scontent-gmp1-1.xx&_nc_gid=AzuL1pYGkLsqE05FNTuMbUE&oh=00_AYBp62JXpmtxUkPFwEY_3nKUxcg59wVMPftajMwx23JjbA&oe=67C58198',
								},
								{
									name: 'Ким Евгений',
									number: '+82 10-4225-2627',
									photoUrl:
										'https://scontent-gmp1-1.xx.fbcdn.net/v/t1.6435-9/90371534_935254923559248_3849896752991698944_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=-qH5xYND5sIQ7kNvgHky3Kn&_nc_oc=AdhRVMA18XztnpmvcJyKmcipVhdMkZP7sXeEkyR_p2fh4_tEERUkvPYNWQWa7-wzpiA&_nc_zt=23&_nc_ht=scontent-gmp1-1.xx&_nc_gid=A8CYWb7bgfKi7bZBFDcaLZ8&oh=00_AYD1xRuL_tpLZGEN1ZY6q9yRZnLMzgvlqFCksG8t2DrtBg&oe=67E74728',
								},
								{
									name: 'Югай Виталий',
									number: '+82 10-9344-1782',
									photoUrl:
										'https://scontent-gmp1-1.xx.fbcdn.net/v/t39.30808-6/469034277_2590938921117370_4792914642707705055_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=107&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=9FD8udPaz9YQ7kNvgHb8iXb&_nc_oc=AdjpbvdNfbEvAwPweSNy_F9qyxtzAFEa1j_GC7ocqAaFFvTIQJwmboeDepaPhyefS2A&_nc_zt=23&_nc_ht=scontent-gmp1-1.xx&_nc_gid=ApjZxDnGPAYXfONaKhnrFuM&oh=00_AYAlJge3TJPNkIxY7CWdaQPHIxaql8YlFmGSlW_zfIvZ-w&oe=67C58A1A',
								},
								// { name: 'Цой Евгений', number: '+82 10-4416-8778' },
							].map((contact, index) => (
								<p key={index} className='text-lg flex items-center'>
									<img
										src={contact.photoUrl}
										className='h-20 mr-2 rounded-md'
										alt=''
									/>
									<span className='font-semibold text-gray-800 flex flex-col'>
										{contact.name}:{' '}
										<a
											href={`tel:${contact.number}`}
											className='text-red-600 hover:text-red-500 transition'
										>
											{contact.number}
										</a>
									</span>
								</p>
							))}

							<div className='flex items-start gap-4 mt-6'>
								<FaMapMarkerAlt className='text-red-600 text-3xl mt-1' />
								<div>
									<p className='text-lg font-semibold text-gray-800'>Адрес</p>
									<p className='text-gray-600'>경기 안산시 단원구 풍전로 53</p>
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
					<a
						href='https://wa.me/821093441782'
						className='text-green-500 hover:text-green-600 transition-transform transform hover:scale-110'
					>
						<FaWhatsapp />
					</a>
					<a
						href='https://t.me/avtovita'
						className='text-blue-400 hover:text-blue-500 transition-transform transform hover:scale-110'
					>
						<FaTelegram />
					</a>
					<a
						href='https://instagram.com/avtovita'
						className='text-pink-500 hover:text-pink-600 transition-transform transform hover:scale-110'
					>
						<FaInstagram />
					</a>
					<a
						href='https://youtube.com/avtovita'
						className='text-red-600 hover:text-red-700 transition-transform transform hover:scale-110'
					>
						<FaYoutube />
					</a>
				</div>
			</section>

			{/* Карта */}
			<section className='py-16 px-6'>
				<h3 className='text-4xl font-semibold text-red-600 text-center mb-8'>
					Наше местоположение
				</h3>
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
