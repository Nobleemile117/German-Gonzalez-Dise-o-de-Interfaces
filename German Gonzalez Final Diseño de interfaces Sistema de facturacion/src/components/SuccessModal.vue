<template>
  <div v-if="isOpen" class="modal-overlay" @click.self="$emit('close')">
    <div class="modal modal--success">

      <button class="modal__close" @click="$emit('close')">×</button>

      <div class="modal__icon">✅</div>
      <div class="modal__title">¡Factura Generada!</div>

      
      <table class="modal__table">
        <tr v-for="row in rows" :key="row.label">
          <td class="modal__table-label">{{ row.label }}</td>
          <td :class="row.value ? '' : 'is-empty'">
            {{ row.value || '—' }}
          </td>
        </tr>
      </table>

    </div>
  </div>
</template>

<script>
export default {
  name: 'SuccessModal',
  props: {
    isOpen: { type: Boolean, default: false },
    rows:   { type: Array,   default: () => [] },
  },
  emits: ['close'],
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: var(--color-overlay);
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal {
  background: var(--color-white);
  border-radius: 20px;
  padding: 36px;
  width: 92%;
  position: relative;
  max-height: 88vh;
  overflow-y: auto;
  animation: popIn 0.22s ease;
}

.modal--success {
  max-width: 480px;
  text-align: center;
}

@keyframes popIn {
  from { transform: scale(0.9); opacity: 0; }
  to   { transform: scale(1);   opacity: 1; }
}

.modal__close {
  position: absolute;
  top: 12px;
  right: 18px;
  background: none;
  border: none;
  font-size: 28px;
  cursor: pointer;
  color: var(--color-text-muted);
}
.modal__close:hover { color: var(--color-text); }

.modal__icon  { font-size: 60px; margin-bottom: 10px; }

.modal__title { font-size: var(--font-size-xl); font-weight: 700; margin-bottom: 6px; }

.modal__table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 14px;
  font-size: var(--font-size-sm);
  text-align: left;
}
.modal__table td          { padding: 6px 10px; border-bottom: 1px solid #eee; }
.modal__table-label       { font-weight: 700; color: var(--color-text-muted); width: 42%; }

.is-empty { color: #bbb; }
</style>
