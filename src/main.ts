import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const app = createApp(App)

const pinia = createPinia()
// custom localStorage persistence plugin
pinia.use(({ store }) => {
  // load state from localStorage safely
  try {
    const data = localStorage.getItem(`pinia-${store.$id}`)
    if (data) store.$patch(JSON.parse(data))
  } catch (e) {
    console.warn(`Failed to restore Pinia store ${store.$id}:`, e)
  }

  // subscribe to changes
  store.$subscribe(
    (mutation, state) => {
      try {
        localStorage.setItem(`pinia-${store.$id}`, JSON.stringify(state))
      } catch (e) {
        console.warn(`Failed to persist Pinia store ${store.$id}:`, e)
      }
    },
    { detached: true }, // optional: ensures subscription doesn't affect HMR
  )
})

app.use(pinia)

app.mount('#app')
