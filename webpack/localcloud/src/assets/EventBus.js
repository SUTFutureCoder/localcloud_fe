/**
 * 注意仅用于消息总线和VUE基础方法调用
 */
import Vue from 'vue'

//消息总线也继承了全局的Vue
export default Vue.prototype.$eventHub = Vue.prototype.$eventHub || new Vue()