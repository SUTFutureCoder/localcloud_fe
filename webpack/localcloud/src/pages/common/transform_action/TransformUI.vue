<template>
    <div id="transform_ui">
        <mu-float-button icon="swap_vertical_circle" mini id="trans-float-button" @click="openTransformPopup()"/>
        <!--<form method="post" id="myForm" action="/fileTest.php" enctype="multipart/form-data">-->
            <mu-float-button icon="cloud_upload" mini id="upload-float-button" @click="uploadFile()"/>
            <input type="file" id="transform_file_select" multiple style="display: none;" ref="transform_file_select" @change="uploadFileSelect($event)">
        <!--</form>-->

        <mu-popup position="bottom" popupClass="popup-transform" :open="transform_popup" @close="closeTransformPopup()">
            <mu-appbar title="传输列表">
                <mu-flat-button slot="right" label="隐藏" color="white" @click="closeTransformPopup()"/>
            </mu-appbar>
            <mu-content-block>
                <mu-list>
                    <mu-list-item title="Photos" describeText="Jan 9, 2014" v-for="(file, key) in upload_list" :key="key">
                        <mu-avatar icon="folder" slot="leftAvatar"/>
                        <mu-icon value="info" slot="right"/>
                    </mu-list-item>
                </mu-list>
            </mu-content-block>
        </mu-popup>
    </div>
</template>
<script>
    import Bus from '../../../assets/EventBus'
    import TransformService from './../../../service/Transform'
    import FileCrypto from './../../../service/FileCrypto'

    export default {
        data () {
            return {
                transform_popup: false,
                upload_list: [],
                upload_list_unique_check: {},   //用于检查是否重复上传，hash
            }
        },
        mounted() {
            //导入全局上传列表 （包括了上次没传完的列表）
            this.upload_list = this.GLOBAL.transform_upload
            //初始化传输服务
            TransformService.init()
            //监听同步上传列表事件
            Bus.$on("upload_list_sync", this.syncUploadList)
        },
        methods: {
            openTransformPopup: function () {
                this.transform_popup = true
            },
            closeTransformPopup: function () {
                this.transform_popup = false
            },
            uploadFile: function () {
                //分两种方式 第一种浏览器原生，好处是不用插件，但移动端只能上传一个 第二种为移动端方式，可以另写一个页面进行文件选择
                //浏览器原生
                let elem = this.$refs.transform_file_select
                elem.click()
            },
            uploadFileSelect: function (e) {
                let tmp_upload_list = []

                e.preventDefault();
                let files = e.target.files
//                files = document.getElementById('transform_file_select').files
                if (!files && 0 == files.length) {
                    return
                }

                //准备
                for (let i = 0; i < files.length; ++i){
                    //遍历检查上传列表是否已经存在
                    let md5 = TransformService.fileNameHash(files[i])
                    if (undefined != this.upload_list_unique_check[md5]){
                        continue
                    }
                    tmp_upload_list.push(files[i])
                    this.upload_list_unique_check[md5] = 1
                }

                //排除没有上传文件的情况
                if (!tmp_upload_list.length){
                    return false
                }

                //初始化文件传输状态
                tmp_upload_list = TransformService.initFileTransObject(tmp_upload_list)
                //附加文件名签名，标记上传唯一性
                tmp_upload_list = TransformService.signFileNameHash(tmp_upload_list)
                //附加文件和文件分片签名，标记完整性
                TransformService.signFileHash(tmp_upload_list)
                //注意这里需要push进去
                this.GLOBAL.transform_upload.push.apply(this.GLOBAL.transform_upload, tmp_upload_list)

                //发送通知进行自动上传操作 符合函数单一职责SRP原则
                //更新状态统一由GLOBAL控制
                //更新：这里原来直接开始上传通知，但因为计算hash是异步，所以将开始上传通知单独独立成成一个方法。该方法会在接受hash之后开始
                Bus.$emit("upload_trigger", 1)
                //更新展示用列表
                Bus.$emit("upload_list_sync", 1)
            },

            //同步展示用文件列表
            syncUploadList: function () {
                this.upload_list = this.GLOBAL.transform_upload
            }
        },
    }
</script>
<style>
    #upload-float-button {
        position: fixed;
        right: 20px;
        bottom: 80px;
    }
    #trans-float-button {
        position: fixed;
        right: 20px;
        bottom: 130px;
    }
    .popup-transform {
        width: 100%;
    }
</style>
