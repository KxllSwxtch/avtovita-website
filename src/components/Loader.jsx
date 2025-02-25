const Loader = () => {
	return (
		<div className='fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-70 z-50'>
			<div className='relative w-20 h-20 animate-pulse'>
				<div className='absolute inset-0 w-full h-full border-4 border-[#a2006d] border-t-transparent border-solid rounded-full animate-[spin_1.5s_linear_infinite]'></div>
				{/* <div className='absolute inset-0 w-3/4 h-3/4 border-4 border-[#e00024] border-t-transparent border-solid rounded-full animate-[spin_2s_reverse_linear_infinite]'></div>
				<div className='absolute inset-0 w-1/2 h-1/2 border-4 border-[#f4e4d1] border-t-transparent border-solid rounded-full animate-[spin_1.5s_reverse_linear_infinite]'></div>
				<div className='absolute inset-0 flex items-center justify-center'>
					<div className='w-4 h-4 bg-[#e00024] rounded-full animate-ping'></div> */}
				{/* </div> */}
			</div>
		</div>
	)
}

export default Loader
