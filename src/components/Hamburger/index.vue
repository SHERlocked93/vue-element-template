<template>
  <div>
    <i class='el-icon-my-cebianlan hamburger'
       :class="{'is-hamberger-active':isActive}"
       @click="toggleClick"></i>
  </div>
</template>

<script>
  export default {
    name: 'Hamburger',
    props: {
      isActive: {
        type: Boolean,
        default: false
      },
      toggleClick: {
        type: Function,
        default: null
      }
    }
  }
</script>

<style scoped>
  .hamburger {
    width: 20px;
    height: 20px;
    font-size: 20px;
    transform: rotate(0deg);
    transition: .38s;
    transform-origin: 50% 50%;
    cursor: pointer;
    display: inline-block;
    position: relative;
    top: 1px;
  }
  
  .hamburger.is-hamberger-active {
    transform: rotate(90deg);
  }
</style>
