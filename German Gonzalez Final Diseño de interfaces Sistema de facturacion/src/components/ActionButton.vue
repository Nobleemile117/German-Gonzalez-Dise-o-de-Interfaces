<template>
  <button class="btn-action" :disabled="disabled" @click="$emit('click')">
    {{ label }}
  </button>
</template>

<script>
export default {
  name: 'ActionButton',
  props: {
    label:    { type: String,  default: 'Aceptar' },
    disabled: { type: Boolean, default: false },
  },
  emits: ['click'],
}
</script>

<style scoped>

.btn-action {
  width: 160px;
  height: 52px;
  border-radius: var(--button-radius);
  background: var(--color-button);
  color: var(--color-white);
  font-size: var(--font-size-lg);
  font-weight: 600;
  border: none;
  cursor: pointer;
  letter-spacing: 0.02em;
  transition: background 0.2s, transform 0.1s;
}
.btn-action:hover  { background: #1e5216; }
.btn-action:active { transform: scale(0.97); }

.btn-action:disabled {
  background: #aaa;
  cursor: not-allowed;
  transform: none;
  opacity: 0.6;
}
</style>
