import { useQuery } from 'react-query'
import axios from 'axios'
import staticSnapshot from '../data/manufacturers.json'

export const MANUFACTURERS_QUERY_KEY = 'manufacturers'
export const MANUFACTURERS_STALE_TIME = 10 * 60 * 1000

const MANUFACTURERS_URL =
  'https://encar-proxy-main.onrender.com/api/nav?count=true&q=(And.Hidden.N._.CarType.A._.SellType.%EC%9D%BC%EB%B0%98.)&inav=%7CMetadata%7CSort'

export const fetchManufacturers = async ({ signal } = {}) => {
  const { data } = await axios.get(MANUFACTURERS_URL, { signal })
  const manufacturers =
    data?.iNav?.Nodes[1]?.Facets[0]?.Refinements?.Nodes[0]?.Facets || []
  const totalCars = data?.Count || 0
  return { manufacturers, totalCars }
}

// The bundled snapshot is shown synchronously on first paint so the brand
// dropdown is populated before any /api/nav request completes — even when the
// proxy is degraded or returning 5xx. React Query treats this as
// immediately-stale (initialDataUpdatedAt: 0) and fires a background refetch
// on mount, so the live counts overwrite the snapshot within ~1 s when the
// proxy is healthy. Brand *names* don't change hourly, so worst-case the
// counts are briefly stale on a cold load.
//
// Regenerate when notably out of date: `yarn snapshot:manufacturers`
const INITIAL_DATA = {
  manufacturers: staticSnapshot.manufacturers,
  totalCars: staticSnapshot.totalCars,
}

export const useManufacturers = () => {
  return useQuery(MANUFACTURERS_QUERY_KEY, fetchManufacturers, {
    staleTime: MANUFACTURERS_STALE_TIME,
    initialData: INITIAL_DATA,
    initialDataUpdatedAt: 0,
  })
}
