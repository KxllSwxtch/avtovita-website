import { useMemo } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { translateSmartly, translations } from '../translations'

// Card image dimensions. Cards render at ~350 px wide on desktop and smaller
// on mobile, so 700×350 is plenty for 1× displays. The 2× srcset entry covers
// retina without making baseline downloads heavier than they need to be.
const CARD_IMG_BASE_PARAMS =
	'impolicy=heightRate&cg=Center&wtmk=https://ci.encar.com/wt_mark/w_mark_04.png&t=20250401111058'

const cardImgUrl = (photo, w, h) =>
	`https://ci.encar.com${photo}001.jpg?${CARD_IMG_BASE_PARAMS}&rh=${h}&cw=${w}&ch=${h}`

const CarCard = ({ car }) => {
	const carPriceKrw = car?.Price * 10000

	const carTitle = useMemo(
		() =>
			[car.Manufacturer, car.Model, car?.Badge, car?.BadgeDetail]
				.map(part => translateSmartly(part))
				.filter(
					part =>
						part &&
						typeof part === 'string' &&
						part.trim() &&
						!/^\(\s*\)$/.test(part.trim()),
				)
				.join(' '),
		[car.Manufacturer, car.Model, car.Badge, car.BadgeDetail],
	)

	return (
		<div className='rounded-2xl shadow-xl bg-white overflow-hidden border border-gray-200 flex flex-col'>
			<div className='relative w-full aspect-[2/1] overflow-hidden bg-gray-100'>
				<img
					src={cardImgUrl(car.Photo, 700, 350)}
					srcSet={`${cardImgUrl(car.Photo, 700, 350)} 1x, ${cardImgUrl(
						car.Photo,
						1400,
						696,
					)} 2x`}
					alt={`${car.Manufacturer} ${car.Model}`}
					width='700'
					height='350'
					className='w-full h-full object-cover object-center'
					loading='lazy'
					decoding='async'
				/>
			</div>

			<div className='p-6 flex flex-col flex-grow justify-between'>
				<div>
					<h2 className='text-lg font-bold text-center text-gray-900 mb-4'>
						{carTitle}
					</h2>
					<div className='text-gray-600 text-base space-y-2'>
						<div className='flex justify-between border-b border-dotted pb-1'>
							<span>Год</span>
							<span className='font-medium'>
								{String(car.Year).slice(0, 4)}.{String(car.Year).slice(4)} г.
							</span>
						</div>
						<div className='flex justify-between border-b border-dotted pb-1'>
							<span>Пробег</span>
							<span className='font-medium'>
								{car.Mileage.toLocaleString()} км
							</span>
						</div>
						<div className='flex justify-between border-b border-dotted pb-1'>
							<span>Тип топлива</span>
							<span className='font-medium'>{translations[car.FuelType]}</span>
						</div>
					</div>
				</div>

				<div className='mt-4 pt-4'>
					<p className='text-lg font-bold text-center text-black'>
						₩{carPriceKrw.toLocaleString()}
					</p>
					{/* <hr /> */}
					{/* <p className='text-center text-gray-700 font-semibold text-lg'>
						${carPriceUsd}
					</p> */}
				</div>

				<Link
					to={`/catalog/${car.Id}`}
					target='_blank'
					rel='noopener noreferrer'
					className='mt-6 bg-black text-white font-semibold text-center py-2 rounded-md hover:bg-gray-900 transition'
				>
					Узнать подробнее
				</Link>
			</div>
		</div>
	)
}

CarCard.propTypes = {
	car: PropTypes.shape({
		Price: PropTypes.number.isRequired,
		FINISH: PropTypes.number,
		Photo: PropTypes.string,
		Manufacturer: PropTypes.string,
		Model: PropTypes.string,
		Year: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		Mileage: PropTypes.number,
		FuelType: PropTypes.string,
		Id: PropTypes.string,
		Badge: PropTypes.string,
		BadgeDetail: PropTypes.string,
	}).isRequired,
}

export default CarCard
