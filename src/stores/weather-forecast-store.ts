import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { WeatherForecast } from '@/types/weather-forecast'

export const useWeatherForecastStore = defineStore('weather-forecast-store', () => {
  const ttl = 10 * 60 * 1000 // 10 minutes for weather data
  const forecastCache = ref<Record<string, { data: WeatherForecast; expiresAt: number }>>({})

  const getCachedForecast = (key: string): WeatherForecast | undefined => {
    const entry = forecastCache.value[key]
    if (!entry) return undefined
    if (entry.expiresAt < Date.now()) {
      delete forecastCache.value[key]
      return undefined
    }
    return entry.data
  }

  const cacheForecast = (key: string, data: WeatherForecast) => {
    forecastCache.value[key] = { data, expiresAt: Date.now() + ttl }
  }

  return { forecastCache, getCachedForecast, cacheForecast }
})
