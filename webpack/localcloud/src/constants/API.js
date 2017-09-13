/**
 * Created by lin on 17-2-12.
 *
 * 接口字典
 *
 */
import * as Global from './Global'
export function C(url) {
    let global_config = Global.get()
    console.log(global_config)
    if (global_config.remote_proto == "" || global_config.remote_host == "" || global_config.remote_port == "" || url == ""){
        return false
    }
    return global_config.remote_proto + '://' + global_config.remote_host + ':' + global_config.remote_port + url
}

//配置系列
export const CONFIG_REMOTE_CONNECTION = "/config/connection";
