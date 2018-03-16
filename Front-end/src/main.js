// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import store from './vuex/store'
import infiniteScroll from 'vue-infinite-scroll'

Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(infiniteScroll)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
