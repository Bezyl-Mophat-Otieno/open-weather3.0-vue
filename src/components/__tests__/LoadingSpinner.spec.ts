import LoadingSpinner from '@/components/LoadingSpinner.vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

describe('LoadingSpinner', () => {
  it('renders the alert and the message provided', () => {
    const wrapper = mount(LoadingSpinner, {
      props: {
        message: 'Loading weather data...',
      },
    })
    expect(wrapper.text()).toContain('Loading weather data...')
  })
})
