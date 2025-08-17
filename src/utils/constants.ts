

const defaultLocation = {
  name: '',
  country: '',
  state: '',
  lat: 0,
  lon: 0,
}

const defaultWeatherForecast = {
  timezone: '',
  current: {
    temp: 0,
    feels_like: 0,
    weather: [],
  },
  daily: [],
}

export { defaultLocation, defaultWeatherForecast }
