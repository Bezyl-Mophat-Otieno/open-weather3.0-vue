import { useGeocodeStore } from '@/stores/geocode-store'
import type { JsonResponse } from '@/types/api'
import { GeocodeListSchema, type LocationList } from '@/types/geo-coding'
import { normalizeInput } from '@/utils/normalizeInput'
import axios from 'axios'

class GeocodingApi {
  async geoCode(searchParam: string): Promise<JsonResponse<LocationList>> {
    try {
      const normalizedInput = normalizeInput(searchParam)

      const geocodeStore = useGeocodeStore()

      const cached = geocodeStore.getCachedData(normalizedInput)
      if (cached) {
        return {
          success: true,
          message: `Showing recently searched locations for "${searchParam}".`,
          data: cached,
        }
      }

      const { data: response } = await axios.get<LocationList>(
        `${import.meta.env.VITE_OPEN_WEATHER_API_GEOCODE_URL}?q=${normalizedInput}&limit=5&appid=${import.meta.env.VITE_OPEN_WEATHER_API_KEY}`,
      )

      const subset = response.map((g) => ({
        name: g.name,
        country: g.country,
        state: g.state,
        lat: g.lat,
        lon: g.lon,
      }))

      const parsed = GeocodeListSchema.parse(subset)

      geocodeStore.cacheData(normalizedInput, parsed)


      return {
        success: true,
        message: `We successfully found locations matching "${searchParam}".`,
        data: parsed,
      }
    } catch (error) {
      let userMessage =
        'An unexpected error occurred while searching for locations. Please try again later.'

      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          userMessage = `No locations found for "${searchParam}".`
        } else if (error.response?.status === 401) {
          userMessage = 'Invalid API key. Please check your configuration.'
        } else {
          userMessage = `Unable to fetch location information for "${searchParam}" at this time.`
        }
      }
      return { success: false, message: userMessage, data: [] }
    }
  }
}

export default new GeocodingApi()
