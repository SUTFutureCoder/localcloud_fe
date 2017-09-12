<template>
    <div id="transform_ui">
        <mu-float-button icon="swap_vertical_circle" mini id="trans-float-button" @click="openTransformPopup()"/>
        <!--<form method="post" id="myForm" action="/fileTest.php" enctype="multipart/form-data">-->
            <mu-float-button icon="cloud_upload" mini id="upload-float-button" @click="upload_file()"/>
            <input type="file" id="transform_file_select" multiple style="display: none;" ref="transform_file_select">
        <!--</form>-->

        <mu-popup position="bottom" popupClass="popup-transform" :open="transform_popup" @close="closeTransformPopup()">
            <mu-appbar title="传输列表">
                <mu-flat-button slot="right" label="隐藏" color="white" @click="closeTransformPopup()"/>
            </mu-appbar>
            <mu-content-block>
                <mu-list>
                    <mu-list-item title="Photos" describeText="Jan 9, 2014">
                        <mu-avatar icon="folder" slot="leftAvatar"/>
                        <mu-icon value="info" slot="right"/>
                    </mu-list-item>
                    <mu-list-item title="Recipes" describeText="Jan 17, 2014">
                        <mu-avatar icon="folder" slot="leftAvatar"/>
                        <mu-icon value="info" slot="right"/>
                    </mu-list-item>
                    <mu-list-item title="Work" describeText="Jan 28, 2014">
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
    export default {
        data () {
            return {
                transform_popup: false,
            }
        },
        mounted() {
        },
        methods: {
            openTransformPopup: function () {
                this.transform_popup = true
            },
            closeTransformPopup: function () {
                this.transform_popup = false
            },
            upload_file: function () {
                //分两种方式 第一种浏览器原生，好处是不用插件，但移动端只能上传一个 第二种为移动端方式，可以另写一个页面进行文件选择
                //浏览器原生
                let elem = this.$refs.transform_file_select
                elem.click()


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
