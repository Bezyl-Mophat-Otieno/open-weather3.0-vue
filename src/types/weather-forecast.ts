import { z } from 'zod'

export const weatherInfoSchema = z.object({
  description: z.string(),
  icon: z.string(),
})

export const currentWeatherSchema = z.object({
  temp: z.number(),
  feels_like: z.number(),
  weather: z.array(weatherInfoSchema),
})

export const dailyWeatherSchema = z.object({
  dt: z.number(),
  temp: z.object({
    day: z.number(),
    min: z.number(),
    max: z.number(),
  }),
  weather: z.array(weatherInfoSchema),
})
export const weatherForecastSchema = z.object({
  timezone: z.string(),
  current: currentWeatherSchema,
  daily: z.array(dailyWeatherSchema),
})
export type WeatherForecast = z.infer<typeof weatherForecastSchema>
export type CurrentWeather = z.infer<typeof currentWeatherSchema>
export type DailyWeather = z.infer<typeof dailyWeatherSchema>
