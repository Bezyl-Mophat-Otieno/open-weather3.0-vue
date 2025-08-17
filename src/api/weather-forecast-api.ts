import { weatherForecastCache } from '@/sevices/caching'
import { type WeatherForecast, weatherForecastSchema } from '@/types/weather-forecast'
import { defaultWeatherForecast } from '@/utils/constants'
import { normalizeInput } from '@/utils/normalizeInput'
import axios from 'axios'

class WeatherForecastApi {
  async getWeatherFocust({
    lat,
    lon,
  }: {
    lat: number
    lon: number
  }): Promise<{ success: boolean; message: string; data: WeatherForecast }> {
    const searchParam = `${lat}-${lon}`
    const normalizedInputQuery = normalizeInput(searchParam)

    try {
      const cached = weatherForecastCache.getCachedData(normalizedInputQuery)
      if (cached) {
        return {
          success: true,
          message: `We've found recent weather data for this location!`,
          data: cached,
        }
      }

      const { data: response } = await axios.get(
        `${import.meta.env.VITE_OPEN_WEATHER_API_FORECAST_URL}?lat=${lat}&lon=${lon}&units=metric&exclude=minutely,hourly,alerts&appid=${import.meta.env.VITE_OPEN_WEATHER_API_KEY}`,
      )

      const subset = {
        timezone: response.timezone,
        current: response.current,
        daily: response.daily,
      }

      const parsed = weatherForecastSchema.parse(subset)

      weatherForecastCache.cacheData(normalizedInputQuery, parsed)

      return {
        success: true,
        message: `Weather details are ready! You can now see the current conditions and 5-day forecast.`,
        data: parsed,
      }
    } catch (error) {
      console.error('Error fetching weather information:', error)

      let userMessage =
        'An unexpected error occurred while fetching weather data. Please try again later.'
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          userMessage = 'Weather information not found for the selected location.'
        } else if (error.response?.status === 401) {
          userMessage = 'Invalid API key. Please check your configuration.'
        } else {
          userMessage = 'Unable to retrieve weather information at this time.'
        }
      }

      return { success: false, message: userMessage, data: defaultWeatherForecast }
    }
  }
}

export default new WeatherForecastApi()
