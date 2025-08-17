<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'
import { Clock, X } from 'lucide-vue-next'
import type { CacheEntry } from '@/types/geo-coding'

const props = defineProps<{
  locationsSearchHistory: Array<[string, CacheEntry]>
}>()

const emit = defineEmits<{
  (e: 'updateSearchInput', key: string): void
  (e: 'removeFromHistory', key: string): void
}>()
</script>

<template>
  <div v-if="props.locationsSearchHistory.length" class="space-y-3">
    <!-- Title -->
    <div class="flex items-center space-x-2 text-sm text-gray-500">
      <Clock class="h-4 w-4" />
      <span>Recent Searches</span>
    </div>

    <!-- Recent Search Pills -->
    <div class="flex flex-wrap gap-2">
      <div
        v-for="[key] in props.locationsSearchHistory"
        :key="key"
        class="inline-flex items-center bg-gray-100 text-gray-900 px-3 py-1.5 rounded-full text-sm font-medium"
      >
        <!-- Select Pill -->
        <button
          @click="emit('updateSearchInput', key)"
          class="mr-2 hover:text-blue-600 transition-colors cursor-pointer"
        >
          {{ key }}
        </button>

        <!-- Remove Pill -->
        <button
          @click="emit('removeFromHistory', key)"
          class="text-gray-500 hover:text-red-600 transition-colors cursor-pointer"
          aria-label="Remove from recent searches"
        >
          <X class="h-3 w-3" />
        </button>
      </div>
    </div>
  </div>
</template>
