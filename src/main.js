import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import App from './App.vue';

import 'uno.css';
import '@unocss/reset/tailwind.css';

const store = createPinia();
store.use(piniaPluginPersistedstate);

createApp(App).use(store).mount('#app');
