<template>
  <div class='qua-aly'>
    <!--<editor-fold desc="查询框">-->
    <div class='qua-query'>
      <el-row :gutter='20' class='qua-query-box-row'>
        <el-col :span="6" :offset="6" class='qua-query-eqp'>
          <div class='qua-query-eqp-box'>
            <p class='qua-query-title'>产品编号</p>
            <el-autocomplete v-model="queryForm.eqpId"
                             :fetch-suggestions="querySearchAsync"
                             placeholder="请输入内容"
                             @select="handleSelect"
                             class="qua-query-eqp-select"
            ></el-autocomplete>
          </div>
        </el-col>
        
        <el-col :span="6" class='qua-query-timespan'>
          <p class='qua-query-title'>时间范围</p>
          <el-select v-model="queryForm.timeSpan" placeholder="时间范围" class="qua-query-timespan-select">
            <el-option label="最近一周" value="7"></el-option>
            <el-option label="最近一个月" value="30"></el-option>
            <el-option label="最近三个月" value="90"></el-option>
            <el-option label="最近半年" value="180"></el-option>
            <el-option label="最近一年" value="365"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row class='qua-query-button-row'>
        <div class='qua-query-button'>
          <el-button type='primary' class='qua-query-btn'>查询</el-button>
          <el-button type='primary' class='qua-reset-btn'>重置</el-button>
        </div>
      </el-row>
    </div>
    <!--</editor-fold>-->
    
    
    <div class='qua-row'>
      <el-row class='qua-ranklist'>
        <p class='qua-data-title'>最新更新时间 2017-10-20 08:10:30</p>
      </el-row>
      <el-row class='qua-data-row'>
        <el-col :span='24' class='qua-data'>
          <el-table :data="OeeRateList" border stripe style="width: 100%" class="qua-data-table">
            <el-table-column fixed prop="equipCode" label="机台" sortable='true' header-align='center' align='center' width="180"></el-table-column>
            <el-table-column prop="workShopCode" label="工作中心" header-align='center' align='center'></el-table-column>
            <el-table-column prop="shopName" label="车间" header-align='center' align='center'></el-table-column>
            <el-table-column prop="timeRate" label="时间稼动率" header-align='center' align='center' sortable='true'></el-table-column>
            <el-table-column prop="performanceRate" label="性能稼动率" header-align='center' align='center' sortable='true'></el-table-column>
            <el-table-column prop="goodRate" label="良品率" header-align='center' align='center' sortable='true'></el-table-column>
            <el-table-column prop="oee" label="OEE" header-align='center' align='center' sortable='true'></el-table-column>
          </el-table>
          <el-pagination @size-change="handleSizeChange"
                         @current-change="handleCurrentChange"
                         :current-page="currentPage"
                         :page-sizes="[10, 20, 30, 50, 80, 100]"
                         :page-size="pageSize"
                         layout="total, sizes, prev, pager, next, jumper"
                         :total="total"
                         class='qua-form-paginate'>
          </el-pagination>
        </el-col>
      </el-row>
      
      <el-row :guter='10' class='qua-chart'>
        <el-col :span='12'>
          <p class='qua-chart-title'>{{timeSpanState}}OEE变化图</p>
          <line-chart :timeSpan='queryForm.timeSpan'
                      :usageScene='"getOeeTable"'
                      :graphType='"bar"'
                      :chartDataLine='chartDataLine'
                      :isChartDataExist='true'>
          </line-chart>
        </el-col>
        
        <el-col :span='12'>
          <p class='qua-chart-title'>不良原因分布</p>
          <pie-chart :chartDataPie='chartDataPie' :isChartDataExist='true'></pie-chart>
        </el-col>
      </el-row>
    
    </div>
  </div>
</template>

<script type='text/javascript'>
  import * as API from '@/api/dataanalysis'
  import LineChart from '@/components/DataAnalysis/LineChart.vue'
  import PieChart from '@/components/DataAnalysis/PieChart.vue'
  
  export default {
    data() {
      return {
        queryForm: {
          eqpId: '',
          timeSpan: '7'
        },
        currentPage: 1,      // 当前页码
        pageSize: 10,        // 每页条数改变
        total: 20,           // 条数
        restr: [],           // 产品列表
        OeeRateList: [],     // 当前表格数据
        chartDataLine: {},        // 折线图数据
        chartDataPie: {}        // 饼图数据
      }
    },
    components: { LineChart, PieChart },
    computed: {
      timeSpanState() {
        switch (this.queryForm.timeSpan) {
          case '7':
            return '最近一周'
          case '30':
            return '最近一个月'
          case '90':
            return '最近三个月'
          case '180':
            return '最近半年'
          case '365':
            return '最近一年'
          default:
            return ''
        }
      }
    },
    methods: {
      /**
       * xx条/页改变
       * @param val 改变之后的条/页
       */
      handleSizeChange(val) {
        console.log(`page size changed: 每页 ${val} 条`)
        this.pageSize = val
        this.fillChartTable(this.queryForm.timeSpan, this.currentPage, val)
      },
      /**
       * 选择的页码改变
       * @param val 当前页码
       */
      handleCurrentChange(val) {
        console.log(`page num changed: 当前页: ${val}`)
        this.fillChartTable(this.queryForm.timeSpan, this.currentPage, val)
      },
      loadAll() {
        return [
          { 'value': '三全鲜食（北新泾店）', 'address': '长宁区新渔路144号' },
          { 'value': 'Hot honey 首尔炸鸡（仙霞路）', 'address': '上海市长宁区淞虹路661号' },
          { 'value': '新旺角茶餐厅', 'address': '上海市普陀区真北路988号创邑金沙谷6号楼113' },
          { 'value': '泷千家(天山西路店)', 'address': '天山西路438号' },
          { 'value': '胖仙女纸杯蛋糕（上海凌空店）', 'address': '上海市长宁区金钟路968号1幢18号楼一层商铺18-101' },
          { 'value': '贡茶', 'address': '上海市长宁区金钟路633号' },
          { 'value': '豪大大香鸡排超级奶爸', 'address': '上海市嘉定区曹安公路曹安路1685号' },
          { 'value': '茶芝兰（奶茶，手抓饼）', 'address': '上海市普陀区同普路1435号' },
          { 'value': '十二泷町', 'address': '上海市北翟路1444弄81号B幢-107' },
          { 'value': '星移浓缩咖啡', 'address': '上海市嘉定区新郁路817号' },
          { 'value': '阿姨奶茶/豪大大', 'address': '嘉定区曹安路1611号' },
          { 'value': '新麦甜四季甜品炸鸡', 'address': '嘉定区曹安公路2383弄55号' },
          { 'value': 'Monica摩托主题咖啡店', 'address': '嘉定区江桥镇曹安公路2409号1F，2383弄62号1F' },
          { 'value': '浮生若茶（凌空soho店）', 'address': '上海长宁区金钟路968号9号楼地下一层' },
          { 'value': 'NONO JUICE  鲜榨果汁', 'address': '上海市长宁区天山西路119号' },
          { 'value': 'CoCo都可(北新泾店）', 'address': '上海市长宁区仙霞西路' },
          { 'value': '快乐柠檬（神州智慧店）', 'address': '上海市长宁区天山西路567号1层R117号店铺' },
          { 'value': 'Merci Paul cafe', 'address': '上海市普陀区光复西路丹巴路28弄6号楼819' },
          { 'value': '猫山王（西郊百联店）', 'address': '上海市长宁区仙霞西路88号第一层G05-F01-1-306' },
          { 'value': '枪会山', 'address': '上海市普陀区棕榈路' },
          { 'value': '纵食', 'address': '元丰天山花园(东门) 双流路267号' },
          { 'value': '钱记', 'address': '上海市长宁区天山西路' },
          { 'value': '壹杯加', 'address': '上海市长宁区通协路' },
          { 'value': '唦哇嘀咖', 'address': '上海市长宁区新泾镇金钟路999号2幢（B幢）第01层第1-02A单元' },
          { 'value': '爱茜茜里(西郊百联)', 'address': '长宁区仙霞西路88号1305室' },
          { 'value': '爱茜茜里(近铁广场)', 'address': '上海市普陀区真北路818号近铁城市广场北区地下二楼N-B2-O2-C商铺' },
          { 'value': '鲜果榨汁（金沙江路和美广店）', 'address': '普陀区金沙江路2239号金沙和美广场B1-10-6' },
          { 'value': '开心丽果（缤谷店）', 'address': '上海市长宁区威宁路天山路341号' },
          { 'value': '超级鸡车（丰庄路店）', 'address': '上海市嘉定区丰庄路240号' },
          { 'value': '妙生活果园（北新泾店）', 'address': '长宁区新渔路144号' },
          { 'value': '香宜度麻辣香锅', 'address': '长宁区淞虹路148号' },
          { 'value': '凡仔汉堡（老真北路店）', 'address': '上海市普陀区老真北路160号' },
          { 'value': '港式小铺', 'address': '上海市长宁区金钟路968号15楼15-105室' },
          { 'value': '蜀香源麻辣香锅（剑河路店）', 'address': '剑河路443-1' },
          { 'value': '北京饺子馆', 'address': '长宁区北新泾街道天山西路490-1号' },
          { 'value': '饭典*新简餐（凌空SOHO店）', 'address': '上海市长宁区金钟路968号9号楼地下一层9-83室' },
          { 'value': '焦耳·川式快餐（金钟路店）', 'address': '上海市金钟路633号地下一层甲部' },
          { 'value': '动力鸡车', 'address': '长宁区仙霞西路299弄3号101B' },
          { 'value': '浏阳蒸菜', 'address': '天山西路430号' },
          { 'value': '四海游龙（天山西路店）', 'address': '上海市长宁区天山西路' },
          { 'value': '樱花食堂（凌空店）', 'address': '上海市长宁区金钟路968号15楼15-105室' },
          { 'value': '壹分米客家传统调制米粉(天山店)', 'address': '天山西路428号' },
          { 'value': '福荣祥烧腊（平溪路店）', 'address': '上海市长宁区协和路福泉路255弄57-73号' },
          { 'value': '速记黄焖鸡米饭', 'address': '上海市长宁区北新泾街道金钟路180号1层01号摊位' },
          { 'value': '红辣椒麻辣烫', 'address': '上海市长宁区天山西路492号' },
          { 'value': '(小杨生煎)西郊百联餐厅', 'address': '长宁区仙霞西路88号百联2楼' },
          { 'value': '阳阳麻辣烫', 'address': '天山西路389号' },
          { 'value': '南拳妈妈龙虾盖浇饭', 'address': '普陀区金沙江路1699号鑫乐惠美食广场A13' }
        ]
      },
      querySearchAsync(queryString, cb) {
        const restaurants = this.restr
        const results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          cb(results)
        }, 3000 * Math.random())
      },
      createStateFilter(queryString) {
        return (state) => {
          return (state.value.indexOf(queryString.toLowerCase()) === 0)
        }
      },
      handleSelect(item) {
        console.log(`select: ${item}`)
      },
      /**
       * ajax获取数据
       * @param timeSpan 时间间隔
       * @param rows 行数
       * @param page 页码
       */
      fillChartTable(timeSpan, rows, page) {
        API.qualityAnalyze(timeSpan, rows, page).then(res => {
          const qualityTable = res.data.qualityTable
          this.OeeRateList = qualityTable.dataList
          this.total = qualityTable.total
          this.chartDataLine = res.data.yieldChart
          this.chartDataPie = res.data.badReasonChart
        }).catch(err => console.log(`oeeAnalysis - getOeeTable 获取失败：${err}`))
      }
    },
    mounted() {
      this.restr = this.loadAll()
      this.fillChartTable(this.queryForm.timeSpan)
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .qua-aly {
    margin: 0 20px;
    font-family: PingFangSC-Regular, Microsoft Sans Serif, Helvetica, Arial, sans-serif;
    font-size: 16px;
    
    .qua-query, .qua-row {
      background-color: #fff;
      border: 1px solid #d6d6d6;
      border-radius: 10px;
    }
    .qua-query-title {
      margin-bottom: 7px;
    }
    
    .qua-query-eqp-select, .qua-query-timespan-select {
      width: 100%;
      margin-bottom: 20px;
    }
    
    .qua-data-title {
      padding-left: 5px;
      margin-bottom: 15px;
      font-family: PingFangSC-Medium, sans-serif;
      color: #4285f4;
    }
    
    .qua-chart-title {
      text-align: center;
      font-weight: bold;
      font-family: PingFangSC-Medium, sans-serif;
      font-size: 20px;
      color: #4285f4;
    }
    
    .qua-query {
      padding: 25px 0 15px 0;
      margin-bottom: 20px;
      .qua-query-box-row {
        .qua-query-eqp {
          display: flex;
          justify-content: flex-end;
          .qua-query-eqp-box {
            width: calc(100% - 76px);
          }
        }
      }
      
      .qua-query-button-row {
        display: flex;
        padding-right: 16px;
        .qua-query-button {
          display: inline-block;
          margin: 0 auto;
        }
      }
    }
    
    .qua-row {
      padding: 20px;
      .qua-ranklist {
        display: flex;
        justify-content: flex-start;
        .qua-ranklist-btn {
          width: 72px;
        }
      }
      .qua-data-row {
        .qua-data {
          
          .qua-data-table {
            border-radius: 10px;
            margin-bottom: 20px;
          }
          .qua-form-paginate {
            display: flex;
            justify-content: flex-end;
            margin-bottom: 40px;
          }
        }
        .qua-chart {
        }
      }
    }
  }
  
  /* 所有的 button 统一格式 */
  [class*='-btn'] {
    width: 60px;
    height: 36px;
    margin-left: 16px;
    /*box-shadow: 1px 1px 3px rgba(17, 17, 17, .4);*/
  }
</style>
