/**
 * Created by lin on 17-9-1.
 *
 * 用于启动时执行
 *
 */
import Vue from './EventBus'
import * as Global from './../constants/Global'
import * as RouterPath from './../constants/RouterPaths'

let storage = window.localStorage
export default {
    main: function (vue) {
        //主函数 推荐使用异步promise
        //获取机型和token
        // if (device.platform)
        //STEP1 从localstorage中获取该wifi下已远程IP和端口 暂略

        //STEP2 测试连接 暂略

        //STEP3 如连接失败显示配置界面
        this.showRemoteConfigPage(vue)
    },
    
    getRemoteHostPort: function () {
        
    },
    
    showRemoteConfigPage: function (vue) {
        Vue.$emit("showbottom", false)
        //调用原始this
        vue.$router.push({path: RouterPath.PAGES_CONFIG_REMOTE})
    }
}