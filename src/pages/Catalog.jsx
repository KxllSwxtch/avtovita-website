import { Helmet } from 'react-helmet'
import Select from 'react-select'
import { useState, useEffect } from 'react'
import axios from 'axios'

import {
	priceOptions,
	yearOptions,
	useKmOptions,
	fuelOptions,
	missionOptions,
	colorOptions,
} from '../utils'
import { CarListItem, Loader, Message } from '../components'
import {
	carBrandsTranslation,
	carModelsTranslation,
	carTrimsTranslation,
	carDetailedModelsTranslation,
} from '../translations'

const brandLogos = {
	Bentley:
		'https://res.cloudinary.com/pomegranitedesign/image/upload/v1740470478/avtovita/brandslogos/bentley.png',
	Mitsuoka:
		'https://res.cloudinary.com/pomegranitedesign/image/upload/v1740470421/avtovita/brandslogos/mitsuoka.png',
	Mitsubishi:
		'https://res.cloudinary.com/pomegranitedesign/image/upload/v1740470352/avtovita/brandslogos/mitsubishi.png',
	McLaren:
		'https://res.cloudinary.com/pomegranitedesign/image/upload/v1740470254/avtovita/brandslogos/mclaren.png',
	Mazda:
		'https://res.cloudinary.com/pomegranitedesign/image/upload/v1740470218/avtovita/brandslogos/mazda.png',
	Maybach:
		'https://res.cloudinary.com/pomegranitedesign/image/upload/v1740470152/avtovita/brandslogos/maybach.png',
	Maserati:
		'https://res.cloudinary.com/pomegranitedesign/image/upload/v1740470116/avtovita/brandslogos/maserati.png',
	Lincoln:
		'https://res.cloudinary.com/pomegranitedesign/image/upload/v1740470044/avtovita/brandslogos/lincoln.png',
	Renault:
		'https://res.cloudinary.com/pomegranitedesign/image/upload/v1740469994/avtovita/brandslogos/renault.png',
	'Rolls-Royce':
		'https://res.cloudinary.com/pomegranitedesign/image/upload/v1740469938/avtovita/brandslogos/rolls-royce.png',
	Lotus:
		'https://res.cloudinary.com/pomegranitedesign/image/upload/v1740469901/avtovita/brandslogos/lotus.png',
	Rover:
		'https://res.cloudinary.com/pomegranitedesign/image/upload/v1740469859/avtovita/brandslogos/rover.png',
	Lexus:
		'https://res.cloudinary.com/pomegranitedesign/image/upload/v1740469824/avtovita/brandslogos/lexus.png',
	Lamborghini:
		'https://res.cloudinary.com/pomegranitedesign/image/upload/v1740469766/avtovita/brandslogos/lamborghini.png',
	Dodge:
		'https://res.cloudinary.com/pomegranitedesign/image/upload/v1740469714/avtovita/brandslogos/dodge.png',
	Daihatsu:
		'https://res.cloudinary.com/pomegranitedesign/image/upload/v1740469678/avtovita/brandslogos/daihatsu.png',
	Nissan:
		'https://res.cloudinary.com/pomegranitedesign/image/upload/v1740469634/avtovita/brandslogos/nissan.png',
	'Land Rover':
		'https://res.cloudinary.com/pomegranitedesign/image/upload/v1740469530/avtovita/brandslogos/landrover.png',
	Volvo:
		'https://res.cloudinary.com/pomegranitedesign/image/upload/v1740469491/avtovita/brandslogos/volvo.png',
	Mini: 'https://res.cloudinary.com/pomegranitedesign/image/upload/v1740469453/avtovita/brandslogos/mini.png',
	Volkswagen:
		'https://res.cloudinary.com/pomegranitedesign/image/upload/v1740442227/avtovita/brandslogos/volkswagen.png',
	Audi: 'https://res.cloudinary.com/pomegranitedesign/image/upload/v1740442148/avtovita/brandslogos/audi.png',
	'Mercedes-Benz':
		'https://res.cloudinary.com/pomegranitedesign/image/upload/v1740442084/avtovita/brandslogos/mercedes.png',
	BMW: 'https://res.cloudinary.com/pomegranitedesign/image/upload/v1740441985/avtovita/brandslogos/bmw.png',
	Hyundai:
		'https://res.cloudinary.com/pomegranitedesign/image/upload/v1740440093/avtovita/brandslogos/hyundai.png',
	KIA: 'https://res.cloudinary.com/pomegranitedesign/image/upload/v1740440478/avtovita/brandslogos/kia.png',
	Genesis:
		'https://res.cloudinary.com/pomegranitedesign/image/upload/v1740440397/avtovita/brandslogos/genesis.png',
	'Chevrolet (Korea)':
		'https://res.cloudinary.com/pomegranitedesign/image/upload/v1740441862/avtovita/brandslogos/chevrolet.png',
	Chevrolet:
		'https://res.cloudinary.com/pomegranitedesign/image/upload/v1740441862/avtovita/brandslogos/chevrolet.png',
	'Renault Korea (Samsung)':
		'https://res.cloudinary.com/pomegranitedesign/image/upload/v1740441673/avtovita/brandslogos/renaultkorea.png',
	'KG Mobility (SsangYong)':
		'https://res.cloudinary.com/pomegranitedesign/image/upload/v1740441782/avtovita/brandslogos/kg.png',
	Daewoo:
		'https://res.cloudinary.com/pomegranitedesign/image/upload/v1740441921/avtovita/brandslogos/daewoo.png',
	Bugatti:
		'https://res.cloudinary.com/pomegranitedesign/image/upload/v1740470527/avtovita/brandslogos/bugatti.png',
	Buick:
		'https://res.cloudinary.com/pomegranitedesign/image/upload/v1740470567/avtovita/brandslogos/buick.png',
	SAAB: 'https://res.cloudinary.com/pomegranitedesign/image/upload/v1740470618/avtovita/brandslogos/saab.png',
	Scion:
		'https://res.cloudinary.com/pomegranitedesign/image/upload/v1740470648/avtovita/brandslogos/scion.png',
	Smart:
		'https://res.cloudinary.com/pomegranitedesign/image/upload/v1740470719/avtovita/brandslogos/smart.png',
	Subaru:
		'https://res.cloudinary.com/pomegranitedesign/image/upload/v1740470754/avtovita/brandslogos/subaru.png',
	Suzuki:
		'https://res.cloudinary.com/pomegranitedesign/image/upload/v1740470790/avtovita/brandslogos/suzuki.png',
	Opel: 'https://res.cloudinary.com/pomegranitedesign/image/upload/v1740470824/avtovita/brandslogos/opel.png',
	Oldsmobile:
		'https://res.cloudinary.com/pomegranitedesign/image/upload/v1740470908/avtovita/brandslogos/oldsmobile.png',
	Iveco:
		'https://res.cloudinary.com/pomegranitedesign/image/upload/v1740470942/avtovita/brandslogos/iveco.png',
	Isuzu:
		'https://res.cloudinary.com/pomegranitedesign/image/upload/v1740470974/avtovita/brandslogos/isuzu.png',
	Infiniti:
		'https://res.cloudinary.com/pomegranitedesign/image/upload/v1740471009/avtovita/brandslogos/infiniti.png',
	Jaguar:
		'https://res.cloudinary.com/pomegranitedesign/image/upload/v1740471069/avtovita/brandslogos/jaguar.png',
	Jeep: 'https://res.cloudinary.com/pomegranitedesign/image/upload/v1740471101/avtovita/brandslogos/jeep.png',
	Zidou:
		'https://res.cloudinary.com/pomegranitedesign/image/upload/v1740471173/avtovita/brandslogos/zhidou.png',
	Geely:
		'https://res.cloudinary.com/pomegranitedesign/image/upload/v1740471208/avtovita/brandslogos/geely.png',
	Cadillac:
		'https://res.cloudinary.com/pomegranitedesign/image/upload/v1740471249/avtovita/brandslogos/cadillac.png',
	Chrysler:
		'https://res.cloudinary.com/pomegranitedesign/image/upload/v1740471287/avtovita/brandslogos/chrysler.png',
	Tesla:
		'https://res.cloudinary.com/pomegranitedesign/image/upload/v1740471322/avtovita/brandslogos/tesla.png',
	Toyota:
		'https://res.cloudinary.com/pomegranitedesign/image/upload/v1740471360/avtovita/brandslogos/toyota.png',
	Ferrari:
		'https://res.cloudinary.com/pomegranitedesign/image/upload/v1740471393/avtovita/brandslogos/ferrari.png',
	Ford: 'https://res.cloudinary.com/pomegranitedesign/image/upload/v1740471424/avtovita/brandslogos/ford.png',
	Foton:
		'https://res.cloudinary.com/pomegranitedesign/image/upload/v1740471465/avtovita/brandslogos/foton.png',
	Pontiac:
		'https://res.cloudinary.com/pomegranitedesign/image/upload/v1740471496/avtovita/brandslogos/pontiac.png',
	Peugeot:
		'https://res.cloudinary.com/pomegranitedesign/image/upload/v1740471531/avtovita/brandslogos/peugeot.png',
	Fiat: 'https://res.cloudinary.com/pomegranitedesign/image/upload/v1740471564/avtovita/brandslogos/fiat.png',
	Hummer:
		'https://res.cloudinary.com/pomegranitedesign/image/upload/v1740471597/avtovita/brandslogos/hummer.png',
	GMC: 'https://res.cloudinary.com/pomegranitedesign/image/upload/v1740471630/avtovita/brandslogos/gmc.png',
	Polestar:
		'https://res.cloudinary.com/pomegranitedesign/image/upload/v1740471734/avtovita/brandslogos/polestar.png',
	BYD: 'https://res.cloudinary.com/pomegranitedesign/image/upload/v1740471769/avtovita/brandslogos/BYD.png',
	Citroën:
		'https://res.cloudinary.com/pomegranitedesign/image/upload/v1740471866/avtovita/brandslogos/citroen.png',
	'Alfa Romeo':
		'https://res.cloudinary.com/pomegranitedesign/image/upload/v1740471902/avtovita/brandslogos/alfaromeo.png',
	'Aston Martin':
		'https://res.cloudinary.com/pomegranitedesign/image/upload/v1740471960/avtovita/brandslogos/astonmartin.png',
	Acura:
		'https://res.cloudinary.com/pomegranitedesign/image/upload/v1740472002/avtovita/brandslogos/acura.png',
	Honda:
		'https://res.cloudinary.com/pomegranitedesign/image/upload/v1740472069/avtovita/brandslogos/honda.png',
}

// Helpers
function translateTrim(text) {
	// Проходимся по всем парам в carTrimsTranslation
	for (const [korean, russian] of Object.entries(carTrimsTranslation)) {
		// Создаем регулярное выражение для поиска корейского слова в любом контексте
		// (?<=\D|^) - перед корейским словом может быть нецифровой символ или начало строки
		// (?=\D|$) - после корейского слова может быть нецифровой символ или конец строки
		const regex = new RegExp(`(?<=\\D|^)${korean}(?=\\D|$)`, 'g')

		// Заменяем все совпадения на русский перевод
		text = text.replace(regex, russian)
	}

	// Возвращаем результат
	return text
}

function translateFuelType(text) {
	for (const [korean, russian] of Object.entries(
		carDetailedModelsTranslation,
	)) {
		// Match only the Korean part of the word and ignore the prefix (e.g. "G")
		const regex = new RegExp(`(?<=^|\\s|\\W)${korean}(?=\\s|\\W|$)`, 'g')

		// Replace the matched Korean word with the Russian translation
		text = text.replace(regex, russian)
	}
	return text
}

const API_BASE_URL = 'https://ark-motors-backend-3a002a527613.herokuapp.com'
const carsPerPage = 24

const Catalog = () => {
	const [selectedCategory, setSelectedCategory] = useState('foreign')

	// ------------------ Основные состояния ------------------
	const [country, setCountry] = useState('foreign') // 'kor' или 'foreign'
	const [makerList, setMakerList] = useState([]) // Список производителей
	const [selectedMaker, setSelectedMaker] = useState('') // Выбранный производитель (MAKER_NO)

	const [modelList, setModelList] = useState([]) // Список моделей
	const [selectedModel, setSelectedModel] = useState('') // Выбранная модель (MODEL_NO)

	const [detailModelList, setDetailModelList] = useState([]) // Список подробных моделей
	const [selectedDetailModel, setSelectedDetailModel] = useState('')

	const [gradeList, setGradeList] = useState([]) // Список комплектаций
	const [selectedGrade, setSelectedGrade] = useState('') // Выбранная комплектация (GRADE_NO)

	const [detailGradeList, setDetailGradeList] = useState([]) // Список детальных комплектаций
	const [selectedDetailGrade, setSelectedDetailGrade] = useState('') // DETAIL_GRADE_NO

	// ------------------ Доп. фильтры ------------------
	const [priceMin, setPriceMin] = useState('')
	const [priceMax, setPriceMax] = useState('')
	const [yearMin, setYearMin] = useState('')
	const [yearMax, setYearMax] = useState('')
	const [useKmMin, setUseKmMin] = useState('')
	const [useKmMax, setUseKmMax] = useState('')
	const [fuel, setFuel] = useState('')
	const [mission, setMission] = useState('')
	const [color, setColor] = useState('')
	const [carPlateNumber, setCarPlateNumber] = useState('')

	const [carList, setCarList] = useState([])
	const [loading, setLoading] = useState(true)
	const [page, setPage] = useState(1) // Текущая страница
	const [totalPages, setTotalPages] = useState(7000) // Всего страниц
	const [isFiltersOpen, setIsFiltersOpen] = useState(false)

	const toggleFilters = () => {
		setIsFiltersOpen((prev) => !prev)
	}

	// ------------------ Запросы к API ------------------
	// 1) Выбор страны => getMakerList
	const handleCountryClick = async (ctry) => {
		// Сбрасываем состояние
		setCountry(ctry)
		setSelectedMaker('')
		setMakerList([])
		setSelectedModel('')
		setModelList([])
		setSelectedDetailModel('')
		setDetailModelList([])
		setSelectedGrade('')
		setGradeList([])
		setSelectedDetailGrade('')
		setDetailGradeList([])

		if (selectedCategory === ctry) {
			setSelectedCategory('') // Скрываем, если повторный клик
		} else {
			setSelectedCategory(ctry) // Устанавливаем выбранную категорию
		}
		setCountry(ctry) // Обновляем страну

		try {
			const response = await axios.get(`${API_BASE_URL}/makers`, {
				params: { country: ctry },
			})
			setMakerList(response.data)
		} catch (error) {
			console.error('Ошибка при загрузке производителей:', error)
		}
	}

	// 2) Выбор производителя => getModelList
	const handleMakerChange = async (makerNo) => {
		setSelectedMaker(makerNo)
		setSelectedModel('')
		setModelList([])
		setSelectedDetailModel('')
		setDetailModelList([])
		setSelectedGrade('')
		setGradeList([])
		setSelectedDetailGrade('')
		setDetailGradeList([])

		if (!makerNo) return
		try {
			const response = await axios.get(`${API_BASE_URL}/models`, {
				params: { maker: makerNo },
			})
			setModelList(response.data)
		} catch (error) {
			console.error('Ошибка при загрузке моделей:', error)
		}
	}

	// 3) Выбор модели => getDetailModelList
	const handleModelChange = async (modelNo) => {
		setSelectedModel(modelNo)
		setSelectedDetailModel('')
		setDetailModelList([])
		setSelectedGrade('')
		setGradeList([])
		setSelectedDetailGrade('')
		setDetailGradeList([])

		if (!modelNo) return
		try {
			const response = await axios.get(`${API_BASE_URL}/detail-models`, {
				params: { model: modelNo },
			})
			setDetailModelList(response.data)
		} catch (error) {
			console.error('Ошибка при загрузке подробных моделей:', error)
		}
	}

	// 4) Выбор подробной модели => getGradeList
	const handleDetailModelChange = async (detailModelNo) => {
		setSelectedDetailModel(detailModelNo)
		setSelectedGrade('')
		setGradeList([])
		setSelectedDetailGrade('')
		setDetailGradeList([])

		if (!detailModelNo) return
		try {
			const response = await axios.get(`${API_BASE_URL}/grades`, {
				params: { 'detail-model': detailModelNo },
			})
			setGradeList(response.data)
		} catch (error) {
			console.error('Ошибка при загрузке комплектаций:', error)
		}
	}

	// 5) Выбор комплектации => getDetailGradeList
	const handleGradeChange = async (gradeNo) => {
		setSelectedGrade(gradeNo)
		setSelectedDetailGrade('')
		setDetailGradeList([])

		if (!gradeNo) return
		try {
			const response = await axios.get(`${API_BASE_URL}/detail-grades`, {
				params: { grade: gradeNo },
			})
			setDetailGradeList(response.data)
		} catch (error) {
			console.error('Ошибка при загрузке детальных комплектаций:', error)
		}
	}

	// 6) Выбор детальной комплектации
	const handleDetailGradeChange = (detailGradeNo) => {
		setSelectedDetailGrade(detailGradeNo)
	}

	// ------------------ Логика динамических списков "от"/"до" ------------------

	// Цена
	const handlePriceMinChange = (val) => {
		setPriceMin(val)
		if (priceMax && Number(priceMax) < Number(val)) {
			setPriceMax(val)
		}
	}
	const filteredPriceMaxOptions = priceOptions.filter(
		(opt) =>
			!priceMin ||
			opt.value === '' ||
			(opt.value !== '' && Number(opt.value) >= Number(priceMin)),
	)

	// Год
	const handleYearMinChange = (val) => {
		setYearMin(val)
		if (yearMax && Number(yearMax) < Number(val)) {
			setYearMax(val)
		}
	}
	const filteredYearMaxOptions = yearOptions.filter(
		(opt) =>
			!yearMin ||
			opt.value === '' ||
			(opt.value !== '' && Number(opt.value) >= Number(yearMin)),
	)

	// Пробег
	const handleUseKmMinChange = (val) => {
		setUseKmMin(val)
		if (useKmMax && Number(useKmMax) < Number(val)) {
			setUseKmMax(val)
		}
	}
	const filteredUseKmMaxOptions = useKmOptions.filter(
		(opt) =>
			!useKmMin ||
			opt.value === '' ||
			(opt.value !== '' && Number(opt.value) >= Number(useKmMin)),
	)

	// ------------------ Финальный поиск ------------------
	const searchCars = async () => {
		setLoading(true)

		const params = {
			order: '',
			ascending: 'desc',
			view: 'image',
			customSelect: `${carsPerPage}`,
			carName: '',
			maker: selectedMaker,
			model: selectedModel,
			dmodel: selectedDetailModel,
			grade: selectedGrade,
			dgrade: selectedDetailGrade,
			'price-min': priceMin,
			'price-max': priceMax,
			'year-min': yearMin,
			'year-max': yearMax,
			'usekm-min': useKmMin,
			'usekm-max': useKmMax,
			fuel,
			mission,
			color,
			country,
			carPlateNumber,
			'vehicle-model': '',
			'vehicle-dmodel': '',
			'vehicle-name': '',
			tab: 'model',
			detailSearch: 'close',
			type: '',
			page, // номер страницы
		}

		try {
			const response = await axios.get(`${API_BASE_URL}/cars`, { params })

			const cars = response.data || []

			// Обновляем список автомобилей
			setCarList(cars)

			// Определяем количество страниц
			if (cars.length < carsPerPage) {
				setTotalPages(page) // Если меньше, значит это последняя страница
			} else {
				setTotalPages(page + 1) // Если машин >= 24, то загружаем ещё одну страницу
			}
		} catch (error) {
			console.error('Ошибка при загрузке автомобилей:', error)
		} finally {
			setLoading(false)
		}
	}

	const resetFilters = () => {
		// Сбрасываем состояние фильтров
		setSelectedMaker('')
		setSelectedModel('')
		setSelectedDetailModel('')
		setSelectedGrade('')
		setSelectedDetailGrade('')
		setPriceMin('')
		setPriceMax('')
		setYearMin('')
		setYearMax('')
		setUseKmMin('')
		setUseKmMax('')
		setFuel('')
		setMission('')
		setColor('')
		setCarPlateNumber('')

		searchCars()
	}

	useEffect(() => {
		const initialMakerList = async () => {
			try {
				const response = await axios.get(`${API_BASE_URL}/makers`, {
					params: { country },
				})
				setMakerList(response.data)
			} catch (error) {
				console.error('Ошибка при загрузке производителей:', error)
			}
		}
		window.scroll({ top: 0, behavior: 'smooth' }) // Прокручиваем страницу вверх
		searchCars()
		initialMakerList()
	}, [country, page])

	// ------------------ Обработчики пагинации ------------------
	// Функция для создания массива страниц
	const getPageNumbers = () => {
		const maxVisible = 5 // Количество отображаемых страниц в пагинации
		let startPage = Math.max(1, page - Math.floor(maxVisible / 2))
		let endPage = startPage + maxVisible - 1

		// Корректируем, если конец выходит за пределы
		if (endPage > totalPages) {
			endPage = totalPages
			startPage = Math.max(1, endPage - maxVisible + 1)
		}

		// Генерируем массив страниц
		return Array.from(
			{ length: endPage - startPage + 1 },
			(_, i) => startPage + i,
		)
	}

	// Обработчики навигации
	const goToPage = (pageNum) => {
		setPage(pageNum)
	}
	const goToFirstPage = () => {
		setPage(1)
	}
	const goToLastPage = () => {
		setPage(totalPages)
	}
	const goToPrevPage = () => {
		if (page > 1) setPage(page - 1)
	}
	const goToNextPage = () => {
		if (page < totalPages) setPage(page + 1)
	}

	// Преобразуем makerList в формат для react-select
	const options = makerList.map((maker) => {
		const translatedName =
			carBrandsTranslation[maker.MAKER_NAME] || maker.MAKER_NAME
		return {
			value: maker.MAKER_NO,
			label: (
				<span className='flex items-center gap-2'>
					{brandLogos[translatedName] && (
						<img
							src={brandLogos[translatedName]}
							alt={translatedName}
							className='inline-block w-5 auto'
						/>
					)}
					{translatedName}
				</span>
			),
			searchLabel: carBrandsTranslation[maker.MAKER_NAME] || maker.MAKER_NAME,
		}
	})

	const customStyles = {
		control: (provided) => ({
			...provided,
			borderRadius: '0.5rem',
			borderColor: '#d1d5db',
			boxShadow: 'none',
			'&:hover': {
				borderColor: '#9ca3af',
			},
		}),
		option: (provided, state) => ({
			...provided,
			display: 'flex',
			alignItems: 'center',
			gap: '0.5rem',
			color: state.isSelected ? '#fff' : '#374151',
			backgroundColor: state.isSelected ? '#2563eb' : '#fff',
			'&:hover': {
				backgroundColor: '#f3f4f6',
			},
		}),
	}

	// eslint-disable-next-line react/prop-types
	const BrandSelector = ({ handleMakerChange }) => {
		const handleChange = (selectedOption) => {
			handleMakerChange(selectedOption.value) // Обновляем selectedMaker
		}

		const customFilter = (option, inputValue) => {
			return option.data.searchLabel
				.toLowerCase()
				.includes(inputValue.toLowerCase())
		}

		return (
			<Select
				ignoreCase
				value={options.find((option) => option.value === selectedMaker)}
				filterOption={customFilter} // Добавили кастомный фильтр
				options={options}
				onChange={handleChange}
				placeholder='Выберите марку'
				styles={customStyles}
				className='w-full text-gray-800 rounded-lg shadow-sm'
			/>
		)
	}

	return (
		<>
			<Helmet>
				<title>Каталог автомобилей из Кореи | АвтоВита</title>
				<meta
					name='description'
					content='Купить авто из Кореи под ключ с доставкой. Корейские и иностранные автомобили в наличии.'
				/>
				<meta
					name='keywords'
					content='авто из Кореи, купить авто из Кореи, иномарки, корейские автомобили, AvtoVita, AvtoDom, avtovita, avtodom, авто из Южной Кореи'
				/>
				<meta
					property='og:title'
					content='Каталог автомобилей из Кореи | AvtoVita'
				/>
				<meta
					property='og:description'
					content='Купить авто из Кореи под ключ с доставкой. Корейские и иностранные автомобили в наличии.'
				/>
				<meta
					property='og:image'
					content='https://avtovita-avtodom.com/preview.png'
				/>
				<meta
					property='og:url'
					content='https://avtovita-avtodom.com/catalog'
				/>
			</Helmet>
			{/* Остальная часть компонента */}

			<div className='p-4 mt-35 md:mt-40 text-white min-h-screen'>
				{/* Фильтры */}
				<>
					<div className='flex justify-center mb-6'>
						<div className='relative flex items-center bg-gradient-to-r from-gray-100 to-gray-200 rounded-full w-[270px] h-[52px] shadow-inner px-1'>
							<div
								className={`absolute top-[4px] left-[4px] w-[130px] h-[44px] bg-white rounded-full shadow-md transition-transform duration-300 ease-in-out z-0 ${
									selectedCategory === 'kor'
										? 'translate-x-0'
										: 'translate-x-[132px]'
								}`}
							></div>
							<button
								onClick={() => handleCountryClick('kor')}
								className={`w-[130px] h-[44px] flex items-center justify-center gap-2 rounded-full transition-all duration-300 text-base font-semibold z-10 relative ${
									selectedCategory === 'kor' ? 'text-red-600' : 'text-gray-600'
								}`}
							>
								🇰🇷 Корейские
							</button>
							<button
								onClick={() => handleCountryClick('foreign')}
								className={`w-[130px] h-[44px] flex items-center justify-center gap-2 rounded-full transition-all duration-300 text-base font-semibold z-10 relative ${
									selectedCategory === 'foreign'
										? 'text-red-600'
										: 'text-gray-600'
								}`}
							>
								🌍 Иномарки
							</button>
						</div>
					</div>

					{/* Если страна выбрана, показываем основные фильтры */}
					{country && (
						<div className='shadow-lg md:p-10 max-w-6xl mx-auto flex flex-col md:flex-row md:gap-6 gap-4'>
							<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
								{/* Производитель */}
								<div className='flex-1'>
									<label className='block text-gray-700 font-semibold mb-2'>
										Марка:
									</label>
									<BrandSelector handleMakerChange={handleMakerChange} />
								</div>

								{/* Модель */}
								<div className='flex-1'>
									<label className='block text-gray-700 font-semibold mb-2 tracking-wide'>
										Модель:
									</label>
									<select
										value={selectedModel}
										onChange={(e) => handleModelChange(e.target.value)}
										className={`w-full border-2 p-3 rounded-lg shadow-sm transition duration-300 appearance-none pr-10 relative
											${
												selectedMaker
													? 'border-gray-300 bg-gray-100 text-gray-800 hover:border-gray-400 focus:ring-gray-400'
													: 'border-gray-300 bg-gray-200 text-gray-500 cursor-not-allowed'
											}
										`}
										disabled={!selectedMaker}
										style={{
											backgroundImage:
												'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="gray"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/></svg>\')',
											backgroundPosition: 'right 12px center',
											backgroundRepeat: 'no-repeat',
											backgroundSize: '1rem',
										}}
									>
										<option value='' className='text-gray-500'>
											Выберите модель
										</option>
										{modelList
											.sort((a, b) => (a.MODEL_NAME > b.MODEL_NAME ? 1 : -1))
											.map((model) => (
												<option
													key={model.MODEL_NO}
													value={model.MODEL_NO}
													className='text-gray-800'
												>
													{carModelsTranslation[model.MODEL_NAME] ||
														model.MODEL_NAME}
												</option>
											))}
									</select>
								</div>

								{/* Поколение */}
								<div className='flex-1'>
									<label className='block text-gray-700 font-semibold mb-2 tracking-wide'>
										Поколение:
									</label>
									<select
										value={selectedDetailModel}
										onChange={(e) => handleDetailModelChange(e.target.value)}
										className={`w-full border-2 p-3 rounded-lg shadow-sm transition duration-300 appearance-none pr-10 relative
											${
												selectedModel
													? 'border-gray-300 bg-gray-100 text-gray-800 hover:border-gray-400 focus:ring-gray-400'
													: 'border-gray-300 bg-gray-200 text-gray-500 cursor-not-allowed'
											}
										`}
										disabled={!selectedModel}
										style={{
											backgroundImage:
												'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="gray"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/></svg>\')',
											backgroundPosition: 'right 10px center',
											backgroundRepeat: 'no-repeat',
											backgroundSize: '1rem',
										}}
									>
										<option value='' className='text-gray-500'>
											Выберите подробную модель
										</option>
										{detailModelList.map((dmodel) => (
											<option
												key={dmodel.DETAIL_MODEL_NO}
												value={dmodel.DETAIL_MODEL_NO}
												className='text-gray-800'
											>
												{translateTrim(dmodel.DETAIL_MODEL_NAME) ||
													dmodel.DETAIL_MODEL_NAME}
											</option>
										))}
									</select>
								</div>

								{/* Комплектация */}
								<div className='flex-1'>
									<label className='block text-gray-700 font-semibold mb-2 tracking-wide'>
										Комплектация:
									</label>
									<select
										value={selectedGrade}
										onChange={(e) => handleGradeChange(e.target.value)}
										className={`w-full border-2 p-3 pr-10 rounded-lg shadow-sm transition duration-300 appearance-none relative
											${
												selectedDetailModel
													? 'border-gray-300 bg-gray-100 text-gray-800 hover:border-gray-400 focus:ring-gray-400'
													: 'border-gray-300 bg-gray-200 text-gray-500 cursor-not-allowed'
											}
										`}
										disabled={!selectedDetailModel}
										style={{
											backgroundImage:
												'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="gray"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/></svg>\')',
											backgroundPosition: 'right 12px center',
											backgroundRepeat: 'no-repeat',
											backgroundSize: '1rem',
										}}
									>
										<option value='' className='text-gray-500'>
											Выберите комплектацию
										</option>
										{gradeList.map((grade) => (
											<option
												key={grade.GRADE_NO}
												value={grade.GRADE_NO}
												className='text-gray-800'
											>
												{translateFuelType(grade.GRADE_NAME) ||
													grade.GRADE_NAME}
											</option>
										))}
									</select>
								</div>

								{/* Детальная комплектация */}
								<div className='flex-1'>
									<label className='block text-gray-700 font-semibold mb-2 tracking-wide'>
										Детальная комплектация:
									</label>
									<select
										value={selectedDetailGrade}
										onChange={(e) => handleDetailGradeChange(e.target.value)}
										className={`w-full border-2 p-3 pr-10 rounded-lg shadow-sm transition duration-300 appearance-none relative
											${
												selectedGrade
													? 'border-gray-300 bg-gray-100 text-gray-800 hover:border-gray-400 focus:ring-gray-400'
													: 'border-gray-300 bg-gray-200 text-gray-500 cursor-not-allowed'
											}
										`}
										disabled={!selectedGrade}
										style={{
											backgroundImage:
												'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="gray"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/></svg>\')',
											backgroundPosition: 'right 12px center',
											backgroundRepeat: 'no-repeat',
											backgroundSize: '1rem',
										}}
									>
										<option value='' className='text-gray-500'>
											Выберите детальную комплектацию
										</option>
										{detailGradeList.map((dgrade) => (
											<option
												key={dgrade.DETAIL_GRADE_NO}
												value={dgrade.DETAIL_GRADE_NO}
												className='text-gray-800'
											>
												{translateFuelType(dgrade.DETAIL_GRADE_NAME)}
											</option>
										))}
									</select>
								</div>

								{/* Номер авто */}
								<div className='flex-1'>
									<label className='block text-gray-700 font-medium mb-2'>
										Номер авто:
									</label>
									<input
										type='text'
										value={carPlateNumber}
										onChange={(e) => setCarPlateNumber(e.target.value)}
										maxLength={9}
										className='text-black w-full border border-gray-300 p-3 rounded-lg shadow-sm focus:ring-avtoVitaDark focus:border-avtoVitaDark transition'
										placeholder='Введите номер авто'
									/>
								</div>
							</div>
						</div>
					)}
				</>

				{/* Кнопка показа/скрытия */}
				<div className='text-center'>
					<button
						onClick={toggleFilters}
						className={`
							mt-5 m-auto cursor-pointer flex items-center justify-center px-4 py-2 md:px-6 md:py-3 font-semibold shadow-sm transition-all duration-300
							border-2 text-base md:text-lg rounded-lg w-full md:w-auto
							${
								isFiltersOpen
									? 'bg-gray-200 text-gray-800 border-gray-300 scale-105 shadow-md'
									: 'bg-gray-100 text-gray-600 border-gray-300 hover:bg-gray-200 hover:text-gray-800 hover:border-gray-400'
							}
							active:scale-95
						`}
					>
						<span>
							{isFiltersOpen ? 'Скрыть Доп. фильтры' : 'Показать Доп. фильтры'}
						</span>
					</button>
				</div>

				{/* Дополнительные фильтры (шторка) */}
				<div
					className={`
					overflow-hidden transition-all duration-500 ease-in-out
					${
						isFiltersOpen
							? 'max-h-[1000px] opacity-100 scale-100'
							: 'max-h-0 opacity-0 scale-95'
					}
					 text-gray-800 py-4
				`}
				>
					<div className='max-w-6xl mx-auto'>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
							{/* Цена от */}
							<div>
								<label className='block text-gray-600 font-semibold mb-2 tracking-wide'>
									Цена от:
								</label>
								<select
									value={priceMin}
									onChange={(e) => handlePriceMinChange(e.target.value)}
									className='w-full border border-gray-300 p-3 pr-10 rounded-lg shadow-sm bg-gray-100 text-gray-800 focus:ring-gray-400 focus:border-gray-400 transition duration-300 ease-in-out appearance-none relative'
									style={{
										backgroundImage:
											'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="gray"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/></svg>\')',
										backgroundPosition: 'right 12px center',
										backgroundRepeat: 'no-repeat',
										backgroundSize: '1rem',
									}}
								>
									{priceOptions.map((opt) => (
										<option
											key={opt.value}
											value={opt.value}
											className='text-gray-700'
										>
											{opt.label}
										</option>
									))}
								</select>
							</div>

							{/* Цена до */}
							<div>
								<label className='block text-gray-600 font-semibold mb-2 tracking-wide'>
									Цена до:
								</label>
								<select
									value={priceMax}
									onChange={(e) => setPriceMax(e.target.value)}
									className='w-full border border-gray-300 p-3 pr-10 rounded-lg shadow-sm bg-gray-100 text-gray-800 focus:ring-gray-400 focus:border-gray-400 transition duration-300 ease-in-out appearance-none relative'
									style={{
										backgroundImage:
											'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="gray"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/></svg>\')',
										backgroundPosition: 'right 12px center',
										backgroundRepeat: 'no-repeat',
										backgroundSize: '1rem',
									}}
								>
									{filteredPriceMaxOptions.map((opt) => (
										<option
											key={opt.value}
											value={opt.value}
											className='text-gray-700'
										>
											{opt.label}
										</option>
									))}
								</select>
							</div>

							{/* Год от */}
							<div>
								<label className='block text-gray-600 font-semibold mb-2 tracking-wide'>
									Год от:
								</label>
								<select
									value={yearMin}
									onChange={(e) => handleYearMinChange(e.target.value)}
									className='w-full border border-gray-300 p-3 pr-10 rounded-lg shadow-sm bg-gray-100 text-gray-800 focus:ring-gray-400 focus:border-gray-400 transition duration-300 ease-in-out appearance-none relative'
									style={{
										backgroundImage:
											'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="gray"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/></svg>\')',
										backgroundPosition: 'right 12px center',
										backgroundRepeat: 'no-repeat',
										backgroundSize: '1rem',
									}}
								>
									{yearOptions.map((opt) => (
										<option
											key={opt.value}
											value={opt.value}
											className='text-gray-700'
										>
											{opt.label}
										</option>
									))}
								</select>
							</div>

							{/* Год до */}
							<div>
								<label className='block text-gray-600 font-semibold mb-2 tracking-wide'>
									Год до:
								</label>
								<select
									value={yearMax}
									onChange={(e) => setYearMax(e.target.value)}
									className='w-full border border-gray-300 p-3 pr-10 rounded-lg shadow-sm bg-gray-100 text-gray-800 focus:ring-gray-400 focus:border-gray-400 transition duration-300 ease-in-out appearance-none relative'
									style={{
										backgroundImage:
											'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="gray"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/></svg>\')',
										backgroundPosition: 'right 12px center',
										backgroundRepeat: 'no-repeat',
										backgroundSize: '1rem',
									}}
								>
									{filteredYearMaxOptions.map((opt) => (
										<option
											key={opt.value}
											value={opt.value}
											className='text-gray-700'
										>
											{opt.label}
										</option>
									))}
								</select>
							</div>

							{/* Пробег от */}
							<div>
								<label className='block text-gray-600 font-semibold mb-2 tracking-wide'>
									Пробег от:
								</label>
								<select
									value={useKmMin}
									onChange={(e) => handleUseKmMinChange(e.target.value)}
									className='w-full border border-gray-300 p-3 pr-10 rounded-lg shadow-sm bg-gray-100 text-gray-800 focus:ring-gray-400 focus:border-gray-400 transition duration-300 ease-in-out appearance-none relative'
									style={{
										backgroundImage:
											'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="gray"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/></svg>\')',
										backgroundPosition: 'right 12px center',
										backgroundRepeat: 'no-repeat',
										backgroundSize: '1rem',
									}}
								>
									{useKmOptions.map((opt) => (
										<option
											key={opt.value}
											value={opt.value}
											className='text-gray-700'
										>
											{opt.label}
										</option>
									))}
								</select>
							</div>

							{/* Пробег до */}
							<div>
								<label className='block text-gray-600 font-semibold mb-2 tracking-wide'>
									Пробег до:
								</label>
								<select
									value={useKmMax}
									onChange={(e) => setUseKmMax(e.target.value)}
									className='w-full border border-gray-300 p-3 pr-10 rounded-lg shadow-sm bg-gray-100 text-gray-800 focus:ring-gray-400 focus:border-gray-400 transition duration-300 ease-in-out appearance-none relative'
									style={{
										backgroundImage:
											'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="gray"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/></svg>\')',
										backgroundPosition: 'right 12px center',
										backgroundRepeat: 'no-repeat',
										backgroundSize: '1rem',
									}}
								>
									{filteredUseKmMaxOptions.map((opt) => (
										<option
											key={opt.value}
											value={opt.value}
											className='text-gray-700'
										>
											{opt.label}
										</option>
									))}
								</select>
							</div>

							{/* Топливо */}
							<div>
								<label className='block text-gray-600 font-semibold mb-2 tracking-wide'>
									Топливо:
								</label>
								<select
									value={fuel}
									onChange={(e) => setFuel(e.target.value)}
									className='w-full border border-gray-300 p-3 pr-10 rounded-lg shadow-sm bg-gray-100 text-gray-800 focus:ring-gray-400 focus:border-gray-400 transition duration-300 ease-in-out appearance-none relative'
									style={{
										backgroundImage:
											'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="gray"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/></svg>\')',
										backgroundPosition: 'right 12px center',
										backgroundRepeat: 'no-repeat',
										backgroundSize: '1rem',
									}}
								>
									{fuelOptions.map((opt) => (
										<option
											key={opt.value}
											value={opt.value}
											className='text-gray-700'
										>
											{opt.label}
										</option>
									))}
								</select>
							</div>

							{/* Трансмиссия */}
							<div>
								<label className='block text-gray-600 font-semibold mb-2 tracking-wide'>
									Трансмиссия:
								</label>
								<select
									value={mission}
									onChange={(e) => setMission(e.target.value)}
									className='w-full border border-gray-300 p-3 pr-10 rounded-lg shadow-sm bg-gray-100 text-gray-800 focus:ring-gray-400 focus:border-gray-400 transition duration-300 ease-in-out appearance-none relative'
									style={{
										backgroundImage:
											'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="gray"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/></svg>\')',
										backgroundPosition: 'right 12px center',
										backgroundRepeat: 'no-repeat',
										backgroundSize: '1rem',
									}}
								>
									{missionOptions.map((opt) => (
										<option
											key={opt.value}
											value={opt.value}
											className='text-gray-700'
										>
											{opt.label}
										</option>
									))}
								</select>
							</div>

							{/* Цвет */}
							<div>
								<label className='block text-gray-600 font-semibold tracking-wide'>
									Цвет:
								</label>
								<select
									value={color}
									onChange={(e) => setColor(e.target.value)}
									className='w-full border border-gray-300 p-3 pr-10 rounded-lg shadow-sm bg-gray-100 text-gray-800 focus:ring-gray-400 focus:border-gray-400 transition duration-300 ease-in-out appearance-none relative'
									style={{
										backgroundImage:
											'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="gray"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/></svg>\')',
										backgroundPosition: 'right 12px center',
										backgroundRepeat: 'no-repeat',
										backgroundSize: '1rem',
									}}
								>
									{colorOptions.map((opt) => (
										<option
											key={opt.value}
											value={opt.value}
											className='text-gray-700'
										>
											{opt.label}
										</option>
									))}
								</select>
							</div>
						</div>
					</div>
				</div>

				{/* Кнопка поиска и сброса фильтров */}
				<div className='flex flex-wrap gap-6 justify-center'>
					{/* Кнопка "Поиск" */}
					<button
						onClick={searchCars}
						disabled={!country}
						className='cursor-pointer px-8 py-3 rounded-full font-semibold bg-gray-100 text-gray-800 hover:bg-gray-200 transition duration-300 ease-in-out shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 border border-gray-300'
					>
						🔍 <span>Поиск</span>
					</button>

					{/* Кнопка "Сбросить фильтры" */}
					<button
						onClick={resetFilters}
						className='cursor-pointer px-8 py-3 rounded-full font-semibold bg-gray-100 text-gray-800 hover:bg-gray-200 transition duration-300 ease-in-out shadow-md flex items-center gap-2 border border-gray-300'
					>
						🔄 <span>Сбросить</span>
					</button>
				</div>

				{/* Отображение автомобилей */}
				<div className='mt-6'>
					{loading ? (
						<div className='flex justify-center items-center h-32'>
							{/* <Loader /> */}
							<p>Загрузка...</p>
						</div>
					) : carList.length > 0 ? (
						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
							{carList
								.sort((a, b) => (a.year > b.year ? -1 : 1))
								.map((car, idx) => (
									<CarListItem car={car} key={idx} />
								))}
						</div>
					) : (
						<Message text='Автомобили не найдены' icon='❌' />
					)}
				</div>

				{/* Пагинация */}
				{carList.length > 0 && totalPages > 1 && (
					<div className='mt-6 flex justify-center items-center gap-2'>
						<button
							onClick={goToFirstPage}
							disabled={page === 1}
							className='cursor-pointer px-4 py-2 rounded-lg text-white font-semibold transition-all duration-300 bg-gray-700 hover:bg-gray-600 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed'
						>
							&laquo;
						</button>
						<button
							onClick={goToPrevPage}
							disabled={page === 1}
							className='px-4 py-2 rounded-lg text-white font-semibold transition-all duration-300 bg-gray-700 hover:bg-gray-600 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed'
						>
							&lt;
						</button>

						{getPageNumbers().map((pageNum) => (
							<button
								key={pageNum}
								onClick={() => goToPage(pageNum)}
								className={`cursor-pointer px-4 py-2 rounded-lg text-white font-semibold transition-all duration-300
                    ${
											pageNum === page
												? 'bg-yellow-500 text-black scale-110 shadow-lg'
												: 'bg-gray-800 hover:bg-yellow-400 hover:text-black'
										}
                `}
							>
								{pageNum}
							</button>
						))}

						<button
							onClick={goToNextPage}
							disabled={page === totalPages}
							className='cursor-pointer px-4 py-2 rounded-lg text-white font-semibold transition-all duration-300 bg-gray-700 hover:bg-gray-600 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed'
						>
							&gt;
						</button>
						<button
							onClick={goToLastPage}
							disabled={page === totalPages}
							className='cursor-pointer px-4 py-2 rounded-lg text-white font-semibold transition-all duration-300 bg-gray-700 hover:bg-gray-600 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed'
						>
							&raquo;
						</button>
					</div>
				)}
			</div>
		</>
	)
}

export default Catalog
