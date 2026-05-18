import { describe, it, expect } from 'vitest'
// @vitest-environment jsdom
/**
 * HelpModal.test.js
 * Tests for the HelpModal component.
 *
 * What we test:
 *  1. Is hidden when isOpen is false
 *  2. Is visible when isOpen is true
 *  3. Shows ticket title when type="ticket"
 *  4. Shows constancia title when type="constancia"
 *  5. Emits close when × button is clicked
 *  6. Emits close when backdrop is clicked
 */
import { mount } from '@vue/test-utils'
import HelpModal from '../components/HelpModal.vue'

describe('HelpModal', () => {

  /* ── Test 1 ── */
  it('is hidden when isOpen is false', () => {
    const wrapper = mount(HelpModal, {
      props: { isOpen: false, type: 'ticket' }
    })
    expect(wrapper.find('.modal-overlay').exists()).toBe(false)
  })

  /* ── Test 2 ── */
  it('is visible when isOpen is true', () => {
    const wrapper = mount(HelpModal, {
      props: { isOpen: true, type: 'ticket' }
    })
    expect(wrapper.find('.modal-overlay').exists()).toBe(true)
  })

  /* ── Test 3 ── */
  it('shows ticket title when type is ticket', () => {
    const wrapper = mount(HelpModal, {
      props: { isOpen: true, type: 'ticket' }
    })
    expect(wrapper.find('.modal__title').text()).toContain('Ticket de Venta')
  })

  /* ── Test 4 ── */
  it('shows constancia title when type is constancia', () => {
    const wrapper = mount(HelpModal, {
      props: { isOpen: true, type: 'constancia' }
    })
    expect(wrapper.find('.modal__title').text()).toContain('Constancia')
  })

  /* ── Test 5 ── */
  it('emits close when × button is clicked', async () => {
    const wrapper = mount(HelpModal, {
      props: { isOpen: true, type: 'ticket' }
    })
    await wrapper.find('.modal__close').trigger('click')
    expect(wrapper.emitted('close')).toBeTruthy()
  })

  /* ── Test 6 ── */
  it('emits close when backdrop is clicked', async () => {
    const wrapper = mount(HelpModal, {
      props: { isOpen: true, type: 'ticket' }
    })
    await wrapper.find('.modal-overlay').trigger('click')
    expect(wrapper.emitted('close')).toBeTruthy()
  })

})
