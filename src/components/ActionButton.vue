<script setup lang="ts">
const props = defineProps<{
  label: string
  disabled?: boolean
}>()
</script>

<template>
  <button
    type="submit"
    :disabled="props.disabled"
    class="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
  >
    {{ label }}
  </button>
</template>
