import type { LocationList } from '@/types/geo-coding'
import type { WeatherForecast } from '@/types/weather-forecast'

class CacheService<T> {
  constructor(
    private readonly name: string,
    private readonly ttl = 600000,
  ) {
    if (!localStorage.getItem(this.name)) {
      localStorage.setItem(this.name, JSON.stringify({}))
    }
  }

  private now() {
    return Date.now()
  }

  private getStore(): Record<string, { data: T; expiresAt: number }> {
    return JSON.parse(localStorage.getItem(this.name) || '{}')
  }

  private setStore(store: Record<string, { data: T; expiresAt: number }>) {
    localStorage.setItem(this.name, JSON.stringify(store))
  }

  cacheData(key: string, data: T) {
    const store = this.getStore()
    store[key] = {
      data,
      expiresAt: this.now() + this.ttl,
    }
    this.setStore(store)
  }

  getCachedData(key: string): T | undefined {
    const store = this.getStore()
    const entry = store[key]
    if (!entry) return undefined

    if (entry.expiresAt < this.now()) {
      delete store[key]
      this.setStore(store)
      return undefined
    }

    return entry.data
  }

  clearCachedData(key: string) {
    const store = this.getStore()
    delete store[key]
    this.setStore(store)
  }

  clearCacheStore() {
    localStorage.removeItem(this.name)
  }

  getAll() {
    return this.getStore()
  }
}

const geoCodeCache = new CacheService<LocationList>('geocode-cache', 24 * 60 * 60 * 1000)
const weatherForecastCache = new CacheService<WeatherForecast>('weather-cache', 10 * 60 * 1000)

export { geoCodeCache, weatherForecastCache }
