/**
 * 传输用服务
 *
 * Created by lin on 17-9-17.
 */
import Bus from './../assets/EventBus'

export default {

    init: function () {
        //用于初始化
        let that = this
        Bus.$on('upload_trigger', function(upload_list){
            that.uploadFile(upload_list)
        })
    },
    
    uploadFile: function (upload_list) {
        //STEP1 读取global中文件队列
        // console.log(upload_list)
    },

}
