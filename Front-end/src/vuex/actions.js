import * as types from './mutation-types'
const API_ROOT = 'https://bird.ioliu.cn/v1/?url=http://nichenadev.leanapp.cn/'
import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.timeout = 5000;

export default {
  getArticleList (context, quantity) {
    console.info('the quantity is ' + quantity + ' , current size is' + context.state.list.currentList)
    context.commit(types.REQUEST_ARTICLE_LIST, quantity)
    axios.get(API_ROOT + 'api/getArticleList', {
      params: {
        listsize: context.state.list.currentList || 0,
        reqsize: quantity
      }
    }).then(res => {
      context.commit(types.GET_ARTICLE_LIST, res.data.data);
    })
      .catch(err => {
        context.commit(types.GET_ARTICLE_LIST_FAILURE, err)
      })
  },
  getArticle (context, id) {
    console.info("get article in process, id = " + id)
    axios.get(API_ROOT + 'api/getArticle', {
      params: {
        id: id
      }
    }).then(res => {
      context.commit(types.GET_ARTICLE, res.data)
    }).catch(err => {
      context.commit(types.GET_ARTICLE_FAILURE, err)
    })
  },
  clearArticle (context) {
    context.commit(types.CLEAR_ARTICLE)
  }

}
