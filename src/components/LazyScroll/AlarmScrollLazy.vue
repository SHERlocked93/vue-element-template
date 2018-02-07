/**
* 创建于 2018/2/2
* 作者: Qianyu
* 功能: 首页-警报-警报下拉懒加载组件
*/

<template>
  <Scroll :on-reach-edge="handleReachBottom"
          height='375'
          class='scroll-container'
          :distance-to-edge='14'
          v-loading='scrollLoading'
          element-loading-text="加载中">
    
    <div class='al-inner-container'>
      <div v-for="item in DataList" class='al-card'
           :key="item.id+item.code">
        
        <span class='al-card-item'>{{ item.code }}</span>
        <span class='al-card-item'>{{ item.type|alarmTypeFilter }}</span>
        <span class='al-card-item al-card-item-content'>{{ item.content }}</span>
        <span class='al-card-item'>{{ item.createName }}</span>
        <span class='al-card-item'>{{ item.createTime }}</span>
        <button @click='handleCancelAlerm(item.id)' class='al-card-btn'
                :disabled='!closeAuth'
                :class='{"al-card-btn-noauth":!closeAuth}'>
          <i class='el-icon-my-turnoff'></i>
        </button>
      </div>
    </div>
  </Scroll>
</template>

<script>
  import * as Alarm from 'api/alarm'
  import _ from 'lodash'
  
  export default {
    name: 'AlarmScrollLazy',
    props: ['queryStrAlarmReal', 'closeAuth'],
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
        Alarm.alarmInfo(this.queryStrAlarmReal, 0, ++this.thisPage, 10).then(res => {
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
       * alarm card点击x的事件
       * @param alarmId: 点击的alarm card的ID
       */
      handleCancelAlerm(alarmId) {
        const alarmCode = this.alarmId2Code(alarmId)
        this.$alert(`是否确定删除警报: ${alarmCode}`, '警报删除', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {                // 确定删除警报
          Alarm.alarmClose(alarmId)
            .then(res => {
              this.DataList.splice(this.DataList.indexOf(
                this.DataList.filter(T => T.id === alarmId)[0]
              ), 1)
              this.$message({ type: 'success', message: `确认成功: ${alarmCode}` })
            })
            .catch(err => this.$message({ type: 'error', message: `确认出错 ${err.message}` }))
        }).catch(err => {
          this.$message({ type: 'info', message: `已取消删除 ${err}` })
        })
      },
      
      /**
       * 延时获取远程搜索数据
       */
      getInfo: _.debounce(function() {
        this.fillData(this.searchAlarmInfo)
      }, 500),
      
      /**
       * 获取并填充数据
       * @param info 要传递的模糊查询 info
       */
      fillData(info) {
        this.scrollLoading = true
        Alarm.alarmInfo(info, 0).then(res => {
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
      },
      
      /**
       * 找到 alarmId 对应的 alarmCode
       * @param alarmId 输入alarmId
       * @returns {*} 找到 alarmCode
       */
      alarmId2Code(alarmId) {
        return alarmId && this.DataList
          .find(T => T.id === alarmId)
          .code
      }
    },
    mounted() {
      this.fillData()
    },
    watch: {
      queryStrAlarmReal: function(val) {
        console.log(val, 'watcher in alarmScrollLazy')
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
    .al-inner-container {
      .al-card {
        height: 40px;
        border-radius: 3px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-left: 12px;
        padding-right: 18px;
        position: relative;
        min-width: 560px;
        
        .al-card-item {
          min-width: 100px;
          text-align: center;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .al-card-item-content {
          min-width: 200px;
          flex-grow: 1;
        }
        
        &:nth-child(2n) {
          background-color: #f8f8f8;
        }
        .al-card-btn {
          cursor: pointer;
          color: #d10921;
          width: 30px;
          height: 30px;
          margin-left: 10px;
          text-align: center;
          background-color: transparent;
          border: 0;
          & i {
            font-weight: 800;
          }
        }
        
        .al-card-btn-noauth {
          color: #9b9b9b;
        }
      }
    }
  }
</style>
