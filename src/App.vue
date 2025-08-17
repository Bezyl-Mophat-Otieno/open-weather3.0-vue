<script lang="ts" setup>
import WeatherSearch from '@/components/WeatherSearch.vue'
import AlertMessage from './components/AlertMessage.vue'
import { useWeatherForecast } from './composibles/useWeatherForecast'
import { watchDebounced } from '@vueuse/core'
import { getLocationName } from '@/utils/getLocationName'
import LoadingSpinner from './components/LoadingSpinner.vue'
import { Cloud } from 'lucide-vue-next'
import DailyForecast from '@/components/DailyForecast.vue'
import CurrentForecast from '@/components/CurrentForecast.vue'

const {
  searchInput,
  alertMessage,
  isLoading,
  suggestedLocations,
  hasForecast,
  dailyWeatherForecast,
  currentWeatherForecast,
  locationsSearchHistory,
  isLocationSelected,
  alertType,
  selectedLocation,
  setSelectedLocation,
  getWeatherInformation,
  clearAlert,
  getLocationInformation,
} = useWeatherForecast()

watchDebounced(
  searchInput,
  async () => {
    await getLocationInformation()
  },
  { debounce: 800 },
)
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <header class="sticky top-0 z-10 bg-white/80 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center space-x-3">
          <div class="p-2 bg-blue-100 rounded-lg">
            <Cloud className="h-6 w-6 text-blue-600" />
          </div>
        </div>
      </div>
    </header>

    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 xl:col-span-3">
          <div class="bg-white border border-gray-200 rounded-lg p-6 shadow-sm sticky top-24">
            <WeatherSearch
              :suggestedLocations="suggestedLocations"
              :locationsSearchHistory="locationsSearchHistory"
              v-model:searchInput="searchInput"
              @setSelectedSuggestion="setSelectedLocation"
              @getWeatherInformation="getWeatherInformation"
              :isLocationSelected="isLocationSelected"
            />
          </div>
        </div>

        <div className="lg:col-span-8 xl:col-span-9">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
            <AlertMessage
              v-if="alertMessage"
              :message="alertMessage"
              :type="alertType"
              @close="clearAlert"
            />
          </div>
          <LoadingSpinner v-if="isLoading" />
          <div
            className="flex flex-col items-center justify-center py-16 text-center"
            v-if="!isLoading && !Object.values(currentWeatherForecast).every(Boolean)"
          >
            <div class="p-4 bg-gray-100 rounded-full mb-4">
              <Cloud class="h-12 w-12 text-gray-400" />
            </div>
            <h2 class="text-xl font-semibold text-gray-900 mb-2">Search for Weather</h2>
            <p class="text-gray-500 max-w-md">
              Enter a city name to get current weather conditions and a 5-day forecast.
            </p>
          </div>

          <div className="space-y-8">
            <CurrentForecast
              v-if="hasForecast"
              :cityName="getLocationName(selectedLocation)"
              :currentWeather="currentWeatherForecast"
            />

            <div v-if="hasForecast" bg-white border border-gray-200 rounded-lg p-6 shadow-sm>
              <DailyForecast :dailyWeather="dailyWeatherForecast.slice(0, 5)" />
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
