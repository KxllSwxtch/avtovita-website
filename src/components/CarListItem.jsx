import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

// Local imports
import { translateCarName } from '../utils'

const fuelTypeTranslation = {
	휘발유: 'Бензин',
	경유: 'Дизель',
	LPG: 'Газ (LPG)',
	'휘발유/LPG겸': 'Бензин/Газ (LPG)',
	'휘발유/CNG겸': 'Бензин/CNG',
	'휘발유 하이브리드': 'Гибрид (Бензин)',
	'LPG 하이브리드': 'Гибрид (Газ LPG)',
	'경유 하이브리드': 'Гибрид (Дизель)',
	전기: 'Электро',
	CNG: 'Газ (CNG)',
	수소: 'Водород',
}

const CarListItem = ({ car }) => {
	const formattedPrice = (
		car.price.replace(/\D+/gm, '') * 10000
	).toLocaleString()

	const formattedCarMileage = parseInt(
		car.mileage.replace(/\D+/gm, ''),
	).toLocaleString()

	const carYear = car.year.split('-')[0]
	const carMonth = car.year.split('-')[1]
	const formattedCarDate = `${carMonth}/${carYear}`
	const carId = car.link.split('/').pop() // Получаем ID из URL
	const formattedTransmission =
		car.transmission === '오토' ? 'Автомат' : 'Механика'

	const formattedCarName = translateCarName(car?.name) || car?.name
	const formattedCarYear =
		car?.year.split('-')[1] + '/' + car?.year.split('-')[0]

	// Функция для преобразования имени в slug
	const generateSlug = (name, year) => {
		// Убираем [скобки] и переводим в нижний регистр
		let cleanName = name
			.replace(/\[.*?\]/g, '')
			.toLowerCase()
			.replace(/클래스/g, '') // Удаляем "클래스"
			.replace(/x[0-9]+/gi, '') // Удаляем X247 или другие серии
			.replace(/\s+/g, '-') // Пробелы заменяем на дефисы

		// Заменяем корейские марки на английские
		const brandTranslations = {
			벤츠: 'benz',
			현대: 'hyundai',
			기아: 'kia',
			제네시스: 'genesis',
			쉐보레: 'chevrolet',
			르노코리아: 'renault-korea',
			KG모빌리티: 'kg-mobility',
		}
		Object.keys(brandTranslations).forEach((kor) => {
			cleanName = cleanName.replace(
				new RegExp(kor, 'g'),
				brandTranslations[kor],
			)
		})

		// Берем только год из year
		const carYear = year.split('-')[0]

		// Финальный slug
		return `${cleanName}-${carYear}`
	}

	const slug = generateSlug(car.name, car.year)

	return (
		<div className='group relative bg-white rounded-lg overflow-hidden transition-all duration-300 border border-gray-100 hover:border-[#0e2cc2]/20'>
			{/* Блок изображения */}
			<Link
				to={`/catalog/${slug}/${carId}`}
				target='_blank'
				rel='noopener noreferrer'
				className='block'
			>
				<div className='relative w-full h-56 overflow-hidden'>
					<img
						src={car.image.replaceAll('"', '').replace('_TH', '')}
						alt={car.name}
						className='w-full h-full object-cover'
					/>
				</div>
			</Link>

			{/* Основная информация */}
			<div className='p-4'>
				{/* Марка и модель */}
				<div className='flex justify-between items-start mb-2'>
					<h2 className='text-base font-medium text-[#0e2cc2] truncate max-w-[70%]'>
						{formattedCarName}
					</h2>
					<span className='text-xs font-medium text-gray-500 bg-gray-100 py-1 px-2 rounded-sm'>
						{formattedCarYear}
					</span>
				</div>

				{/* Основные характеристики - более компактно */}
				<div className='grid grid-cols-2 gap-x-2 gap-y-1 text-xs text-gray-500 mt-2'>
					<span className='flex items-center gap-1'>
						<span className='text-gray-400'>📅</span> {formattedCarDate}
					</span>
					<span className='flex items-center gap-1'>
						<span className='text-gray-400'>🚗</span> {formattedCarMileage} км
					</span>
					<span className='flex items-center gap-1'>
						<span className='text-gray-400'>⛽</span>{' '}
						{fuelTypeTranslation[car.fuelType] || car.fuelType}
					</span>
					<span className='flex items-center gap-1'>
						<span className='text-gray-400'>⚙️</span> {formattedTransmission}
					</span>
				</div>

				{/* Разделитель */}
				<div className='h-px w-full bg-gray-100 my-3'></div>

				{/* Цена и кнопка */}
				<div className='flex justify-between items-center'>
					<span className='text-lg font-semibold text-[#0e2cc2]'>
						{formattedPrice} ₩
					</span>
					<Link
						to={`/catalog/${slug}/${carId}`}
						target='_blank'
						className='px-3 py-1.5 bg-[#0e2cc2] text-white 
						text-xs font-medium rounded-md transition-colors 
						duration-200 hover:bg-[#a330f0]'
					>
						Подробнее
					</Link>
				</div>
			</div>
		</div>
	)
}

CarListItem.propTypes = {
	car: PropTypes.shape({
		link: PropTypes.string.isRequired,
		image: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		year: PropTypes.string.isRequired,
		mileage: PropTypes.string.isRequired,
		fuelType: PropTypes.string.isRequired,
		transmission: PropTypes.string.isRequired,
		price: PropTypes.string.isRequired,
	}).isRequired,
}

export default CarListItem
