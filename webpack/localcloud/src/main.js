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

/**
 * 服务初始化
 */
import TransformService from './service/Transform'
import StorageService from './service/Storage'
TransformService.init()
StorageService.init()

Vue.config.productionTip = false
Vue.prototype.GLOBAL = Global
Vue.prototype.$http  = axios

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

document.addEventListener('deviceready', function () {
    console.log(device.cordova)
}, false)