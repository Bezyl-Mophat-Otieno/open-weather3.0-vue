<script setup lang="ts">
const classesByType: Record<string, string> = {
  success: 'border-green-400 bg-green-50 text-green-700',
  warning: 'border-yellow-400 bg-yellow-50 text-yellow-700',
  error: 'border-red-400 bg-red-50 text-red-700',
  info: 'border-blue-400 bg-blue-50 text-blue-700',
}
</script>

<template>
  <div
    :class="`w-full max-w-md mx-auto mb-3 p-4 rounded-xl flex justify-between items-start border`"
  >
    <span>Alert Message</span>
    <button class="text-sm font-medium cursor-pointer">✕</button>
  </div>
</template>
