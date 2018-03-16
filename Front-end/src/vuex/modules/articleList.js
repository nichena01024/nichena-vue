import { GET_ARTICLE_FAILURE,
    GET_ARTICLE_LIST,
    REQUEST_ARTICLE_LIST} from "../mutation-types";

const state = {
    isFetching: false,
    currentList: 0,
    listInfo: [],
    isComplete: false
}


const mutations = {
    [REQUEST_ARTICLE_LIST](state) {
        state.isFetching = true
    },
    [GET_ARTICLE_LIST](state, data) {
        let prev = state.currentList
        state.isFetching = false
        state.listInfo = state.listInfo.concat(data)
        // state.listInfo = data;
        state.currentList = state.listInfo.length
        state.isComplete = state.currentList === prev
    },
    [GET_ARTICLE_FAILURE](state) {
        state.isFetching = false
    }
}

export default {
    state,
    mutations
}