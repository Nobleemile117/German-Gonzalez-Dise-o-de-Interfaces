<template>
  <div class="toggle-row">

    
    <span class="toggle-row__label">{{ label }}</span>

    
    <label class="toggle">
      <input
        class="toggle__input"
        type="checkbox"
        :checked="modelValue"
        @change="$emit('update:modelValue', $event.target.checked)">
      <span class="toggle__slider"></span>
    </label>

  </div>
</template>

<script>
export default {
  name: 'ToggleSwitch',
  props: {
    label:      { type: String,  default: 'Opción' },
    modelValue: { type: Boolean, default: false },
  },
  emits: ['update:modelValue'],
}
</script>

<style scoped>

.toggle-row {
  display: flex;
  align-items: center;
  gap: var(--gap-md);
}

.toggle-row__label {
  color: var(--color-secondary);
  font-size: var(--font-size-xl);
  cursor: pointer;
  text-decoration: underline;
  text-underline-offset: 3px;
}

.toggle {
  position: relative;
  width: 46px;
  height: 26px;
  flex-shrink: 0;
}

.toggle__input {
  opacity: 0;
  width: 0;
  height: 0;
}

.toggle__slider {
  position: absolute;
  inset: 0;
  border-radius: 26px;
  background: var(--color-border);
  transition: background 0.25s;
  cursor: pointer;
}

.toggle__slider::before {
  content: '';
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--color-white);
  top: 3px;
  left: 3px;
  transition: transform 0.25s;
  box-shadow: 0 1px 4px rgba(0,0,0,0.3);
}

.toggle__input:checked ~ .toggle__slider           { background: var(--color-primary); }
.toggle__input:checked ~ .toggle__slider::before   { transform: translateX(20px); }
</style>
