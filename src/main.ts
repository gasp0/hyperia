import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import  { store }  from './store'
import './assets/css/bootstrap.min.css'
import './assets/css/custom.scss'



createApp(App).use(router).use(store).mount('#app')
