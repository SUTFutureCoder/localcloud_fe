/**
 * 传输用服务
 *
 * Created by lin on 17-9-17.
 */
import Bus from './../assets/EventBus'
import MD5 from 'crypto-js/md5'
import SHA256 from 'crypto-js/sha256'

//上传触发
let upload_trigger = false
//文件传输对象模板
const TRANS_TASK_OBJECT_TPL = {
    status:     0,
    progress:   0.0,
    slice_current: 0,
    slice_sum:  0,
}
//status常量
const TRANS_STATUS_PENDING = 0      //等待
const TRANS_STATUS_RUNNING = 1      //进行
const TRANS_STATUS_PAUSE   = 2      //暂停
const TRANS_STATUS_EXCEPTION = 3    //异常
//上传定时器id
let upload_trans_cron_id = 0

export default {
    init: function () {
        //用于初始化
        Bus.$on('upload_trigger', ((bool) => {
            if (bool) {
                upload_trigger = true
                //开始上传任务
                if (upload_trans_cron_id){
                    //如果已经存在定时任务，则不会再启动一个
                    return true
                }
                //每秒监测一次上传情况，就不用担心补队列的情况
                upload_trans_cron_id = setInterval(() => {
                    this.uploadFile()
                }, 1000)
            } else {
                upload_trigger = false
                //停止上传任务
                clearInterval(upload_trans_cron_id)
                upload_trans_cron_id = 0
            }
        }))
    },

    //上传主流程，因为不依赖其他的数据源，所以注意判断 直接传就可以
    uploadFile: function () {
        //先确认开关情况
        if (!upload_trigger){
            return false
        }

        //找目前可以进行的
        let tmp_upload_list = this.getCanUploadFileObjectList()

        //检查是否需要启动新的上传任务
        let new_upload_task = this.getNewUploadTask(tmp_upload_list)
        if (!new_upload_task.length) {
            //如果没有需要执行的新上传任务，则跳过
            return true
        }

        //到这里才进行遍历可进行的上传列表
        this.startTransUploadTask(new_upload_task)
        console.log('end')
        //往上次处理的列表添加hash
        this.setLastUploadListHash(tmp_upload_list)
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
        
    },

    //检查系列
    checkGlobalFileStatus: function () {

    },

    //文件队列标记
    //批量初始化文件传输object
    initFileTransObject: function (files) {
        for (let i in files){
            files[i].upload_task = TRANS_TASK_OBJECT_TPL
        }
        return files
    },
    //修改文件传输object
    updateFileTransObject: function (file, object) {
        file.upload_task = object
        return file
    },
    //获取可上传的object
    getCanUploadFileObjectList: function () {
        let tmp_can_upload = []

        for (let i in Bus.GLOBAL.transform_upload) {
            //STEP1 先检查传输对象中status = 1进行的有并发个
            //STEP2 填充等待上传部分
            if (TRANS_STATUS_RUNNING == Bus.GLOBAL.transform_upload[i].upload_task.status
                ||  TRANS_STATUS_PENDING == Bus.GLOBAL.transform_upload[i].upload_task.status) {
                tmp_can_upload.push(Bus.GLOBAL.transform_upload[i])
                if (tmp_can_upload.length == Bus.GLOBAL.transform_task) {
                    return tmp_can_upload
                }
            }
        }
        return tmp_can_upload
    },
    //获取新增上传的列表
    getNewUploadTask: function (upload_list) {
        if (undefined == this.last_upload_list_hash){
            //如果没有初始化，则直接全部上传
            return upload_list
        }

        let new_upload_task = []
        for (let i in upload_list) {
            if (undefined != this.last_upload_list_hash[upload_list[i].hash]) {
                continue
            }
            new_upload_task.push(upload_list[i])
        }
        return new_upload_task
    },
    //设置最近一次上传的列表hash
    setLastUploadListHash: function (last_upload) {
        //重置上次传输的列表文件hash
        this.last_upload_list_hash = []
        for (let i in last_upload) {
            this.last_upload_list_hash[last_upload[i].hash] = 1
        }
    },
    //开始执行上传主任务
    startTransUploadTask: function (upload_file) {
        // for (let i in upload_file) {
            //初始化任务
            Bus.$http.post('/file/upload/requestion', {
                    token: Bus.GLOBAL.user_token,
                    status: 1,
                    // hash:  upload_file[i].hash,
                })
                .then((response) => {
                    //修改状态

                    //这里区别秒传和不允许传输的情况

                    //从这里如果获得了上传用token则开始各个文件自己的上传操作

                })
                .catch((error) => {
                    console.log(error)
                })

        // }

    }


}
