import Slider from 'react-slick'
import PropTypes from 'prop-types'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const CustomArrow = ({ className, onClick, icon }) => (
	<div
		className={`${className} bg-gray-800 text-white p-2 rounded-full shadow-lg hover:bg-red-500 transition duration-300 !hidden !md:block`}
		onClick={onClick}
	>
		{icon}
	</div>
)

const ImageSlider = ({ images }) => {
	const settings = {
		autoplay: true,
		autoplaySpeed: 4000,
		centermode: true,
		dots: true,
		infinite: true,
		speed: 300,
		arrows: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		className: 'rounded-lg',
		lazyLoad: 'progressive',
		nextArrow: (
			<CustomArrow
				icon={<ChevronRightIcon className='w-6 h-6' />}
				className='absolute top-1/2 right-4 transform -translate-y-1/2 z-10'
			/>
		),
		prevArrow: (
			<CustomArrow
				icon={<ChevronLeftIcon className='w-6 h-6' />}
				className='absolute top-1/2 left-4 transform -translate-y-1/2 z-10'
			/>
		),
		customPaging: () => (
			<div className='w-3 h-3 bg-gray-300 rounded-full hover:bg-red-500 transition duration-300'></div>
		),
		dotsClass: 'slick-dots bottom-4',
	}

	return (
		<Slider {...settings} className='mb-6'>
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
