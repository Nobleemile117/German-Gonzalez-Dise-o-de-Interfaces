import { describe, it, expect } from 'vitest'
// @vitest-environment jsdom
/**
 * DropdownSelect.test.js
 * Tests for the DropdownSelect component.
 *
 * What we test:
 *  1. Renders all options passed in props
 *  2. First option is disabled (placeholder)
 *  3. Emits select-change when an option is selected
 *  4. .value getter returns selected value
 */
import { mount } from '@vue/test-utils'
import DropdownSelect from '../components/DropdownSelect.vue'

const mockOptions = [
  { value: '',    label: 'Uso de CFDI' },
  { value: 'G01', label: 'G01 – Adquisición de mercancías' },
  { value: 'G03', label: 'G03 – Gastos en general' },
  { value: 'S01', label: 'S01 – Sin efectos fiscales' },
]

describe('DropdownSelect', () => {

  /* ── Test 1 ── */
  it('renders all options', () => {
    const wrapper = mount(DropdownSelect, {
      props: { options: mockOptions, modelValue: '' }
    })
    const options = wrapper.findAll('option')
    expect(options.length).toBe(4)
    expect(options[1].text()).toBe('G01 – Adquisición de mercancías')
  })

  /* ── Test 2 ── */
  it('first option is disabled (placeholder)', () => {
    const wrapper = mount(DropdownSelect, {
      props: { options: mockOptions, modelValue: '' }
    })
    expect(wrapper.find('option').attributes('disabled')).toBeDefined()
  })

  /* ── Test 3 ── */
  it('emits update:modelValue when option is selected', async () => {
    const wrapper = mount(DropdownSelect, {
      props: { options: mockOptions, modelValue: '' }
    })
    await wrapper.find('select').setValue('G01')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')[0]).toEqual(['G01'])
  })

  /* ── Test 4 ── */
  it('select shows correct value when modelValue prop is set', () => {
    const wrapper = mount(DropdownSelect, {
      props: { options: mockOptions, modelValue: 'G03' }
    })
    expect(wrapper.find('select').element.value).toBe('G03')
  })

})
