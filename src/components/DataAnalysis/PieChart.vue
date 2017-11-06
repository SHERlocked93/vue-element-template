<template>
  <div class='bar-chart-component' style='height:500px;'></div>
</template>

<script type='text/javascript'>
  //  import * as API from '@/api/dataanalysis'
  import Echarts from 'echarts'
  
  export default {
    props: ['timeSpan', 'usageScene', 'graphType', 'isChartDataExist', 'chartDataPie'],
    // usageScene为使用场景，对应api，graphType为线型,如果chartData不为空则取其为图表数据
    data() {
      return { screenWidth: document.body.clientWidth }
    },
    methods: {
      /**
       * 返回Echart图表实例
       */
      getChartInstance() {
        const pieChart = document.getElementsByClassName('bar-chart-component')[0]
        let myChart
        return function() {
          return myChart || (myChart = Echarts.init(pieChart))
        }
      },
      
      /**
       * 更新饼图表数据
       * @param timeSpan:图表时间范围
       */
      pieChartDataFetch(timeSpan) {
        if (!this.isChartDataExist) {
          alert('饼图')
        } else {
          if (this.chartDataPie.dataList) {
            this.fillChartData(this.chartDataPie.dataList)
          }
        }
      },
      
      /**
       * 填充图表数据
       * @param dataList
       */
      fillChartData(dataList) {
        const legendData = dataList.map(x => x.name)
        this.myChart.hideLoading()
        this.myChart.setOption({
          legend: {
            data: legendData
          },
          series: [{
            type: 'pie',
            data: dataList
          }]
        })
      }
      
    },
    computed: {
      /**
       * 图表实例的闭包
       * @returns {*}
       */
      chartInstance() {
        return this.getChartInstance()
      },
      myChart() {
        return this.chartInstance()
      }
    },
    mounted() {
      const barChart = document.getElementsByClassName('bar-chart-component')[0] || { clientHeight: 500, clientWidth: 'auto' }
      const that = this
      
      this.myChart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: []
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ],
        color: ['#f8e81c', '#f6a623', '#d0011b', '#bd0fe1', '#4285f4', '#7ed321', '#8b8900', '#8b572a', '#521e0d']
      })
      this.myChart.showLoading()
//      this.fillChartData(this.chartDataPie)
      this.pieChartDataFetch(this.timeSpan)
      
      this.myChart.resize({
        width: barChart.clientWidth,
        height: barChart.clientHeight
      })
      
      window.onresize = function() {
        setTimeout(() => {
          that.myChart.resize({
            width: barChart.clientWidth,
            height: barChart.clientHeight
          })
        }, 400)
      }
    },
    watch: {
      timeSpan() {
        this.myChart.showLoading()
        this.pieChartDataFetch(this.timeSpan)
      },
      chartDataPie() {
        this.fillChartData(this.chartDataPie.dataList)
      }
    }
  }
</script>

<style rel='stylesheet/scss' lang='scss' scoped>
  .bar-chart {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
