<template>
  <div>
    <h3>这是新闻</h3>
    <ul>
      <li v-for="val in news">{{val}}</li>
    </ul>
    
    <button @click="get">mock</button>
    <p>{{cdata}}</p>
  </div>
</template>

<script>
  import Mock from 'mockjs'
  
  export default {
    name: 'news',
    data() {
      return {
        news: ['雪铁龙天逸变“魔毯”？', '五菱宏光S3配置',
          '新高尔夫R:8月25日上市', '国产沃尔沃全新XC60申报图',
          '景逸X6/X5 1.5T即将上市!', '阿斯顿·马丁新车型官图'],
        cdata: ''
      }
    },
    methods: {
      get() {
        const data = Mock.mock({
          'number1|1-100.1-10': 1,
          'number2|123.1-10': 1,
          'number3|123.3': 1,
          'number4|123.10': 1.123,
          'number5|1-1': true,
          'number6': '@First',
          'number7': '@name',
          'number8': '@LAST',
          'number9': '@email',
          'number10': '@guid',
          'number11': '@region @areas',
          'number12': Mock.Random.county(true),
          'number20': '@domain',
          'meme': {
            'list|1-10': [{
              'id|+1': 1,
              'email': '@EMAIL',
              'data': '@date',
              'datetime': '@datetime',
              'image': '@image',
              'juzi': '@csentence',
              'title': '@ctitle',
              'name': '@cfirst@clast',
              'place': '@region @province @city @county @zip',
              'heplace': '@address'
            }]
          }
        })
        this.cdata = JSON.stringify(data, null, 4)
        console.log(this.cdata)
      }
    }
  }
</script>

<style rel='stylesheet'></style>
