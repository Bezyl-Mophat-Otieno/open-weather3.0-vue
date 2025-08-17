import { GeocodeListSchema, type LocationList } from '@/types/geo-coding'
import { normalizeInput } from '@/utils/normalizeInput'
import axios from 'axios'

class GeocodingApi {
  async geoCode(searchParam: string): Promise<{ message: string; data: LocationList } | undefined> {
    try {
      const normalizedInput = normalizeInput(searchParam)

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

      return {
        message: `We have successfully geocoded information for ${searchParam}.`,
        data: parsed,
      }
    } catch (e) {
      console.error(e)
      return undefined
    }
  }
}

export default new GeocodingApi()
