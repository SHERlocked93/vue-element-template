<template>
  <Scroll :on-reach-bottom="handleReachBottom" height='500' loading-text='加载中...'>
    <p class='al-card-answer' v-show='answer!==""'>{{answer}}</p>
    <div v-for="item in DataList" :key="item.alarmId" class='al-card'>
      <span class='al-card-item'>{{ item.time }}</span>
      <span class='al-card-item'>{{ item.alarmId }}</span>
      <span class='al-card-item'>{{ item.message }}</span>
      <button @click='handleCancelAlerm(item.alarmId)' class='al-card-btn'><i class='el-icon-my-turnoff'></i></button>
    </div>
    <Spin size="large" fix v-show="spinShow"></Spin>
  </Scroll>
</template>

<script>
  import { alarmInfo, confirmAlarm } from '@/api/dataanalysis'
  import _ from 'lodash'
  
  export default {
    props: ['searchAlermInfo'],
    data() {
      return {
        spinShow: false,   // 加载中状态
        DataList: [],      // 警报列表(原始数据)
        alermPage: 1,
        answer: ''
      }
    },
    computed: {
      /**
       *  警报列表(filtered)
       */
      DataListFiltered() {
        if (this.searchAlermInfo) {
          return this.DataList.filter(T => T.time.includes(this.searchAlermInfo) || T.message.includes(this.searchAlermInfo)).sort((A, B) => A.alarmLevel - B.alarmLevel)
        } else return this.DataList.sort((A, B) => A.alarmLevel - B.alarmLevel)
      }
    },
    methods: {
      /**
       * 滚轮滚到底部触发的事件
       */
      handleReachBottom() {
        alarmInfo(this.searchAlermInfo, ++this.alermPage).then(res => {
          setTimeout(() => {
            res.data['dataList'].forEach((currValue, index, array) => {
              this.DataList.push(currValue)
            })
          }, 400)
        }).catch(err => {
          this.$message({
            type: 'error',
            message: `获取警报出错: ${err}`
          })
        })
      },
      
      /**
       * alarm card点击x的事件
       * @param alarmId: 点击的alarm card的ID
       */
      handleCancelAlerm(alarmId) {
        this.$alert(`是否确定删除警报: ${alarmId}`, '警报删除', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {
          confirmAlarm(alarmId)
            .then(res => {
              this.DataList.splice(this.DataList.indexOf(
                this.DataList.filter(T => T.alarmId === alarmId)[0]
              ), 1)
              this.$message({ type: 'success', message: `删除成功 ${res}` })
            })
            .catch(err => this.$message({ type: 'error', message: `删除出错 ${err}` }))
        }).catch(err => {
          this.$message({ type: 'info', message: `已取消删除 ${err}` })
        })
      },
      
      /**
       * 延时获取数据
       */
      getInfo: _.debounce(function() {
        alarmInfo(this.searchAlermInfo, this.alermPage)
          .then(res => this.DataList = res.data['dataList'])
          .catch(err => {
            this.$message({
              type: 'error',
              message: `error: ${err}`
            })
          })
      }, 1000)
    },
    mounted() {
      this.spinShow = true
      alarmInfo().then(res => {
        setTimeout(() => {
          this.DataList = res.data['dataList']
          this.spinShow = false
        }, 400)
      }).catch(err => console.log(err))
    },
    watch: {
      searchAlermInfo: function() {
        this.DataList = []
        this.alermPage = 1
        this.getInfo()
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .al-card {
    height: 40px;
    border-radius: 3px;
    display: flex;
    align-items: center;
    font-size: 14px;
    padding-left: 15px;
    padding-right: 18px;
    position: relative;
    .al-card-answer {
      text-align: center;
    }
    .al-card-item {
      margin-right: 15px;
    }
    &:nth-child(2n) {
      background-color: #f8f8f8;
    }
    .al-card-btn {
      color: #d10921;
      width: 30px;
      height: 30px;
      text-align: center;
      position: absolute;
      right: 18px;
      background-color: transparent;
      border: 0;
      font-weight: 800;
    }
  }
  
  .al-card-level1 {
    background-color: darkorange;
  }
  
  .al-card-level2 {
    background-color: #ffc576;
  }
  
  .al-card-level3 {
    background-color: lightgray;
  }
  
  .al-card-level4 {
    background-color: grey;
  }
</style>
