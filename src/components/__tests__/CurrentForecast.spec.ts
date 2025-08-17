import { mount } from '@vue/test-utils'
import CurrentForecast from '@/components/CurrentForecast.vue'
import { describe, expect, it } from 'vitest'
const mockWeather = {
  weather: [{ description: 'clear sky', icon: '01d' }],
  temp: 25,
  feels_like: 27,
}

describe('CurrentForecast', () => {
  it('renders city name and temperature', () => {
    const wrapper = mount(CurrentForecast, {
      props: {
        currentWeather: mockWeather,
        cityName: 'Nairobi',
      },
    })

    // Check city name
    expect(wrapper.text()).toContain('Nairobi')
    // Check temperature
    expect(wrapper.text()).toContain('25')
    // Description
    expect(wrapper.text()).toContain('clear sky')
  })
})
