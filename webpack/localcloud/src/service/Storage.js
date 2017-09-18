/**
 * 提供本地存储服务
 *
 * Created by lin on 17-9-17.
 */
let storage = window.localStorage
//存储配置
let storage_config_remote_conn_key = 'config_remote_conn'
let storage_config_remote_conn = {
    wifi    :   '',
    ssid    :   '',
    token   :   '',
    proto   :   '',
    host    :   '',
    port    :   '',
}

export default {
    init: function () {
        //将localstorage中数据转移到全局变量中
        //获取连接信息

        //获取未处理完的上传列表
    },

    getRemoteConnConfig: function () {
        let tmpStorage = storage.getItem(storage_config_remote_conn_key)
        if (tmpStorage == null){
            return false
        }
        let obj = JSON.parse(storage.getItem(storage_config_remote_conn_key))
        if ('object' == typeof(obj)){
            return obj
        }
        return false
    },

    storageRemoteConnConfig: function (data) {
        let tmp_storage = []
        let ssid_check  = []
        for (let d in data){
            for (let i in storage_config_remote_conn){
                if (undefined == data[d][i]){
                    return false
                }
            }
            if (ssid_check[data[d]['ssid']] == data[d]['wifi']){
                continue
            }
            ssid_check[data[d]['ssid']] = data[d]['wifi']
            tmp_storage.push(data[d])
        }

        storage.setItem(storage_config_remote_conn_key, JSON.stringify(tmp_storage))
    },

    getUploadList: function () {
        
    },
    
    storageUploadList: function () {
        
    }
}