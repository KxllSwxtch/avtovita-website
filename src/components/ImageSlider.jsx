import Slider from 'react-slick'
import PropTypes from 'prop-types'
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/24/solid' // Убедись в правильности импорта
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const CustomArrow = ({ className, onClick, icon }) => (
	<div
		className={`${className} flex items-center justify-center bg-gradient-to-r from-gray-100 via-white to-gray-100 text-gray-800 w-12 h-12 rounded-full shadow-lg hover:shadow-2xl hover:scale-110 transition-transform duration-300 border border-gray-300 cursor-pointer`}
		style={{ display: 'flex', position: 'absolute', opacity: 0.8 }}
		onClick={onClick}
	>
		{icon}
	</div>
)

const ImageSlider = ({ images }) => {
	const settings = {
		autoplay: true,
		autoplaySpeed: 4000,
		dots: true,
		infinite: true,
		speed: 300,
		slidesToShow: 1,
		slidesToScroll: 1,
		className: 'rounded-lg relative z-50',
		lazyLoad: 'progressive',
		nextArrow: (
			<CustomArrow
				icon={<ChevronRightIcon className='w-8 h-8 text-gray-700' />}
				className='absolute top-1/2 right-4 transform -translate-y-1/2 z-50 hover:text-red-500 transition duration-300'
			/>
		),
		prevArrow: (
			<CustomArrow
				icon={<ChevronLeftIcon className='w-8 h-8 text-gray-700' />}
				className='absolute top-1/2 left-4 transform -translate-y-1/2 z-50 hover:text-red-500 transition duration-300'
			/>
		),
		customPaging: () => (
			<div className='w-3 h-3 bg-gray-400 rounded-full hover:bg-red-500 transition-all duration-300 transform hover:scale-125'></div>
		),
		afterChange: (current) => {
			const slides = document.querySelectorAll('.slick-slide')
			slides.forEach((slide, index) => {
				if (index !== current) {
					slide.setAttribute('inert', '')
				} else {
					slide.removeAttribute('inert')
				}
			})
		},
	}

	return (
		<Slider {...settings} className='mb-6 relative z-50'>
			{images.map((img, index) => (
				<div key={index} className='flex justify-center'>
					<img
						src={img.full}
						alt={`Car ${index}`}
						className='w-full max-h-96 object-contain rounded-lg'
					/>
				</div>
			))}
		</Slider>
	)
}

CustomArrow.propTypes = {
	className: PropTypes.string,
	onClick: PropTypes.func,
	icon: PropTypes.node.isRequired,
}

ImageSlider.propTypes = {
	images: PropTypes.arrayOf(
		PropTypes.shape({
			full: PropTypes.string.isRequired,
		}),
	).isRequired,
}

export default ImageSlider
