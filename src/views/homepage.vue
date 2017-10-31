<template>
  <div class='homepage'>
    <!--<editor-fold desc="工单进度">-->
    <div class='hp-or'>
      <el-row type="flex" justify='space-between' class='hp-or-header-row'>
        <el-col :span='10'>
          <h3 class='hp-header'>工单进度</h3>
        </el-col>
        <el-col :span='6' class="hp-or-query-group">
          <el-input placeholder='请输入...' v-model="searchOrderRate" class="hp-or-query-box"></el-input>
          <button class='hp-or-query-btn'>查询</button>
        </el-col>
      </el-row>
      
      <el-row class='hp-or-table-container'>
        <el-col :span='24'>
          <el-table :data="OrderRateList" border stripe style="width: 100%" max-height='400' class='hp-or-table'>
            <el-table-column fixed prop="orderId" label="工单编号" sortable='true' header-align='center' align='center' width="180"></el-table-column>
            <el-table-column prop="prodId" label="产品编号" header-align='center' align='center'></el-table-column>
            <el-table-column prop="moldId" label="模具编号" header-align='center' align='center'></el-table-column>
            <el-table-column prop="eqpId" label="设备编号" header-align='center' align='center'></el-table-column>
            <el-table-column prop="prodCenter" label="工作中心" header-align='center' align='center'></el-table-column>
            <el-table-column prop="planNum" label="计划数" sortable='true' header-align='center' align='center'></el-table-column>
            <el-table-column prop="prodName" label="产品名称" header-align='center' align='center'></el-table-column>
            <el-table-column prop="prodCurrNum" label="产品数量" header-align='center' align='center'></el-table-column>
          </el-table>
        </el-col>
      
      </el-row>
    
    </div>
    <!--</editor-fold>-->
    
    <el-row type="flex" justify='space-between'>
      <!--<editor-fold desc="警报">-->
      <el-col :span='11' class='hp-al'>
        <el-row type="flex" justify='space-between' class='hp-al-header-row'>
          <el-col :span='8'>
            <h3 class='hp-header'>警报</h3>
          </el-col>
          <el-col :span='8' class="hp-al-query-group">
            <el-input placeholder='请输入...' v-model="searchAlermInfoView" class="hp-al-query-box"></el-input>
            <button @click='handleIconClick' class='hp-al-query-btn'>查询</button>
          </el-col>
        </el-row>
        
        <el-row>
          <alerm-scroll :searchAlermInfo='searchAlermInfo' class='hp-al-scroll'></alerm-scroll>
        </el-row>
      </el-col>
      <!--</editor-fold>-->
      
      <!--<editor-fold desc="OEE分析">-->
      <el-col :span='13' class='hp-oee'>
        <el-row type="flex" justify='space-between' class='hp-oee-header-row'>
          <el-col :span='8'>
            <h3 class='hp-header'>OEE分析</h3>
          </el-col>
          <el-col :span='8' class="hp-oee-query-group">
            <el-select v-model="oeeTimeSpan" placeholder="请选择时间范围" class="hp-oee-query-box">
              <el-option label="最近一周" value="7"></el-option>
              <el-option label="最近一个月" value="30"></el-option>
              <el-option label="最近三个月" value="90"></el-option>
              <el-option label="最近半年" value="180"></el-option>
              <el-option label="最近一年" value="365"></el-option>
            </el-select>
            <button class='hp-oee-query-btn'>查询</button>
          </el-col>
        </el-row>
        
        <el-row class='hp-oee-chart'>
          <oee-chart :oeeTimeSpan='oeeTimeSpan'></oee-chart>
        </el-row>
      </el-col>
      <!--</editor-fold>-->
    </el-row>
  </div>
</template>

<script type='text/javascript'>
  import { orderRate } from '../api/homepage'
  import AlermScroll from '@/components/AlermScrollLazy.vue'
  import OeeChart from '@/components/OeeLineChart.vue'
  
  export default {
    name: 'Homepage',
    data() {
      return {
        searchOrderRate: '',
        searchAlermInfo: '',
        searchAlermInfoView: '',
        oeeTimeSpan: '7',
        OrderRateList: []
      }
    },
    components: { AlermScroll, OeeChart },
    methods: {
      /**
       * 警报点击查询
       */
      handleIconClick() {
        this.searchAlermInfo = this.searchAlermInfoView
      }
    },
    mounted() {
      orderRate().then(res => {
        if (res.data['dataList']) {
          this.OrderRateList = res.data['dataList']
        }
      }).catch(err => console.log(err))
    },
    watch: {}
  }
</script>

<style rel='stylesheet' scoped lang='scss'>
  @import "~@/styles/pure-scrollbar.css";
  @import "~@/assets/icon/iconfont.css";
  
  $module_border: 15px;
  
  p { margin: 1px 0 }
  
  .homepage {
    /*background-color: #f5f5fa;*/
    font-family: PingFangSC-Semibold, Helvetica, Arial, sans-serif;
    font-size: 16px;
    
    .hp-header {
      font-size: 26px;
      color: #4285f4;
      margin-left: 30px;
    }
    
    /*模块标题行*/
    [class*='-header-row'] {
      line-height: 40px;
      margin: 18px 30px 18px 0;
      [class*='-query-group'] {
        display: flex;
        justify-content: space-between;
        vertical-align: middle;
        align-items: center;
        line-height: 40px;
        [class*='-query-box'] {
          width: calc(100% - 76px);
          display: inline-block;
        }
        [class*='-query-btn'] {
          border: 0;
          width: 60px;
          height: 36px;
          line-height: 36px;
          font-size: 16px;
          margin-left: 16px;
          color: #fff;
          background: #4285f4;
          border-radius: 4px
        }
      }
    }
    
    .hp-or, .hp-al, .hp-oee {
      background-color: #fff;
      border: 1px solid #d6d6d6;
      border-radius: 10px;
    }
    
    .hp-or {
      margin-bottom: 20px;
      .hp-or-table-container {
        margin: 20px 18px;
        .hp-or-table {
          border-radius: 10px;
        }
      }
    }
    
    .hp-al {
      margin-right: 20px;
      .hp-al-scroll {
        margin: 0 20px 20px 20px;
        border: 1px solid #bfcbd9;
        border-radius: 10px;
      }
    }
    
    .hp-oee {
      
      .hp-oee-chart {
      }
    }
  }

</style>
