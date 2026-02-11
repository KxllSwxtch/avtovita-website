import { useState, useEffect, useRef, useCallback, useMemo, memo } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { translations, translateSmartly } from "../translations"
import { formatDate } from "../utils"
import { Loader } from "../components"
import { CarCard as BaseCarCard } from "../components"
import {
  useCurrencyRate,
  useManufacturers,
  useCatalogSearch,
  useFilterCascade,
  useCatalogFilters,
} from "../hooks"

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
  const urlParams = useRef({
    manufacturer: null,
    modelGroup: null,
    model: null,
  })
  const isInitialMount = useRef(true)
  const pendingUrlParams = useRef(false)

  const [fetchTrigger, setFetchTrigger] = useState(0)

  // Get saved page from localStorage
  const savedPage = useRef(
    parseInt(localStorage.getItem("exportCatalogCurrentPage"), 10) || 1,
  )

  // Consolidated filter state via useReducer
  const {
    filters,
    setField,
    setManufacturer,
    setModelGroup,
    setModel,
    setConfiguration,
    setBadge,
    setBadgeDetails,
    resetAll,
  } = useCatalogFilters(savedPage.current)

  // Debounce search by number
  const debouncedSearchByNumber = useDebounce(filters.searchByNumber, 500)

  // Build search filters with debounced search value
  const searchFilters = useMemo(
    () => ({ ...filters, searchByNumber: debouncedSearchByNumber }),
    [filters, debouncedSearchByNumber],
  )

  // React Query hooks
  const { data: usdKrwRate } = useCurrencyRate()
  const { data: manufacturersData } = useManufacturers()
  const cascade = useFilterCascade(filters)
  const {
    data: catalogData,
    isLoading: loading,
    error: catalogError,
  } = useCatalogSearch(searchFilters, fetchTrigger)

  // Derived data
  const manufacturers = manufacturersData?.manufacturers || null

  const modelGroups = cascade.modelGroupsQuery.data?.modelGroups || null
  const models = cascade.modelsQuery.data?.models || null
  const configurations =
    cascade.configurationsQuery.data?.configurations || null
  const badges = cascade.badgesQuery.data?.badges || null
  const badgeDetails = cascade.badgeDetailsQuery.data?.badgeDetails || null

  const cars = catalogData?.cars || []
  const catalogTotal = catalogData?.total || 0
  const error = catalogError?.message || ""

  // Save currentPage to localStorage
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      localStorage.setItem(
        "exportCatalogCurrentPage",
        filters.currentPage.toString(),
      )
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [filters.currentPage])

  // Handle URL params on mount
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    urlParams.current = {
      manufacturer: searchParams.get("manufacturer"),
      modelGroup: searchParams.get("modelGroup"),
      model: searchParams.get("model"),
    }

    if (urlParams.current.manufacturer) {
      pendingUrlParams.current = true
      setManufacturer(urlParams.current.manufacturer)
    } else {
      setFetchTrigger((prev) => prev + 1)
    }

    isInitialMount.current = false
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Handle URL param cascade: apply modelGroup when modelGroups load
  useEffect(() => {
    if (
      urlParams.current.modelGroup &&
      !filters.selectedModelGroup &&
      modelGroups
    ) {
      const modelExists = modelGroups?.some(
        (m) => m.Value === urlParams.current.modelGroup,
      )
      if (modelExists) {
        setModelGroup(urlParams.current.modelGroup)
      }
      if (!urlParams.current.model) {
        pendingUrlParams.current = false
        setFetchTrigger((prev) => prev + 1)
      }
    } else if (
      pendingUrlParams.current &&
      !urlParams.current.modelGroup &&
      modelGroups
    ) {
      pendingUrlParams.current = false
      setFetchTrigger((prev) => prev + 1)
    }
  }, [modelGroups]) // eslint-disable-line react-hooks/exhaustive-deps

  // Handle URL param cascade: apply model when models load
  useEffect(() => {
    if (urlParams.current.model && !filters.selectedModel && models) {
      const modelExists = models?.some(
        (m) => m.Value === urlParams.current.model,
      )
      if (modelExists) {
        setModel(urlParams.current.model)
      }
      // Reset URL params after they've been processed
      urlParams.current = { manufacturer: null, modelGroup: null, model: null }
      pendingUrlParams.current = false
      setFetchTrigger((prev) => prev + 1)
    }
  }, [models]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleManufacturerChange = useCallback(
    (e) => {
      setManufacturer(e.target.value)
    },
    [setManufacturer],
  )

  const handleModelGroupChange = useCallback(
    (e) => {
      setModelGroup(e.target.value)
    },
    [setModelGroup],
  )

  const handleModelChange = useCallback(
    (e) => {
      setModel(e.target.value)
    },
    [setModel],
  )

  const handleConfigurationChange = useCallback(
    (e) => {
      setConfiguration(e.target.value)
    },
    [setConfiguration],
  )

  const handleBadgeChange = useCallback(
    (e) => {
      setBadge(e.target.value)
    },
    [setBadge],
  )

  const handleBadgeDetailsChange = useCallback(
    (e) => {
      setBadgeDetails(e.target.value)
    },
    [setBadgeDetails],
  )

  const resetFilters = useCallback(() => {
    resetAll()
    setFetchTrigger((prev) => prev + 1)
    navigate("/catalog")
  }, [navigate, resetAll])

  // Memoize select options to prevent recalculations on every render
  const yearOptions = useMemo(() => {
    const endYearValue = filters.endYear || new Date().getFullYear()
    return Array.from(
      { length: endYearValue - 1979 },
      (_, i) => 1980 + i,
    ).reverse()
  }, [filters.endYear])

  const endYearOptions = useMemo(() => {
    const startYearValue = filters.startYear || 1980
    return Array.from(
      {
        length: new Date().getFullYear() - startYearValue + 1,
      },
      (_, i) => startYearValue + i,
    ).reverse()
  }, [filters.startYear])

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
    [],
  )

  const mileageOptions = useMemo(
    () => Array.from({ length: 20 }, (_, i) => (i + 1) * 10000),
    [],
  )

  const priceOptions = useMemo(
    () => Array.from({ length: 100 }, (_, i) => (i + 1) * 100),
    [],
  )

  const renderPagination = useMemo(() => {
    if (!(cars.length > 0 && catalogTotal > 20)) return null

    const lastPage = Math.ceil(catalogTotal / 20)
    const visiblePages = Array.from(
      { length: Math.ceil(catalogTotal / 20) },
      (_, i) => i + 1,
    ).filter((page) => {
      if (filters.currentPage <= 3) return page <= 5
      if (filters.currentPage >= lastPage - 2) return page >= lastPage - 4
      return page >= filters.currentPage - 2 && page <= filters.currentPage + 2
    })

    return (
      <div className="flex justify-center mt-10 mb-10">
        <div className="flex flex-wrap justify-center items-center gap-2 px-4 max-w-full">
          {filters.currentPage > 1 && (
            <button
              onClick={() => {
                setField("currentPage", filters.currentPage - 1)
                setFetchTrigger((prev) => prev + 1)
              }}
              className="cursor-pointer w-10 h-10 flex items-center justify-center border rounded-md text-sm font-medium shadow-sm bg-white text-gray-800 hover:bg-gray-100"
            >
              ‹
            </button>
          )}
          {visiblePages.map((page) => (
            <button
              key={page}
              onClick={() => {
                setField("currentPage", page)
                setFetchTrigger((prev) => prev + 1)
              }}
              className={`cursor-pointer w-10 h-10 flex items-center justify-center border rounded-md text-sm font-medium shadow-sm transition-all duration-200 ${
                filters.currentPage === page
                  ? "bg-black text-white"
                  : "bg-white text-gray-800 hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          ))}
          {filters.currentPage < lastPage && (
            <button
              onClick={() => {
                setField("currentPage", filters.currentPage + 1)
                setFetchTrigger((prev) => prev + 1)
              }}
              className="cursor-pointer w-10 h-10 flex items-center justify-center border rounded-md text-sm font-medium shadow-sm bg-white text-gray-800 hover:bg-gray-100"
            >
              ›
            </button>
          )}
        </div>
      </div>
    )
  }, [cars.length, catalogTotal, filters.currentPage, setField])

  return (
    <div className="md:mt-40 mt-35 px-6">
      <div className="md:flex flex-col items-end md:mr-20 md:block hidden">
        <label htmlFor="sortOptions">Сортировать по</label>
        <select
          className="border border-gray-300 rounded-md px-4 py-2 shadow-sm"
          value={filters.sortOption}
          onChange={(e) => {
            setField("sortOption", e.target.value)
            setField("currentPage", 1)
            setFetchTrigger((prev) => prev + 1)
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
            value={filters.selectedManufacturer}
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
            disabled={filters.selectedManufacturer.length === 0}
            className="w-full border border-gray-300 rounded-md px-3 py-2 mt-4 disabled:bg-gray-200"
            value={filters.selectedModelGroup}
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
            disabled={filters.selectedModelGroup.length === 0}
            className="w-full border border-gray-300 rounded-md px-3 py-2 mt-4 disabled:bg-gray-200"
            value={filters.selectedModel}
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
            disabled={filters.selectedModel.length === 0}
            className="w-full border border-gray-300 rounded-md px-3 py-2 mt-4 disabled:bg-gray-200"
            value={filters.selectedConfiguration}
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
            disabled={filters.selectedConfiguration.length === 0}
            className="w-full border border-gray-300 rounded-md px-3 py-2 mt-4 disabled:bg-gray-200"
            value={filters.selectedBadge}
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
            disabled={filters.selectedBadge.length === 0}
            className="w-full border border-gray-300 rounded-md px-3 py-2 mt-4 disabled:bg-gray-200"
            value={filters.selectedBadgeDetails}
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
              value={filters.startYear}
              onChange={(e) => setField("startYear", parseInt(e.target.value))}
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
              value={filters.startMonth}
              onChange={(e) => setField("startMonth", e.target.value)}
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
              value={filters.endYear}
              onChange={(e) => setField("endYear", parseInt(e.target.value))}
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
              value={filters.endMonth}
              onChange={(e) => setField("endMonth", e.target.value)}
            >
              <option value="">Месяц до</option>
              {Array.from({ length: 12 }, (_, i) => {
                const value = (i + 1).toString().padStart(2, "0")
                return { value, i }
              })
                .filter(
                  ({ value }) =>
                    !filters.startMonth ||
                    parseInt(value) >= parseInt(filters.startMonth),
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
            value={filters.mileageStart}
            onChange={(e) => setField("mileageStart", e.target.value)}
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
            value={filters.mileageEnd}
            onChange={(e) => setField("mileageEnd", e.target.value)}
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
              value={filters.priceStart}
              onChange={(e) => {
                const value = e.target.value
                setField("priceStart", value)
                if (
                  filters.priceEnd &&
                  parseInt(value) > parseInt(filters.priceEnd)
                ) {
                  setField("priceEnd", "")
                }
              }}
            >
              <option value="">Цена от</option>
              {priceOptions
                .filter(
                  (price) =>
                    !filters.priceEnd || price <= parseInt(filters.priceEnd),
                )
                .map((price) => (
                  <option key={price} value={price}>
                    ₩{(price * 10000).toLocaleString()}
                  </option>
                ))}
            </select>

            <select
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              value={filters.priceEnd}
              onChange={(e) => {
                const value = e.target.value
                setField("priceEnd", value)
                if (
                  filters.priceStart &&
                  parseInt(value) < parseInt(filters.priceStart)
                ) {
                  setField("priceStart", "")
                }
              }}
            >
              <option value="">Цена до</option>
              {priceOptions
                .filter(
                  (price) =>
                    !filters.priceStart ||
                    price >= parseInt(filters.priceStart),
                )
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
            value={filters.searchByNumber}
            onChange={(e) => {
              setField("searchByNumber", e.target.value)
              setField("currentPage", 1)
            }}
          />

          <button
            className="w-full bg-avtoVitaGold text-black font-semibold py-2 px-4 mt-5 rounded hover:bg-avtoVitaGoldDark hover:text-white transition cursor-pointer"
            onClick={() => {
              setField("currentPage", 1)
              setFetchTrigger((prev) => prev + 1)
            }}
          >
            Применить
          </button>
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
                value={filters.sortOption}
                onChange={(e) => {
                  setField("sortOption", e.target.value)
                  setField("currentPage", 1)
                  setFetchTrigger((prev) => prev + 1)
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
              <CarCard key={car.Id} car={car} usdKrwRate={usdKrwRate || 1} />
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
