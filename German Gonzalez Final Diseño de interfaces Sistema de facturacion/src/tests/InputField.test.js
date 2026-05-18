import { describe, it, expect } from 'vitest'
// @vitest-environment jsdom
/**
 * InputField.test.js
 * Tests for the InputField component.
 *
 * What we test:
 *  1. Renders the label text
 *  2. Applies blue border class when color="blue"
 *  3. Applies green border class when color="green"
 *  4. Shows the ? help button when help prop is set
 *  5. Hides the ? help button when help prop is empty
 *  6. Emits update:modelValue when user types
 */
import { mount } from '@vue/test-utils'
import InputField from '../components/InputField.vue'

describe('InputField', () => {

  /* ── Test 1 ── */
  it('renders the label correctly', () => {
    const wrapper = mount(InputField, {
      props: { label: 'RFC', color: 'green' }
    })
    expect(wrapper.find('.input-wrap__label').text()).toBe('RFC')
  })

  /* ── Test 2 ── */
  it('applies blue class when color is blue', () => {
    const wrapper = mount(InputField, {
      props: { label: 'Ticket', color: 'blue' }
    })
    expect(wrapper.find('input').classes()).toContain('input--blue')
  })

  /* ── Test 3 ── */
  it('applies green class when color is green', () => {
    const wrapper = mount(InputField, {
      props: { label: 'RFC', color: 'green' }
    })
    expect(wrapper.find('input').classes()).toContain('input--green')
  })

  /* ── Test 4 ── */
  it('shows help button when help prop is set', () => {
    const wrapper = mount(InputField, {
      props: { label: 'RFC', color: 'green', help: 'modal-constancia', helpOffset: '57px' }
    })
    expect(wrapper.find('.input-wrap__help').exists()).toBe(true)
  })

  /* ── Test 5 ── */
  it('hides help button when help prop is empty', () => {
    const wrapper = mount(InputField, {
      props: { label: 'Codigo postal', color: 'green' }
    })
    expect(wrapper.find('.input-wrap__help').exists()).toBe(false)
  })

  /* ── Test 6 ── */
  it('emits update:modelValue when user types', async () => {
    const wrapper = mount(InputField, {
      props: { label: 'RFC', color: 'green', modelValue: '' }
    })
    await wrapper.find('input').setValue('RORG920310LS2')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')[0]).toEqual(['RORG920310LS2'])
  })

})
