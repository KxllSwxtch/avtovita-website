import {
	FaPhone,
	FaWhatsapp,
	FaTelegram,
	FaInstagram,
	FaYoutube,
} from 'react-icons/fa'

const ContactsSection = () => {
	return (
		<section className='bg-black text-white py-16 px-6'>
			<div className='max-w-6xl mx-auto text-center'>
				<h2 className='text-4xl font-bold text-red-500 mb-6'>Контакты</h2>
				<p className='text-lg text-gray-300 max-w-3xl mx-auto'>
					Свяжитесь с нами удобным способом!
				</p>

				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-10'>
					{/* Виталий */}
					<div className='p-6 bg-gray-900 rounded-lg shadow-lg flex flex-col items-center text-center'>
						<FaPhone className='text-red-500 text-4xl mb-4' />
						<h3 className='text-xl font-semibold'>Виталий</h3>
						<a
							href='tel:+821093441782'
							className='text-gray-400 mt-2 hover:text-red-500'
						>
							+82 10-9344-1782
						</a>
					</div>

					{/* Ким Евгений */}
					<div className='p-6 bg-gray-900 rounded-lg shadow-lg flex flex-col items-center text-center'>
						<FaPhone className='text-red-500 text-4xl mb-4' />
						<h3 className='text-xl font-semibold'>Ким Евгений</h3>
						<a
							href='tel:+821042252627'
							className='text-gray-400 mt-2 hover:text-red-500'
						>
							+82 10-4225-2627
						</a>
					</div>

					{/* Цой Юрий */}
					<div className='p-6 bg-gray-900 rounded-lg shadow-lg flex flex-col items-center text-center'>
						<FaPhone className='text-red-500 text-4xl mb-4' />
						<h3 className='text-xl font-semibold'>Цой Юрий</h3>
						<a
							href='tel:+821076097787'
							className='text-gray-400 mt-2 hover:text-red-500'
						>
							+82 10-7609-7787
						</a>
					</div>

					{/* Цой Евгений */}
					<div className='p-6 bg-gray-900 rounded-lg shadow-lg flex flex-col items-center text-center'>
						<FaPhone className='text-red-500 text-4xl mb-4' />
						<h3 className='text-xl font-semibold'>Цой Евгений</h3>
						<a
							href='tel:+821044168778'
							className='text-gray-400 mt-2 hover:text-red-500'
						>
							+82 10-4416-8778
						</a>
					</div>
				</div>

				{/* Соцсети */}
				<div className='mt-10 flex justify-center gap-6'>
					<a
						href='https://wa.me/821012345678'
						className='text-3xl text-green-400 hover:text-green-500 transition'
					>
						<FaWhatsapp />
					</a>
					<a
						href='https://t.me/avtovita'
						className='text-3xl text-blue-400 hover:text-blue-500 transition'
					>
						<FaTelegram />
					</a>
					<a
						href='https://instagram.com/avtovita'
						className='text-3xl text-pink-500 hover:text-pink-600 transition'
					>
						<FaInstagram />
					</a>
					<a
						href='https://youtube.com/avtovita'
						className='text-3xl text-red-500 hover:text-red-600 transition'
					>
						<FaYoutube />
					</a>
				</div>
			</div>
		</section>
	)
}

export default ContactsSection
