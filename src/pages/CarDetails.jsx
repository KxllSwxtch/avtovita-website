import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Loader, CarInspection } from '../components'

const translations = {
	price: 'Цена в Корее (₩)',
	연식: 'Год выпуска',
	최초등록일: 'Дата первой регистрации',
	연료: 'Тип топлива',
	휘발유: 'Бензин',
	가솔린: 'Бензин',
	경유: 'Дизель',
	전기: 'Электро',
	하이브리드: 'Гибрид',
	변속기: 'Трансмиссия',
	오토: 'Автомат',
	수동: 'Механика',
	색상: 'Цвет',
	흰색: 'Белый',
	검정색: 'Чёрный',
	회색: 'Серый',
	파란색: 'Синий',
	빨간색: 'Красный',
	주행거리: 'Пробег',
	차량번호: 'Гос. номер',
	차대번호: 'VIN-номер',
	'압류｜저당': 'Был в ДТП',
	'0건｜0건': 'Нет',
	모델명: 'Модель',
	세금미납: 'Задолженность по налогам',
	없음: 'Отсутствует',
	제시번호: 'Номер предложения',
	'가솔린+전기': 'Гибрид',
}

const colorTranslations = {
	흰색: 'Белый',
	검정색: 'Чёрный',
	회색: 'Серый',
	파란색: 'Синий',
	빨간색: 'Красный',
	은색: 'Серебристый',
	녹색: 'Зелёный',
	노란색: 'Жёлтый',
	주황색: 'Оранжевый',
	보라색: 'Фиолетовый',
	갈색: 'Коричневый',
	베이지색: 'Бежевый',
	분홍색: 'Розовый',
	금색: 'Золотой',
	청록색: 'Бирюзовый',
	기타: 'Другой',
	쥐색: 'Тёмно-серый',
	은회색: 'Серебристый',
}

const CarDetails = () => {
	const [vehicleId, setVehicleId] = useState(null)
	const [usdKrwRate, setUsdKrwRate] = useState(null)
	const [car, setCar] = useState(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
	const [drivetrain, setDrivetrain] = useState('')

	const { carId } = useParams()

	useEffect(() => {
		const fetchCar = async () => {
			try {
				setLoading(true)
				const response = await axios.get(
					`https://api.encar.com/v1/readside/vehicle/${carId}`,
				)

				setCar(response.data)
				setVehicleId(response?.data?.vehicleId)
			} catch (err) {
				setError('Ошибка при загрузке данных')
				console.error(err)
			} finally {
				setLoading(false)
			}
		}

		if (carId) fetchCar()
	}, [carId])

	useEffect(() => {
		if (!vehicleId) return

		const fetchInspectionData = async () => {
			try {
				const gradeDrive = car?.category?.gradeEnglishName?.toUpperCase()
				if (gradeDrive?.includes('2WD')) {
					setDrivetrain('2WD')
					return
				}
				if (gradeDrive?.includes('4WD') || gradeDrive?.includes('AWD')) {
					setDrivetrain('AWD / 4WD')
					return
				}
				if (gradeDrive?.includes('RWD')) {
					setDrivetrain('RWD')
					return
				}
				const response = await axios.get(
					`https://api.encar.com/v1/readside/inspection/vehicle/${vehicleId}`,
				)

				const data = response?.data
				if (!data?.inners) {
					setDrivetrain('')
					return
				}

				const powertrain = data.inners.find(
					(item) =>
						item.type?.code === 'S03' && item.type?.title === '동력전달',
				)

				if (!powertrain || !powertrain.children) {
					setDrivetrain('')
					return
				}

				const drivetrainText = powertrain?.children?.find(
					(c) =>
						typeof c.description === 'string' && c.description.includes('WD'),
				)?.description
				const titles = powertrain.children.map((c) => c.type?.title)
				const hasDifferential = titles.includes('디피렌셜 기어')
				const hasCVJoint = titles.includes('등속조인트')
				const hasDriveShaft = titles.includes('추친축 및 베어링')

				if (drivetrainText) {
					setDrivetrain(drivetrainText)
				} else if (hasDifferential && hasCVJoint && hasDriveShaft) {
					setDrivetrain('AWD / 4WD')
				} else if (hasDifferential && (hasDriveShaft || hasCVJoint)) {
					setDrivetrain('RWD')
				} else if (!hasDifferential && hasCVJoint) {
					setDrivetrain('FWD')
				} else {
					setDrivetrain('2WD')
				}
			} catch {
				console.warn(
					'Inspection fetch failed or empty, fallback to empty drivetrain.',
				)
				setDrivetrain('')
			}
		}

		fetchInspectionData()
	}, [vehicleId])

	useEffect(() => {
		const fetchUsdKrwRate = async () => {
			try {
				const response = await axios.get(
					'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json',
				)

				if (response.status === 200) {
					const jsonData = response.data
					const rate = jsonData['usd']['krw']
					setUsdKrwRate(rate)
				}
			} catch (error) {
				console.error(error)
			}
		}

		fetchUsdKrwRate()
	}, [])

	const handleAddToFavorites = () => {
		alert('Функция добавления в избранное временно недоступна')
	}

	if (loading) return <Loader />
	if (error) return <p className='text-center text-red-500'>{error}</p>
	if (!car) return <p className='text-center text-lg'>Автомобиль не найден</p>

	// Получение URL первой фотографии
	const getPhotoUrl = (path) =>
		`https://ci.encar.com/carpicture${path}?impolicy=heightRate&rh=696&cw=1160&ch=696&cg=Center&wtmk=https://ci.encar.com/wt_mark/w_mark_04.png&t=20250401111058`
	const sortedPhotos = car?.photos?.sort((a, b) => (a.path > b.path ? 1 : -1))
	const uniquePhotos = [
		...new Map(car?.photos?.map((photo) => [photo.path, photo])).values(),
	]

	const formattedYearMonth = `${car?.category?.yearMonth.substring(
		4,
	)}/${car?.category?.yearMonth.substring(0, 4)}`

	const carPriceKorea = car?.advertisement?.price * 10000
	const carName = car?.category?.manufacturerEnglishName
	const formattedCarName = carName?.replaceAll('_', ' ')

	const modelGroup = car?.category?.modelGroupEnglishName
	const formattedModelGroup = modelGroup === 'Canival' ? 'Carnival' : modelGroup

	return (
		<div className='container mx-auto mt-24 md:mt-30 p-4 md:p-6 bg-white shadow-lg rounded-lg'>
			<h1 className='text-3xl font-bold text-center mb-6'>
				{formattedCarName} {formattedModelGroup}{' '}
				{car?.category?.gradeEnglishName}
			</h1>

			{/* Слайдер с фото */}
			{sortedPhotos.length > 0 && (
				<div className='max-w-2xl mx-auto mb-'>
					<Swiper
						modules={[Navigation, Pagination]}
						spaceBetween={10}
						slidesPerView={1}
						navigation
						pagination={{ clickable: true }}
						className='rounded-lg shadow-lg'
					>
						{uniquePhotos.map((photo, index) => (
							<SwiperSlide key={index}>
								<img
									src={getPhotoUrl(photo.path)}
									alt={`Car image ${index + 1}`}
									className='w-full h-auto rounded-lg'
								/>
							</SwiperSlide>
						))}
					</Swiper>
				</div>
			)}

			{/* <div className='flex justify-end mb-4'>
				<button
					onClick={handleAddToFavorites}
					className='bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition cursor-pointer'
				>
					❤️ Добавить в избранное
				</button>
			</div> */}
			{/* Данные об автомобиле */}
			<div className='mt-6 p-5 bg-gray-50 shadow-md rounded-lg'>
				<p className='text-gray-600'>
					<strong>Дата регистрации:</strong> {formattedYearMonth}
				</p>
				<p className='text-gray-600'>
					<strong>Объём двигателя:</strong>{' '}
					{car?.spec?.displacement.toLocaleString()} см³
				</p>
				<p className='text-gray-600'>
					<strong>Пробег:</strong> {car?.spec?.mileage.toLocaleString()} км
				</p>
				<p className='text-gray-600'>
					<strong>Трансмиссия:</strong>{' '}
					{translations[car?.spec?.transmissionName]}
				</p>
				{drivetrain && (
					<p className='text-gray-600'>
						<strong>Привод:</strong> {drivetrain}
					</p>
				)}
				<p className='text-gray-600'>
					<strong>Тип топлива:</strong>{' '}
					{translations[car?.spec?.fuelName] || car?.spec?.fuelName}
				</p>
				<p className='text-gray-600'>
					<strong>Цвет:</strong>{' '}
					{colorTranslations[car?.spec?.colorName] || car?.spec?.colorName}
				</p>
				<>
					<CarInspection car={car} />
				</>

				{usdKrwRate && (
					<p className='mt-10 mb-2'>
						<span className='text-gray-500 text-sm'>
							USDT - KRW: ₩{Math.floor(usdKrwRate - 15).toLocaleString()}
						</span>
					</p>
				)}
				<p className='text-gray-800 font-bold text-lg'>
					<strong>Стоимость автомобиля:</strong> ₩
					{carPriceKorea.toLocaleString()}
				</p>
			</div>

			{/* Контакты менеджеров */}
			<div className='mt-6 p-5 bg-white shadow-md rounded-lg text-center flex justify-center gap-20'>
				<div>
					<h2 className='text-xl font-semibold mb-4'>Контакты</h2>
					<p className='text-gray-700 mb-2'>
						<strong>Ким Евгений:</strong>{' '}
						<a
							href='tel:821042252627'
							className='text-blue-600 hover:underline'
						>
							+82 10-4225-2627
						</a>
					</p>
					<p className='text-gray-700 mb-2'>
						<strong>Югай Виталий:</strong>{' '}
						<a
							href='tel:821093441782'
							className='text-blue-600 hover:underline'
						>
							+82 10-9344-1782
						</a>
					</p>
				</div>
			</div>

			<a
				href='https://t.me/+Ndi8rrAfpg00ZGJl'
				target='_blank'
				rel='noopener noreferrer'
				className='fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full shadow-lg text-lg font-semibold z-50 transition duration-300 animate-bounce flex items-center justify-center w-16 h-16'
			>
				💬
			</a>
		</div>
	)
}

export default CarDetails
