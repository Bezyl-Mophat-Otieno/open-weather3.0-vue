<script setup lang="ts">
import type { DailyWeather } from '@/types/weather-forecast'
import { getIconUrl } from '@/utils/getIconUrl'
import { formatDate } from '@/utils/formatDate'
import { Calendar } from 'lucide-vue-next'
import BaseCard from './BaseCard.vue'

const props = defineProps<{ dailyWeather: DailyWeather[] }>()
</script>

<template>
  <div class="space-y-4">
    <div class="flex items-center space-x-2">
      <Calendar class="h-5 w-5 text-blue-600" />
      <h3 class="text-lg font-semibold text-gray-900">5-Day Forecast</h3>
    </div>

    <div
      class="flex space-x-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
    >
      <BaseCard v-for="(day, index) in props.dailyWeather" :key="index">
        <div class="p-4 w-40 text-center space-y-3">
          <p class="text-sm font-medium text-gray-900">{{ formatDate(day.dt) }}</p>
          <img
            v-if="day.weather[0]?.icon"
            :src="getIconUrl(day.weather[0].icon)"
            :alt="day.weather[0].description"
            class="w-12 h-12 object-contain mx-auto"
          />
          <div class="space-y-1 text-sm">
            <div class="flex justify-between">
              <span class="text-gray-500">High</span>
              <span class="font-semibold text-gray-900">{{ Math.round(day.temp.max) }}°</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-500">Low</span>
              <span class="text-gray-500">{{ Math.round(day.temp.min) }}°</span>
            </div>
          </div>
          <p class="text-xs text-gray-500 capitalize">{{ day.weather[0]?.description }}</p>
        </div>
      </BaseCard>
    </div>
  </div>
</template>
