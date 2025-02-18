import {
	FaPhone,
	FaEnvelope,
	FaMapMarkerAlt,
	FaWhatsapp,
	FaTelegram,
	FaInstagram,
	FaYoutube,
} from 'react-icons/fa'

const Footer = () => {
	return (
		<footer className='bg-black text-gray-300 py-10 px-6'>
			<div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8'>
				{/* Колонка 1: О компании */}
				<div className='text-center md:text-left'>
					<h2 className='text-xl font-semibold text-avtoVitaGold mb-3'>
						О компании
					</h2>
					<p className='text-sm'>
						AvtoVita — это надежный партнер по покупке автомобилей из Южной
						Кореи. Мы предлагаем широкий выбор машин и гарантируем честные цены.
					</p>
				</div>

				{/* Колонка 2: Контакты */}
				<div className='text-center'>
					<h2 className='text-xl font-semibold text-avtoVitaGold mb-3'>
						Контакты
					</h2>
					<p className='flex items-center justify-center gap-2 text-sm'>
						<FaPhone className='text-avtoVitaGold' /> Виталий:{' '}
						<a href='tel:+821093441782' className='hover:text-avtoVitaGold'>
							+82 (10)-9344-1782
						</a>
					</p>
					<p className='flex items-center justify-center gap-2 text-sm'>
						<FaPhone className='text-avtoVitaGold' /> Ким Евгений:{' '}
						<a href='tel:+821042252627' className='hover:text-avtoVitaGold'>
							+82 (10)-4225-2627
						</a>
					</p>
					<p className='flex items-center justify-center gap-2 text-sm'>
						<FaPhone className='text-avtoVitaGold' /> Цой Юрий:{' '}
						<a href='tel:+821076097787' className='hover:text-avtoVitaGold'>
							+82 (10)-7609-7787
						</a>
					</p>
					<p className='flex items-center justify-center gap-2 text-sm'>
						<FaPhone className='text-avtoVitaGold' /> Цой Евгений:{' '}
						<a href='tel:+821044168778' className='hover:text-avtoVitaGold'>
							+82 (10)-4416-8778
						</a>
					</p>
					<p className='flex items-center justify-center gap-2 text-sm'>
						<FaEnvelope className='text-avtoVitaGold' />{' '}
						<a
							href='mailto:info@avtovita.com'
							className='hover:text-avtoVitaGold'
						>
							info@avtovita.com
						</a>
					</p>
					<p className='flex items-center justify-center gap-2 text-sm'>
						<FaMapMarkerAlt className='text-avtoVitaGold' /> 경기 안산시 단원구
						풍전로 53
					</p>
				</div>

				{/* Колонка 3: Социальные сети */}
				<div className='text-center md:text-right'>
					<h2 className='text-xl font-semibold text-avtoVitaGold mb-3'>
						Мы в соцсетях
					</h2>
					<div className='flex justify-center md:justify-end gap-4 text-xl'>
						<a
							href='https://wa.me/821012345678'
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
				</div>
			</div>

			{/* Копирайт */}
			<div className='mt-8 text-center border-t border-gray-700 pt-4 text-sm'>
				&copy; {new Date().getFullYear()} AvtoVita. Все права защищены.
			</div>
		</footer>
	)
}

export default Footer
