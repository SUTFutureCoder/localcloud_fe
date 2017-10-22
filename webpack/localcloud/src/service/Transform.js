/**
 * 传输用服务
 *
 * Created by lin on 17-9-17.
 */
import Vue from './../assets/EventBus'
import SJCL from 'sjcl'
import FileCrypto from './FileCrypto'


//上传触发
let upload_trigger = false
//status常量
const TRANS_STATUS_PREPARE = -1     //准备中 通常计算hash中
const TRANS_STATUS_PENDING = 0      //等待
const TRANS_STATUS_RUNNING = 1      //进行
const TRANS_STATUS_PAUSE   = 2      //暂停
const TRANS_STATUS_EXCEPTION = 3    //异常
//上传定时器id
let upload_trans_cron_id = 0

export default {
    init: function () {
        //用于初始化
        Vue.$on('upload_trigger', ((bool) => {
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

        //用于消息控制序列分片上传
        Vue.$on('file_slice_upload', (file_hash) => {
            this.startSliceUpload(file_hash)
        })
    },

    //上传主流程，因为不依赖其他的数据源，所以注意判断 直接传就可以
    uploadFile: function () {
        //先确认开关情况
        if (!upload_trigger){
            return false
        }

        //任务如果就绪则置为pending
        this.checkFileIsReady()
        //找目前可以进行的
        let tmp_upload_list = this.getCanUploadFileObjectList()
        //检查是否需要启动新的上传任务
        let new_upload_task = this.getNewUploadTask(tmp_upload_list)
        if (!new_upload_task.length) {
            //如果没有需要执行的新上传任务，则跳过
            return true
        }

        //到这里才进行遍历可进行的上传列表
        this.transUploadRequestion(new_upload_task)

        //往上次处理的列表添加hash
        this.setLastUploadListHash(tmp_upload_list)
    },

    //用于计算文件名称HASH值，保证文件大概率上传列表唯一性。注意不要使用此方法进行Hash计算
    fileNameHash: function (file) {
        if (undefined == file || undefined == file.name || undefined == file.lastModified || undefined == file.size){
            return false
        }

        return SJCL.codec.hex.fromBits(SJCL.hash.sha256.hash(file.name + file.lastModified + file.size))
    },

    //用于标记文件名称HASH值，针对上传列表
    signFileNameHash: function (files) {
        for (let i = 0; i < files.length; i++) {
            files[i].name_hash = this.fileNameHash(files[i])
        }
        return files
    },
    //用于标记文件hash，针对数据完整性
    signFileHash: function (files) {
        for (let i = 0; i < files.length; i++) {
            FileCrypto.sha512File(files[i])
            FileCrypto.sha512Slice(files[i])
        }
        //因为是异步模型，所以没有返回值
    },
    //文件队列标记
    //批量初始化文件传输object,同时预分片
    initFileTransObject: function (files) {
        for (let i in files){
            let tmp_task_obj = {
                status:     TRANS_STATUS_PREPARE,
                progress:   0.0,
                slice_trunk:   0,   //分片大小
                slice_current: 0,   //当前分片
                slice_sum:  0,      //分片总数
            }
            //对文件进行预分片
            tmp_task_obj.slice_trunk = Vue.GLOBAL.transform_chunk
            tmp_task_obj.slice_sum = Math.ceil(files[i].size / Vue.GLOBAL.transform_chunk)
            files[i].upload_task = tmp_task_obj
        }
        return files
    },
    //修改文件传输object
    updateFileTransObject: function (file, object) {
        //到列表中进行寻找
        for (let i in Vue.GLOBAL.transform_upload) {
            if (Vue.GLOBAL.transform_upload[i].name_hash == file.name_hash) {
                //进行增量定点修改，相信结构一致
                for (let j in object) {
                    Vue.GLOBAL.transform_upload[i].upload_task[j] = object[j]
                }
                return true
            }
        }

        return false
    },
    //检查是否已经完成hash等一系列文件准备工作，如完成则改变状态为pending
    checkFileIsReady: function () {
        for (let i in Vue.GLOBAL.transform_upload) {
            if (Vue.GLOBAL.transform_upload[i].upload_task.status == TRANS_STATUS_PREPARE) {
                if (undefined != Vue.GLOBAL.transform_upload[i].hash
                        && undefined != Vue.GLOBAL.transform_upload[i].slice_hash
                        && Vue.GLOBAL.transform_upload[i].slice_hash.length == Vue.GLOBAL.transform_upload[i].upload_task.slice_sum) {
                    //准备就绪
                    //如果顺序错乱严重，则需要将这个元素放到任务队列末尾
                    let tmp = Vue.GLOBAL.transform_upload[i]
                    //避免出现竞争修改情况
                    tmp.upload_task.status = TRANS_STATUS_PENDING
                    Vue.GLOBAL.transform_upload.splice(i, 1)
                    Vue.GLOBAL.transform_upload.push(tmp)
                }

            }
        }
    },
    //获取可上传的object
    getCanUploadFileObjectList: function () {
        let tmp_can_upload = []

        for (let i in Vue.GLOBAL.transform_upload) {
            //STEP0 检查传输对象里文件和文件分片是否已经签名完毕
            //STEP1 先检查传输对象中status = 1进行的有并发个
            //STEP2 填充等待上传部分
            if (TRANS_STATUS_RUNNING == Vue.GLOBAL.transform_upload[i].upload_task.status
                ||  TRANS_STATUS_PENDING == Vue.GLOBAL.transform_upload[i].upload_task.status) {
                tmp_can_upload.push(Vue.GLOBAL.transform_upload[i])
                if (tmp_can_upload.length == Vue.GLOBAL.transform_task) {
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
            if (undefined != this.last_upload_list_hash[upload_list[i].name_hash]) {
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
            this.last_upload_list_hash[last_upload[i].name_hash] = 1
        }
    },
    //将文件移除上传列表
    removeFileFromUploadList: function (file) {
        //到列表中进行寻找
        for (let i in Vue.GLOBAL.transform_upload) {
            if (Vue.GLOBAL.transform_upload[i].name_hash == file.name_hash) {
                Vue.GLOBAL.transform_upload.splice(i, 1)
                return true
            }
        }
        return false
    },
    //上传请求
    transUploadRequestion: function (upload_file) {
        for (let i in upload_file) {
            //初始化任务
            Vue.$http.post('/upload/requestion', {
                hash: upload_file[i].hash,
                size: upload_file[i].size,
                position: '/'   //暂定根
            })
            .then((ret) => {
                try {
                    //检查返回值
                    if (ret['error_no'] != 0) {
                        if (ret['error_msg'] != ""){
                            alert(ret['error_msg'])
                            throw ret['error_msg'];
                        }
                        return;
                    }

                    //这里区别秒传和不允许传输的情况
                    if (ret['data']['sec_trans'] == 1) {
                        //秒传从队列中移除文件
                        this.removeFileFromUploadList(upload_file[i])
                        return true
                    }

                    //修改状态
                    if (false == this.updateFileTransObject(upload_file[i], {status: TRANS_STATUS_RUNNING})){
                        console.log('文件在队列中不存在')
                        return false
                    }

                    //开始第一区块上传，注意使用消息模型保证序列准确
                    this.startSliceUpload(upload_file[i].hash)
                } catch (err) {
                    console.log(err)
                    if (false == this.updateFileTransObject(upload_file[i], {status: TRANS_STATUS_EXCEPTION})){
                        console.log('文件在队列中不存在')
                        return false
                    }
                }
            })
            .catch((error) => {
                console.log(error)
                if (false == this.updateFileTransObject(upload_file[i], {status: TRANS_STATUS_EXCEPTION})){
                    console.log('文件在队列中不存在')
                    return false
                }
            })
        }
    },
    //进行分片上传，这样传值能够保证消息总线数据量降低，并且降低各种判断问题
    startSliceUpload: function (file_hash) {
        //如果最后一个接收完毕，则停止消息发送
        //找到那个文件
        for (let i in Vue.GLOBAL.transform_upload) {
            if (file_hash == Vue.GLOBAL.transform_upload[i].hash) {
                let start_byte = Vue.GLOBAL.transform_upload[i].upload_task.slice_current * Vue.GLOBAL.transform_upload[i].upload_task.slice_trunk
                let end_byte   = Vue.GLOBAL.transform_upload[i].upload_task.slice_current * Vue.GLOBAL.transform_upload[i].upload_task.slice_trunk
                let fd = new FormData()
                fd.append('file', Vue.GLOBAL.transform_upload[i].slice(start_byte, end_byte))
                fd.append('hash', Vue.GLOBAL.transform_upload[i].hash)
                fd.append('size', Vue.GLOBAL.transform_upload[i].size)
                fd.append('position', '/')  //暂定为根
                fd.append('slice_hash', Vue.GLOBAL.transform_upload[i].slice_hash[Vue.GLOBAL.transform_upload[i].upload_task.slice_current])
                fd.append('last_modified', Vue.GLOBAL.transform_upload[i].lastModified)
                fd.append('name', Vue.GLOBAL.transform_upload[i].name)
                fd.append('mime', Vue.GLOBAL.transform_upload[i].type)
                let tmp_file = Vue.GLOBAL.transform_upload[i]
                //读取进度后进行上传操作
                Vue.$http.post('/upload/exec', fd)
                    .then((ret) => {
                        try {
                            //检查返回值
                            if (ret['error_no'] != 0) {
                                if (ret['error_msg'] != ""){
                                    alert(ret['error_msg'])
                                    throw ret['error_msg'];
                                }
                                return;
                            }

                            //检查是否已经完成了所有的块
                            let tmp_slice_current = tmp_file.upload_task.slice_current + 1
                            if (tmp_slice_current == tmp_file.upload_task.slice_sum) {
                                //完成了所有的块，删除任务
                                this.removeFileFromUploadList(tmp_file)
                                return true
                            }

                            //修改状态
                            let tmp_progress = tmp_slice_current / tmp_file.upload_task.slice_sum
                            let tmp_progress_fixed = tmp_progress.toFixed(2)
                            if (false == this.updateFileTransObject(tmp_file,
                                    {
                                        status: TRANS_STATUS_RUNNING,
                                        progress: tmp_progress_fixed,
                                        slice_current: tmp_slice_current,
                                    })){
                                console.log('文件在队列中不存在')
                                return false
                            }

                            //发送消息，上传下一块
                            Vue.$emit('file_slice_upload', tmp_file.hash)
                        } catch (err) {
                            console.log(err)
                            if (false == this.updateFileTransObject(tmp_file, {status: TRANS_STATUS_EXCEPTION})){
                                console.log('文件在队列中不存在')
                                return false
                            }
                        }
                    })
                    .catch((error) => {
                        console.log(error)
                        if (false == this.updateFileTransObject(tmp_file, {status: TRANS_STATUS_EXCEPTION})){
                            console.log('文件在队列中不存在')
                            return false
                        }
                    })
            }
        }
    }

}
