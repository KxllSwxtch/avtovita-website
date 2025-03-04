import { motion } from 'framer-motion'

const Loader = () => {
	return (
		<motion.div
			className='fixed inset-0 flex items-center justify-center bg-white bg-opacity-70 z-50'
			initial={{ opacity: 1 }}
			animate={{ opacity: 0 }}
			exit={{ opacity: 0, transition: { duration: 0.8, ease: 'easeOut' } }}
		>
			<div className='relative w-16 h-16'>
				<div className='absolute inset-0 w-full h-full border-4 border-red-500 border-t-transparent border-solid rounded-full animate-spin'></div>
				<div className='absolute inset-0 w-full h-full border-4 border-gray-500 border-t-transparent border-solid rounded-full animate-[spin_1.5s_linear_infinite]'></div>
			</div>
		</motion.div>
	)
}

export default Loader
