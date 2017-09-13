// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResource from 'vue-resource'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import 'muse-ui/dist/theme-light.css'
import App from './App'
import router from './router'
import * as Const from '../src/constants/Const'
import * as Global from '../src/constants/Global'
/**
 * 调试工具
 */
// import eruda from 'eruda'
// eruda.init()

Vue.config.productionTip = false
Vue.prototype.GLOBAL = Global

Vue.use(MuseUI)
Vue.use(VueResource)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

Vue.http.interceptors.push((request, next) => {
    request.credentials = true
    next()
})

document.addEventListener('touchstart', function (event) {
}, true)

document.addEventListener('deviceready', function () {
    console.log(device.cordova)
}, false)