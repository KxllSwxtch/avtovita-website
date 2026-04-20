import { useState, useEffect, useRef, useCallback, useMemo, memo } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useQueryClient } from "react-query"
import { translations, translateSmartly } from "../translations"
import { formatDate } from "../utils"
import { CarCard as BaseCarCard, CarCardSkeleton } from "../components"
import {
  useCurrencyRate,
  useManufacturers,
  useCatalogSearch,
  useFilterCascade,
  useCatalogFilters,
  initialFilterState,
  CASCADE_STALE_TIME,
  modelGroupsKey,
  fetchModelGroups,
  modelsKey,
  fetchModels,
  configurationsKey,
  fetchConfigurations,
  badgesKey,
  fetchBadges,
  badgeDetailsKey,
  fetchBadgeDetails,
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
  const queryClient = useQueryClient()

  // Snapshot of filters used for the active catalog search.
  // null = no search yet (initial mount before init effect runs).
  // Updated only on Apply / pagination / sort / reset / URL-param init,
  // so the live filter UI can change without triggering refetches.
  const [appliedFilters, setAppliedFilters] = useState(null)

  // Get saved page from localStorage
  const savedPage = useRef(
    parseInt(localStorage.getItem("exportCatalogCurrentPage"), 10) || 1,
  )

  // Consolidated filter state via useReducer
  const {
    filters,
    setField,
    initFromUrl,
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
    isFetching,
    error: catalogError,
    refetch: refetchCatalog,
  } = useCatalogSearch(appliedFilters)

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

  // Escalating "server waking up" hint. Render free tier sleeps after 15 min
  // idle; cold start is 25-60s. Stage 0 = quick hint (1.5s), stage 1 = honest
  // cold-start explanation (10s), stage 2 = offer manual retry (30s).
  const [wakingStage, setWakingStage] = useState(0)
  const showingSkeletons = isFetching && !catalogData
  useEffect(() => {
    if (!showingSkeletons) {
      setWakingStage(0)
      return
    }
    const t1 = setTimeout(() => setWakingStage(1), 1500)
    const t2 = setTimeout(() => setWakingStage(2), 10000)
    const t3 = setTimeout(() => setWakingStage(3), 30000)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
  }, [showingSkeletons])

  // Speculatively prefetch modelGroups for the top 3 manufacturers (ranked by
  // listing count). The vast majority of selections land on these brands, so
  // paying 3 background requests at boot trades a negligible cost for an
  // instant "Модель" dropdown on the common path.
  const didSpeculativePrefetch = useRef(false)
  useEffect(() => {
    if (didSpeculativePrefetch.current) return
    if (!manufacturers || manufacturers.length === 0) return
    didSpeculativePrefetch.current = true
    const top = [...manufacturers]
      .filter((m) => m.Count > 0)
      .sort((a, b) => b.Count - a.Count)
      .slice(0, 3)
    top.forEach((m) => {
      queryClient
        .prefetchQuery(modelGroupsKey(m.Value), fetchModelGroups(m.Value), {
          staleTime: CASCADE_STALE_TIME,
        })
        .catch(() => {})
    })
  }, [manufacturers, queryClient])

  // Prefetch handlers — fire on hover/focus so the dropdown is warm before
  // the user even opens it. Each is a no-op if the relevant parent filter
  // isn't set yet (React Query will ignore the duplicate if already cached).
  const prefetchModelGroups = useCallback(() => {
    const mfr = filters.selectedManufacturer
    if (!mfr) return
    queryClient
      .prefetchQuery(modelGroupsKey(mfr), fetchModelGroups(mfr), {
        staleTime: CASCADE_STALE_TIME,
      })
      .catch(() => {})
  }, [filters.selectedManufacturer, queryClient])

  const prefetchModels = useCallback(() => {
    const { selectedManufacturer: mfr, selectedModelGroup: mg } = filters
    if (!mfr || !mg) return
    queryClient
      .prefetchQuery(modelsKey(mfr, mg), fetchModels(mfr, mg), {
        staleTime: CASCADE_STALE_TIME,
      })
      .catch(() => {})
  }, [filters, queryClient])

  const prefetchConfigurations = useCallback(() => {
    const {
      selectedManufacturer: mfr,
      selectedModelGroup: mg,
      selectedModel: m,
    } = filters
    if (!mfr || !mg || !m) return
    queryClient
      .prefetchQuery(
        configurationsKey(mfr, mg, m),
        fetchConfigurations(mfr, mg, m),
        { staleTime: CASCADE_STALE_TIME }
      )
      .catch(() => {})
  }, [filters, queryClient])

  const prefetchBadges = useCallback(() => {
    const {
      selectedManufacturer: mfr,
      selectedModelGroup: mg,
      selectedModel: m,
      selectedConfiguration: c,
    } = filters
    if (!mfr || !mg || !m || !c) return
    queryClient
      .prefetchQuery(badgesKey(mfr, mg, m, c), fetchBadges(mfr, mg, m, c), {
        staleTime: CASCADE_STALE_TIME,
      })
      .catch(() => {})
  }, [filters, queryClient])

  const prefetchBadgeDetails = useCallback(() => {
    const {
      selectedManufacturer: mfr,
      selectedModelGroup: mg,
      selectedModel: m,
      selectedConfiguration: c,
      selectedBadge: b,
    } = filters
    if (!mfr || !mg || !m || !c || !b) return
    queryClient
      .prefetchQuery(
        badgeDetailsKey(mfr, mg, m, c, b),
        fetchBadgeDetails(mfr, mg, m, c, b),
        { staleTime: CASCADE_STALE_TIME }
      )
      .catch(() => {})
  }, [filters, queryClient])

  // Mount-time init: read URL params atomically, set both the filter UI state
  // and the appliedFilters snapshot in one pass. The catalog search fires
  // immediately with the URL-supplied filters; the cascade `/api/nav` queries
  // run in parallel to populate child dropdowns for further user navigation.
  useEffect(() => {
    const sp = new URLSearchParams(location.search)
    const urlMfr = sp.get("manufacturer") || ""
    const urlMg = sp.get("modelGroup") || ""
    const urlModel = sp.get("model") || ""

    if (urlMfr) {
      initFromUrl({ manufacturer: urlMfr, modelGroup: urlMg, model: urlModel })
    }

    setAppliedFilters({
      ...initialFilterState,
      currentPage: savedPage.current,
      selectedManufacturer: urlMfr,
      selectedModelGroup: urlMg,
      selectedModel: urlModel,
    })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

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
    setAppliedFilters({ ...initialFilterState })
    navigate("/catalog")
  }, [navigate, resetAll])

  const applyFilters = useCallback(() => {
    setField("currentPage", 1)
    setAppliedFilters({ ...searchFilters, currentPage: 1 })
  }, [searchFilters, setField])

  const goToPage = useCallback(
    (page) => {
      setField("currentPage", page)
      setAppliedFilters((prev) => (prev ? { ...prev, currentPage: page } : prev))
    },
    [setField],
  )

  const changeSort = useCallback(
    (value) => {
      setField("sortOption", value)
      setField("currentPage", 1)
      setAppliedFilters((prev) =>
        prev ? { ...prev, sortOption: value, currentPage: 1 } : prev,
      )
    },
    [setField],
  )

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
              onClick={() => goToPage(filters.currentPage - 1)}
              className="cursor-pointer w-10 h-10 flex items-center justify-center border rounded-md text-sm font-medium shadow-sm bg-white text-gray-800 hover:bg-gray-100"
            >
              ‹
            </button>
          )}
          {visiblePages.map((page) => (
            <button
              key={page}
              onClick={() => goToPage(page)}
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
              onClick={() => goToPage(filters.currentPage + 1)}
              className="cursor-pointer w-10 h-10 flex items-center justify-center border rounded-md text-sm font-medium shadow-sm bg-white text-gray-800 hover:bg-gray-100"
            >
              ›
            </button>
          )}
        </div>
      </div>
    )
  }, [cars.length, catalogTotal, filters.currentPage, goToPage])

  return (
    <div className="md:mt-40 mt-35 px-6">
      <div className="md:flex flex-col items-end md:mr-20 md:block hidden">
        <label htmlFor="sortOptions">Сортировать по</label>
        <select
          className="border border-gray-300 rounded-md px-4 py-2 shadow-sm"
          value={filters.sortOption}
          onChange={(e) => changeSort(e.target.value)}
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
            disabled={
              filters.selectedManufacturer.length === 0 ||
              (cascade.modelGroupsQuery.isLoading &&
                !cascade.modelGroupsQuery.data)
            }
            className="w-full border border-gray-300 rounded-md px-3 py-2 mt-4 disabled:bg-gray-200"
            value={filters.selectedModelGroup}
            onChange={handleModelGroupChange}
            onMouseEnter={prefetchModelGroups}
            onFocus={prefetchModelGroups}
          >
            <option value="">
              {cascade.modelGroupsQuery.isLoading && !modelGroups
                ? "Загрузка..."
                : "Модель"}
            </option>
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
            disabled={
              filters.selectedModelGroup.length === 0 ||
              (cascade.modelsQuery.isLoading && !cascade.modelsQuery.data)
            }
            className="w-full border border-gray-300 rounded-md px-3 py-2 mt-4 disabled:bg-gray-200"
            value={filters.selectedModel}
            onChange={handleModelChange}
            onMouseEnter={prefetchModels}
            onFocus={prefetchModels}
          >
            <option value="">
              {cascade.modelsQuery.isLoading && !models
                ? "Загрузка..."
                : "Поколение"}
            </option>
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
            disabled={
              filters.selectedModel.length === 0 ||
              (cascade.configurationsQuery.isLoading &&
                !cascade.configurationsQuery.data)
            }
            className="w-full border border-gray-300 rounded-md px-3 py-2 mt-4 disabled:bg-gray-200"
            value={filters.selectedConfiguration}
            onChange={handleConfigurationChange}
            onMouseEnter={prefetchConfigurations}
            onFocus={prefetchConfigurations}
          >
            <option value="">
              {cascade.configurationsQuery.isLoading && !configurations
                ? "Загрузка..."
                : "Конфигурация"}
            </option>
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
            disabled={
              filters.selectedConfiguration.length === 0 ||
              (cascade.badgesQuery.isLoading && !cascade.badgesQuery.data)
            }
            className="w-full border border-gray-300 rounded-md px-3 py-2 mt-4 disabled:bg-gray-200"
            value={filters.selectedBadge}
            onChange={handleBadgeChange}
            onMouseEnter={prefetchBadges}
            onFocus={prefetchBadges}
          >
            <option value="">
              {cascade.badgesQuery.isLoading && !badges
                ? "Загрузка..."
                : "Выберите конфигурацию"}
            </option>
            {badges
              ?.filter((badge) => badge.Count > 0)
              .map((badge, index) => (
                <option key={index} value={badge.Value}>
                  {translateSmartly(badge.Value)} ({badge.Count})
                </option>
              ))}
          </select>

          <select
            disabled={
              filters.selectedBadge.length === 0 ||
              (cascade.badgeDetailsQuery.isLoading &&
                !cascade.badgeDetailsQuery.data)
            }
            className="w-full border border-gray-300 rounded-md px-3 py-2 mt-4 disabled:bg-gray-200"
            value={filters.selectedBadgeDetails}
            onChange={handleBadgeDetailsChange}
            onMouseEnter={prefetchBadgeDetails}
            onFocus={prefetchBadgeDetails}
          >
            <option value="">
              {cascade.badgeDetailsQuery.isLoading && !badgeDetails
                ? "Загрузка..."
                : "Выберите комплектацию"}
            </option>
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
            className="w-full bg-avtoVitaGold text-black font-semibold py-2 px-4 mt-5 rounded hover:bg-avtoVitaGoldDark hover:text-white transition cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-wait"
            onClick={applyFilters}
            disabled={isFetching}
          >
            {isFetching && (
              <span
                className="inline-block h-4 w-4 rounded-full border-2 border-black border-t-transparent animate-spin"
                aria-hidden="true"
              />
            )}
            {isFetching ? "Загрузка..." : "Применить"}
          </button>
          <button
            className="w-full bg-red-500 text-white py-2 px-4 mt-5 rounded hover:bg-red-600 transition cursor-pointer"
            onClick={resetFilters}
          >
            Сбросить фильтры
          </button>
        </div>

        <div className="md:col-span-4 mt-8">
          {wakingStage >= 1 && showingSkeletons && (
            <div className="mb-4 px-4 py-3 rounded-md bg-yellow-50 border border-yellow-200 text-yellow-900 text-sm">
              {wakingStage === 1 && (
                <div className="text-center">
                  Загружаем каталог… это может занять несколько секунд.
                </div>
              )}
              {wakingStage === 2 && (
                <div className="text-center">
                  Сервер просыпается после простоя. Первая загрузка занимает до
                  30 секунд — спасибо за терпение.
                </div>
              )}
              {wakingStage >= 3 && (
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <span>
                    Загрузка занимает дольше обычного. Попробуйте ещё раз.
                  </span>
                  <button
                    onClick={() => refetchCatalog()}
                    className="px-3 py-1 rounded-md bg-yellow-200 hover:bg-yellow-300 text-yellow-900 text-sm font-medium transition cursor-pointer"
                  >
                    Повторить
                  </button>
                </div>
              )}
            </div>
          )}

          {!showingSkeletons && error && (
            <div className="mb-4 px-4 py-3 rounded-md bg-red-50 border border-red-200 text-red-800 text-sm flex flex-col sm:flex-row items-center justify-center gap-3 text-center">
              <span>{error}</span>
              <button
                onClick={() => refetchCatalog()}
                className="px-3 py-1 rounded-md bg-red-100 hover:bg-red-200 text-red-800 text-sm font-medium transition cursor-pointer"
              >
                Повторить
              </button>
            </div>
          )}

          {showingSkeletons ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <CarCardSkeleton key={i} />
              ))}
            </div>
          ) : cars.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <div className="w-full md:hidden">
                <label htmlFor="sortOptions" className="mb-2 block text-center">
                  Сортировать по
                </label>
                <select
                  className="border border-gray-300 rounded-md px-4 py-2 shadow-sm w-full"
                  value={filters.sortOption}
                  onChange={(e) => changeSort(e.target.value)}
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
                <CarCard
                  key={car.Id}
                  car={car}
                  usdKrwRate={usdKrwRate || 1}
                />
              ))}
            </div>
          ) : !error ? (
            <div className="flex justify-center items-center h-32">
              <p className="text-xl font-semibold text-gray-700">
                Автомобили не найдены
              </p>
            </div>
          ) : null}
        </div>
      </div>
      {renderPagination}
    </div>
  )
}

export default Catalog
