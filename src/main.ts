import { createApp } from 'vue'
import { createPinia } from 'pinia'

import router from './plugins/router'
import toast from './plugins/toast'
import App from './App.vue'
import '@/style.css'
 

const pinia = createPinia()
const app = createApp(App)
app.use(pinia)
app.use(router)
app.use(toast)
app.mount('#app')