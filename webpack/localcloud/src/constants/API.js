/**
 * Created by lin on 17-2-12.
 *
 * 接口字典
 *
 */
import * as Global from './Global'
export function C(url) {
    if (Global.remote_proto == "" || Global.remote_host == "" || Global.remote_port == "" || url == ""){
        return false
    }
    return Global.remote_proto + '://' + Global.remote_host + ':' + Global.remote_port + url
}

//配置系列
export const CONFIG_REMOTE_CONNECTION = "/config/connection";
