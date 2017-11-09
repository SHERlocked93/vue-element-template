<template>
  <div id='barchart' style="height:800px"></div>
</template>

<script type='text/javascript'>
  import Echarts from 'echarts'
  
  export default {
    data() {
      return {}
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
    methods: {
      /**
       * 返回Echart图表实例
       */
      getChartInstance() {
        const lineChart = document.getElementById('barchart')
        let myChart
        return function() {
          return myChart || (myChart = Echarts.init(lineChart))
        }
      }
    },
    mounted() {
      const container = document.getElementById('barchart') || { clientHeight: 500, clientWidth: 'auto' }
      const that = this
      this.myChart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: { type: 'cross' }
        },
        toolbox: {
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        legend: {
          data: ['蒸发量', '降水量', '平均温度']
        },
        xAxis: [
          {
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '水量',
            min: 0,
            max: 250,
            interval: 50,
            axisLabel: {
              formatter: '{value} ml'
            }
          },
          {
            type: 'value',
            name: '温度',
            min: 0,
            max: 25,
            interval: 5,
            axisLabel: {
              formatter: '{value} °C'
            }
          }
        ],
        series: [
          {
            name: '蒸发量',
            type: 'bar',
            data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
          },
          {
            name: '降水量',
            type: 'bar',
            data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
          },
          {
            name: '平均温度',
            type: 'line',
            yAxisIndex: 1,
            data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
          }
        ]
      })
      
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
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
