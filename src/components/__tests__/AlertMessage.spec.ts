import AlertMessage from '@/components/AlertMessage.vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

describe('AlertMessage', () => {
  it('renders the alert and the message provided', () => {
    const wrapper = mount(AlertMessage, {
      props: {
        message: 'Successfully created',
        type: 'success',
      },
    })
    expect(wrapper.text()).toContain('Successfully created')
    const root = wrapper.get('div')
    expect(root.classes()).toContain('border-green-400')
    expect(root.classes()).toContain('bg-green-50')
    expect(root.classes()).toContain('text-green-700')
  })

  it('emits "close" when close button is clicked', async () => {
    const wrapper = mount(AlertMessage, {
      props: { message: 'Test alert' },
    })

    const button = wrapper.get('button')
    await button.trigger('click')

    expect(wrapper.emitted('close')).toBeTruthy()
  })
})
