import { describe, it, expect } from 'vitest'
// @vitest-environment jsdom
/**
 * SuccessModal.test.js
 * Tests for the SuccessModal component.
 *
 * What we test:
 *  1. Is hidden when isOpen is false
 *  2. Is visible when isOpen is true
 *  3. Renders all rows passed as props
 *  4. Shows — for empty values
 *  5. Emits close when × is clicked
 */
import { mount } from '@vue/test-utils'
import SuccessModal from '../components/SuccessModal.vue'

const mockRows = [
  { label: 'Sección 1 – RFC',    value: 'RORG920310LS2' },
  { label: 'Sección 1 – Correo', value: '' },
  { label: 'Sección 1 – Monto',  value: '$1,410.00' },
]

describe('SuccessModal', () => {

  /* ── Test 1 ── */
  it('is hidden when isOpen is false', () => {
    const wrapper = mount(SuccessModal, {
      props: { isOpen: false, rows: [] }
    })
    expect(wrapper.find('.modal-overlay').exists()).toBe(false)
  })

  /* ── Test 2 ── */
  it('is visible when isOpen is true', () => {
    const wrapper = mount(SuccessModal, {
      props: { isOpen: true, rows: [] }
    })
    expect(wrapper.find('.modal-overlay').exists()).toBe(true)
  })

  /* ── Test 3 ── */
  it('renders all rows in the table', () => {
    const wrapper = mount(SuccessModal, {
      props: { isOpen: true, rows: mockRows }
    })
    const rows = wrapper.findAll('tr')
    expect(rows.length).toBe(3)
  })

  /* ── Test 4 ── */
  it('shows — for empty values', () => {
    const wrapper = mount(SuccessModal, {
      props: { isOpen: true, rows: mockRows }
    })
    const cells = wrapper.findAll('td')
    /* Second row has empty value → should show — */
    expect(cells[3].text()).toBe('—')
  })

  /* ── Test 5 ── */
  it('emits close when × is clicked', async () => {
    const wrapper = mount(SuccessModal, {
      props: { isOpen: true, rows: mockRows }
    })
    await wrapper.find('.modal__close').trigger('click')
    expect(wrapper.emitted('close')).toBeTruthy()
  })

})
