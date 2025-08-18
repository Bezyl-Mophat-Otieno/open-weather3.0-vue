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
import { formatDate } from './utils/formatDate'
import { useCurrentTime } from './composibles/useCurrentTimer'

const {
  searchInput,
  alertMessage,
  isLoading,
  suggestedLocations,
  hasForecast,
  dailyWeatherForecast,
  currentWeatherForecast,
  isLocationSelected,
  alertType,
  selectedLocation,
  setSelectedLocation,
  getWeatherInformation,
  clearAlert,
  getLocationInformation,
} = useWeatherForecast()

const { now } = useCurrentTime()

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
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex items-center space-x-3">
          <div class="p-2 bg-blue-100 rounded-lg">
            <Cloud class="h-6 w-6 text-blue-600" />
          </div>
          <div class="flex flex-col">
            <p class="text-lg font-medium text-gray-900">Welcome back!</p>
            <span class="text-sm text-gray-500">
              {{ formatDate(now)}}
            </span>
          </div>
        </div>
      </div>
    </header>

    <main class="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="flex flex-col lg:flex-row gap-8">
        <div class="w-full lg:w-1/3 xl:w-1/4">
          <div class="bg-white border border-gray-200 rounded-lg p-6 shadow-sm sticky top-24">
            <!-- WeatherSearch -->
            <WeatherSearch
              :suggestedLocations="suggestedLocations"
              v-model:searchInput="searchInput"
              @setSelectedSuggestion="setSelectedLocation"
              @getWeatherInformation="getWeatherInformation"
              :isLocationSelected="isLocationSelected"
            />
          </div>
        </div>

        <!-- Divider -->
        <div class="hidden lg:block w-[2px] bg-gray-200"></div>

        <!-- Right column -->
        <div class="flex-1">
          <AlertMessage
            v-if="alertMessage"
            :message="alertMessage"
            :type="alertType"
            @close="clearAlert"
            class="mb-4"
          />

          <LoadingSpinner v-if="isLoading" />

          <div
            v-if="!isLoading && !Object.values(currentWeatherForecast).every(Boolean)"
            class="flex flex-col items-center justify-center py-16 text-center"
          >
            <div class="p-4 bg-gray-100 rounded-full mb-4">
              <Cloud class="h-12 w-12 text-gray-400" />
            </div>
            <h2 class="text-xl font-semibold text-gray-900 mb-2">Search for Weather</h2>
            <p class="text-gray-500 max-w-md">
              Enter a city name to get current weather conditions and a 5-day forecast.
            </p>
          </div>

          <div class="space-y-8" v-if="hasForecast">
            <CurrentForecast
              :cityName="getLocationName(selectedLocation)"
              :currentWeather="currentWeatherForecast"
            />

            <div class="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <DailyForecast :dailyWeather="dailyWeatherForecast.slice(0, 5)" />
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
