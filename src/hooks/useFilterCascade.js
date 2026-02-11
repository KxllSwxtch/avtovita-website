import { useQuery } from 'react-query'
import axios from 'axios'
import { transformBadgeValue } from '../utils'

const BASE_URL = 'https://encar-proxy-main.onrender.com/api/nav'
const NAV_PARAMS = 'count=true&inav=%7CMetadata%7CSort'

function findSelected(facets) {
  return facets?.find((item) => item.IsSelected === true)
}

export const useFilterCascade = (filters) => {
  const {
    selectedManufacturer,
    selectedModelGroup,
    selectedModel,
    selectedConfiguration,
    selectedBadge,
  } = filters

  // Level 1: Fetch model groups when manufacturer is selected
  const modelGroupsQuery = useQuery(
    ['filterNav', 'modelGroups', selectedManufacturer],
    async ({ signal }) => {
      const q = `(And.Hidden.N._.SellType.%EC%9D%BC%EB%B0%98._.(C.CarType.A._.Manufacturer.${selectedManufacturer}.))`
      const { data } = await axios.get(`${BASE_URL}?${NAV_PARAMS}&q=${q}`, { signal })

      const allManufacturers =
        data?.iNav?.Nodes[2]?.Facets[0]?.Refinements?.Nodes[0]?.Facets || []
      const filteredManufacturer = findSelected(allManufacturers)
      const modelGroups =
        filteredManufacturer?.Refinements?.Nodes[0]?.Facets || []
      const totalCars = data?.Count || 0

      return { modelGroups, totalCars }
    },
    {
      enabled: !!selectedManufacturer,
      staleTime: 5 * 60 * 1000,
    }
  )

  // Level 2: Fetch models when model group is selected
  const modelsQuery = useQuery(
    ['filterNav', 'models', selectedManufacturer, selectedModelGroup],
    async ({ signal }) => {
      const q = `(And.Hidden.N._.SellType.%EC%9D%BC%EB%B0%98._.(C.CarType.A._.(C.Manufacturer.${selectedManufacturer}._.ModelGroup.${selectedModelGroup}.)))`
      const { data } = await axios.get(`${BASE_URL}?${NAV_PARAMS}&q=${q}`, { signal })

      const allManufacturers =
        data?.iNav?.Nodes[2]?.Facets[0]?.Refinements?.Nodes[0]?.Facets || []
      const filteredManufacturer = findSelected(allManufacturers)
      const modelGroup =
        filteredManufacturer?.Refinements?.Nodes[0]?.Facets || []
      const filteredModel = findSelected(modelGroup)
      const models = filteredModel?.Refinements?.Nodes[0]?.Facets || []
      const totalCars = data?.Count || 0

      return { models, totalCars }
    },
    {
      enabled: !!selectedManufacturer && !!selectedModelGroup,
      staleTime: 5 * 60 * 1000,
    }
  )

  // Level 3: Fetch configurations when model is selected
  const configurationsQuery = useQuery(
    ['filterNav', 'configurations', selectedManufacturer, selectedModelGroup, selectedModel],
    async ({ signal }) => {
      const q = `(And.Hidden.N._.(C.CarType.A._.(C.Manufacturer.${selectedManufacturer}._.(C.ModelGroup.${selectedModelGroup}._.Model.${selectedModel}.))))`
      const { data } = await axios.get(`${BASE_URL}?${NAV_PARAMS}&q=${q}`, { signal })

      const allManufacturers =
        data?.iNav?.Nodes[1]?.Facets[0]?.Refinements?.Nodes[0]?.Facets || []
      const filteredManufacturer = findSelected(allManufacturers)
      const modelGroup =
        filteredManufacturer?.Refinements?.Nodes[0]?.Facets || []
      const filteredModel = findSelected(modelGroup)
      const models = filteredModel?.Refinements?.Nodes[0]?.Facets || []
      const filteredConfiguration = findSelected(models)
      const configurations =
        filteredConfiguration?.Refinements?.Nodes[0]?.Facets || []
      const totalCars = data?.Count || 0

      return { configurations, totalCars }
    },
    {
      enabled: !!selectedManufacturer && !!selectedModelGroup && !!selectedModel,
      staleTime: 5 * 60 * 1000,
    }
  )

  // Level 4: Fetch badges when configuration is selected
  const badgesQuery = useQuery(
    ['filterNav', 'badges', selectedManufacturer, selectedModelGroup, selectedModel, selectedConfiguration],
    async ({ signal }) => {
      const q = `(And.Hidden.N._.(C.CarType.A._.(C.Manufacturer.${selectedManufacturer}._.(C.ModelGroup.${selectedModelGroup}._.(C.Model.${selectedModel}._.BadgeGroup.${selectedConfiguration}.)))))`
      const { data } = await axios.get(`${BASE_URL}?${NAV_PARAMS}&q=${q}`, { signal })

      const allManufacturers =
        data?.iNav?.Nodes[1]?.Facets[0]?.Refinements?.Nodes[0]?.Facets || []
      const filteredManufacturer = findSelected(allManufacturers)
      const modelGroup =
        filteredManufacturer?.Refinements?.Nodes[0]?.Facets || []
      const filteredModel = findSelected(modelGroup)
      const models = filteredModel?.Refinements?.Nodes[0]?.Facets || []
      const filteredConfiguration = findSelected(models)
      const configurations =
        filteredConfiguration?.Refinements?.Nodes[0]?.Facets || []
      const filteredBadgeGroup = findSelected(configurations)
      const badges = filteredBadgeGroup?.Refinements?.Nodes[0]?.Facets || []
      const totalCars = data?.Count || 0

      return { badges, totalCars }
    },
    {
      enabled: !!selectedManufacturer && !!selectedModelGroup && !!selectedModel && !!selectedConfiguration,
      staleTime: 5 * 60 * 1000,
    }
  )

  // Level 5: Fetch badge details when badge is selected
  const badgeDetailsQuery = useQuery(
    ['filterNav', 'badgeDetails', selectedManufacturer, selectedModelGroup, selectedModel, selectedConfiguration, selectedBadge],
    async ({ signal }) => {
      const q = `(And.Hidden.N._.SellType.%EC%9D%BC%EB%B0%98._.(C.CarType.A._.(C.Manufacturer.${selectedManufacturer}._.(C.ModelGroup.${selectedModelGroup}._.(C.Model.${selectedModel}._.(C.BadgeGroup.${selectedConfiguration}._.Badge.${transformBadgeValue(selectedBadge)}.))))))`
      const { data } = await axios.get(`${BASE_URL}?${NAV_PARAMS}&q=${q}`, { signal })

      const allManufacturers =
        data?.iNav?.Nodes[2]?.Facets[0]?.Refinements?.Nodes[0]?.Facets || []
      const filteredManufacturer = allManufacturers?.find((item) => item.IsSelected)
      const modelGroup =
        filteredManufacturer?.Refinements?.Nodes[0]?.Facets || []
      const filteredModel = modelGroup?.find((item) => item.IsSelected)
      const models = filteredModel?.Refinements?.Nodes[0]?.Facets || []
      const filteredConfiguration = models?.find((item) => item.IsSelected)
      const configurations =
        filteredConfiguration?.Refinements?.Nodes[0]?.Facets || []
      const filteredBadgeGroup = configurations?.find((item) => item.IsSelected)
      const badges = filteredBadgeGroup?.Refinements?.Nodes[0]?.Facets || []
      const filteredBadge = badges?.find((item) => item.IsSelected)
      const badgeDetails =
        filteredBadge?.Refinements?.Nodes[0]?.Facets || []
      const totalCars = data?.Count || 0

      return { badgeDetails, totalCars }
    },
    {
      enabled: !!selectedManufacturer && !!selectedModelGroup && !!selectedModel && !!selectedConfiguration && !!selectedBadge,
      staleTime: 5 * 60 * 1000,
    }
  )

  return {
    modelGroupsQuery,
    modelsQuery,
    configurationsQuery,
    badgesQuery,
    badgeDetailsQuery,
  }
}
