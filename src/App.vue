<template>
  <div id="app">
    <img src="./assets/logo.png">
    <p>{{msg}}</p>
    <ul>
      <li>
        <router-link to="/home">主页</router-link>
      </li>
      <li>
        <router-link to="/news">新闻</router-link>
      </li>
      <li>
        <router-link to="/render">Render</router-link>
      </li>
      <li>
        <router-link to="/vuextest">vuetest</router-link>
      </li>
      <li>
        <router-link to="/vuextest2">vuetest2</router-link>
      </li>
    </ul>
    <div>
      <transition enter-active-class="animated tada"
                  leave-active-class="animated fadeOutRight">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data() {
      return { msg: 'WELCOME' }
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
  
  h1, h2 {
    font-weight: normal;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  li {
    display: inline-block;
    margin: 0 10px;
  }
  
  a {
    color: #42b983;
  }
</style>
