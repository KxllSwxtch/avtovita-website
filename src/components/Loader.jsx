const Loader = () => {
	return (
		<div className='fixed inset-0 flex items-center justify-center bg-white bg-opacity-70 z-50'>
			<div className='relative w-20 h-20'>
				<div className='absolute inset-0 w-full h-full border-4 border-blue-300 border-t-transparent border-solid rounded-full animate-spin'></div>
				<div className='absolute inset-0 w-full h-full border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-[spin_1.5s_linear_infinite]'></div>
				<div className='absolute inset-0 w-full h-full border-4 border-blue-700 border-t-transparent border-solid rounded-full animate-[spin_2s_linear_infinite]'></div>
			</div>
		</div>
	)
}

export default Loader
