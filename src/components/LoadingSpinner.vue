<script lang="ts" setup>
const props = defineProps<{ message?: string }>()
</script>

<template>
  <div className="flex items-center justify-center py-12">
    <div class="h-8 w-8 border-b-2 border-blue-600 rounded-full animate-spin"></div>
    <span class="ml-3 text-gray-500">{{ props.message ?? 'Loading weather data...' }}</span>
  </div>
</template>
