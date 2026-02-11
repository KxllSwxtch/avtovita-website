import { useQuery } from 'react-query'
import axios from 'axios'
import { transformBadgeValue } from '../utils'

const sortOptionsMap = {
  newest: '|ModifiedDate',
  priceAsc: '|PriceAsc',
  priceDesc: '|PriceDesc',
  mileageAsc: '|MileageAsc',
  mileageDesc: '|MileageDesc',
  yearDesc: '|Year',
}

function buildCatalogQuery(filters) {
  const {
    searchByNumber,
    selectedManufacturer,
    selectedModelGroup,
    selectedModel,
    selectedConfiguration,
    selectedBadge,
    selectedBadgeDetails,
    mileageStart,
    mileageEnd,
    startYear,
    startMonth,
    endYear,
    endMonth,
    priceStart,
    priceEnd,
  } = filters

  let queryParts = []
  let filterParts = []

  if (searchByNumber) {
    queryParts.push(
      `(And.Hidden.N._.CarType.A._.Simple.keyword(${searchByNumber}).)`
    )
  } else {
    queryParts.push('(And.Hidden.N._.SellType.일반._.')
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
    queryParts.push('CarType.A.')
  }

  if (mileageStart && mileageEnd) {
    filterParts.push(`Mileage.range(${mileageStart}..${mileageEnd}).`)
  } else if (mileageStart) {
    filterParts.push(`Mileage.range(${mileageStart}..).`)
  } else if (mileageEnd) {
    filterParts.push(`Mileage.range(..${mileageEnd}).`)
  }

  if (startYear && startMonth && endYear && endMonth) {
    filterParts.push(
      `Year.range(${startYear}${startMonth}..${endYear}${endMonth}).`
    )
  } else if (startYear && startMonth) {
    filterParts.push(`Year.range(${startYear}${startMonth}..).`)
  } else if (endYear && endMonth) {
    filterParts.push(`Year.range(..${endYear}${endMonth}).`)
  } else if (startYear && endYear) {
    filterParts.push(`Year.range(${startYear}00..${endYear}99).`)
  } else if (startYear) {
    filterParts.push(`Year.range(${startYear}00..).`)
  } else if (endYear) {
    filterParts.push(`Year.range(..${endYear}99).`)
  }

  if (priceStart && priceEnd) {
    filterParts.push(`Price.range(${priceStart}..${priceEnd}).`)
  } else if (priceStart) {
    filterParts.push(`Price.range(${priceStart}..).`)
  } else if (priceEnd) {
    filterParts.push(`Price.range(..${priceEnd}).`)
  }

  return (
    queryParts.join('') +
    (filterParts.length ? `_.${filterParts.join('_.')}` : '') +
    ')'
  )
}

export const useCatalogSearch = (filters, fetchTrigger) => {
  const { currentPage, sortOption } = filters

  const queryKey = ['catalog', fetchTrigger]

  return useQuery(
    queryKey,
    async ({ signal }) => {
      const query = buildCatalogQuery(filters)
      const encodedQuery = encodeURIComponent(query)
      const itemsPerPage = 20
      const offset = (currentPage - 1) * itemsPerPage

      const url = `https://encar-proxy-main.onrender.com/api/catalog?count=true&q=${encodedQuery}&sr=${encodeURIComponent(
        sortOptionsMap[sortOption]
      )}%7C${offset}%7C${itemsPerPage}`

      const { data } = await axios.get(url, { signal })

      if (data && data.error) {
        throw new Error(
          'На сайте ведутся технические работы. Пожалуйста, попробуйте позже.'
        )
      }

      return {
        cars: data?.SearchResults || [],
        total: data?.Count || 0,
      }
    },
    {
      enabled: fetchTrigger > 0,
      keepPreviousData: true,
      staleTime: 2 * 60 * 1000,
      onSuccess: () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      },
    }
  )
}
