import axios from "axios"
import { useState, useEffect, useRef, useCallback, useMemo, memo } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { translations, translateSmartly } from "../translations"
import { formatDate, transformBadgeValue } from "../utils"
import { Loader } from "../components"
import { CarCard as BaseCarCard } from "../components"

// Memoize CarCard to prevent unnecessary re-renders
const CarCard = memo(BaseCarCard)

// Debounce utility
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

const Catalog = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const filtersReady = useRef(true)
  const urlParams = useRef({
    manufacturer: null,
    modelGroup: null,
    model: null,
  })

  // Track if this is the first render
  const isInitialMount = useRef(true)
  const fetchInProgress = useRef(false)

  const [sortOption, setSortOption] = useState("newest")
  const [loading, setLoading] = useState(false)
  const [searchByNumber, setSearchByNumber] = useState("")
  const debouncedSearchByNumber = useDebounce(searchByNumber, 500)

  const [currentPage, setCurrentPage] = useState(1)
  const [totalCars, setTotalCars] = useState(0)

  const [priceStart, setPriceStart] = useState("")
  const [priceEnd, setPriceEnd] = useState("")

  const [mileageStart, setMileageStart] = useState("")
  const [mileageEnd, setMileageEnd] = useState("")

  const [endYear, setEndYear] = useState("")
  const [endMonth, setEndMonth] = useState("00")

  const [startYear, setStartYear] = useState("")
  const [startMonth, setStartMonth] = useState("00")

  const [usdKrwRate, setUsdKrwRate] = useState(null)

  const [cars, setCars] = useState([])

  const [manufacturers, setManufacturers] = useState(null)
  const [selectedManufacturer, setSelectedManufacturer] = useState("")

  const [modelGroups, setModelGroups] = useState(null)
  const [selectedModelGroup, setSelectedModelGroup] = useState("")

  const [models, setModels] = useState(null)
  const [selectedModel, setSelectedModel] = useState("")

  const [configurations, setConfigurations] = useState(null)
  const [selectedConfiguration, setSelectedConfiguration] = useState("")

  const [badges, setBadges] = useState(null)
  const [selectedBadge, setSelectedBadge] = useState("")

  const [badgeDetails, setBadgeDetails] = useState(null)
  const [selectedBadgeDetails, setSelectedBadgeDetails] = useState("")

  const [error, setError] = useState("")

  const sortOptions = useMemo(
    () => ({
      newest: "|ModifiedDate",
      priceAsc: "|PriceAsc",
      priceDesc: "|PriceDesc",
      mileageAsc: "|MileageAsc",
      mileageDesc: "|MileageDesc",
      yearDesc: "|Year",
    }),
    []
  )

  // Load initial data & set up URL params
  useEffect(() => {
    // Load saved page
    const savedPage = localStorage.getItem("exportCatalogCurrentPage")
    if (savedPage) {
      setCurrentPage(parseInt(savedPage, 10))
    }

    // Fetch USD to KRW exchange rate
    const fetchUsdKrwRate = async () => {
      try {
        const response = await axios.get(
          "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json"
        )

        if (response.status === 200) {
          const jsonData = response.data
          const rate = jsonData["usd"]["krw"]
          setUsdKrwRate(rate)
        }
      } catch (e) {
        console.error(e)
      }
    }

    // Fetch manufacturers list
    const fetchManufacturers = async () => {
      try {
        const url = `https://encar-proxy-main.onrender.com/api/nav?count=true&q=(And.Hidden.N._.CarType.A._.SellType.%EC%9D%BC%EB%B0%98.)&inav=%7CMetadata%7CSort`
        const response = await axios.get(url)
        const data = response.data

        if (data) {
          setTotalCars(data?.Count || 0)
          const manufacturers =
            data?.iNav?.Nodes[1]?.Facets[0]?.Refinements?.Nodes[0]?.Facets || []
          setManufacturers(manufacturers)
        }
      } catch (error) {
        console.error("Error fetching manufacturers:", error)
      }
    }

    fetchUsdKrwRate()
    fetchManufacturers()

    // Mark initial mount as complete
    isInitialMount.current = false
  }, []) // Empty dependency - run once on mount

  // Handle URL params
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    urlParams.current = {
      manufacturer: searchParams.get("manufacturer"),
      modelGroup: searchParams.get("modelGroup"),
      model: searchParams.get("model"),
    }

    if (urlParams.current.manufacturer && !selectedManufacturer) {
      setSelectedManufacturer(urlParams.current.manufacturer)
    }
  }, [location.search, selectedManufacturer])

  // Save currentPage to localStorage
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      localStorage.setItem("exportCatalogCurrentPage", currentPage.toString())
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [currentPage])

  // Combined fetch function to get all filter cascades
  const fetchFilterData = useCallback(async () => {
    if (fetchInProgress.current) return
    fetchInProgress.current = true

    try {
      // Only fetch model groups if manufacturer is selected
      if (selectedManufacturer) {
        const url = `https://encar-proxy-main.onrender.com/api/nav?count=true&q=(And.Hidden.N._.SellType.%EC%9D%BC%EB%B0%98._.(C.CarType.A._.Manufacturer.${selectedManufacturer}.))&inav=%7CMetadata%7CSort`
        const response = await axios.get(url)
        const data = response?.data

        if (data) {
          setTotalCars(data?.Count || 0)
          const allManufacturers =
            data?.iNav?.Nodes[2]?.Facets[0]?.Refinements?.Nodes[0]?.Facets || []
          const filteredManufacturer = allManufacturers.find(
            (item) => item.IsSelected === true
          )
          const models =
            filteredManufacturer?.Refinements?.Nodes[0]?.Facets || []

          setModelGroups(models)

          // Handle URL params for model group
          if (urlParams.current.modelGroup && !selectedModelGroup) {
            const modelExists = models?.some(
              (model) => model.Value === urlParams.current.modelGroup
            )
            if (modelExists) {
              setSelectedModelGroup(urlParams.current.modelGroup)
            }
          }
        }
      }

      // Only fetch models if model group is selected
      if (selectedManufacturer && selectedModelGroup) {
        const url = `https://encar-proxy-main.onrender.com/api/nav?count=true&q=(And.Hidden.N._.SellType.%EC%9D%BC%EB%B0%98._.(C.CarType.A._.(C.Manufacturer.${selectedManufacturer}._.ModelGroup.${selectedModelGroup}.)))&inav=%7CMetadata%7CSort`
        const response = await axios.get(url)
        const data = response?.data

        if (data) {
          setTotalCars(data?.Count || 0)
          const allManufacturers =
            data?.iNav?.Nodes[2]?.Facets[0]?.Refinements?.Nodes[0]?.Facets || []
          const filteredManufacturer = allManufacturers.find(
            (item) => item.IsSelected === true
          )
          const modelGroup =
            filteredManufacturer?.Refinements?.Nodes[0]?.Facets || []
          const filteredModel = modelGroup.find(
            (item) => item.IsSelected === true
          )
          const models = filteredModel?.Refinements?.Nodes[0]?.Facets || []

          setModels(models)

          // Handle URL params for model
          if (urlParams.current.model && !selectedModel) {
            const modelExists = models?.some(
              (model) => model.Value === urlParams.current.model
            )
            if (modelExists) {
              setSelectedModel(urlParams.current.model)
            }
            // Reset URL params after they've been processed
            urlParams.current = {
              manufacturer: null,
              modelGroup: null,
              model: null,
            }
          }
        }
      }

      // Only fetch configurations if model is selected
      if (selectedManufacturer && selectedModelGroup && selectedModel) {
        const url = `https://encar-proxy-main.onrender.com/api/nav?count=true&q=(And.Hidden.N._.(C.CarType.A._.(C.Manufacturer.${selectedManufacturer}._.(C.ModelGroup.${selectedModelGroup}._.Model.${selectedModel}.))))&inav=%7CMetadata%7CSort`
        const response = await axios.get(url)
        const data = response?.data

        if (data) {
          setTotalCars(data?.Count || 0)
          const allManufacturers =
            data?.iNav?.Nodes[1]?.Facets[0]?.Refinements?.Nodes[0]?.Facets || []
          const filteredManufacturer = allManufacturers.find(
            (item) => item.IsSelected === true
          )
          const modelGroup =
            filteredManufacturer?.Refinements?.Nodes[0]?.Facets || []
          const filteredModel = modelGroup?.find(
            (item) => item.IsSelected === true
          )
          const models = filteredModel?.Refinements?.Nodes[0]?.Facets || []
          const filteredConfiguration = models?.find(
            (item) => item.IsSelected === true
          )
          const configurations =
            filteredConfiguration?.Refinements?.Nodes[0]?.Facets || []

          setConfigurations(configurations)
        }
      }

      // Only fetch badges if configuration is selected
      if (
        selectedManufacturer &&
        selectedModelGroup &&
        selectedModel &&
        selectedConfiguration
      ) {
        const url = `https://encar-proxy-main.onrender.com/api/nav?count=true&q=(And.Hidden.N._.(C.CarType.A._.(C.Manufacturer.${selectedManufacturer}._.(C.ModelGroup.${selectedModelGroup}._.(C.Model.${selectedModel}._.BadgeGroup.${selectedConfiguration}.)))))&inav=%7CMetadata%7CSort`
        const response = await axios.get(url)
        const data = response?.data

        if (data) {
          setTotalCars(data?.Count || 0)
          const allManufacturers =
            data?.iNav?.Nodes[1]?.Facets[0]?.Refinements?.Nodes[0]?.Facets || []
          const filteredManufacturer = allManufacturers.find(
            (item) => item.IsSelected === true
          )
          const modelGroup =
            filteredManufacturer?.Refinements?.Nodes[0]?.Facets || []
          const filteredModel = modelGroup?.find(
            (item) => item.IsSelected === true
          )
          const models = filteredModel?.Refinements?.Nodes[0]?.Facets || []
          const filteredConfiguration = models?.find(
            (item) => item.IsSelected === true
          )
          const configurations =
            filteredConfiguration?.Refinements?.Nodes[0]?.Facets || []
          const filteredBadgeGroup = configurations?.find(
            (item) => item.IsSelected === true
          )
          const badges = filteredBadgeGroup?.Refinements?.Nodes[0]?.Facets || []

          setBadges(badges)
        }
      }

      // Only fetch badge details if badge is selected
      if (
        selectedManufacturer &&
        selectedModelGroup &&
        selectedModel &&
        selectedConfiguration &&
        selectedBadge
      ) {
        const url = `https://encar-proxy-main.onrender.com/api/nav?count=true&q=(And.Hidden.N._.SellType.%EC%9D%BC%EB%B0%98._.(C.CarType.A._.(C.Manufacturer.${selectedManufacturer}._.(C.ModelGroup.${selectedModelGroup}._.(C.Model.${selectedModel}._.(C.BadgeGroup.${selectedConfiguration}._.Badge.${transformBadgeValue(
          selectedBadge
        )}.))))))&inav=%7CMetadata%7CSort`

        const response = await axios.get(url)
        const data = response?.data

        if (data) {
          setTotalCars(data?.Count || 0)
          const allManufacturers =
            data?.iNav?.Nodes[2]?.Facets[0]?.Refinements?.Nodes[0]?.Facets || []
          const filteredManufacturer = allManufacturers?.find(
            (item) => item.IsSelected
          )
          const modelGroup =
            filteredManufacturer?.Refinements?.Nodes[0]?.Facets || []
          const filteredModel = modelGroup?.find((item) => item.IsSelected)
          const models = filteredModel?.Refinements?.Nodes[0]?.Facets || []
          const filteredConfiguration = models?.find((item) => item.IsSelected)
          const configurations =
            filteredConfiguration?.Refinements?.Nodes[0]?.Facets || []
          const filteredBadgeGroup = configurations?.find(
            (item) => item.IsSelected
          )
          const badges = filteredBadgeGroup?.Refinements?.Nodes[0]?.Facets || []
          const filteredBadge = badges?.find((item) => item.IsSelected)
          const badgeDetails =
            filteredBadge?.Refinements?.Nodes[0]?.Facets || []

          setBadgeDetails(badgeDetails)
        }
      }
    } catch (error) {
      console.error("Error fetching filter data:", error)
    } finally {
      fetchInProgress.current = false
    }
  }, [
    selectedManufacturer,
    selectedModelGroup,
    selectedModel,
    selectedConfiguration,
    selectedBadge,
  ])

  // Trigger filter data fetching when selections change
  useEffect(() => {
    fetchFilterData()
  }, [fetchFilterData])

  // Reset dependent filters when parent filter changes
  useEffect(() => {
    if (!selectedManufacturer) {
      setSelectedModelGroup("")
      setSelectedModel("")
      setSelectedConfiguration("")
      setSelectedBadge("")
      setSelectedBadgeDetails("")
    }
  }, [selectedManufacturer])

  useEffect(() => {
    if (!selectedModelGroup) {
      setSelectedModel("")
      setSelectedConfiguration("")
      setSelectedBadge("")
      setSelectedBadgeDetails("")
    }
  }, [selectedModelGroup])

  useEffect(() => {
    if (!selectedModel) {
      setSelectedConfiguration("")
      setSelectedBadge("")
      setSelectedBadgeDetails("")
    }
  }, [selectedModel])

  useEffect(() => {
    if (!selectedConfiguration) {
      setSelectedBadge("")
      setSelectedBadgeDetails("")
    }
  }, [selectedConfiguration])

  useEffect(() => {
    if (!selectedBadge) {
      setSelectedBadgeDetails("")
    }
  }, [selectedBadge])

  // Main function to fetch cars based on all filters
  const fetchCars = useCallback(async () => {
    setLoading(true)
    setError("")

    let queryParts = []
    let filters = []

    if (debouncedSearchByNumber) {
      queryParts.push(
        `(And.Hidden.N._.CarType.A._.Simple.keyword(${debouncedSearchByNumber}).)`
      )
    } else {
      queryParts.push("(And.Hidden.N._.SellType.일반._.")
    }

    if (selectedManufacturer) {
      if (
        selectedModelGroup &&
        selectedModel &&
        selectedConfiguration &&
        selectedBadge &&
        selectedBadgeDetails
      ) {
        queryParts.push(
          `(C.CarType.A._.(C.Manufacturer.${selectedManufacturer}._.(C.ModelGroup.${selectedModelGroup}._.(C.Model.${selectedModel}._.(C.BadgeGroup.${selectedConfiguration}._.(C.Badge.${transformBadgeValue(
            selectedBadge
          )}._.BadgeDetail.${selectedBadgeDetails}.))))))`
        )
      } else if (
        selectedModelGroup &&
        selectedModel &&
        selectedConfiguration &&
        selectedBadge
      ) {
        queryParts.push(
          `(C.CarType.A._.(C.Manufacturer.${selectedManufacturer}._.(C.ModelGroup.${selectedModelGroup}._.(C.Model.${selectedModel}._.(C.BadgeGroup.${selectedConfiguration}._.Badge.${transformBadgeValue(
            selectedBadge
          )}.)))))`
        )
      } else if (selectedModelGroup && selectedModel && selectedConfiguration) {
        queryParts.push(
          `(C.CarType.A._.(C.Manufacturer.${selectedManufacturer}._.(C.ModelGroup.${selectedModelGroup}._.(C.Model.${selectedModel}._.BadgeGroup.${selectedConfiguration}.))))`
        )
      } else if (selectedModelGroup && selectedModel) {
        queryParts.push(
          `(C.CarType.A._.(C.Manufacturer.${selectedManufacturer}._.(C.ModelGroup.${selectedModelGroup}._.Model.${selectedModel}.)))`
        )
      } else if (selectedModelGroup) {
        queryParts.push(
          `(C.CarType.A._.(C.Manufacturer.${selectedManufacturer}._.ModelGroup.${selectedModelGroup}.))`
        )
      } else {
        queryParts.push(`(C.CarType.A._.Manufacturer.${selectedManufacturer}.)`)
      }
    } else {
      queryParts.push("CarType.A.")
    }

    if (mileageStart && mileageEnd) {
      filters.push(`Mileage.range(${mileageStart}..${mileageEnd}).`)
    } else if (mileageStart) {
      filters.push(`Mileage.range(${mileageStart}..).`)
    } else if (mileageEnd) {
      filters.push(`Mileage.range(..${mileageEnd}).`)
    }

    if (startYear && startMonth && endYear && endMonth) {
      filters.push(
        `Year.range(${startYear}${startMonth}..${endYear}${endMonth}).`
      )
    } else if (startYear && startMonth) {
      filters.push(`Year.range(${startYear}${startMonth}..).`)
    } else if (endYear && endMonth) {
      filters.push(`Year.range(..${endYear}${endMonth}).`)
    } else if (startYear && endYear) {
      filters.push(`Year.range(${startYear}00..${endYear}99).`)
    } else if (startYear) {
      filters.push(`Year.range(${startYear}00..).`)
    } else if (endYear) {
      filters.push(`Year.range(..${endYear}99).`)
    }

    if (priceStart && priceEnd) {
      filters.push(`Price.range(${priceStart}..${priceEnd}).`)
    } else if (priceStart) {
      filters.push(`Price.range(${priceStart}..).`)
    } else if (priceEnd) {
      filters.push(`Price.range(..${priceEnd}).`)
    }

    let query =
      queryParts.join("") +
      (filters.length ? `_.${filters.join("_.")}` : "") +
      ")"

    const encodedQuery = encodeURIComponent(query)
    const itemsPerPage = 20
    const offset = (currentPage - 1) * itemsPerPage

    const url = `https://encar-proxy-main.onrender.com/api/catalog?count=true&q=${encodedQuery}&sr=${encodeURIComponent(
      sortOptions[sortOption]
    )}%7C${offset}%7C${itemsPerPage}`

    try {
      const response = await axios.get(url)

      if (response.data && response.data.error) {
        console.error("Получен ответ с ошибкой:", response.data.error)
        setError(
          "На сайте ведутся технические работы. Пожалуйста, попробуйте позже."
        )
        setCars([])
        setLoading(false)
        return
      }

      setCars(response.data?.SearchResults || [])
      setLoading(false)
      window.scrollTo({ top: 0, behavior: "smooth" })
    } catch (error) {
      console.error("Ошибка при загрузке автомобилей:", error)
      setError(
        "На сайте ведутся технические работы. Пожалуйста, попробуйте позже."
      )
      setCars([])
      setLoading(false)
    }
  }, [
    debouncedSearchByNumber,
    selectedManufacturer,
    selectedModelGroup,
    selectedModel,
    selectedConfiguration,
    selectedBadge,
    selectedBadgeDetails,
    startYear,
    startMonth,
    endYear,
    endMonth,
    mileageStart,
    mileageEnd,
    priceStart,
    priceEnd,
    currentPage,
    sortOption,
    sortOptions,
  ])

  // Trigger car fetch when filters or page changes
  useEffect(() => {
    if (filtersReady.current) {
      fetchCars()
    }
  }, [fetchCars])

  const handleManufacturerChange = useCallback(
    (e) => {
      const value = e.target.value
      setSelectedModelGroup("")
      setSelectedModel("")
      setSelectedConfiguration("")
      setSelectedBadge("")
      setSelectedBadgeDetails("")
      setSelectedManufacturer(value)
      setCurrentPage(1)

      if (value) {
        navigate(`/catalog?manufacturer=${value}`)
      } else {
        navigate("/catalog")
      }
    },
    [navigate]
  )

  const handleModelGroupChange = useCallback(
    (e) => {
      const value = e.target.value
      setSelectedModel("")
      setSelectedConfiguration("")
      setSelectedBadge("")
      setSelectedBadgeDetails("")
      setSelectedModelGroup(value)
      setCurrentPage(1)

      if (value) {
        navigate(
          `/catalog?manufacturer=${selectedManufacturer}&modelGroup=${value}`
        )
      } else {
        navigate(`/catalog?manufacturer=${selectedManufacturer}`)
      }
    },
    [navigate, selectedManufacturer]
  )

  const handleModelChange = useCallback(
    (e) => {
      const value = e.target.value
      setSelectedConfiguration("")
      setSelectedBadge("")
      setSelectedBadgeDetails("")
      setSelectedModel(value)
      setCurrentPage(1)

      if (value) {
        navigate(
          `/catalog?manufacturer=${selectedManufacturer}&modelGroup=${selectedModelGroup}&model=${value}`
        )
      } else {
        navigate(
          `/catalog?manufacturer=${selectedManufacturer}&modelGroup=${selectedModelGroup}`
        )
      }
    },
    [navigate, selectedManufacturer, selectedModelGroup]
  )

  const handleConfigurationChange = useCallback((e) => {
    const value = e.target.value
    setSelectedBadge("")
    setSelectedBadgeDetails("")
    setSelectedConfiguration(value)
    setCurrentPage(1)
  }, [])

  const handleBadgeChange = useCallback((e) => {
    const value = e.target.value
    setSelectedBadgeDetails("")
    setSelectedBadge(value)
    setCurrentPage(1)
  }, [])

  const handleBadgeDetailsChange = useCallback((e) => {
    const value = e.target.value
    setSelectedBadgeDetails(value)
    setCurrentPage(1)
  }, [])

  const resetFilters = useCallback(() => {
    setSelectedManufacturer("")
    setSelectedModelGroup("")
    setSelectedModel("")
    setSelectedConfiguration("")
    setSelectedBadge("")
    setSelectedBadgeDetails("")
    setStartYear("")
    setStartMonth("00")
    setEndYear("")
    setEndMonth("00")
    setMileageStart("")
    setMileageEnd("")
    setPriceStart("")
    setPriceEnd("")
    setSearchByNumber("")
    setCurrentPage(1)
    navigate("/catalog")
  }, [navigate])

  // Memoize select options to prevent recalculations on every render
  const yearOptions = useMemo(() => {
    const endYearValue = endYear || new Date().getFullYear()
    return Array.from(
      { length: endYearValue - 1979 },
      (_, i) => 1980 + i
    ).reverse()
  }, [endYear])

  const endYearOptions = useMemo(() => {
    const startYearValue = startYear || 1980
    return Array.from(
      {
        length: new Date().getFullYear() - startYearValue + 1,
      },
      (_, i) => startYearValue + i
    ).reverse()
  }, [startYear])

  const monthNames = useMemo(
    () => [
      "Январь",
      "Февраль",
      "Март",
      "Апрель",
      "Май",
      "Июнь",
      "Июль",
      "Август",
      "Сентябрь",
      "Октябрь",
      "Ноябрь",
      "Декабрь",
    ],
    []
  )

  const mileageOptions = useMemo(
    () => Array.from({ length: 20 }, (_, i) => (i + 1) * 10000),
    []
  )

  const priceOptions = useMemo(
    () => Array.from({ length: 100 }, (_, i) => (i + 1) * 100),
    []
  )

  const renderPagination = useMemo(() => {
    if (!(cars.length > 0 && totalCars > 20)) return null

    const lastPage = Math.ceil(totalCars / 20)
    const visiblePages = Array.from(
      { length: Math.ceil(totalCars / 20) },
      (_, i) => i + 1
    ).filter((page) => {
      if (currentPage <= 3) return page <= 5
      if (currentPage >= lastPage - 2) return page >= lastPage - 4
      return page >= currentPage - 2 && page <= currentPage + 2
    })

    return (
      <div className="flex justify-center mt-10 mb-10">
        <div className="flex flex-wrap justify-center items-center gap-2 px-4 max-w-full">
          {currentPage > 1 && (
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              className="cursor-pointer w-10 h-10 flex items-center justify-center border rounded-md text-sm font-medium shadow-sm bg-white text-gray-800 hover:bg-gray-100"
            >
              ‹
            </button>
          )}
          {visiblePages.map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`cursor-pointer w-10 h-10 flex items-center justify-center border rounded-md text-sm font-medium shadow-sm transition-all duration-200 ${
                currentPage === page
                  ? "bg-black text-white"
                  : "bg-white text-gray-800 hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          ))}
          {currentPage < lastPage && (
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              className="cursor-pointer w-10 h-10 flex items-center justify-center border rounded-md text-sm font-medium shadow-sm bg-white text-gray-800 hover:bg-gray-100"
            >
              ›
            </button>
          )}
        </div>
      </div>
    )
  }, [cars.length, totalCars, currentPage])

  return (
    <div className="md:mt-40 mt-35 px-6">
      <h1 className="text-3xl font-bold text-center mb-5">
        Каталог автомобилей
      </h1>
      <div className="md:flex flex-col items-end md:mr-20 md:block hidden">
        <label htmlFor="sortOptions">Сортировать по</label>
        <select
          className="border border-gray-300 rounded-md px-4 py-2 shadow-sm"
          value={sortOption}
          onChange={(e) => {
            setSortOption(e.target.value)
            setCurrentPage(1)
          }}
        >
          <option value="newest">Сначала новые</option>
          <option value="priceAsc">Цена: по возрастанию</option>
          <option value="priceDesc">Цена: по убыванию</option>
          <option value="mileageAsc">Пробег: по возрастанию</option>
          <option value="mileageDesc">Пробег: по убыванию</option>
          <option value="yearDesc">Год: от новых</option>
        </select>
      </div>
      <div className="container m-auto grid grid-cols-1 md:grid-cols-5 md:gap-15">
        <div className="md:col-span-1.5">
          <select
            className="w-full border border-gray-300 rounded-md px-3 py-2 mt-4"
            value={selectedManufacturer}
            onChange={handleManufacturerChange}
          >
            <option value="">Марка</option>
            {manufacturers
              ?.filter((manufacturer) => manufacturer.Count > 0)
              .map((manufacturer, index) => (
                <option key={index} value={manufacturer.Value}>
                  {translateSmartly(manufacturer.Value)} ({manufacturer.Count}{" "}
                  автомобилей)
                </option>
              ))}
          </select>
          <select
            disabled={selectedManufacturer.length === 0}
            className="w-full border border-gray-300 rounded-md px-3 py-2 mt-4 disabled:bg-gray-200"
            value={selectedModelGroup}
            onChange={handleModelGroupChange}
          >
            <option value="">Модель</option>
            {modelGroups
              ?.filter((modelGroup) => modelGroup.Count > 0)
              .map((modelGroup, index) => (
                <option key={index} value={modelGroup.Value}>
                  {translateSmartly(modelGroup.Value)} ({modelGroup.Count}{" "}
                  автомобилей)
                </option>
              ))}
          </select>
          <select
            disabled={selectedModelGroup.length === 0}
            className="w-full border border-gray-300 rounded-md px-3 py-2 mt-4 disabled:bg-gray-200"
            value={selectedModel}
            onChange={handleModelChange}
          >
            <option value="">Поколение</option>
            {models
              ?.filter((model) => model.Count > 0)
              .map((model, index) => (
                <option key={index} value={model.Value}>
                  {translations[model.Value] ||
                    translateSmartly(model.Value) ||
                    model.Value}{" "}
                  ({formatDate(model?.Metadata?.ModelStartDate[0])} -{" "}
                  {formatDate(model?.Metadata?.ModelEndDate[0])}) ({model.Count}{" "}
                  автомобилей )
                </option>
              ))}
          </select>
          <select
            disabled={selectedModel.length === 0}
            className="w-full border border-gray-300 rounded-md px-3 py-2 mt-4 disabled:bg-gray-200"
            value={selectedConfiguration}
            onChange={handleConfigurationChange}
          >
            <option value="">Конфигурация</option>
            {configurations
              ?.filter((configuration) => configuration.Count > 0)
              .map((configuration, index) => (
                <option key={index} value={configuration.Value}>
                  {translateSmartly(configuration.Value)} ({configuration.Count}
                  )
                </option>
              ))}
          </select>
          <select
            disabled={selectedConfiguration.length === 0}
            className="w-full border border-gray-300 rounded-md px-3 py-2 mt-4 disabled:bg-gray-200"
            value={selectedBadge}
            onChange={handleBadgeChange}
          >
            <option value="">Выберите конфигурацию</option>
            {badges
              ?.filter((badge) => badge.Count > 0)
              .map((badge, index) => (
                <option key={index} value={badge.Value}>
                  {translateSmartly(badge.Value)} ({badge.Count})
                </option>
              ))}
          </select>

          <select
            disabled={selectedBadge.length === 0}
            className="w-full border border-gray-300 rounded-md px-3 py-2 mt-4 disabled:bg-gray-200"
            value={selectedBadgeDetails}
            onChange={handleBadgeDetailsChange}
          >
            <option value="">Выберите комплектацию</option>
            {badgeDetails
              ?.filter((badgeDetails) => badgeDetails.Count > 0)
              .map((badgeDetail, index) => (
                <option key={index} value={badgeDetail.Value}>
                  {translateSmartly(badgeDetail.Value)} ({badgeDetail.Count})
                </option>
              ))}
          </select>

          <div className="grid grid-cols-2 gap-3">
            <select
              className="w-full border border-gray-300 rounded-md px-3 py-2 mt-4 disabled:bg-gray-200"
              value={startYear}
              onChange={(e) => setStartYear(parseInt(e.target.value))}
            >
              <option value="">Год от</option>
              {yearOptions.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>

            <select
              className="w-full border border-gray-300 rounded-md px-3 py-2 mt-4 disabled:bg-gray-200"
              value={startMonth}
              onChange={(e) => setStartMonth(e.target.value)}
            >
              <option value="">Месяц от</option>
              {monthNames.map((month, index) => (
                <option key={index} value={index + 1}>
                  {month}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <select
              className="w-full border border-gray-300 rounded-md px-3 py-2 mt-4 disabled:bg-gray-200"
              value={endYear}
              onChange={(e) => setEndYear(parseInt(e.target.value))}
            >
              <option value="">Год до</option>
              {endYearOptions.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>

            <select
              className="w-full border border-gray-300 rounded-md px-3 py-2 mt-4 disabled:bg-gray-200"
              value={endMonth}
              onChange={(e) => setEndMonth(e.target.value)}
            >
              <option value="">Месяц до</option>
              {Array.from({ length: 12 }, (_, i) => {
                const value = (i + 1).toString().padStart(2, "0")
                return { value, i }
              })
                .filter(
                  ({ value }) =>
                    !startMonth || parseInt(value) >= parseInt(startMonth)
                )
                .map(({ value, i }) => {
                  return (
                    <option key={value} value={value}>
                      {monthNames[i]}
                    </option>
                  )
                })}
            </select>
          </div>

          <select
            className="w-full border border-gray-300 rounded-md px-3 py-2 mt-4 disabled:bg-gray-200"
            value={mileageStart}
            onChange={(e) => setMileageStart(e.target.value)}
          >
            <option value="">Пробег от</option>
            {mileageOptions.map((mileage) => (
              <option key={mileage} value={mileage}>
                {mileage.toLocaleString()} км
              </option>
            ))}
          </select>

          <select
            className="w-full border border-gray-300 rounded-md px-3 py-2 mt-4 disabled:bg-gray-200"
            value={mileageEnd}
            onChange={(e) => setMileageEnd(e.target.value)}
          >
            <option value="">Пробег До</option>
            {mileageOptions.map((mileage) => (
              <option key={mileage} value={mileage}>
                {mileage.toLocaleString()} км
              </option>
            ))}
          </select>

          <div className="grid grid-cols-2 gap-3 mt-4">
            <select
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              value={priceStart}
              onChange={(e) => {
                const value = e.target.value
                setPriceStart(value)
                if (priceEnd && parseInt(value) > parseInt(priceEnd)) {
                  setPriceEnd("")
                }
              }}
            >
              <option value="">Цена от</option>
              {priceOptions
                .filter((price) => !priceEnd || price <= parseInt(priceEnd))
                .map((price) => (
                  <option key={price} value={price}>
                    ₩{(price * 10000).toLocaleString()}
                  </option>
                ))}
            </select>

            <select
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              value={priceEnd}
              onChange={(e) => {
                const value = e.target.value
                setPriceEnd(value)
                if (priceStart && parseInt(value) < parseInt(priceStart)) {
                  setPriceStart("")
                }
              }}
            >
              <option value="">Цена до</option>
              {priceOptions
                .filter((price) => !priceStart || price >= parseInt(priceStart))
                .map((price) => (
                  <option key={price} value={price}>
                    ₩{(price * 10000).toLocaleString()}
                  </option>
                ))}
            </select>
          </div>

          <input
            type="text"
            placeholder="Поиск по номеру авто (например, 49сер0290)"
            className="w-full border border-gray-300 rounded-md px-3 py-2 mt-5"
            value={searchByNumber}
            onChange={(e) => {
              setSearchByNumber(e.target.value)
              setCurrentPage(1)
            }}
          />

          <button
            className="w-full bg-red-500 text-white py-2 px-4 mt-5 rounded hover:bg-red-600 transition cursor-pointer"
            onClick={resetFilters}
          >
            Сбросить фильтры
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-screen">
            <Loader />
          </div>
        ) : cars.length > 0 ? (
          <div className="md:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
            <div className="w-full md:hidden">
              <label htmlFor="sortOptions" className="mb-2 block text-center">
                Сортировать по
              </label>
              <select
                className="border border-gray-300 rounded-md px-4 py-2 shadow-sm w-full"
                value={sortOption}
                onChange={(e) => {
                  setSortOption(e.target.value)
                  setCurrentPage(1)
                }}
              >
                <option value="newest">Сначала новые</option>
                <option value="priceAsc">Цена: по возрастанию</option>
                <option value="priceDesc">Цена: по убыванию</option>
                <option value="mileageAsc">Пробег: по возрастанию</option>
                <option value="mileageDesc">Пробег: по убыванию</option>
                <option value="yearDesc">Год: от новых</option>
              </select>
            </div>
            {cars.map((car) => (
              <CarCard key={car.Id} car={car} usdKrwRate={usdKrwRate} />
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center h-32">
            <p className="text-xl font-semibold text-gray-700">
              {error || "Автомобили не найдены"}
            </p>
          </div>
        )}
      </div>
      {renderPagination}
    </div>
  )
}

export default Catalog
