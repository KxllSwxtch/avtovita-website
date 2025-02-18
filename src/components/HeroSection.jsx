import { Link } from 'react-router-dom'

const HeroSection = () => {
	return (
		<section className='relative h-screen'>
			{/* Видео на заднем плане */}
			<video
				className='absolute top-0 left-0 w-full h-full object-cover'
				src='https://res.cloudinary.com/pomegranitedesign/video/upload/v1739440671/avtovita/herovideo.mp4'
				autoPlay
				loop
				muted
				playsInline
			/>

			{/* Затемняющий слой */}
			<div className='absolute inset-0 bg-black opacity-70'></div>

			{/* Контент */}
			<div className='relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4'>
				<h1 className='text-4xl md:text-6xl font-bold mb-4'>
					Продажа авто в Корее и экспорт без посредников
				</h1>
				<p className='text-lg md:text-2xl mb-8'>
					Надёжно. Быстро. Профессионально.
				</p>
				<Link
					to='/catalog'
					className='bg-red-500 hover:bg-red-700 transition-colors duration-300 text-white font-semibold py-3 px-6 rounded-full'
				>
					Смотреть Каталог
				</Link>
			</div>
		</section>
	)
}

export default HeroSection
