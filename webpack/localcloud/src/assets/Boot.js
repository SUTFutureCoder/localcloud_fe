/**
 * Created by lin on 17-9-1.
 *
 * 用于启动时执行
 *
 */
import Vue from './EventBus'
import * as Global from './../constants/Global'

let storage = window.localStorage
export default {
    main: function () {
        //主函数 推荐使用异步promise
        //STEP1 从localstorage中获取该wifi下已远程IP和端口 暂略

        //STEP2 测试连接 暂略

        //STEP3 如连接失败显示配置界面

    },
    
    getRemoteHostPort: function () {
        
    }
}