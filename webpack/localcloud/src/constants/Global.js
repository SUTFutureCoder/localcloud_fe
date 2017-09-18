/**
 * 全局变量
 *
 * Created by lin on 17-8-4.
 */

export default {
    //本机设置
    is_mobile    : 1,           //是否为浏览器或是移动端
    device_info  : {
        wifi    : "",
        ssid    : "",
        token   : "",
    },                          //设备信息

    //远程配置
    remote_proto : '',
    remote_host  : '',
    remote_port  : '',

    //传输配置
    transform_upload: [],        //上传传输列表
    transform_chunk : 1024000,   //文件传输分片默认1M，如每秒速度更大可以动态提高分片大小
    transform_task  : 5,         //同时传输任务数量
}
