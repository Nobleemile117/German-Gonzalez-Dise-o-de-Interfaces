<template>
  <div class="input-wrap">

    
    <label class="input-wrap__label">{{ label }}</label>

    
    <button
      v-if="help"
      class="input-wrap__help"
      :class="`input-wrap__help--${color}`"
      :style="{ left: helpOffset }"
      @click="$emit('open-modal', help)">
      ?
    </button>

    
    <input
      class="input"
      :class="`input--${color}`"
      type="text"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)">

  </div>
</template>

<script>
export default {
  name: 'InputField',
  props: {
    label:      { type: String, default: 'Label' },
    color:      { type: String, default: 'blue' },
    modelValue: { type: String, default: '' },
    help:       { type: String, default: '' },
    helpOffset: { type: String, default: '60px' },
  },
  emits: ['update:modelValue', 'open-modal'],
}
</script>

<style scoped>

.input-wrap {
  position: relative;
  padding-top: var(--gap-sm);
}

.input-wrap__label {
  position: absolute;
  top: 0;
  left: 20px;
  background: var(--color-bg);
  padding: 0 5px;
  font-size: var(--font-size-xs);
  font-weight: 700;
  color: var(--color-text-muted);
  z-index: 1;
  pointer-events: none;
}

.input-wrap__help {
  position: absolute;
  top: -1px;
  z-index: 2;
  width: var(--help-size);
  height: var(--help-size);
  border-radius: 50%;
  border: none;
  cursor: pointer;
  font-weight: 700;
  font-size: 13px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--color-white);
  transition: opacity 0.2s;
}
.input-wrap__help:hover        { opacity: 0.8; }
.input-wrap__help--blue        { background: var(--color-primary);   }
.input-wrap__help--green       { background: var(--color-secondary); }
.input-wrap__help--yellow      { background: var(--color-yellow);    }

.input {
  display: block;
  width: 100%;
  height: var(--input-height);
  border-radius: var(--input-radius);
  border: 2.5px solid;
  background: transparent;
  padding: 0 22px;
  font-size: var(--font-size-md);
  color: var(--color-text);
  outline: none;
  transition: box-shadow 0.2s;
}
.input--blue        { border-color: var(--color-primary);   }
.input--green       { border-color: var(--color-secondary); }
.input--yellow      { border-color: var(--color-yellow);    }
.input--blue:focus  { box-shadow: 0 0 0 3px rgba(83,134,244,0.22); }
.input--green:focus { box-shadow: 0 0 0 3px rgba(28,179,50,0.2);   }
.input--yellow:focus{ box-shadow: 0 0 0 3px rgba(230,168,23,0.25); }
</style>
