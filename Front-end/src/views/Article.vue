<template>
  <div id="article-wrapper" v-loading.lock="loading">
    <div class="article-header" :style="'background-image: url(' + article.coverImg + ')'">
    </div>
    <div class="meta">
      <time>{{article.createdAt}}</time>
    </div>
    <h1>{{article.title}}</h1>
    <div class="article-content markdown-body" v-html="content">
    </div>

    <!--<Comment/>-->
  </div>
</template>

<script>
  import Prism from 'prismjs'
  import 'prismjs/themes/prism-coy.css'
  import 'github-markdown-css/github-markdown.css'
  import marked from 'marked'
  import Vuex from 'vuex'
  marked.setOptions({
    highlight: (code) => Prism.highlight(code, Prism.languages.javascript)
  })
  export default {
      name: "article",
    // components: {
    //     'Comment': require('./components/Comment')
    // }
    computed: Vuex.mapState({
      article: state => state.article,
      loading: state => state.article.loading,
      content() {
        let _content = this.article.content;
        marked(_content, (err, content) => {
          if(!err) {
            _content = content;
          }
        });
        return _content;
      }
    }),

    created() {
        this.$store.dispatch('getArticle', this.$route.params.id);
    },
    beforeDestroy() {
        this.$store.dispatch('clearArticle')
    }
  }
</script>

<style scoped lang="scss">
  .meta {
    position: relative;
    float: right;
    display: inline-block;
    color: #999;
  }
  h1 {
    font-size:2em;
    font-weight: 300;
    line-height: 35px;
    margin-top: 2rem;
    margin-bottom: 2rem;
  }
</style>
