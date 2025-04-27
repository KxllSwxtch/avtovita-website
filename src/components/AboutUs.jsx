const AboutUs = () => {
	return (
		<section className='bg-white text-black py-16 px-6'>
			<div className='max-w-6xl mx-auto text-center'>
				<h2 className='text-4xl font-bold text-[#a330f0] mb-6'>
					О <span className='text-[#0e2cc2]'>AVTOVITA</span>
				</h2>
				<p className='text-lg text-[#4a4a7b] max-w-3xl mx-auto'>
					Мы – компания, занимающаяся экспортом автомобилей из Южной Кореи.
					Предлагаем широкий выбор автомобилей по выгодным ценам и с полной
					прозрачностью на всех этапах покупки.
				</p>

				{/* Блок преимуществ */}
				<div className='grid grid-cols-1 md:grid-cols-3 gap-8 mt-10'>
					<div className='p-6 bg-[#f0f0ff] rounded-lg shadow-md hover:shadow-xl transition duration-300 border border-[#0e2cc2]/10'>
						<h3 className='text-xl font-semibold text-[#0e2cc2]'>
							✅ Проверенные авто
						</h3>
						<p className='text-[#4a4a7b] mt-2'>
							Только проверенные автомобили с прозрачной историей и полной
							документацией.
						</p>
					</div>

					<div className='p-6 bg-[#f0f0ff] rounded-lg shadow-md hover:shadow-xl transition duration-300 border border-[#0e2cc2]/10'>
						<h3 className='text-xl font-semibold text-[#0e2cc2]'>
							🚀 Быстрая доставка
						</h3>
						<p className='text-[#4a4a7b] mt-2'>
							Оптимизированная логистика позволяет доставить авто в кратчайшие
							сроки.
						</p>
					</div>

					<div className='p-6 bg-[#f0f0ff] rounded-lg shadow-md hover:shadow-xl transition duration-300 border border-[#0e2cc2]/10'>
						<h3 className='text-xl font-semibold text-[#0e2cc2]'>
							💯 Честные цены
						</h3>
						<p className='text-[#4a4a7b] mt-2'>
							Прозрачное ценообразование без скрытых платежей и комиссий.
						</p>
					</div>
				</div>
			</div>
		</section>
	)
}

export default AboutUs
