/**
 * 全局变量
 *
 * Created by lin on 17-8-4.
 */

//远程配置
let remote_proto = ''
let remote_host  = ''
let remote_port  = ''

export function set() {
    for (let i = 0; i < arguments.length; i++){
        let tmpVar  = arguments[i]
        eval("this." + tmpVar + "='" + arguments[++i] + "'")
    }
}

export function get(){
    return this
}


