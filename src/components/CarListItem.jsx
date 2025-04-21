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
		<div className='relative bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg duration-300 border border-gray-300'>
			{/* Блок изображения */}
			<Link
				to={`/catalog/${slug}/${carId}`}
				target='_blank'
				rel='noopener noreferrer'
				className='block'
			>
				<div className='relative w-full h-60 overflow-hidden rounded-t-2xl'>
					<img
						src={car.image.replaceAll('"', '').replace('_TH', '')}
						alt={car.name}
						className='w-full h-full object-cover'
					/>
					{/* Полупрозрачный градиент внизу для эффекта глубины */}
					<div className='absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black/50 to-transparent'></div>
				</div>
			</Link>

			{/* Основная информация */}
			<div className='p-4 rounded-b-2xl bg-white shadow-md'>
				{/* Марка и модель */}
				<h2 className='text-xl font-semibold text-gray-800 truncate'>
					{formattedCarName}
				</h2>

				{/* Основные характеристики */}
				<div className='flex flex-col text-sm text-gray-600 mt-2 space-y-1'>
					<span className='flex items-center gap-2'>
						📅 Дата регистрации: {formattedCarDate}
					</span>
					<span className='flex items-center gap-2'>
						🚗 Пробег: {formattedCarMileage} км
					</span>
					<span className='flex items-center gap-2'>
						⛽ {fuelTypeTranslation[car.fuelType] || car.fuelType}
					</span>
					<span>⚙️ {formattedTransmission}</span>
				</div>

				{/* Цена и кнопка */}
				<div className='mt-4 flex justify-between items-center'>
					<span className='text-lg font-bold text-red-600'>
						{formattedPrice} ₩
					</span>
					<Link
						to={`/catalog/${slug}/${carId}`}
						target='_blank'
						className='px-5 py-2 bg-red-500 text-white 
				text-sm font-semibold rounded-md transition-opacity 
				duration-300 hover:opacity-80 shadow-md'
					>
						Подробнее →
					</Link>
				</div>
			</div>

			{/* Год автомобиля (выведен в углу) */}
			<div className='absolute top-2 right-2 bg-yellow-200 text-gray-800 text-xs font-semibold px-2 py-1 rounded shadow-md'>
				{formattedCarYear}
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
