import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { LocationList } from '@/types/geo-coding'

export const useGeocodeStore = defineStore('geocode-store', () => {
  const ttl = 24 * 60 * 60 * 1000 // 24 hours (ideally geocode takes a while before expiry)
  const locationsCache = ref<Record<string, { data: LocationList; expiresAt: number }>>({})

  const getCachedData = (key: string): LocationList | undefined => {
    const entry = locationsCache.value[key]
    if (!entry) return undefined
    if (entry.expiresAt < Date.now()) {
      delete locationsCache.value[key]
      return undefined
    }
    return entry.data
  }

  const cacheData = (key: string, data: LocationList) => {
    locationsCache.value[key] = { data, expiresAt: Date.now() + ttl }
  }

  const removeFromHistory = (key: string) => {
    delete locationsCache.value[key]
  }

  const locationSearchHistory = computed(() => Object.keys(locationsCache.value))

  return { locationsCache, removeFromHistory, locationSearchHistory, getCachedData, cacheData }
})
