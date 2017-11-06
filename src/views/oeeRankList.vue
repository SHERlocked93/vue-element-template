<template>
  <div id='rank'>
    <el-row type="flex" justify='space-between' class='rank-container'>
      <!--<editor-fold desc="OEE">-->
      <el-col :span='12' class='rank-oee'>
        <p class='rank-title'>OEE</p>
        <el-row :gutter='20'>
          <el-col :span='12' class="rank-goodoee-box">
            <p class='rank-title2'>好评榜</p>
            <el-table :data="goodOeeList" border stripe style="width: 100%" class="rank-goodoee-table">
              <el-table-column prop="serial" label="序号" sortable='true' header-align='center' align='center'></el-table-column>
              <el-table-column prop="equipCode" label="机台" header-align='center' align='center'></el-table-column>
              <el-table-column prop="value" label="OEE" header-align='center' align='center'></el-table-column>
            </el-table>
          </el-col>
          <el-col :span='12'>
            <p class='rank-title2'>进步榜</p>
            <el-table :data="advanceOeeList" border stripe style="width: 100%" class="rank-advanceoee-table">
              <el-table-column prop="serial" label="序号" sortable='true' header-align='center' align='center'></el-table-column>
              <el-table-column prop="equipCode" label="机台" header-align='center' align='center'></el-table-column>
              <el-table-column prop="value" label="OEE" header-align='center' align='center'></el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </el-col>
      <!--</editor-fold>-->
      
      
      <el-col :span='12' class='rank-rate'>
        <el-row>
          <p class='rank-title'>时间稼动率</p>
          <el-row :gutter='20'>
            <el-col :span='12' class="rank-goodoee-box">
              <p class='rank-title2'>好评榜</p>
              <el-table :data="goodTimeRateList" border stripe style="width: 100%" class="rank-goodoee-table">
                <el-table-column prop="serial" label="序号" sortable='true' header-align='center' align='center'></el-table-column>
                <el-table-column prop="equipCode" label="机台" header-align='center' align='center'></el-table-column>
                <el-table-column prop="value" label="时间稼动率" header-align='center' align='center'></el-table-column>
              </el-table>
            </el-col>
            <el-col :span='12'>
              <p class='rank-title2'>进步榜</p>
              <el-table :data="advanceTimeRateList" border stripe style="width: 100%" class="rank-advanceoee-table">
                <el-table-column prop="serial" label="序号" sortable='true' header-align='center' align='center'></el-table-column>
                <el-table-column prop="equipCode" label="机台" header-align='center' align='center'></el-table-column>
                <el-table-column prop="value" label="时间稼动率" header-align='center' align='center'></el-table-column>
              </el-table>
            </el-col>
          </el-row>
        </el-row>
        <el-row>
          <p class='rank-title rank-title3'>性能稼动率</p>
          <el-row :gutter='20'>
            <el-col :span='12' class="rank-goodoee-box">
              <p class='rank-title2'>好评榜</p>
              <el-table :data="goodPerformanceRateList" border stripe style="width: 100%" class="rank-goodoee-table">
                <el-table-column prop="serial" label="序号" sortable='true' header-align='center' align='center'></el-table-column>
                <el-table-column prop="equipCode" label="机台" header-align='center' align='center'></el-table-column>
                <el-table-column prop="value" label="性能稼动率" header-align='center' align='center'></el-table-column>
              </el-table>
            </el-col>
            <el-col :span='12'>
              <p class='rank-title2'>进步榜</p>
              <el-table :data="advancePerformanceRateList" border stripe style="width: 100%" class="rank-advanceoee-table">
                <el-table-column prop="serial" label="序号" sortable='true' header-align='center' align='center'></el-table-column>
                <el-table-column prop="equipCode" label="机台" header-align='center' align='center'></el-table-column>
                <el-table-column prop="value" label="性能稼动率" header-align='center' align='center'></el-table-column>
              </el-table>
            </el-col>
          </el-row>
        </el-row>
        <el-row>
          <p class='rank-title rank-title3'>良品率</p>
          <el-row :gutter='20'>
            <el-col :span='12' class="rank-goodoee-box">
              <p class='rank-title2'>好评榜</p>
              <el-table :data="goodYieldRateList" border stripe style="width: 100%" class="rank-goodoee-table">
                <el-table-column prop="serial" label="序号" sortable='true' header-align='center' align='center'></el-table-column>
                <el-table-column prop="equipCode" label="机台" header-align='center' align='center'></el-table-column>
                <el-table-column prop="value" label="良品率" header-align='center' align='center'></el-table-column>
              </el-table>
            </el-col>
            <el-col :span='12'>
              <p class='rank-title2'>进步榜</p>
              <el-table :data="advanceYieldRateList" border stripe style="width: 100%" class="rank-advanceoee-table">
                <el-table-column prop="serial" label="序号" sortable='true' header-align='center' align='center'></el-table-column>
                <el-table-column prop="equipCode" label="机台" header-align='center' align='center'></el-table-column>
                <el-table-column prop="value" label="良品率" header-align='center' align='center'></el-table-column>
              </el-table>
            </el-col>
          </el-row>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script type='text/javascript'>
  import { oeeRankList } from '@/api/dataanalysis'
  
  export default {
    data() {
      return {
        goodOeeList: [],
        advanceOeeList: [],
        goodTimeRateList: [],
        advanceTimeRateList: [],
        goodPerformanceRateList: [],
        advancePerformanceRateList: [],
        goodYieldRateList: [],
        advanceYieldRateList: []
      }
    },
    mounted() {
      oeeRankList().then(res => {
        this.goodOeeList = res.data.goodOeeList
        this.advanceOeeList = res.data.advanceOeeList
        this.goodTimeRateList = res.data.goodTimeRateList
        this.advanceTimeRateList = res.data.advanceTimeRateList
        this.goodPerformanceRateList = res.data.goodPerformanceRateList
        this.advancePerformanceRateList = res.data.advancePerformanceRateList
        this.goodYieldRateList = res.data.goodYieldRateList
        this.advanceYieldRateList = res.data.advanceYieldRateList
      }).catch(err => console.log(err))
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  
  #rank {
    margin: 0 20px;
    font-family: PingFangSC-Semibold, Helvetica, Arial, sans-serif;
    font-size: 16px;
    .rank-container {
      .rank-oee, .rank-rate {
        padding: 20px;
        background-color: #fff;
        border: 1px solid #d6d6d6;
        border-radius: 10px;
      }
      
      .rank-oee {
        margin-right: 20px;
        .rank-goodoee-box {
        }
      }
    }
  }
  
  .rank-title {
    text-align: center;
    font-family: PingFangSC-Medium, sans-serif;
    font-size: 20px;
    color: #4285f4;
  }
  
  .rank-title2 {
    text-align: center;
    font-family: PingFangSC-Medium, sans-serif;
    font-size: 20px;
    color: #000;
    margin-bottom: 8px;
  }
  
  .rank-title3 {
    margin-top: 30px;
  }
  
  [class*='-table'] {
    border-radius: 10px;
  }
</style>
