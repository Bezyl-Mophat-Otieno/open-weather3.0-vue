import { type WeatherForecast, weatherForecastSchema } from '@/types/weather-forecast'
import axios from 'axios'

class WeatherForecastApi {
  async getWeatherFocust({
    lat,
    lon,
  }: {
    lat: number
    lon: number
  }): Promise<{ message: string; data: WeatherForecast } | undefined> {
    try {
      const { data: response } = await axios.get(
        `${import.meta.env.VITE_OPEN_WEATHER_API_FORECAST_URL}?lat=${lat}&lon=${lon}&units=metric&exclude=minutely,hourly,alerts&appid=${import.meta.env.VITE_OPEN_WEATHER_API_KEY}`,
      )

      const subset = {
        timezone: response.timezone,
        current: response.current,
        daily: response.daily,
      }

      const parsed = weatherForecastSchema.parse(subset)

      return {
        message: 'Weather information fetched successfully',
        data: parsed,
      }
    } catch (e) {
      console.error(e)
      return undefined
    }
  }
}

export default new WeatherForecastApi()
