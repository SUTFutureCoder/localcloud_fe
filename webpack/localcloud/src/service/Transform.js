/**
 * 传输用服务
 *
 * Created by lin on 17-9-17.
 */
import Bus from './../assets/EventBus'
import MD5 from 'crypto-js/md5'

let upload_trigger = false
let upload_hash    = [] //防止重复上传，包括页面打开后已上传和上传中的hash
let upload_queue   = []

export default {

    init: function () {
        //用于初始化
        let that = this
        Bus.$on('upload_trigger', function(bool){
            if (bool) {
                upload_trigger = true
                that.uploadFile()
            } else {
                upload_trigger = false
            }
        })
    },
    
    uploadFile: function () {
        // 这里等出现问题再考虑并发锁的问题，以及集成到本来的数组中
        // STEP1 保证队列满
        // 初始化
        if (upload_queue.length < Bus.GLOBAL.transform_task){
            for (let i = upload_queue.length; i < Bus.GLOBAL.transform_task; i++) {
                //找到并塞入第一个没处理的文件
                let first_not_upload_pointer = 0
                for (let f = 0; f < Bus.GLOBAL.transform_upload.length; f++) {
                    if (upload_hash[Bus.GLOBAL.transform_upload.hash] == undefined) {
                        first_not_upload_pointer = f
                        break;
                    }
                }
                upload_queue[i] = Bus.GLOBAL.transform_upload[i]

                if (tmpFileHash != false) {
                    upload_hash[tmpFileHash] = 1
                }
            }
        }
    },

    //用于计算文件HASH值，保证文件粒度唯一性
    fileHash: function (file) {
        if (undefined == file || undefined == file.name || undefined == file.lastModified || undefined == file.size){
            return false
        }
        return MD5(file.name + file.lastModified + file.size).toString();
    },

    //用于标记文件HASH值
    signFileHash: function (files) {
        for (let i = 0; i < files.length; i++) {
            files[i].hash = this.fileHash(files[i])
        }
        return files
    },
    
    dataHash: function () {
        
    }

}
