import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import actions from './actions'

import list from './modules/ArticleList'
import article from './modules/article'

Vue.use(Vuex);

//Vue.config.debug = true;

export default new Vuex.Store({
  actions,
  modules: {
    article,
    list
  },
  plugins: process.env.NODE_ENV !== 'production'
    ? [createLogger()]
    : []

})
