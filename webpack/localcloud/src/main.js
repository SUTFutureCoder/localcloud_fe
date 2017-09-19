// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import 'muse-ui/dist/theme-light.css'
import App from './App'
import router from './router'
import Global from '../src/constants/Global'

/**
 * 调试工具
 */
import eruda from 'eruda'
eruda.init()

Vue.config.productionTip = false
Vue.prototype.GLOBAL = Global
Vue.prototype.$http  = axios //todo超时设定

Vue.use(MuseUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

document.addEventListener('touchstart', function (event) {
}, true)

document.addEventListener('deviceready', onDeviceReady, false)
function onDeviceReady() {
    console.log(device)
    window.device = device
}