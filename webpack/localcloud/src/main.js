// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import axiosRetry from 'axios-retry'
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

Vue.prototype.$http  = axios.create({
    timeout: 1000,
})
axiosRetry(Vue.prototype.$http, { retries: 3 })

Vue.use(MuseUI)

/* eslint-disable no-new */
let vue_instance = new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App },
})

document.addEventListener('touchstart', function (event) {
}, true)

document.addEventListener('deviceready', () => {
    //注意device操作前要判断是否存在这个参数，并且确定设备已经就绪
    vue_instance.GLOBAL.device = device
    vue_instance.GLOBAL.device_ready = true
}, false)