<template>
  <div class="main-wrapper">
    <div class="logo-wrapper" id="profilepic">
      <!--这里使用背景图片的方式来进行填充-->
      <a href="/" aria-label="home" :style="this.logoSetting"></a>
    </div>
    <h1>
      <a href="/">{{title}}</a>
    </h1>
    <p>{{subtitle}}</p>
    <nav id="main-nav">
      <ul>
        <li v-for="link in navList">
          <router-link :to="link.path">
            <span>{{link.text}}</span>
          </router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
    export default {
      name: "sidebar",
      props: ['logo', 'title', 'subtitle', 'navList'],
      computed: {
        logoSetting(){
          return 'background-image: url(' + this.logo + ')';
        }
      }
    }
</script>

<style scoped>
  /*类*/
.main-wrapper {
  width: 100%;
  line-height: 30px;
  height: auto;
  border-bottom: none;
  padding: 30px 0;
  margin-left: 20%;

}

#profilepic a{
  display:block;
  width:160px;
  height:160px;
  border-radius:50%;
  background-size: 100% 100%;
  margin: 10px 0 40px -15px

}
  /*标签*/
a, p {
  color: #fff;
  text-decoration: none;
  text-shadow: 0 1px 1px #aaa;
}
h1 {
  font-weight: 300;
  font-size: 30px;
  float: none;
}
ul {
  margin-top: 0;
  list-style-type: none;
  padding-left: 0;
  line-height: 35px;
}
/*id*/
  #main-nav {
    margin-left: 0;
    margin-top: 15px;
  }

  #main-nav ul li {
    display: block;
    position: relative;
  }
</style>
