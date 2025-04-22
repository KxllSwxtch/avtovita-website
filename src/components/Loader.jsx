import { motion } from 'framer-motion'

const Loader = () => {
	return (
		<motion.div
			className='fixed inset-0 flex items-center justify-center bg-[#b8b8b8] z-50'
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.5 }}
		>
			<div className='animate-spin h-12 w-12 border-4 border-white border-t-red-600 rounded-full'></div>
		</motion.div>
	)
}

export default Loader
