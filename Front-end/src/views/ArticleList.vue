<template>
    <div class="" id="tst">
    <ul class="main-wrapper" id="content">
      <li v-for="article in articleList" v-bind:key="article.obejctId" class="article-wrapper">
        <router-link :to="{name: 'article', params: {id: article.objectId}}" class="article">
          <div class="meta">
            <time>{{article.createdAt}}</time>
          </div>
          <h1 class="list-title" v-text="article.title"></h1>
          <p class="list-abstract">{{article.abstract}}</p>
        </router-link>
        <router-link :to="{name: 'article', params: {id: article.objectId}}" class="continue-link">继续阅读>></router-link>
      </li>
      <li class="loading-area"
        v-infinite-scroll="getList"
          infinite-scroll-disabled="busy"
          infinite-scroll-distance="2">
        <vLoading v-if="!isComplete"/>
        <p class="finish" v-else>没有更多了</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'article-list',
  components: {
    vLoading: () => import ('../components/loading')
  },
  computed: {
    articleList () {
      return this.$store.state.list.listInfo
    },
    isComplete () {
      return this.$store.state.list.isComplete
    },
    isFetching () {
      return this.$store.state.list.isFetching
    },
    busy() {
      return this.isFetching || this.isComplete
    }
  },
  created () {
    this.getList();
  },
  methods: {
    getList() {
        this.$store.dispatch('getArticleList', 10);
    }
  }

}
</script>

<style scoped>
  #content {
    padding-left: 0;
  }
  .article-wrapper {
    padding-bottom: 30px;
    border-bottom: 1px solid #ddd;
    border-top: 1px solid #fff;
    position: relative;
    margin-bottom: 30px;
  }

  .meta {
    position: relative;
    float: right;
    display: inline-block;
    color: #999;
  }

  a.continue-link {
    display: inline-block;
    color: #00b7ff;
    margin-top: 0.5em;
  }

  a.continue-link:visited {
    color: #aaa;
  }

  h1.list-title {
    font-size:2em;
    font-weight: 300;
    line-height: 35px;
    margin-top: 0;
    margin-bottom: 25px;
  }
  .list-abstract {
    font-size: 0.9em;
    opacity: 0.9;
  }
  p.finish {
    color: #999999;
    text-align: center;
    font-weight: 500;
    margin-top: -5px;
  }

  .loading-area {
    padding-bottom: 0;
    margin-bottom: 0;
  }

  ul {
    list-style-type: none;
  }
  a, p {
    color: #333;
    text-decoration: none;
  }

  @media (max-width: 992px) {
    .article-wrapper {
      padding-bottom: 20px;
      margin-bottom: 20px;
    }
    h1.list-title {
      font-size: 1.6em;
      line-height: 25px;
    }
    .meta {
      display: none;
    }
  }
</style>
