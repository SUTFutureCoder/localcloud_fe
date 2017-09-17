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
    import MD5 from 'crypto-js/md5'


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
                e.preventDefault();
                let files = e.target.files
//                files = document.getElementById('transform_file_select').files
                if (!files && 0 == files.length) {
                    return
                }

                //准备
                for (let i = 0; i < files.length; ++i){
                    //遍历检查
                    let md5 = MD5(files[i].name + files[i].lastModified + files[i].size).toString()
                    if (undefined != this.upload_list_unique_check[md5]){
                        continue
                    }
                    this.upload_list[this.upload_list.length] = files[i]
                    this.upload_list_unique_check[md5] = 1
                }
                this.GLOBAL.transform_upload = this.upload_list

                //发送通知进行自动上传操作 符合函数单一职责SRP原则
                Bus.$emit("upload_trigger", 1)
                //http://www.cnblogs.com/imwtr/p/5957391.html
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
