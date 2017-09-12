/**
 * 全局变量
 *
 * Created by lin on 17-8-4.
 */
let remote_proto = ''
let remote_host  = ''
let remote_port  = ''

export function set(remote_proto, remote_host, remote_port) {
    this.remote_proto = remote_proto
    this.remote_host  = remote_host
    this.remote_port  = remote_port
}

export function get(){
    return this
}
