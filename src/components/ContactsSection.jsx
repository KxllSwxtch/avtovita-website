import { motion } from 'framer-motion'
import { FaPhone, FaWhatsapp, FaTelegram, FaInstagram, FaYoutube } from 'react-icons/fa'

const contacts = [
	{
		name: 'Югай Виталий',
		phone: '+82 10-9344-1782',
		href: 'tel:+821093441782',
	},
	{
		name: 'Ким Евгений',
		phone: '+82 10-4225-2627',
		href: 'tel:+821042252627',
	},
	{
		name: 'Шек Роман',
		phone: '+82 10-7921-1421',
		href: 'tel:+821079211421',
	},
]

const socials = [
	{
		icon: FaWhatsapp,
		href: 'https://wa.me/821012345678',
		label: 'WhatsApp',
	},
	{
		icon: FaTelegram,
		href: 'https://t.me/avtovita',
		label: 'Telegram',
	},
	{
		icon: FaInstagram,
		href: 'https://instagram.com/avtovita',
		label: 'Instagram',
	},
	{
		icon: FaYoutube,
		href: 'https://youtube.com/avtovita',
		label: 'YouTube',
	},
]

const ContactsSection = () => {
	return (
		<section className='bg-[#1a1a1a] py-20 px-6'>
			<div className='max-w-6xl mx-auto text-center'>
				<motion.div
					initial={{ opacity: 0, y: 40 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, amount: 0.2 }}
					transition={{ duration: 0.6, ease: 'easeOut' }}
				>
					<h2 className='text-4xl font-bold text-white mb-6'>
						Свяжитесь с{' '}
						<span className='text-avtoVitaGold'>нами</span>
					</h2>
					<p className='text-lg text-gray-400 max-w-3xl mx-auto'>
						Свяжитесь с нами удобным способом!
					</p>
				</motion.div>

				<div className='grid grid-cols-1 md:grid-cols-3 gap-8 mt-12'>
					{contacts.map((contact, index) => (
						<motion.div
							key={contact.name}
							initial={{ opacity: 0, y: 40 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, amount: 0.2 }}
							transition={{
								duration: 0.5,
								delay: index * 0.15,
								ease: 'easeOut',
							}}
							className='p-8 bg-[#1e1e1e] rounded-xl border border-avtoVitaGold/20 hover:border-avtoVitaGold/40 hover:shadow-[0_0_20px_rgba(255,215,0,0.08)] transition duration-300 flex flex-col items-center text-center'
						>
							<div className='w-14 h-14 bg-avtoVitaGold/10 rounded-full flex items-center justify-center mb-5'>
								<FaPhone className='text-avtoVitaGold text-xl' />
							</div>
							<h3 className='text-xl font-semibold text-white mb-2'>
								{contact.name}
							</h3>
							<a
								href={contact.href}
								className='text-avtoVitaGold hover:text-avtoVitaGoldDark transition duration-200 text-lg'
							>
								{contact.phone}
							</a>
						</motion.div>
					))}
				</div>

				{/* Social links */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, amount: 0.2 }}
					transition={{ duration: 0.5, delay: 0.5, ease: 'easeOut' }}
					className='mt-12 flex justify-center gap-5'
				>
					{socials.map((social) => (
						<a
							key={social.label}
							target='_blank'
							rel='noopener noreferrer'
							href={social.href}
							aria-label={social.label}
							className='w-12 h-12 rounded-full border border-avtoVitaGold/30 flex items-center justify-center text-avtoVitaGold hover:bg-avtoVitaGold hover:text-avtoVitaBlack transition duration-300'
						>
							<social.icon className='text-xl' />
						</a>
					))}
				</motion.div>
			</div>
		</section>
	)
}

export default ContactsSection
