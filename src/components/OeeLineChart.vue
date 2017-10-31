<template>
  <div class='oee-line' style='height: 500px;'></div>
</template>

<script type='text/javascript'>
  /* eslint-disable */
  import { oeeAnalyze } from "../api/homepage"
  import Echarts from "echarts"
  
  export default {
    props: ['oeeTimeSpan'],
    data() {
      return { screenWidth: document.body.clientWidth }
    },
    methods: {
      /**
       * 返回Echart图表实例
       */
      chartInstance() {
        const oeeLine = document.getElementsByClassName("oee-line")[0]
        const myChart = Echarts.init(oeeLine)
        return function() {return myChart}()
      },
      /**
       * 更新oee图表数据
       * @param oeeTimeSpan:图表时间范围
       */
      oeeChartDataFetch(oeeTimeSpan) {
        oeeAnalyze(oeeTimeSpan).then(res => {
            const myChart = this.chartInstance()
            myChart.hideLoading()
            myChart.setOption({
              xAxis: {
                data: res.data.xAxis
              },
              series: [{
                name: res.data.category,
                data: res.data.yAxis
              }]
            })
          })
          .catch(err => console.log(err))
      }
    },
    computed: {},
    mounted() {
      const oeeContainer = document.getElementsByClassName("hp-oee-chart")[0]
      const myChart = this.chartInstance()
      
      myChart.setOption({
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
              color: "#aaa",
              type: "dotted"
            }
          }
        },
        series: [
          {
            name: "OEE",
            type: "line",
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
          }
        ],
        color: ["#70bf41"]
      })
      myChart.showLoading()
      this.oeeChartDataFetch(this.oeeTimeSpan)
      
      myChart.resize({
        width: oeeContainer.clientWidth,
        height: oeeContainer.clientHeight
      })
      
      window.onresize = function() {
        setTimeout(() => {
          myChart.resize({
            width: oeeContainer.clientWidth,
            height: oeeContainer.clientHeight
          })
        }, 400)
      }
    },
    watch: {
      oeeTimeSpan: function() {
        const myChart = this.chartInstance()
        myChart.showLoading()
        this.oeeChartDataFetch(this.oeeTimeSpan)
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .oee-line {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
