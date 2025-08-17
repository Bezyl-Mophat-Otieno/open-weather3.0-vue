<script lang="ts" setup>
import { Cloud } from 'lucide-vue-next'
import ForecastCard from '@/components/ForecastCard.vue'
import WeatherSearch from '@/components/WeatherSearch.vue'
import Alert from '@/components/Alert.vue'
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <header class="sticky top-0 z-10 bg-white/80 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center space-x-3">
          <div class="p-2 bg-blue-100 rounded-lg">
            <Cloud className="h-6 w-6 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-blue-400 underline">Weather App</h1>
        </div>
      </div>
    </header>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
      <Alert />
    </div>

    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 xl:col-span-3">
          <div class="bg-white border border-gray-200 rounded-lg p-6 shadow-sm sticky top-24">
            <WeatherSearch />
          </div>
        </div>

        <div className="lg:col-span-8 xl:col-span-9">
          <Loading />
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div class="p-4 bg-gray-100 rounded-full mb-4">
              <Cloud class="h-12 w-12 text-gray-400" />
            </div>
            <h2 class="text-xl font-semibold text-gray-900 mb-2">Search for Weather</h2>
            <p class="text-gray-500 max-w-md">
              Enter a city name to get current weather conditions and a 7-day forecast.
            </p>
          </div>

          <div className="space-y-8">
            <WeatherCard />

            <div bg-white border border-gray-200 rounded-lg p-6 shadow-sm>
              <ForecastCard />
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
