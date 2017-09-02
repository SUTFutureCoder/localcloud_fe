<template>
    <div id="config-remote">
        <mu-appbar title="连接" id="appbar_connent"></mu-appbar>
        <div id="config-remote-field">
            <mu-row><mu-text-field label="IP" v-model="remote_ip" labelFloat fullWidth/></mu-row>
            <mu-row><mu-text-field label="端口" v-model="remote_port" labelFloat fullWidth/></mu-row>
            <mu-row><mu-raised-button label="Link Start!" @click="linkstart" fullWidth/></mu-row>
        </div>
    </div>
</template>

<script>
    import * as API from './../../constants/API'
    export default {
        data () {
            return {
                remote_ip:      "",
                remote_port:    "",
            }
        },
        mounted() {
        },
        methods: {
            linkstart: function () {
                //开始连接
                if (this.remote_ip == '' || this.remote_port == ''){
                    alert('请输入正确IP和端口')
                    return;
                }
                this.$http.get("http://" + this.remote_ip + ':' + this.remote_port + API.CONFIG_REMOTE_CONNECTION, this.$data, {
                    emulateJSON: true
                })
                    .then((response) => {
                        let ret = response.body
                        if (ret['error_no'] != 0) {
                            alert(ret['error_msg'])
                            return;
                        }
                        //记录全局连接变量

                        //记录该连接方式下配置

                        //完成设置

                    })
                    .catch(function (response) {
                        console.log(response)
                    })
            }
        },
        components: {
        }
    }
</script>
<style>
    #appbar_connent {
        text-align: center;
    }

    #config-remote-field {
        width: 80%;
        margin-left: 50%;
        transform: translateX(-50%);
    }

</style>