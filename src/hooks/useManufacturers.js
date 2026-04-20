import { useQuery } from 'react-query'
import axios from 'axios'

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

export const useManufacturers = () => {
  return useQuery(MANUFACTURERS_QUERY_KEY, fetchManufacturers, {
    staleTime: MANUFACTURERS_STALE_TIME,
  })
}
