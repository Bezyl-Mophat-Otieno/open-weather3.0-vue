import type { Location, LocationList } from '@/types/geo-coding'
import type { WeatherForecast } from '@/types/weather-forecast'
import { computed, reactive, ref, toRefs } from 'vue'
import geocodingApi from '@/api/geo-coding-api'
import weatherForecastApi from '@/api/weather-forecast-api'
import type { AlertType } from '@/types/ui'
import { defaultWeatherForecast, defaultLocation } from '@/utils/constants'

export const useWeatherForecast = () => {
  const searchInput = ref('')
  const hasForecast = ref(false)
  const isLoading = ref(false)
  const alertMessage = ref('')
  const alertType = ref<AlertType>()
  const weatherForecast = reactive<WeatherForecast>(defaultWeatherForecast)
  const { current: currentWeatherForecast, daily: dailyWeatherForecast } = toRefs(weatherForecast)
  const suggestedLocations = reactive<LocationList>([])
  const selectedLocation = reactive<Location>(defaultLocation)

  const isLocationSelected = computed(() => Boolean(selectedLocation.name))

  const showAlert = (msg: string, type: AlertType = 'info') => {
    alertMessage.value = msg
    alertType.value = type
  }

  const clearAlert = () => {
    alertMessage.value = ''
  }

  const setSelectedLocation = (location: Location) => {
    selectedLocation.name = location.name
    selectedLocation.country = location.country
    selectedLocation.state = location.state
    selectedLocation.lat = location.lat
    selectedLocation.lon = location.lon
  }

  const getLocationInformation = async () => {
    if (!searchInput.value.trim()) {
      showAlert('Please enter a city or location name to search.', 'info')
      return
    }
    const { success, data: newSuggestedLocations } = await geocodingApi.geoCode(searchInput.value)
    if (!success || newSuggestedLocations.length === 0) {
      return
    }
    suggestedLocations.length = 0
    suggestedLocations.push(...newSuggestedLocations)
  }
  const getWeatherInformation = async () => {
    suggestedLocations.length = 0
    isLoading.value = true
    if (!selectedLocation.lat || !selectedLocation.lon || !selectedLocation.name) {
      showAlert(
        'Please select a location from the suggestions before fetching the weather.',
        'error',
      )
      return
    }
    const { success, message, data } = await weatherForecastApi.getWeatherFocust({
      lat: selectedLocation.lat,
      lon: selectedLocation.lon,
    })

    if (!success) {
      showAlert(
        'Unable to retrieve weather information at this time. Please try again later.',
        'error',
      )
      return
    }
    showAlert(message, 'success')
    Object.assign(weatherForecast, data)
    hasForecast.value = true
    isLoading.value = false
  }

  return {
    searchInput,
    hasForecast,
    isLoading,
    alertMessage,
    suggestedLocations,
    currentWeatherForecast,
    dailyWeatherForecast,
    isLocationSelected,
    alertType,
    clearAlert,
    setSelectedLocation,
    selectedLocation,
    showAlert,
    getLocationInformation,
    getWeatherInformation,
  }
}
