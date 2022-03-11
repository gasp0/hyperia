import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/bootstrap.min.css'
import './assets/css/custom.scss'

createApp(App).use(router).mount('#app')
