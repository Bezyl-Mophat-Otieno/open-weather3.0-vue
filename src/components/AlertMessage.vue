<script setup lang="ts">
import type { AlertType } from '@/types/ui'
import { defineProps, defineEmits } from 'vue'

const props = defineProps<{
  message: string
  type?: AlertType
}>()

const emit = defineEmits(['close'])

const alertType = props.type ?? 'info'

const classesByType: Record<AlertType, string> = {
  success: 'border-green-400 bg-green-50 text-green-700',
  warning: 'border-yellow-400 bg-yellow-50 text-yellow-700',
  error: 'border-red-400 bg-red-50 text-red-700',
  info: 'border-blue-400 bg-blue-50 text-blue-700',
}
</script>

<template>
  <div
    :class="`w-full max-w-md mx-auto mb-3 p-4 rounded-xl flex justify-between items-start border ${classesByType[alertType]}`"
  >
    <span>{{ props.message }}</span>
    <button @click="emit('close')" class="text-sm font-medium cursor-pointer">✕</button>
  </div>
</template>
