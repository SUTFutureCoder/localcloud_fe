/**
 * 传输用服务
 *
 * Created by lin on 17-9-17.
 */
import Bus from './../assets/EventBus'

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
        // STEP1 保证队列满
        // 初始化
        if (upload_queue.length < Bus.GLOBAL.transform_task){
            //补全
            for (let i = upload_queue.length; i < Bus.GLOBAL.transform_task; i++) {
                //这里需要循环验证是否重复并取第一个
                // if (Bus.GLOBAL.transform_upload.length > i){
                    //这里还需要进行判断
                    upload_queue[i] = Bus.GLOBAL.transform_upload[i]
                // }
            }
        }


        // //STEP1 读取global中文件队列
        // while (Bus.GLOBAL.transform_upload.length && upload_trigger) {
        //     //STEP2 读取分片和任务情况
        //     let tmp_task_count = Bus.GLOBAL.transform_task
        //     for (let )
        //     if (!upload_trigger) {
        //         //当停止上传时立即终止 粒度为分片传输时
        //         return true;
        //     }
        // }
    },

}
