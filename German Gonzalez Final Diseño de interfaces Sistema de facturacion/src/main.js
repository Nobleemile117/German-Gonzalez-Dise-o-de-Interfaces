// ═══════════════════════════════════════════
// src/main.js
// Vue application entry point.
// Creates the Vue app and mounts it into
// the <div id="app"> in index.html.
// ═══════════════════════════════════════════
import { createApp } from 'vue'
import App from './App.vue'
import './tokens.css'   // Global design tokens loaded once here

createApp(App).mount('#app')
