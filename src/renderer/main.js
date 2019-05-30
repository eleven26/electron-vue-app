import Vue from 'vue'
import axios from 'axios'
import ElementUI from 'element-ui'
import VueClipboard from 'vue-clipboard2'

import App from './App'
import router from './router'
import store from './store'

import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/global.css'

// import { start } from './utils/httpServer'
// start()

const fixPath = require('fix-path')
fixPath()

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.use(VueClipboard)

Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
