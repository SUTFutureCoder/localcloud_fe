<template>
    <mu-paper>
        <mu-bottom-nav :value="bottomNav" shift @change="handleChange">
            <mu-bottom-nav-item :value="dirNav"    title="文件" icon="folder" />
            <mu-bottom-nav-item :value="remoteNav" title="远程" icon="cloud" />
            <mu-bottom-nav-item :value="configNav" title="设置" icon="settings" />
        </mu-bottom-nav>
    </mu-paper>
</template>

<script>
    import Bus from '../../assets/EventBus'
    import * as RouterPath from './../../constants/RouterPaths'
    export default {
        data () {
            return {
                dirNav: RouterPath.PAGES_DIR,
                remoteNav: RouterPath.PAGES_DIR_REMOTE,
                configNav: RouterPath.PAGES_CONFIG,

                bottomNav: "",
                bottomNavColor: "",
            }
        },
        mounted(){
            //默认路由
            this.handleChange(RouterPath.PAGES_DIR)
            //添加事件监听
            Bus.$on('bottom_onchange', function (path) {
                this.bottomNav      = path
                this.bottomNavColor = path
            })
        },
        methods: {
            handleChange (val) {
                if (this.bottomNav != val){
                    this.bottomNav = val
                    this.bottomNavColor = val
                    this.$router.push({path: val})
                }
            }
        }
    }
</script>
