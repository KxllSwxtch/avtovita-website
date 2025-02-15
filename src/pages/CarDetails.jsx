import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Loader from '../components/Loader'

const translations = {
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
	'압류｜저당': 'Обременения',
	'0건｜0건': 'Отсутствуют',
	모델명: 'Модель',
	세금미납: 'Задолженность по налогам',
	없음: 'Отсутствует',
	제시번호: 'Номер предложения',
}

const CarDetails = () => {
	const { carId } = useParams()
	const [carData, setCarData] = useState(null)
	const [loading, setLoading] = useState(true)
	const [images, setImages] = useState([])
	const [carName, setCarName] = useState('')

	useEffect(() => {
		const fetchCarDetails = async () => {
			try {
				const url = `https://thingproxy.freeboard.io/fetch/https://www.arkmotors.kr/search/detail/${carId}`
				const response = await axios.get(url, {
					headers: { Accept: 'text/html' },
				})

				const parser = new DOMParser()
				const doc = parser.parseFromString(response.data, 'text/html')

				const carNameElement = doc.querySelector('.car_name p')
				if (carNameElement) {
					setCarName(carNameElement.textContent.trim())
				}

				const basicInfo = doc.querySelector('.basic-info table tbody')
				const rows = basicInfo ? basicInfo.querySelectorAll('tr') : []
				let carInfo = {}

				rows.forEach((row) => {
					const columns = row.querySelectorAll('th, td')
					if (columns.length === 4) {
						carInfo[
							translations[columns[0].textContent.trim()] ||
								columns[0].textContent.trim()
						] =
							translations[columns[1].textContent.trim()] ||
							columns[1].textContent.trim()
						carInfo[
							translations[columns[2].textContent.trim()] ||
								columns[2].textContent.trim()
						] =
							translations[columns[3].textContent.trim()] ||
							columns[3].textContent.trim()
					} else if (columns.length === 2) {
						carInfo[
							translations[columns[0].textContent.trim()] ||
								columns[0].textContent.trim()
						] =
							translations[columns[1].textContent.trim()] ||
							columns[1].textContent.trim()
					}
				})

				delete carInfo['사고유무']

				setCarData(carInfo)
			} catch (error) {
				console.error('Ошибка при загрузке деталей автомобиля:', error)
			} finally {
				setLoading(false)
			}
		}

		const fetchCarImages = async () => {
			try {
				const response = await axios.post(
					'https://www.arkmotors.kr/search/imageList',
					new URLSearchParams({ carNo: carId }),
					{
						headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
					},
				)
				setImages(
					response.data.info.map((img) => ({
						full: img.CarImageFullName,
						thumb: img.CarImageThumb,
					})),
				)
			} catch (error) {
				console.error('Ошибка загрузки изображений:', error)
			}
		}

		fetchCarDetails()
		fetchCarImages()
	}, [carId])

	if (loading) return <Loader />

	return (
		<div className='container mx-auto p-4 max-w-4xl'>
			{images.length > 0 && (
				<div className='mb-6'>
					<Slider
						dots={true}
						infinite={true}
						speed={500}
						slidesToShow={1}
						slidesToScroll={1}
						adaptiveHeight={true}
						className='rounded-lg overflow-hidden'
					>
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
				</div>
			)}
			{carData ? (
				<div className='bg-white shadow-lg rounded-lg p-6'>
					<h2 className='text-3xl font-bold mb-6 text-center text-blue-600'>
						{carName || 'Модель не указана'}
					</h2>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-100 p-6 rounded-lg'>
						{Object.entries(carData).map(([key, value], index) => (
							<div key={index} className='bg-white p-4 shadow-md rounded-md'>
								<p className='text-gray-500 font-semibold'>{key}:</p>
								<p className='text-lg font-bold text-gray-700'>{value}</p>
							</div>
						))}
					</div>
				</div>
			) : (
				<p className='text-center text-gray-500'>Автомобиль не найден</p>
			)}
			<div className='mt-8 p-6 bg-blue-50 rounded-lg text-center'>
				<h3 className='text-2xl font-bold text-blue-600 mb-4'>
					Контакты для связи
				</h3>
				<p className='text-lg'>
					Виталий: <span className='font-semibold'>+82 10-9344-1782</span>
				</p>
				<p className='text-lg'>
					Ким Евгений: <span className='font-semibold'>+82 10-4225-2627</span>
				</p>
				<p className='text-lg'>
					Цой Юрий: <span className='font-semibold'>+82 10-7609-7787</span>
				</p>
				<p className='text-lg'>
					Цой Евгений: <span className='font-semibold'>+82 10-4416-8778</span>
				</p>
			</div>
		</div>
	)
}

export default CarDetails
