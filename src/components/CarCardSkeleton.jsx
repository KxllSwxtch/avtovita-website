const CarCardSkeleton = () => (
	<div
		className='rounded-2xl shadow-xl bg-white overflow-hidden border border-gray-200 flex flex-col animate-pulse'
		aria-hidden='true'
	>
		<div className='relative w-full aspect-[1400/696] bg-gray-200' />
		<div className='p-6 flex flex-col flex-grow justify-between'>
			<div>
				<div className='h-6 bg-gray-200 rounded mb-4 mx-auto w-3/4' />
				<div className='space-y-2'>
					<div className='flex justify-between border-b border-dotted pb-1'>
						<div className='h-4 bg-gray-200 rounded w-12' />
						<div className='h-4 bg-gray-200 rounded w-20' />
					</div>
					<div className='flex justify-between border-b border-dotted pb-1'>
						<div className='h-4 bg-gray-200 rounded w-16' />
						<div className='h-4 bg-gray-200 rounded w-24' />
					</div>
					<div className='flex justify-between border-b border-dotted pb-1'>
						<div className='h-4 bg-gray-200 rounded w-20' />
						<div className='h-4 bg-gray-200 rounded w-16' />
					</div>
				</div>
			</div>
			<div className='mt-4 pt-4'>
				<div className='h-6 bg-gray-200 rounded w-32 mx-auto' />
			</div>
			<div className='mt-6 h-10 bg-gray-200 rounded' />
		</div>
	</div>
)

export default CarCardSkeleton
