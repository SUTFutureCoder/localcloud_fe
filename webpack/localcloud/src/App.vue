<template>
  <div id="app">
    <div v-if="isReady">
      <keep-alive><router-view></router-view></keep-alive>
      <bottom id="bottom" v-if="showbottom"></bottom>
    </div>
    <div v-else>
      <div id="loading">
        <mu-row id="loading_pic"><mu-circular-progress :size="120" :strokeWidth="10"/></mu-row>
        <mu-row id="loading_text"><p>本地云初始化中o(*≧▽≦)ツ</p></mu-row>
      </div>
    </div>
  </div>
</template>

<script>
import Boot from './assets/Boot'
import Bottom from './pages/common/Bottom'
import Bus from './assets/EventBus'
export default {
    name: 'app',
    data () {
        return {
            showbottom: true,   //是否显示底端按钮
            isReady:    false,  //是否已经准备就绪
        }
    },
    mounted() {
        let vue = this
        //进行初始化
        Boot.main()

        //监听底部隐藏
        Bus.$on("showbottom", function (boolBottom) {
            vue['showbottom'] = boolBottom
        })
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
    top: 30px;
    text-align: center;
  }
  #loading #loading_pic{
    margin-left: 50%;
    transform: translateX(-40%);
  }
  #loading #loading_text{
    margin-left: 50%;
    transform: translateX(-50%);
  }
</style>
