import { ref, onMounted, onUnmounted } from 'vue'

export function useCurrentTime() {
  const now = ref(Math.floor(Date.now() / 1000))
  let intervalId: number | undefined

  onMounted(() => {
    // update every minute (60 * 1000 ms)
    intervalId = window.setInterval(() => {
      now.value = Math.floor(Date.now() / 1000)
    }, 60 * 1000)
  })

  onUnmounted(() => {
    if (intervalId) {
      clearInterval(intervalId)
    }
  }) 

  return { now }
}
