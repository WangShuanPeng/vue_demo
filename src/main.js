// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/style.css'
import Myaxios from './plugins/plugin'
import moment from 'moment'

Vue.config.productionTip = false

// 创建全局时间过滤器
Vue.filter('frmData', (value, frmDataString) => {
  return moment(value).format(frmDataString)
})
Vue.use(Myaxios)
Vue.use(ElementUI)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: c => c(App)
})
