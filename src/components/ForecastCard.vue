<script setup lang="ts">
import type { DailyWeather } from '@/types/weather-forecast'
import { getIconUrl } from '@/utils/getIconUrl'
import { formatDate } from '@/utils/formatDate'
import { Calendar } from 'lucide-vue-next'

const props = defineProps<{ dailyWeather: DailyWeather[] }>()
</script>

<template>
  <div class="space-y-4">
    <!-- Title -->
    <div class="flex items-center space-x-2">
      <Calendar class="h-5 w-5 text-blue-600" />
      <h3 class="text-lg font-semibold text-gray-900">7-Day Forecast</h3>
    </div>

    <!-- Forecast Cards -->
    <div
      class="flex space-x-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
    >
      <div
        v-for="(day, index) in props.dailyWeather"
        :key="index"
        class="flex-shrink-0 w-40 bg-white rounded-xl border border-gray-200 transition duration-200 hover:shadow-md hover:border-blue-400"
      >
        <div class="p-4">
          <div class="text-center space-y-3">
            <!-- Date -->
            <p class="text-sm font-medium text-gray-900">
              {{ formatDate(day.dt) }}
            </p>

            <!-- Icon -->
            <img
              v-if="day.weather[0]?.icon"
              :src="getIconUrl(day.weather[0].icon)"
              :alt="day.weather[0].description"
              class="w-12 h-12 object-contain mx-auto"
            />

            <!-- Temperatures -->
            <div class="space-y-1 text-sm">
              <div class="flex justify-between items-center">
                <span class="text-gray-500">High</span>
                <span class="font-semibold text-gray-900"> {{ Math.round(day.temp.max) }}° </span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-500">Low</span>
                <span class="text-gray-500"> {{ Math.round(day.temp.min) }}° </span>
              </div>
            </div>

            <!-- Description -->
            <p class="text-xs text-gray-500 capitalize leading-tight">
              {{ day.weather[0]?.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
