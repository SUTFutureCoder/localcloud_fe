import Vue from 'vue'
import Router from 'vue-router'
import * as RouterPath from './../constants/RouterPaths'
import Dir from './../pages/dir/Index.vue'
import ConfigRemote from './../pages/config/ConfigRemote.vue'

Vue.use(Router)

export default new Router({
    // mode: 'history',
    routes: [
        {
            path: RouterPath.PAGES_MAIN,
            component: Dir
        },
        {
            path: RouterPath.PAGES_DIR,
            component: Dir
        },
        {
            path: RouterPath.PAGES_CONFIG_REMOTE,
            component: ConfigRemote
        }
    ]
})
