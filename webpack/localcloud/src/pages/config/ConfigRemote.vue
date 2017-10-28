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
    import axios from 'axios'
    import axiosRetry from 'axios-retry'
    import Bus from './../../assets/EventBus'
    import * as API from './../../constants/API'
    import * as RouterPath from './../../constants/RouterPaths'
    import StorageService from './../../service/Storage'
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
                if (this.remote_host == '' || this.remote_port == ''){
                    alert('请输入正确IP和端口')
                    return;
                }

                this.$http.get(this.remote_proto + '://' + this.remote_host + ':' + this.remote_port + API.CONFIG_REMOTE_CONNECTION)
                    .then((response) => {
                        let ret = response.data
                        if (ret['error_no'] != 0) {
                            if (ret['error_msg'] != ""){
                                alert(ret['error_msg'])
                            } else {
                                alert('连接失败，请确认ip和端口是否正确')
                            }
                            Bus.GLOBAL.remote_host = Bus.GLOBAL.remote_port = ""
                            return;
                        }
                        //记录该连接方式下配置
                        Bus.GLOBAL.remote_proto = this.remote_proto
                        Bus.GLOBAL.remote_host  = this.remote_host
                        Bus.GLOBAL.remote_port  = this.remote_port
                        //记录用户token
                        Bus.GLOBAL.user_token   = ret['data']['token']

                        Bus.$http = axios.create({
                            baseURL: Bus.GLOBAL.remote_proto + '://' + Bus.GLOBAL.remote_host + ':' + vue.GLOBAL.remote_port + '/',
                            timeout: 5000,
                        })
                        axiosRetry(Bus.$http, { retries: 3 })

                        //以后不用拼接即可

                         StorageService.storageRemoteConnConfig({
                             wifi    :   Bus.GLOBAL.device_info.wifi,
                             ssid    :   Bus.GLOBAL.device_info.ssid,
                             token   :   Bus.GLOBAL.device_info.token,
                             proto   :   Bus.GLOBAL.remote_proto,
                             host    :   Bus.GLOBAL.remote_host,
                             port    :   Bus.GLOBAL.remote_port,
                         })

                        //完成设置
                        Bus.$emit("showbottom", true)
                        vue.$router.push({path: RouterPath.PAGES_MAIN})
                    })
                    .catch(function (response) {
                        alert('连接失败，请确认ip和端口是否正确')
                        Bus.GLOBAL.remote_host = Bus.GLOBAL.remote_port = ""
                        return
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