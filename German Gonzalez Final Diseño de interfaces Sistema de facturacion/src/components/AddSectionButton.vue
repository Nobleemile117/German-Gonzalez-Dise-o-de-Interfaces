<template>
  <div class="btn-add-row">
    <span class="btn-add-row__label">{{ label }}</span>
    <button class="btn-add" @click="$emit('click')">
      <svg width="18" height="18" stroke="white" stroke-width="2.5"
           fill="none" stroke-linecap="round" viewBox="0 0 24 24">
        <line x1="12" y1="5"  x2="12" y2="19"/>
        <line x1="5"  y1="12" x2="19" y2="12"/>
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  name: 'AddSectionButton',
  props: {
    label: { type: String, default: 'Agregar' },
  },
  emits: ['click'],
}
</script>

<style scoped>

.btn-add-row {
  display: flex;
  align-items: center;
  gap: 12px;
  justify-content: flex-end;
}

.btn-add-row__label {
  color: var(--color-secondary);
  font-size: var(--font-size-sm);
}

.btn-add {
  width: var(--add-size);
  height: var(--add-size);
  border-radius: 50%;
  background: var(--color-primary);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s, transform 0.1s;
}
.btn-add:hover  { background: #3a6de0; }
.btn-add:active { transform: scale(0.93); }
</style>
