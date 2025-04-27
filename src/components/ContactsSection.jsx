import {
	FaPhone,
	FaWhatsapp,
	FaTelegram,
	FaInstagram,
	FaYoutube,
} from 'react-icons/fa'

const ContactsSection = () => {
	return (
		<section className='bg-[#f0f0ff] text-white py-16 px-6'>
			<div className='max-w-6xl mx-auto text-center'>
				<h2 className='text-4xl font-bold text-[#0e2cc2] mb-6'>Контакты</h2>
				<p className='text-lg text-[#4a4a7b] max-w-3xl mx-auto'>
					Свяжитесь с нами удобным способом!
				</p>

				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10 mx-auto w-full'>
					{/* Виталий */}
					<div className='p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 flex flex-col items-center text-center border border-[#0e2cc2]/10'>
						<FaPhone className='text-[#a330f0] text-4xl mb-4' />
						<h3 className='text-xl font-semibold text-[#0e2cc2]'>
							Югай Виталий
						</h3>
						<a
							href='tel:+821093441782'
							className='text-[#4a4a7b] mt-2 hover:text-[#a330f0] transition duration-200'
						>
							+82 10-9344-1782
						</a>
					</div>
					{/* Ким Евгений */}
					<div className='p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 flex flex-col items-center text-center border border-[#0e2cc2]/10'>
						<FaPhone className='text-[#a330f0] text-4xl mb-4' />
						<h3 className='text-xl font-semibold text-[#0e2cc2]'>
							Ким Евгений
						</h3>
						<a
							href='tel:+821042252627'
							className='text-[#4a4a7b] mt-2 hover:text-[#a330f0] transition duration-200'
						>
							+82 10-4225-2627
						</a>
					</div>
				</div>

				{/* Соцсети */}
				{/* <div className='mt-10 flex justify-center gap-6'>
					<a
						target='_blank'
						href='https://wa.me/821012345678'
						className='text-3xl text-green-500 hover:text-green-600 transition'
					>
						<FaWhatsapp />
					</a>
					<a
						target='_blank'
						href='https://t.me/avtovita'
						className='text-3xl text-blue-500 hover:text-blue-600 transition'
					>
						<FaTelegram />
					</a>
					<a
						target='_blank'
						href='https://instagram.com/avtovita'
						className='text-3xl text-pink-500 hover:text-pink-600 transition'
					>
						<FaInstagram />
					</a>
					<a
						target='_blank'
						href='https://youtube.com/avtovita'
						className='text-3xl text-red-500 hover:text-red-600 transition'
					>
						<FaYoutube />
					</a>
				</div> */}
			</div>
		</section>
	)
}

export default ContactsSection
