<template>
  <div id="app">
    <keep-alive><router-view></router-view></keep-alive>
    <bottom id="bottom" v-if="showbottom"></bottom>
  </div>
</template>

<script>
import Boot from './assets/Boot'
import Bottom from './pages/common/Bottom'
import Bus from './assets/EventBus'
import * as RouterPath from './constants/RouterPaths'
export default {
    name: 'app',
    data () {
        return {
            showbottom: true,   //是否显示底端按钮
        }
    },
    mounted() {
        let vue = this
        //监听底部隐藏
        Bus.$on("showbottom", function (boolBottom) {
            vue['showbottom'] = boolBottom
        })
        //进行初始化
        Boot.main(vue)
    },
    methods: {
    },
    components: {
        Bottom
    }
}

</script>

<style>
  html,body,dl,ul,ol,menu,li,div,p,img,h1,h2,h3,h4,h5,h6 {
    margin: 0;
    padding: 0;
    border: none;
  }
  html, body{ margin:0; height:100%; }
  #app {
    height: 100%
  }
  #bottom {
    position: fixed;
    bottom: 0;
    width: 100%;
  }
  #loading {
    margin-top: 20px;
    text-align: center;
  }
  #loading #loading_pic{
    margin-left: 50%;
    transform: translateX(-40%);
  }
  #loading #loading_text{
    margin-top: 10px;
    margin-left: 50%;
    transform: translateX(-50%);
  }
</style>
