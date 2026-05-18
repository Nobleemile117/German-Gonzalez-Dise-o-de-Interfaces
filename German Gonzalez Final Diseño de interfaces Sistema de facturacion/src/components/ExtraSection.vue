
<template>
  <div class="extra-section">

    <div class="extra-section__divider"
         :class="`extra-section__divider--${color}`"></div>

    <div class="extra-section__title"
         :class="`extra-section__title--${color}`">
      Razón Fiscal adicional #{{ displayIndex }}
    </div>

    <InputField
      label="Correo"
      :color="color"
      :model-value="modelValue.correo"
      @update:model-value="update('correo', $event)" />

    <InputField
      label="RFC"
      :color="color"
      help="modal-constancia"
      help-offset="57px"
      :model-value="modelValue.rfc"
      @update:model-value="update('rfc', $event)"
      @open-modal="$emit('open-modal', $event)" />

    <InputField
      label="Razon Social"
      :color="color"
      help="modal-constancia"
      help-offset="122px"
      :model-value="modelValue.razonSocial"
      @update:model-value="update('razonSocial', $event)"
      @open-modal="$emit('open-modal', $event)" />

    <InputField
      label="Codigo postal"
      :color="color"
      :model-value="modelValue.codigoPostal"
      @update:model-value="update('codigoPostal', $event)" />

    <DropdownSelect
      :options="cfdiOptions"
      :model-value="modelValue.cfdi"
      @update:model-value="update('cfdi', $event)" />

    <DropdownSelect
      :options="regimenOptions"
      :model-value="modelValue.regimen"
      @update:model-value="update('regimen', $event)" />

  </div>
</template>

<script>
import InputField     from './InputField.vue'
import DropdownSelect from './DropdownSelect.vue'
import { CFDI_DATA }    from '../data/cfdi.js'
import { REGIMEN_DATA } from '../data/regimen.js'

export default {
  name: 'ExtraSection',

  components: { InputField, DropdownSelect },

  props: {
    index: { type: Number, default: 0 },
    modelValue: {
      type: Object,
      default: () => ({
        correo: '', rfc: '', razonSocial: '',
        codigoPostal: '', cfdi: '', regimen: '',
      }),
    },
  },

  emits: ['update:modelValue', 'open-modal'],

  data() {
    return {
      cfdiOptions:    CFDI_DATA,
      regimenOptions: REGIMEN_DATA,
    }
  },

  computed: {
    displayIndex() { return this.index + 2 },

    color() {
      return this.index % 2 === 0 ? 'yellow' : 'green'
    },
  },

  methods: {
    update(field, value) {
      this.$emit('update:modelValue', { ...this.modelValue, [field]: value })
    },
  },
}
</script>

<style scoped>
.extra-section {
  display: flex;
  flex-direction: column;
  gap: 24px;
  animation: slideIn 0.3s ease;
}

.extra-section__divider {
  width: 100%;
  border: none;
  border-top: 2px dashed;
  margin: 4px 0;
}
.extra-section__divider--green  { border-color: var(--color-secondary); }
.extra-section__divider--yellow { border-color: var(--color-yellow);    }

.extra-section__title {
  font-size: var(--font-size-sm);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}
.extra-section__title--green  { color: var(--color-secondary); }
.extra-section__title--yellow { color: var(--color-yellow);    }

@keyframes slideIn {
  from { opacity: 0; transform: translateY(-10px); }
  to   { opacity: 1; transform: translateY(0); }
}
</style>
