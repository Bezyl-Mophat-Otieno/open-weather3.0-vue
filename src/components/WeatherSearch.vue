<script lang="ts" setup>
import { defineEmits, defineProps, computed } from 'vue'
import { getLocationName } from '@/utils/getLocationName'
import type { Location, LocationList, CacheEntry } from '@/types/geo-coding'
import { MapPin } from 'lucide-vue-next'
import LocationSearchHistory from './LocationSearchHistory.vue'
import ActionButton from './ActionButton.vue'

const props = defineProps<{
  locationsSearchHistory: Array<[string, CacheEntry]>
  searchInput: string
  suggestedLocations: LocationList
  isLocationSelected: boolean
}>()

const emit = defineEmits(['update:searchInput', 'getWeatherInformation', 'setSelectedSuggestion'])

const showSuggestions = computed(() => Boolean(props.suggestedLocations.length))
const updateSearchInput = (value: string) => emit('update:searchInput', value)
const selectSuggestion = (suggestion: Location) => {
  emit('setSelectedSuggestion', suggestion)
  updateSearchInput(getLocationName(suggestion))
}
</script>

<template>
  <div class="space-y-6 w-full">
    <!-- Search Form -->
    <form @submit.prevent="emit('getWeatherInformation')" class="space-y-4 w-full max-w-lg mx-auto">
      <div class="relative">
        <input
          type="text"
          name="search"
          :value="props.searchInput"
          @input="updateSearchInput(($event.target as HTMLInputElement).value)"
          placeholder="Search for a city..."
          class="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition"
        />
        <MapPin class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
      </div>

      <!-- Search Button -->
      <ActionButton label="Get Weather" :disabled="!props.isLocationSelected || !showSuggestions" />
    </form>

    <!-- Suggestions -->
    <div
      v-if="showSuggestions"
      class="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden w-full max-w-lg mx-auto"
    >
      <div class="p-3 border-b border-gray-200 bg-gray-50">
        <h3 class="text-sm font-medium text-gray-900">Search Results</h3>
      </div>

      <div class="max-h-48 overflow-y-auto">
        <button
          v-for="(suggestion, index) in suggestedLocations"
          :key="index"
          @click="selectSuggestion(suggestion)"
          class="w-full text-left px-4 py-3 border-b border-gray-200 flex items-center space-x-2 hover:bg-gray-100 transition last:border-b-0 cursor-pointer"
        >
          <MapPin class="h-4 w-4 text-gray-400 flex-shrink-0" />

          <div>
            <div class="font-medium text-gray-900">
              {{ suggestion.name }}
            </div>
            <div class="text-sm text-gray-500">
              {{ getLocationName(suggestion) }}
            </div>
          </div>
        </button>
      </div>
    </div>

    <!-- Search History -->
    <LocationSearchHistory
      :locationsSearchHistory="props.locationsSearchHistory"
      @updateSearchInput="updateSearchInput"
      class="w-full max-w-lg mx-auto"
    />
  </div>
</template>
