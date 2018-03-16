import {GET_ARTICLE, GET_ARTICLE_FAILURE, CLEAR_ARTICLE} from "../mutation-types";

const state = {
  loading: true,
  content: '',
  title: '',
  coverImg: '',
  createAt: '',
}

const mutations = {
  [GET_ARTICLE] (state, data) {
    state.content = data.content
    state.title = data.title
    state.createdAt = data.createdAt
    state.coverImg = data.index_img
    state.loading = false
  },
  [GET_ARTICLE_FAILURE] (state) {
    return state
  },
  [CLEAR_ARTICLE] (state) {
    state.content = ''
    state.title = ''
    state.coverImg = ''
    state.createdAt = ''
    state.loading = true
  }
}


export default {
  state,
  mutations
}
