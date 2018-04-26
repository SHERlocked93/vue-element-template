<template>
  <div>
    <button @click='level = 0'>1</button>
    <button @click='level = 1'>2</button>
    <button @click='level = 2'>3</button>
    <button @click='level = 3'>4</button>
    <button @click='level = 4'>5</button>
    <button @click='level = 5'>6</button>
    <hr>
    <child :level="level" v-bind='$props'>Hello world!</child>
  </div>
</template>

<script type='text/javascript'>
  import Xixi from './Xixi'
  import Haha from './Haha'
  
  export default {
    name: 'hehe',
    components: {
      child: {
        render(h) {
          const tag = ['xixi', 'haha'][this.level]
          return h(tag, this.$slots.default)
        },
        props: { level: { type: Number, required: true } },
        components: { Xixi, Haha }
      }
    },
    data() {
      return {
        level: 0
      }
    }
  }

</script>
