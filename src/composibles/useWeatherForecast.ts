import type { Location, LocationList } from '@/types/geo-coding'
import type { WeatherForecast } from '@/types/weather-forecast'
import { computed, reactive, ref, toRefs } from 'vue'
import geocodingApi from '@/api/geo-coding-api'
import weatherForecastApi from '@/api/weather-forecast-api'
import type { AlertType } from '@/types/ui'

const defaultSearchHistory = {
  London: {
    data: [
      {
        name: 'Gaast',
        country: 'NL',
        state: 'Frisia',
        lat: 53.0159495,
        lon: 5.409187,
      },
      {
        name: 'Gast',
        country: 'DE',
        state: 'Schleswig-Holstein',
        lat: 54.5056305,
        lon: 9.914506,
      },
    ],
    expiresAt: 1755486516029,
  },
}

const defaultLocation = {
  name: '',
  country: '',
  state: '',
  lat: 0,
  lon: 0,
}

const defaultWeatherFocust = {
  timezone: '',
  current: {
    temp: 0,
    feels_like: 0,
    weather: [],
  },
  daily: [],
}

export const useWeatherForecast = () => {
  const searchInput = ref('')
  const hasForecast = ref(false)
  const isLoading = ref(false)
  const alertMessage = ref('')
  const alertType = ref<AlertType>()
  const weatherForecast = reactive<WeatherForecast>(defaultWeatherFocust)
  const { current: currentWeatherForecast, daily: dailyWeatherForecast } = toRefs(weatherForecast)
  const suggestedLocations = reactive<LocationList>([])
  const selectedLocation = reactive<Location>(defaultLocation)

  const locationsSearchHistory = reactive(Object.entries(defaultSearchHistory).slice(0, 5))
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
    const response = await geocodingApi.geoCode(searchInput.value)
    if (!response || response.data.length === 0) {
      return
    }
    const { data: newSuggestedLocations } = response
    suggestedLocations.length = 0
    suggestedLocations.push(...newSuggestedLocations)
  }
  const getWeatherInformation = async () => {
    suggestedLocations.length = 0
    isLoading.value = true
    if (!selectedLocation.name || !selectedLocation.country || !selectedLocation.state) {
      showAlert(
        'Kindly make sure you have  searched for a location  and selected from the suggestions before searching for the weather information',
        'error',
      )
      return
    }
    const weatherForecastInfo = await weatherForecastApi.getWeatherFocust({
      lat: selectedLocation.lat,
      lon: selectedLocation.lon,
    })

    if (!weatherForecastInfo) {
      showAlert(`Error fetching weather information.  Kindly try again later`, 'error')
      return
    }
    showAlert(weatherForecastInfo.message, 'success')
    Object.assign(weatherForecast, weatherForecastInfo.data)
    hasForecast.value = true
    isLoading.value = false
  }

  return {
    searchInput,
    hasForecast,
    isLoading,
    alertMessage,
    locationsSearchHistory,
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
