import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import WeatherSearch from '@/components/WeatherSearch.vue'

vi.mock('@/stores/geocode-store', () => {
  return {
    useGeocodeStore: () => ({
      locationSearchHistory: ['Nairobi', 'Lagos'],
      removeFromHistory: vi.fn(),
    }),
  }
})
const mockSuggestion = { name: 'Nairobi', country: 'KE', state: 'Nairobi County', lat: 0, lon: 0 }

describe('WeatherSearch.vue', () => {
  it('emits update:searchInput when typing in the input', async () => {
    const wrapper = mount(WeatherSearch, {
      props: {
        searchInput: '',
        suggestedLocations: [],
        isLocationSelected: false,
      },
      global: {
        stubs: { LocationSearchHistory: true },
      },
    })

    await wrapper.get('input').setValue('London')

    expect(wrapper.emitted('update:searchInput')?.[0]).toEqual(['London'])
  })

  it('shows suggestions when suggestedLocations is not empty', () => {
    const wrapper = mount(WeatherSearch, {
      props: {
        searchInput: '',
        suggestedLocations: [mockSuggestion],
        isLocationSelected: true,
      },
      global: {
        stubs: { LocationSearchHistory: true },
      },
    })

    // Suggestion container should exist
    expect(wrapper.find('div.max-h-48').exists()).toBe(true)
  })

  it('updates the input and emits setSelectedSuggestion when a suggestion is clicked', async () => {
    const wrapper = mount(WeatherSearch, {
      props: {
        searchInput: '',
        suggestedLocations: [mockSuggestion],
        isLocationSelected: true,
        'onUpdate:searchInput': (val: string) => wrapper.setProps({ searchInput: val }),
      },
      global: {
        stubs: { LocationSearchHistory: true },
      },
    })

    await wrapper.get(`[data-testId="btn-${mockSuggestion.name}-0"]`).trigger('click')

    // expect setSelectedSuggestion event
    expect(wrapper.emitted('setSelectedSuggestion')).toBeTruthy()

    // input value should be updated
    const input = wrapper.get('input')
    expect((input.element as HTMLInputElement).value).toContain('Nairobi')
  })
  it('updates input value when a recent-search pill is clicked', async () => {
    const wrapper = mount(WeatherSearch, {
      props: {
        suggestedLocations: [],
        searchInput: '',
        isLocationSelected: true,
        'onUpdate:searchInput': (val: string) => wrapper.setProps({ searchInput: val }),
      },
    })

    await wrapper.get('[data-testId="historicalLocationBtn"]').trigger('click')

    const input = wrapper.get('input')
    expect((input.element as HTMLInputElement).value).toBe('Nairobi')
  })
})
