import { useQuery } from 'react-query'
import axios from 'axios'

export const useCurrencyRate = () => {
  return useQuery('usdKrwRate', async () => {
    const { data } = await axios.get(
      'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json'
    )
    return data.usd.krw
  }, {
    staleTime: 30 * 60 * 1000,
    cacheTime: 60 * 60 * 1000,
  })
}
