<template>
  <div class="dropdown-wrap">

    <select
      class="dropdown"
      :value="modelValue"
      @change="$emit('update:modelValue', $event.target.value)">

      
      <option
        v-for="opt in options"
        :key="opt.value"
        :value="opt.value"
        :disabled="opt.value === ''">
        {{ opt.label }}
      </option>

    </select>

    
    <span class="dropdown__arrow">▼</span>

  </div>
</template>

<script>
export default {
  name: 'DropdownSelect',
  props: {
    options:    { type: Array,  default: () => [] },
    modelValue: { type: String, default: '' },
  },
  emits: ['update:modelValue'],
}
</script>

<style scoped>

.dropdown-wrap {
  position: relative;
}

.dropdown {
  width: 100%;
  height: 52px;
  border-radius: 8px;
  border: 2px solid var(--color-border);
  background: var(--color-white);
  padding: 0 40px 0 16px;
  font-size: var(--font-size-sm);
  color: var(--color-text);
  appearance: none;
  cursor: pointer;
  outline: none;
  transition: border-color 0.2s;
}
.dropdown:focus { border-color: var(--color-primary); }

.dropdown__arrow {
  position: absolute;
  right: 13px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  font-size: 12px;
  color: var(--color-text-muted);
}
</style>
