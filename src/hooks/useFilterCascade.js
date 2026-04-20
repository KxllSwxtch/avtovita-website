import { useQuery } from 'react-query'
import axios from 'axios'
import { transformBadgeValue } from '../utils'

const BASE_URL = 'https://encar-proxy-main.onrender.com/api/nav'
const NAV_PARAMS = 'count=true&inav=%7CMetadata%7CSort'
export const CASCADE_STALE_TIME = 5 * 60 * 1000

function findSelected(facets) {
  return facets?.find((item) => item.IsSelected === true)
}

async function fetchNav(q, signal) {
  const { data } = await axios.get(`${BASE_URL}?${NAV_PARAMS}&q=${q}`, { signal })
  return data
}

export const modelGroupsKey = (mfr) => ['filterNav', 'modelGroups', mfr]
export const fetchModelGroups = (mfr) => async ({ signal } = {}) => {
  const q = `(And.Hidden.N._.SellType.%EC%9D%BC%EB%B0%98._.(C.CarType.A._.Manufacturer.${mfr}.))`
  const data = await fetchNav(q, signal)
  const allManufacturers =
    data?.iNav?.Nodes[2]?.Facets[0]?.Refinements?.Nodes[0]?.Facets || []
  const filteredManufacturer = findSelected(allManufacturers)
  const modelGroups =
    filteredManufacturer?.Refinements?.Nodes[0]?.Facets || []
  const totalCars = data?.Count || 0
  return { modelGroups, totalCars }
}

export const modelsKey = (mfr, mg) => ['filterNav', 'models', mfr, mg]
export const fetchModels = (mfr, mg) => async ({ signal } = {}) => {
  const q = `(And.Hidden.N._.SellType.%EC%9D%BC%EB%B0%98._.(C.CarType.A._.(C.Manufacturer.${mfr}._.ModelGroup.${mg}.)))`
  const data = await fetchNav(q, signal)
  const allManufacturers =
    data?.iNav?.Nodes[2]?.Facets[0]?.Refinements?.Nodes[0]?.Facets || []
  const filteredManufacturer = findSelected(allManufacturers)
  const modelGroup =
    filteredManufacturer?.Refinements?.Nodes[0]?.Facets || []
  const filteredModel = findSelected(modelGroup)
  const models = filteredModel?.Refinements?.Nodes[0]?.Facets || []
  const totalCars = data?.Count || 0
  return { models, totalCars }
}

export const configurationsKey = (mfr, mg, m) => ['filterNav', 'configurations', mfr, mg, m]
export const fetchConfigurations = (mfr, mg, m) => async ({ signal } = {}) => {
  const q = `(And.Hidden.N._.(C.CarType.A._.(C.Manufacturer.${mfr}._.(C.ModelGroup.${mg}._.Model.${m}.))))`
  const data = await fetchNav(q, signal)
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
}

export const badgesKey = (mfr, mg, m, c) => ['filterNav', 'badges', mfr, mg, m, c]
export const fetchBadges = (mfr, mg, m, c) => async ({ signal } = {}) => {
  const q = `(And.Hidden.N._.(C.CarType.A._.(C.Manufacturer.${mfr}._.(C.ModelGroup.${mg}._.(C.Model.${m}._.BadgeGroup.${c}.)))))`
  const data = await fetchNav(q, signal)
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
}

export const badgeDetailsKey = (mfr, mg, m, c, b) => ['filterNav', 'badgeDetails', mfr, mg, m, c, b]
export const fetchBadgeDetails = (mfr, mg, m, c, b) => async ({ signal } = {}) => {
  const q = `(And.Hidden.N._.SellType.%EC%9D%BC%EB%B0%98._.(C.CarType.A._.(C.Manufacturer.${mfr}._.(C.ModelGroup.${mg}._.(C.Model.${m}._.(C.BadgeGroup.${c}._.Badge.${transformBadgeValue(b)}.))))))`
  const data = await fetchNav(q, signal)
  const allManufacturers =
    data?.iNav?.Nodes[2]?.Facets[0]?.Refinements?.Nodes[0]?.Facets || []
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
  const filteredBadge = findSelected(badges)
  const badgeDetails =
    filteredBadge?.Refinements?.Nodes[0]?.Facets || []
  const totalCars = data?.Count || 0
  return { badgeDetails, totalCars }
}

const cascadeOptions = {
  staleTime: CASCADE_STALE_TIME,
  keepPreviousData: true,
  retry: 0,
}

export const useFilterCascade = (filters) => {
  const {
    selectedManufacturer,
    selectedModelGroup,
    selectedModel,
    selectedConfiguration,
    selectedBadge,
  } = filters

  const modelGroupsQuery = useQuery(
    modelGroupsKey(selectedManufacturer),
    fetchModelGroups(selectedManufacturer),
    { ...cascadeOptions, enabled: !!selectedManufacturer }
  )

  const modelsQuery = useQuery(
    modelsKey(selectedManufacturer, selectedModelGroup),
    fetchModels(selectedManufacturer, selectedModelGroup),
    {
      ...cascadeOptions,
      enabled: !!selectedManufacturer && !!selectedModelGroup,
    }
  )

  const configurationsQuery = useQuery(
    configurationsKey(selectedManufacturer, selectedModelGroup, selectedModel),
    fetchConfigurations(selectedManufacturer, selectedModelGroup, selectedModel),
    {
      ...cascadeOptions,
      enabled: !!selectedManufacturer && !!selectedModelGroup && !!selectedModel,
    }
  )

  const badgesQuery = useQuery(
    badgesKey(selectedManufacturer, selectedModelGroup, selectedModel, selectedConfiguration),
    fetchBadges(selectedManufacturer, selectedModelGroup, selectedModel, selectedConfiguration),
    {
      ...cascadeOptions,
      enabled:
        !!selectedManufacturer &&
        !!selectedModelGroup &&
        !!selectedModel &&
        !!selectedConfiguration,
    }
  )

  const badgeDetailsQuery = useQuery(
    badgeDetailsKey(selectedManufacturer, selectedModelGroup, selectedModel, selectedConfiguration, selectedBadge),
    fetchBadgeDetails(selectedManufacturer, selectedModelGroup, selectedModel, selectedConfiguration, selectedBadge),
    {
      ...cascadeOptions,
      enabled:
        !!selectedManufacturer &&
        !!selectedModelGroup &&
        !!selectedModel &&
        !!selectedConfiguration &&
        !!selectedBadge,
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
