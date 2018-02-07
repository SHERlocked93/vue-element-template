<template>
  <section class="app-main">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"/>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" :key="key"/>
  </section>
</template>

<script>
  export default {
    name: 'AppMain',
    computed: {
      key() {
        return this.$route.name !== undefined
               ? this.$route.name + +new Date()
               : this.$route + +new Date()
      }
    }
  }
</script>

<style rel='stylesheet'>
  .app-main {
    margin-top: 50px;
    min-width: 1000px;
    padding: 20px;
  }
</style>
