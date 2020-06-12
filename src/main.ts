import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from './utils/Http'

import './assets/styles/reset.css'

import elementUi from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css'

Vue.use(elementUi)

Vue.config.productionTip = false

Vue.prototype.$axios = axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
