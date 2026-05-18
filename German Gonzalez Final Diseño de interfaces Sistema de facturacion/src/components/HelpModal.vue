
<template>
  <div v-if="isOpen" class="modal-overlay" @click.self="$emit('close')">
    <div class="modal">

      <!-- × close button -->
      <button class="modal__close" @click="$emit('close')">×</button>

      <div class="modal__title">{{ title }}</div>
      <!-- v-html renders the subtitle with <strong> tags -->
      <p class="modal__subtitle" v-html="subtitle"></p>
      <img class="modal__img" :src="image" :alt="title">

    </div>
  </div>
</template>

<script>
export default {
  name: 'HelpModal',
  props: {
    isOpen: { type: Boolean, default: false },
    type:   { type: String,  default: 'ticket' },
  },
  emits: ['close'],

  computed: {
    isTicket() { return this.type === 'ticket' },

    title() {
      return this.isTicket
        ? '🎫 Ayuda – Ticket de Venta'
        : '📄 Ayuda – Constancia de Situación Fiscal'
    },

    subtitle() {
      return this.isTicket
        ? 'Localiza el <strong>Número de Ticket</strong>, <strong>Fecha de operación</strong> y <strong>Gran Total</strong>:'
        : 'Localiza tu <strong>RFC</strong>, <strong>Razón Social</strong> y <strong>Código Postal</strong>:'
    },

    image() {
      return this.isTicket ? 'ticket.png' : 'constancia.png'
    },
  },
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
  max-width: var(--modal-max-width);
  width: 92%;
  position: relative;
  max-height: 88vh;
  overflow-y: auto;
  animation: popIn 0.22s ease;
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

.modal__title {
  font-size: var(--font-size-xl);
  font-weight: 700;
  margin-bottom: 10px;
}

.modal__subtitle {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  margin-bottom: 14px;
}

.modal__img {
  width: 100%;
  border-radius: 10px;
  border: 1px solid var(--color-border);
  display: block;
}
</style>
