# Weather Forecast App

Hey there,
This is a small weather application built with **Vue 3**, **TypeScript**, **TailwindCSS**, and **Pinia**. You can search for a city, view the current weather, check a 5-day forecast, and quickly re-select previous searches.

It’s intentionally simple (no crazy animations) but clean, responsive and fully tested using **Vitest**.

regards,
Bezyl Mophat Otieno.

---

## Features

- Autocomplete search with results from the GeoCoding API
- Current weather (temperature, feels-like, description + icon)
- 5-day forecast
- Current date & time in the header (updates every minute)
- Recent searches (clickable history)
- Alerts for invalid searches / errors
- State handled via Pinia
- Utility & component unit tests with Vitest

---

## Local Setup (Important!)

> The project **does NOT include** a `.env.local` file (on purpose).
> The only env file committed to the repo is `.env.production`.

Before running it locally you **must** create the following file and first copy the contents of the .env.production file before updating the VITE_OPEN_WEATHER_API_KEY:

```
# .env.local
VITE_OPEN_WEATHER_API_KEY=<YOUR_OPENWEATHERMAP_API_KEY>
VITE_OPEN_WEATHER_API_GEOCODE_URL=http://api.openweathermap.org/geo/1.0/direct
VITE_OPEN_WEATHER_API_FORECAST_URL=https://api.openweathermap.org/data/3.0/onecall
```

---

## Run the App

```bash
git clone <your-repo-url>
cd <project>
pnpm install
pnpm run dev
```

Visit:
`http://localhost:5173`

---

## 📁 Folder Structure (High-level)

```
src/
├─ api/                   // axios requests for weather + geoCode
├─ components/
│   ├─ WeatherSearch.vue
│   ├─ CurrentForecast.vue
│   ├─ DailyForecast.vue
│   └─ BaseCard.vue        // reused by the two cards
│   └─ __tests__/          // Vitest component tests
├─ composibles/
│   ├─ useWeatherForecast.ts
│   └─ useCurrentTimer.ts
├─ stores/                // Pinia stores
├─ utils/                 // helper functions (each with its own test)
└─ main.ts & App.vue
```

---

## Running the Tests

```bash
npx vitest
```
