<template>
  <blog-post id="rend">
    <h2 slot="header">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci autem consequuntur debitis, deserunt distinctio dolorem earum et facilis harum in inventore iste non odit pariatur porro repudiandae tempore, ullam voluptatem.</h2>
    
    <div>
      
      Lorem ipsum dolor sit amet, consectet3ur adipisicing elit. Accusantium alias asperiores at, corporis cum enim est inventore molestiae mollitia, nisi odit officiis perspiciatis quaerat quam quasi quis rem vel voluptatum!
    </div>
    
    <p slot="footer">
      Lorem ipsum 1dolor sit amet, consectetur adi2pisicing elit. Ab consectetur consequatur deserunt dolorum, ducimus, et illum ipsa modi mollitia nemo nobis nostrum officia optio3 quam ratione reiciendis sequi. Ab, repellat.</p>
    
    
    <button @click="get">ajax</button>
    <p>{{msg}}</p>
  </blog-post>
</template>

<script>
  import Vue from 'vue'
  import Axios from 'axios'
  
  Vue.component('blog-post', {
    render: function(createElement) {
      return createElement('div', [
        createElement('header', this.$slots.header),
        createElement('main', this.$slots.default),
        createElement('footer', this.$slots.footer)
      ])
    }
  })
  
  export default ({
    data() {
      return {
        msg: ''
      }
    }, methods: {
      get() {
        Axios.get('/hello.txt')
          .then(res => this.msg = res.data)
          .catch(err => console.log(err))
      }
    }
  })

</script>

<style>
</style>
