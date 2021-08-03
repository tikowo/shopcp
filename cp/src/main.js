import { createApp, h } from 'vue'
import router from "./router"
import store from "./store"

import App from './App.vue'
import './index.css'

const app = createApp(App);
app.use(router).use(store).mount('#app')
