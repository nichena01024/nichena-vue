<template>
  <div id="app">
    <div class="main-wrapper">
      <el-row>
        <el-col :sm="24" :md="6" :lg="4" class="nav-container">
          <div v-if="isTopbar" class="navbar-container">
            <vBar :title="personalInfo.title" :nav-list="navList"></vBar>
          </div>
          <div v-else class="sidebar-container" :style="'background-image:url(' + require('./assets/img/nav.jpg') + ')'">
            <!--在这里插入导航栏-->
            <vNav :logo="require('./assets/img/logo.jpg')" :title="personalInfo.title" :subtitle="personalInfo.subtitle" :nav-list="navList"></vNav>
          </div>
        </el-col>
        <el-col :sm="24" :md="18" :lg="20">
          <div class="main-container">
            <router-view/>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import _ from 'lodash';
export default {
  name: 'App',
  data () {
    return {
      personalInfo: {
        title: "Nichena",
        subtitle: "试验田"

      },
      navList:[
        {text:'首页', path: '/'},
        {text:'归档', path: '/archive'},
        {text:'关于', path: '/about'},
        {text:'更多', path: '/more'}
      ],
      isTopbar: false
    }
  },
  created () {
    this.isTopbar = document.body.clientWidth < 992
    this.resize();
  },
  components: {
    'vNav': () => import ('./components/sidebar'),
    'vBar': () => import ('./components/navbar'),
    'articleList': () => import('./views/ArticleList')
  },
  methods: {
    //resize事件的触发频率非常的高， 在Android设备上甚至能够达到每秒一百次以上。
    //如果回调函数计算量过大，很容易造成卡顿
    //同样mousemove也会造成调用次数过多的问题
    //必须使用函数节流的方式来进行限制
    //设计模式书上的方法:
    // var throttle = function (fun, interval) {
    //   var __self = fun,        //保存原函数
    //     timer,                //计时器
    //     firstTime = true;     //是否第一次被调用
    //
    //   return function () {
    //     var args = arguments;
    //     __me = this;
    //
    //     if (firstTime) {    //第一次调用，直接执行
    //       __self.apply(__me, args);
    //       return firstTime = false;
    //     }
    //
    //     if (timer) {        //timer存在表示前一次的函数仍在执行
    //       return false;
    //     }
    //     //不是第一次调用，设立节流
    //     timer = setTimeout(function () {
    //       clearTimeout(timer);
    //       timer = null;
    //       __self.apply(__me, args);
    //     }, interval || 500);
    //
    //   }
    //
    // }

    resize () {
      // window.onresize = () => {
      //   this.isTopbar = document.body.clientWidth < 992;
      // }
      window.onresize = _.throttle(() => {
          this.isTopbar = document.body.clientWidth < 992;
      }, 2000)
    },

  }
}
</script>

<style lang="scss">
html, body, #app {
  width: 100%;
  height: 100%;
  max-height: 100%;
  margin: 0;
  font-family: "-apple-system","Open Sans","HelveticaNeue-Light","Helvetica Neue Light","Helvetica Neue",Helvetica,Arial,sans-serif;
}

.nav-container {
  position: sticky;
  top: 0;
  z-index: 1000;
  @media (max-width: 992px) {
    position: fixed;
  }
}

.sidebar-container {
  height: 100vh;
  background-repeat: no-repeat;
  background-size: auto 100%;
}

.main-container {
   width: 95%;
   margin: auto auto;
 }

.nav {
  margin-top: 0;
}

@media (max-width: 992px) {
  .main-container {
    margin-top: 100px;
  }
}
</style>


