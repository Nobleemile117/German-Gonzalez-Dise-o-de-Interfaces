
<template>
  <header class="header">
    <img class="header__logo" :src="logo" alt="Logo Brazza y Fogo">
    <div>
      <div class="header__title">{{ title }}</div>
      <div class="header__address">{{ address }}</div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'BrazzaHeader',
  props: {
    logo:    { type: String, default: 'Logo_brazza_svg_.svg' },
    title:   { type: String, default: 'Sistema de Facturación' },
    address: { type: String, default: '' },
  }
}
</script>

<style scoped>
.header {
  background: var(--color-primary);
  display: flex;
  align-items: center;
  min-height: var(--header-height);
  padding: 16px var(--gap-lg);
  gap: var(--gap-lg);
}

.header__logo {
  flex-shrink: 0;
  width: var(--logo-size);
  height: var(--logo-size);
  object-fit: contain;
  border-radius: 10px;
  background: var(--color-white);
  padding: 4px;
}

.header__title {
  color: var(--color-white);
  font-size: var(--font-size-2xl);
  line-height: 1.45;
}

.header__address {
  color: var(--color-white);
  font-size: var(--font-size-xl);
}

/* ── Tablet ── */
@media (max-width: 900px) {
  .header__title   { font-size: 22px; }
  .header__address { font-size: 15px; }
  .header__logo    { width: 80px; height: 80px; }
}

/* ── Phone ── */
@media (max-width: 480px) {
  .header          { flex-direction: column; text-align: center; padding: 20px 16px; min-height: auto; }
  .header__title   { font-size: 18px; }
  .header__address { font-size: 13px; }
  .header__logo    { width: 70px; height: 70px; }
}
</style>

