import Vue from 'vue'
import Router from 'vue-router'
// 引入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Vuex from 'vuex'

// import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)
Vue.use(ElementUI)

export default new Router({
  //mode: history,
  routes: [
    {
      path: '/',
      name: 'ArticleList',
      component: function (resolve) {
        require(['@/views/ArticleList'], resolve)
      }
    },
    {
      path: '/article/:id',
      name: 'article',
      component: function (resolve) {
        require(['@/views/Article'], resolve)
      }
    }
  ]
})
