<script setup lang="ts">
import type { CurrentWeather } from '@/types/weather-forecast'
import { getIconUrl } from '@/utils/getIconUrl'
import { computed } from 'vue'
import { MapPin, Thermometer } from 'lucide-vue-next'

const props = defineProps<{
  currentWeather: CurrentWeather
  cityName: string
}>()

const weather = computed(() => props.currentWeather.weather[0])
</script>

<template>
  <div
    class="border border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition duration-300 max-w-lg w-full mx-auto"
  >
    <div class="p-6">
      <!-- Header -->
      <div class="flex items-start justify-between mb-4">
        <div class="flex items-center space-x-2">
          <MapPin class="h-5 w-5 text-blue-600" />
          <h2 class="text-xl font-semibold text-gray-900">{{ cityName }}</h2>
        </div>

        <img
          v-if="weather?.icon"
          :src="getIconUrl(weather.icon)"
          :alt="weather.description"
          class="w-16 h-16 object-contain"
        />
      </div>

      <!-- Weather Content -->
      <div class="space-y-4">
        <!-- Main temperature -->
        <div class="flex items-end space-x-2">
          <span class="text-5xl font-bold text-gray-900">{{
            Math.round(props.currentWeather.temp)
          }}</span>
          <span class="text-2xl text-gray-500 mb-2">°C</span>
        </div>

        <!-- Weather description -->
        <p class="text-lg text-gray-500 capitalize">{{ weather.description }}</p>

        <!-- Feels like -->
        <div class="flex items-center space-x-2 text-sm text-gray-500">
          <Thermometer class="h-4 w-4" />
          <span>Feels like {{ Math.round(props.currentWeather.feels_like) }}°C</span>
        </div>
      </div>
    </div>
  </div>
</template>
