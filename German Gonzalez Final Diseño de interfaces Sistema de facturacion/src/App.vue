<template>
  <div class="app">

    
    <BrazzaHeader
      :logo="CONFIG.header.logo"
      :title="CONFIG.header.title"
      :address="CONFIG.header.address" />

    <div class="form-body">

      
      <div class="col col--left">

        <InputField
          :label="CONFIG.inputTicket.label"
          :color="CONFIG.inputTicket.color"
          :help="CONFIG.inputTicket.help"
          :help-offset="CONFIG.inputTicket.helpOffset"
          v-model="form.ticket"
          @open-modal="openModal" />

        <InputField
          :label="CONFIG.inputDia.label"
          :color="CONFIG.inputDia.color"
          :help="CONFIG.inputDia.help"
          :help-offset="CONFIG.inputDia.helpOffset"
          v-model="form.dia"
          @open-modal="openModal" />

        
        <InputField
          v-if="phase === 0"
          :label="CONFIG.inputMontoVenta.label"
          :color="CONFIG.inputMontoVenta.color"
          :help="CONFIG.inputMontoVenta.help"
          :help-offset="CONFIG.inputMontoVenta.helpOffset"
          v-model="form.montoVenta"
          @open-modal="openModal" />

        <ActionButton
          :label="CONFIG.btnFacturar.label"
          :disabled="!isFormValid"
          @click="generarFactura" />

        
        <div v-if="showValidationError" class="validation-error">
          ⚠️ Por favor completa todos los campos y selecciona las opciones de los menús antes de facturar.
        </div>

      </div>

      
      <div class="col col--right">

        
        <InputField
          :label="CONFIG.inputRFC.label"
          :color="CONFIG.inputRFC.color"
          :help="CONFIG.inputRFC.help"
          :help-offset="CONFIG.inputRFC.helpOffset"
          v-model="form.rfc"
          @open-modal="openModal" />

        <InputField
          :label="CONFIG.inputRazonSocial.label"
          :color="CONFIG.inputRazonSocial.color"
          :help="CONFIG.inputRazonSocial.help"
          :help-offset="CONFIG.inputRazonSocial.helpOffset"
          v-model="form.razonSocial"
          @open-modal="openModal" />

        <InputField
          :label="CONFIG.inputCodigoPostal.label"
          :color="CONFIG.inputCodigoPostal.color"
          v-model="form.codigoPostal" />

        <DropdownSelect :options="cfdiOptions"    v-model="form.cfdi"    />
        <DropdownSelect :options="regimenOptions" v-model="form.regimen" />

        <ToggleSwitch
          :label="CONFIG.toggleVerificar.label"
          v-model="form.verificar" />

        <InputField
          :label="CONFIG.inputCorreo.label"
          :color="CONFIG.inputCorreo.color"
          v-model="form.correo" />

        
        <InputField
          v-if="phase >= 1"
          label="Monto"
          color="green"
          v-model="form.monto1" />

        
        <template v-for="(section, i) in sections" :key="i">

          
          <ExtraSection
            :index="i"
            v-model="sections[i]"
            @open-modal="openModal" />

          
          <InputField
            label="Monto"
            :color="sectionColor(i)"
            :model-value="sections[i].monto"
            @update:model-value="sections[i].monto = $event" />

        </template>

        
        <AddSectionButton
          :label="CONFIG.btnAgregar.label"
          @click="addSection" />

      </div>
    </div>

    
    <HelpModal
      :is-open="activeModal === 'modal-ticket'"
      type="ticket"
      @close="closeModal" />

    <HelpModal
      :is-open="activeModal === 'modal-constancia'"
      type="constancia"
      @close="closeModal" />

    <SuccessModal
      :is-open="showSuccess"
      :rows="summaryRows"
      @close="showSuccess = false" />

  </div>
</template>

<script>
import BrazzaHeader     from './components/BrazzaHeader.vue'
import InputField       from './components/InputField.vue'
import ActionButton     from './components/ActionButton.vue'
import ToggleSwitch     from './components/ToggleSwitch.vue'
import DropdownSelect   from './components/DropdownSelect.vue'
import AddSectionButton from './components/AddSectionButton.vue'
import ExtraSection     from './components/ExtraSection.vue'
import HelpModal        from './components/HelpModal.vue'
import SuccessModal     from './components/SuccessModal.vue'
import { CFDI_DATA }    from './data/cfdi.js'
import { REGIMEN_DATA } from './data/regimen.js'
import jsPDF            from 'jspdf'

export default {
  name: 'App',

  components: {
    BrazzaHeader, InputField, ActionButton,
    ToggleSwitch, DropdownSelect, AddSectionButton,
    ExtraSection, HelpModal, SuccessModal,
  },

  data() {
    return {

      
      CONFIG: {
        header: {
          logo:    'Logo_brazza_svg_.svg',
          title:   'Sistema de Facturación Brazza y fogo de Slp',
          address: 'Lateral, Carr. San Luis Potosí-México s/n, Central, 78070 San Luis Potosí, S.L.P.',
        },
        inputTicket:     { label: 'Numero de Ticket',  color: 'blue',  help: 'modal-ticket',     helpOffset: '145px' },
        inputDia:        { label: 'Dia de la venta',   color: 'blue',  help: 'modal-ticket',     helpOffset: '115px' },
        inputMontoVenta: { label: 'Monto de la venta', color: 'blue',  help: 'modal-ticket',     helpOffset: '130px' },
        inputRFC:          { label: 'RFC',           color: 'green', help: 'modal-constancia', helpOffset: '57px'  },
        inputRazonSocial:  { label: 'Razon Social',  color: 'green', help: 'modal-constancia', helpOffset: '122px' },
        inputCodigoPostal: { label: 'Codigo postal', color: 'green' },
        inputCorreo:       { label: 'Correo',        color: 'green' },
        btnFacturar:     { label: 'Facturar'                  },
        btnAgregar:      { label: 'Agregar otra Razón fiscal' },
        toggleVerificar: { label: 'Verificar Información'     },
      },

      
      phase: 0,

      
      form: {
        ticket:      '',
        dia:         '',
        montoVenta:  '',  
        rfc:         '',
        razonSocial: '',
        codigoPostal:'',
        cfdi:        '',
        regimen:     '',
        verificar:   false,
        correo:      '',
        monto1:      '',  
      },

      
      sections: [],

      cfdiOptions:    CFDI_DATA,
      regimenOptions: REGIMEN_DATA,
      activeModal:    null,
      showSuccess:    false,
      summaryRows:    [],
      showValidationError: false,
    }
  },

  computed: {
    
    isFormValid() {
      const f = this.form

      
      const s1 = [
        f.ticket, f.dia, f.rfc,
        f.razonSocial, f.codigoPostal,
        f.cfdi, f.regimen, f.correo,
      ].every(v => v && v.trim() !== '')

      if (!s1) return false

      
      if (this.phase === 0 && !f.montoVenta.trim()) return false
      if (this.phase >= 1  && !f.monto1.trim())    return false

      
      for (const s of this.sections) {
        const ok = [
          s.correo, s.rfc, s.razonSocial,
          s.codigoPostal, s.cfdi, s.regimen, s.monto,
        ].every(v => v && v.trim() !== '')
        if (!ok) return false
      }

      return true
    },
  },

  methods: {

    openModal(id) { this.activeModal = id   },
    closeModal()  { this.activeModal = null },

    
    sectionColor(i) {
      return i % 2 === 0 ? 'yellow' : 'green'
    },

    
    addSection() {
      if (this.phase === 0) {
        
        this.phase = 1
      }
      
      this.sections.push({
        monto:        '',
        correo:       '',
        rfc:          '',
        razonSocial:  '',
        codigoPostal: '',
        cfdi:         '',
        regimen:      '',
      })
    },

    
    buildRows() {
      const rows = []

      
      rows.push({ label: 'Sección 1 – Numero de Ticket', value: this.form.ticket        })
      rows.push({ label: 'Sección 1 – Dia de la venta',  value: this.form.dia           })
      rows.push({ label: 'Sección 1 – RFC',              value: this.form.rfc           })
      rows.push({ label: 'Sección 1 – Razón Social',     value: this.form.razonSocial   })
      rows.push({ label: 'Sección 1 – Código Postal',    value: this.form.codigoPostal  })
      rows.push({ label: 'Sección 1 – Uso de CFDI',      value: this.form.cfdi          })
      rows.push({ label: 'Sección 1 – Régimen Fiscal',   value: this.form.regimen       })
      rows.push({ label: 'Sección 1 – Correo',           value: this.form.correo        })

      if (this.phase === 0) {
        rows.push({ label: 'Sección 1 – Monto de la venta', value: this.form.montoVenta })
      } else {
        rows.push({ label: 'Sección 1 – Monto', value: this.form.monto1 })
      }

      
      this.sections.forEach((s, i) => {
        const n = i + 2
        rows.push({ label: `Sección ${n} – Correo`,         value: s.correo       })
        rows.push({ label: `Sección ${n} – RFC`,            value: s.rfc          })
        rows.push({ label: `Sección ${n} – Razón Social`,   value: s.razonSocial  })
        rows.push({ label: `Sección ${n} – Código Postal`,  value: s.codigoPostal })
        rows.push({ label: `Sección ${n} – Uso de CFDI`,    value: s.cfdi         })
        rows.push({ label: `Sección ${n} – Régimen Fiscal`, value: s.regimen      })
        rows.push({ label: `Sección ${n} – Monto`,          value: s.monto        })
      })

      return rows
    },

    
    generarFactura() {
      if (!this.isFormValid) {
        this.showValidationError = true
        return
      }
      this.showValidationError = false
      const rows = this.buildRows()

      
      this.summaryRows = rows
      this.showSuccess = true

      
      this.generarPDF(rows)
    },

    
    generarPDF(rows) {
      const doc    = new jsPDF()
      const margin = 20
      const pageH  = doc.internal.pageSize.getHeight()
      let   y      = 20

      
      const checkPage = () => {
        if (y > pageH - 15) { doc.addPage(); y = 20 }
      }

      let lastSection = ''

      rows.forEach(row => {
        checkPage()

        
        const match = row.label.match(/^(Sección \d+)/)
        if (match && match[1] !== lastSection) {
          lastSection = match[1]

          
          if (y > 20) y += 6

          
          doc.setFontSize(11)
          doc.setFont('helvetica', 'bold')
          doc.setTextColor(0, 0, 0)
          doc.text(lastSection, margin, y)
          y += 6

          
          doc.setDrawColor(0, 0, 0)
          doc.line(margin, y, margin + 60, y)
          y += 6
          checkPage()
        }

        
        const cleanLabel  = row.label.replace(/^Sección \d+ – /, '')
        const displayValue = row.value || '—'

        doc.setFontSize(10)
        doc.setFont('helvetica', 'normal')
        doc.setTextColor(0, 0, 0)
        doc.text(`${cleanLabel}: ${displayValue}`, margin, y)
        y += 7
      })

      
      const fecha = new Date().toLocaleDateString('es-MX').replace(/\//g, '-')
      doc.save(`factura-brazza-${fecha}.pdf`)
    },
  },
}
</script>

<style>
.app { min-height: 100vh; background: var(--color-bg); }

.form-body {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px 60px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 48px 40px 80px;
  align-items: start;
}

.col { display: flex; flex-direction: column; gap: 24px; }

.validation-error {
  font-size: var(--font-size-sm);
  color: #c0392b;
  background: #fdecea;
  border: 1px solid #f5c6cb;
  border-radius: 8px;
  padding: 10px 14px;
  line-height: 1.5;
}

@media (max-width: 900px) {
  .form-body { grid-template-columns: 1fr; gap: 24px; padding: 32px 24px 60px; }
}
@media (max-width: 480px) {
  .form-body { padding: 20px 16px 48px; gap: 18px; }
  .header__title   { font-size: 20px !important; }
  .header__address { font-size: 14px !important; }
}
</style>
