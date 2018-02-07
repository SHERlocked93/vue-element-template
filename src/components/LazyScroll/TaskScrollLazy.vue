/**
* 创建于 2018/2/2
* 作者: Qianyu
* 功能: 首页-任务单修改记录-任务单修改记录下拉懒加载组件
*/

<template>
  <Scroll :on-reach-edge="handleReachBottom"
          height='375'
          class='scroll-container'
          :distance-to-edge='14'
          v-loading='scrollLoading'
          element-loading-text="加载中">
    
    <div class='ts-inner-container'>
      <div v-for="item in DataList" class='ts-card'
           :key="item.id">
        
        <span class='ts-card-item'>{{ item.taskCode }}</span>
        <span class='ts-card-item'>{{ item.status|taskStatusFilter }}</span>
        <span class='ts-card-item'>{{ item.createName }}</span>
        <span class='ts-card-item'>{{ item.createTime }}</span>
        <span class='ts-card-item ts-card-item-content'>{{ item.content }}</span>
      </div>
    </div>
  </Scroll>
</template>

<script>
  import * as Task from 'api/Task'
  import _ from 'lodash'
  
  export default {
    name: 'TaskScrollLazy',
    data() {
      return {
        scrollLoading: true,     // 加载中状态
        DataList: [],            // 警报列表(原始数据)
        DataListNew: [],         // 往下拉新加入的警报列表
        thisPage: 1,
        noDataBanner: true       // 是否显示没数据横幅
      }
    },
    methods: {
      /**
       * 滚轮滚到底部触发的事件
       */
      handleReachBottom() {
        Task.taskOperateLog(++this.thisPage).then(res => {
          this.$nextTick(() => {
            this.DataListNew = res.data['dataList']
            this.DataListNew.forEach((currValue, index, array) => {
              !this.DataList.find(T => T.id === currValue.id) &&
              this.DataList.push(currValue)
            })
            if (this.DataListNew.length === 0) {
              this.thisPage--
              this.$message({ type: 'info', message: `没有更多数据..` })
            }
          }, 1000)
        }).catch(err => {
          this.thisPage--
          this.$message({ type: 'error', message: `获取警报出错: ${err}` })
        })
      },
      
      /**
       * 延时获取远程搜索数据
       */
      getInfo: _.debounce(function() {
        this.fillData()
      }, 500),
      
      /**
       * 获取并填充数据
       * @param info 要传递的模糊查询 info
       */
      fillData(info) {
        this.scrollLoading = true
        Task.taskOperateLog().then(res => {
          setTimeout(() => {
            this.DataList = res.data['dataList']
            this.scrollLoading = false
          }, 400)
        }).catch(err => {
          this.scrollLoading = false
          this.$message({
            type: 'error',
            message: `error: ${err}`
          })
        })
      }
      
    },
    mounted() {
      this.fillData()
    },
    watch: {
      searchAlarmInfo: function() {
        this.DataList = []
        this.thisPage = 1
        this.getInfo()
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  // 组件容器
  .scroll-container {
    
    // 组件container
    .ts-inner-container {
      .ts-card {
        height: 40px;
        border-radius: 3px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-left: 12px;
        padding-right: 18px;
        position: relative;
        min-width: 560px;
        
        .ts-card-item {
          min-width: 100px;
          text-align: center;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .ts-card-item-content {
          min-width: 200px;
          flex-grow: 1;
        }
        
        &:nth-child(2n) {
          background-color: #f8f8f8;
        }
      }
    }
  }
</style>
