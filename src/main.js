import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import App from './App.vue';

import 'uno.css';
import '@unocss/reset/tailwind.css';

createApp(App).use(createPinia().use(piniaPluginPersistedstate)).mount('#app');
