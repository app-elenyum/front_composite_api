import PrimeVue from 'primevue/config';
import ConfirmationService from 'primevue/confirmationservice';
import ToastService from 'primevue/toastservice';

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import 'primevue/resources/themes/lara-light-cyan/theme.css'
import 'primeflex/primeflex.css'
import 'primeicons/primeicons.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// PrimeVue start
app.use(PrimeVue)

app.use(ConfirmationService)
app.use(ToastService)
// PrimeVue end

app.mount('#app')
