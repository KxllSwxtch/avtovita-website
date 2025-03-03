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
				<h1 className='text-5xl md:text-6xl font-black mb-4'>AVTOVITA</h1>
				<p className='text-lg md:text-2xl mb-8 md:w-1/2'>
					Уже много лет занимается продажами автомобилей на внутренем рынке
					Южной Кореи и поставками автомобилей из Южной Кореи. <br />
					<br /> Отточенная до мелочей система доставки и многолетний опыт
					позволяют нам доставить автомобиль в сжатые сроки. Мы не берем никаких
					дополнительных или скрытых комиссий за наши услуги, и в договоре у нас
					нет мелкого шрифта
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
