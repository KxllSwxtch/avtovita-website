import { useQuery } from 'react-query'
import axios from 'axios'

export const useManufacturers = () => {
  return useQuery('manufacturers', async () => {
    const url = `https://encar-proxy-main.onrender.com/api/nav?count=true&q=(And.Hidden.N._.CarType.A._.SellType.%EC%9D%BC%EB%B0%98.)&inav=%7CMetadata%7CSort`
    const { data } = await axios.get(url)

    const manufacturers =
      data?.iNav?.Nodes[1]?.Facets[0]?.Refinements?.Nodes[0]?.Facets || []
    const totalCars = data?.Count || 0

    return { manufacturers, totalCars }
  }, {
    staleTime: 10 * 60 * 1000,
  })
}
