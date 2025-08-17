<script lang="ts" setup>
import { defineEmits } from 'vue'
import { Clock, X } from 'lucide-vue-next'
import { useGeocodeStore } from '@/stores/geocode-store';


 const store = useGeocodeStore()

const emit = defineEmits<{
  (e: 'updateSearchInput', key: string): void
  (e: 'removeFromHistory', key: string): void
}>()
</script>

<template>
  <div v-if="store.locationSearchHistory.length" class="space-y-3">
    <!-- Title -->
    <div class="flex items-center space-x-2 text-sm text-gray-500">
      <Clock class="h-4 w-4" />
      <span>Recent Searches</span>
    </div>

    <!-- Recent Search Pills -->
    <div class="flex flex-wrap gap-2">
      <div
        v-for="(location, index) in store.locationSearchHistory"
        :key="index"
        class="inline-flex items-center bg-gray-100 text-gray-900 px-3 py-1.5 rounded-full text-sm font-medium"
      >
        <!-- Select Pill -->
        <button
          @click="emit('updateSearchInput', location)"
          class="mr-2 hover:text-blue-600 transition-colors cursor-pointer"
        >
          {{ location }}
        </button>

        <!-- Remove Pill -->
        <button
          @click="store.removeFromHistory( location)"
          class="text-gray-500 hover:text-red-600 transition-colors cursor-pointer"
          aria-label="Remove from recent searches"
        >
          <X class="h-3 w-3" />
        </button>
      </div>
    </div>
  </div>
</template>
