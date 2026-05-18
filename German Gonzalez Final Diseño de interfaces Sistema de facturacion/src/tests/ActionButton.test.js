import { describe, it, expect } from 'vitest'
// @vitest-environment jsdom
/**
 * ActionButton.test.js
 * Tests for the ActionButton component.
 *
 * What we test:
 *  1. Renders the correct label text
 *  2. Emits 'click' event when clicked
 *  3. Does NOT emit when disabled
 *  4. Applies the disabled attribute when prop is true
 */
import { mount } from '@vue/test-utils'
import ActionButton from '../components/ActionButton.vue'

describe('ActionButton', () => {

  /* ── Test 1 ── */
  it('renders the label prop correctly', () => {
    const wrapper = mount(ActionButton, {
      props: { label: 'Facturar' }
    })
    expect(wrapper.text()).toBe('Facturar')
  })

  /* ── Test 2 ── */
  it('emits click event when clicked and not disabled', async () => {
    const wrapper = mount(ActionButton, {
      props: { label: 'Facturar', disabled: false }
    })
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })

  /* ── Test 3 ── */
  it('does not emit click when disabled', async () => {
    const wrapper = mount(ActionButton, {
      props: { label: 'Facturar', disabled: true }
    })
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('click')).toBeFalsy()
  })

  /* ── Test 4 ── */
  it('button has disabled attribute when prop is true', () => {
    const wrapper = mount(ActionButton, {
      props: { label: 'Facturar', disabled: true }
    })
    expect(wrapper.find('button').attributes('disabled')).toBeDefined()
  })

})
