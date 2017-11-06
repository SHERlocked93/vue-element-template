<template>
  <div class='line-chart-component' style='height:500px;'></div>
</template>

<script type='text/javascript'>
  import * as API from '@/api/dataanalysis'
  import Echarts from 'echarts'
  
  export default {
    props: ['timeSpan', 'usageScene', 'graphType', 'isChartDataExist', 'chartDataLine'],
    // usageScene为使用场景，对应api，graphType为线型,如果chartData不为空则取其为图表数据
    data() {
      return {
        screenWidth: document.body.clientWidth
      }
    },
    methods: {
      /**
       * 返回Echart图表实例
       */
      getChartInstance() {
        const lineChart = document.getElementsByClassName('line-chart-component')[0]
        let myChart
        return function() {
          return myChart || (myChart = Echarts.init(lineChart))
        }
      },
      
      /**
       * 更新oee图表数据
       * @param timeSpan:图表时间范围
       */
      chartDataFetch(timeSpan) {
        if (!this.isChartDataExist) {
          API[this.usageScene](timeSpan).then(res => {
            this.fillChartData(
              res.data.lineChart.xAxis.data,
              res.data.lineChart.series[0]
            )
          }).catch(err => console.log(err))
        } else {
          if (this.chartDataLine.series) {
            this.fillChartData(this.chartDataLine.xAxis.data, this.chartDataLine.series[0])
          }
        }
      },
      
      /**
       * 填充图表数据
       * @param chartDataX
       * @param chartDataY
       */
      fillChartData(chartDataX, chartDataY) {
        this.myChart.hideLoading()
        this.myChart.setOption({
          xAxis: {
            data: chartDataX
          },
          series: [{
            type: this.graphType,
            name: chartDataY.name,
            data: chartDataY.data
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
      myChart() { return this.chartInstance() }
    },
    mounted() {
      const container = document.getElementsByClassName('line-chart-component')[0] || { clientHeight: 500, clientWidth: 'auto' }
      const that = this
      
      this.myChart.setOption({
        tooltip: {},
        grid: {
          top: 30,
          bottom: 30,
          left: 70,
          right: 50
        },
        xAxis: {
          data: []
        },
        yAxis: {
          axisLine: { show: false },
          splitLine: {
            lineStyle: {
              color: '#aaa',
              type: 'dotted'
            }
          }
        },
        series: [{
          type: 'line',
          data: [],
          itemStyle: {
            normal: {
              borderWidth: 7
            }
          },
          lineStyle: {
            normal: {
              width: 3
            }
          },
          markLine: {}
        }],
        color: ['#70bf41']
      })
      this.myChart.showLoading()
      this.chartDataFetch(this.timeSpan)
      
      this.myChart.resize({
        width: container.clientWidth,
        height: container.clientHeight
      })
      
      window.onresize = function() {
        setTimeout(() => {
          that.myChart.resize({
            width: container.clientWidth,
            height: container.clientHeight
          })
        }, 400)
      }
    },
    watch: {
      timeSpan() {
        this.myChart.showLoading()
        this.chartDataFetch(this.timeSpan)
      },
      chartDataLine() {
        this.chartInstance().showLoading()
        this.chartDataFetch(this.timeSpan)
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .line-chart {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
