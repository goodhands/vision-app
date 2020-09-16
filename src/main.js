import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import './assets/tailwind.css'
import './assets/flickity.css'
import router from './router'

axios.defaults.baseURL = "https://vision.googleapis.com/v1"
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
