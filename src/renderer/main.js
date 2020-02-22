import Vue from 'vue'
import axios from 'axios'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import flif from 'node-flif'
import locale from 'element-ui/lib/locale/lang/en'

import App from './App'
import router from './router'
import store from './store'
Vue.use(Element, { locale })
Vue.use(flif)

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
