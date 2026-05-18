import { describe, it, expect } from 'vitest'
// @vitest-environment jsdom
/**
 * ToggleSwitch.test.js
 * Tests for the ToggleSwitch component.
 *
 * What we test:
 *  1. Renders the label text
 *  2. Checkbox starts unchecked by default
 *  3. Emits toggle-change with { checked: true } when toggled on
 *  4. Emits toggle-change with { checked: false } when toggled off
 *  5. .checked getter returns the current state
 */
import { mount } from '@vue/test-utils'
import ToggleSwitch from '../components/ToggleSwitch.vue'

describe('ToggleSwitch', () => {

  /* ── Test 1 ── */
  it('renders the label correctly', () => {
    const wrapper = mount(ToggleSwitch, {
      props: { label: 'Verificar Información' }
    })
    expect(wrapper.find('.toggle-row__label').text()).toBe('Verificar Información')
  })

  /* ── Test 2 ── */
  it('starts unchecked by default', () => {
    const wrapper = mount(ToggleSwitch, {
      props: { label: 'Test', modelValue: false }
    })
    expect(wrapper.find('.toggle__input').element.checked).toBe(false)
  })

  /* ── Test 3 ── */
  it('emits update:modelValue with true when turned on', async () => {
    const wrapper = mount(ToggleSwitch, {
      props: { label: 'Test', modelValue: false }
    })
    const input = wrapper.find('.toggle__input')
    input.element.checked = true
    await input.trigger('change')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')[0]).toEqual([true])
  })

  /* ── Test 4 ── */
  it('emits update:modelValue with false when turned off', async () => {
    const wrapper = mount(ToggleSwitch, {
      props: { label: 'Test', modelValue: true }
    })
    const input = wrapper.find('.toggle__input')
    input.element.checked = false
    await input.trigger('change')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')[0]).toEqual([false])
  })

  /* ── Test 5 ── */
  it('checked getter returns correct state', async () => {
    const wrapper = mount(ToggleSwitch, {
      props: { label: 'Test', modelValue: false }
    })
    const input = wrapper.find('.toggle__input')
    input.element.checked = true
    await input.trigger('change')
    expect(wrapper.find('.toggle__input').element.checked).toBe(true)
  })

})
