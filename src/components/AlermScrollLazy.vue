<template>
  <Scroll :on-reach-bottom="handleReachBottom" height='500' loading-text='加载中...'>
    <div v-for="item in DataList" :key="item.alermId" class='al-card'>
      <span class='al-card-item'>{{ item.time }}</span>
      <span class='al-card-item'>{{ item.alermId }}</span>
      <span class='al-card-item'>{{ item.message }}</span>
      <button @click='handleCancelAlerm(item.alermId)' class='al-card-btn'><i class='el-icon-my-x'></i></button>
    </div>
    <Spin size="large" fix v-show="spinShow"></Spin>
  </Scroll>
</template>
<script>
  import { alermInfo } from '../api/homepage'
  
  export default {
    props: ['searchAlermInfo'],
    data() {
      return {
        spinShow: false,   // 加载中状态
        DataList: []       // 警报列表
      }
    },
    methods: {
      /**
       * 滚轮滚到底部触发的事件
       */
      handleReachBottom() {
        const lastAlermId = this.DataList.length > 0
          ? this.DataList[this.DataList.length - 1]['alermId']
          : undefined
        alermInfo(lastAlermId, this.searchAlermInfo).then(res => {
          setTimeout(() => {
            res.data['dataList'].forEach((currValue, index, array) => {
              this.DataList.push(currValue)
            })
          }, 200)
          this.spinShow = false
        }).catch(err => {
          this.$message({
            type: 'error',
            message: `获取警报出错: ${err}`
          })
          this.spinShow = false
        })
      },
      /**
       * alerm card点击x的事件
       * @param alermId: 点击的alerm card的ID
       */
      handleCancelAlerm(alermId) {
        this.$alert(`是否确定删除警报: ${alermId}`, '警报删除', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      }
    },
    mounted() {
      this.spinShow = true
      alermInfo().then(res => {
        setTimeout(() => {
          this.DataList = res.data['dataList']
          this.spinShow = false
        }, 400)
      }).catch(err => console.log(err))
    },
    watch: {
      /**
       * 如果查询框的内容改变，触发的事件
       * @param val:当前内容
       * @param oldVal:旧内容
       */
      searchAlermInfo: function(val, oldVal) {
        this.spinShow = true
        this.DataList = []
        console.log(`警报搜索 new: ${val}, old: ${oldVal}`)
        this.handleReachBottom(val)
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
  
  .al-card-state1 {
    background-color: darkorange;
  }
  
  .al-card-state2 {
    background-color: #ffc576;
  }
  
  .al-card-state3 {
    background-color: grey;
  }
</style>
