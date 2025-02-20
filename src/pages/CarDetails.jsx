import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

import { translateCarName } from '../utils'
import { carModelsTranslation } from '../translations'
import { ImageSlider, Loader } from '../components'

const translations = {
	price: 'Цена в Корее (₩)',
	연식: 'Год выпуска',
	최초등록일: 'Дата первой регистрации',
	연료: 'Тип топлива',
	휘발유: 'Бензин',
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
}

const API_BASE_URL = 'https://ark-motors-backend-3a002a527613.herokuapp.com'

const CarDetails = () => {
	const { carId } = useParams()
	const [carData, setCarData] = useState(null)
	const [loading, setLoading] = useState(true)
	const [images, setImages] = useState([])
	const [carName, setCarName] = useState('')

	useEffect(() => {
		const fetchCarDetails = async () => {
			try {
				const response = await axios.get(`${API_BASE_URL}/car-details`, {
					params: { carId },
				})
				// Сервер возвращает JSON с полями carName и carData
				setCarName(response.data.carName)
				setCarData(response.data.carData)
			} catch (error) {
				console.error('Ошибка при загрузке деталей автомобиля:', error)
			} finally {
				setLoading(false)
			}
		}

		const fetchCarImages = async () => {
			try {
				const response = await axios.get(`${API_BASE_URL}/car-images`, {
					params: { carId },
				})
				setImages(response.data.images)
			} catch (error) {
				console.error('Ошибка загрузки изображений:', error)
			}
		}

		fetchCarDetails()
		fetchCarImages()
	}, [carId])

	if (loading) return <Loader />

	return (
		<div className='container mx-auto p-4 max-w-4xl mt-30'>
			{images.length > 0 && <ImageSlider images={images} />}
			{carData ? (
				<div className='bg-black shadow-2xl rounded-xl p-10'>
					<h2 className='text-4xl font-bold mb-8 text-center text-red-600'>
						{carName ? translateCarName(carName) : 'Модель не указана'}
					</h2>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
						{Object.entries(carData).map(([key, value], index) => (
							<div
								key={index}
								className='bg-avtoVitaBlack text-white p-6 rounded-lg border border-gray-700 hover:shadow-2xl hover:border-red-600 transition duration-300'
							>
								<p className='text-sm font-medium text-gray-400'>
									{translations[key] || key}:
								</p>
								<p className='mt-1 text-xl font-semibold text-avtoVitaGold'>
									{translations[value] ||
										carModelsTranslation[value] ||
										value.toLocaleString()}
								</p>
							</div>
						))}
					</div>
				</div>
			) : (
				<p className='text-center text-gray-500'>Автомобиль не найден</p>
			)}
			<div className='mt-8 p-6 bg-avtoVitaBlack rounded-lg text-center shadow-2xl border border-gray-700 hover:border-red-600 transition duration-300'>
				<h3 className='text-3xl font-bold text-avtoVitaRed mb-4 text-white'>
					Контакты для связи
				</h3>
				<p className='text-lg text-white'>
					Виталий:{' '}
					<span className='font-semibold text-avtoVitaGold'>
						+82 10-9344-1782
					</span>
				</p>
				<p className='text-lg text-white'>
					Ким Евгений:{' '}
					<span className='font-semibold text-avtoVitaGold'>
						+82 10-4225-2627
					</span>
				</p>
				<p className='text-lg text-white'>
					Цой Юрий:{' '}
					<span className='font-semibold text-avtoVitaGold'>
						+82 10-7609-7787
					</span>
				</p>
				<p className='text-lg text-white'>
					Цой Евгений:{' '}
					<span className='font-semibold text-avtoVitaGold'>
						+82 10-4416-8778
					</span>
				</p>
			</div>
		</div>
	)
}

export default CarDetails
