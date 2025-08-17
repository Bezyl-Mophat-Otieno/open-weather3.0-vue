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

const defaultWeatherForecast = {
  timezone: '',
  current: {
    temp: 0,
    feels_like: 0,
    weather: [],
  },
  daily: [],
}

export { defaultLocation, defaultSearchHistory, defaultWeatherForecast }
