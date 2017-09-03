<template>
    <div id="config-remote">
        <mu-appbar title="连接" id="appbar_connent"></mu-appbar>
        <div id="config-remote-field">
            <mu-row>
                <mu-select-field v-model="remote_proto" label="协议" fullWidth>
                    <mu-menu-item value="http" title="http" select="select"/>
                    <mu-menu-item value="https" title="https"/>
                    <mu-menu-item value="ws" title="ws"/>
                    <mu-menu-item value="wss" title="wss"/>
                </mu-select-field>
            </mu-row>
            <mu-row><mu-text-field label="IP" v-model="remote_host" labelFloat fullWidth/></mu-row>
            <mu-row><mu-text-field label="端口" v-model="remote_port" labelFloat fullWidth/></mu-row>
            <mu-row><mu-raised-button label="Link Start!" @click="linkstart" fullWidth/></mu-row>
        </div>
    </div>
</template>

<script>
    import * as API from './../../constants/API'
    import * as Global from './../../constants/Global'
    export default {
        data () {
            return {
                remote_proto:   "http",
                remote_host:    "",
                remote_port:    "",
            }
        },
        mounted() {
        },
        methods: {
            linkstart: function () {
                let vue = this
                //开始连接
                if (this.remote_ip == '' || this.remote_port == ''){
                    alert('请输入正确IP和端口')
                    return;
                }

                //临时设置全局变量
                Global.remote_proto = this.remote_proto
                Global.remote_host  = this.remote_host
                Global.remote_port  = this.remote_port

                let conn_url = API.C(API.CONFIG_REMOTE_CONNECTION)
                if (conn_url == false){
                    alert("请输入正确配置")
                    return
                }
                this.$http.get(conn_url, {}, {
                    emulateJSON: true
                })
                    .then((response) => {
                        let ret = response.body
                        if (ret['error_no'] != 0) {
                            alert(ret['error_msg'])
                            Global.remote_host  = ""
                            Global.remote_port  = ""
                            vue.remote_host = ""
                            vue.remote_port = ""
                            return;
                        }
                        //记录该连接方式下配置

                        //完成设置

                    })
                    .catch(function (response) {
                        alert('连接失败，请确认ip和端口是否正确')
                        Global.remote_host  = ""
                        Global.remote_port  = ""
                        vue.remote_host = ""
                        vue.remote_port = ""
                        return;
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