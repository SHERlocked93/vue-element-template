<template>
  <div class='oee-aly'>
    <!--<editor-fold desc="查询框">-->
    <div>
      <el-row class='oeealy-query'>
        <el-form :inline='true' :model='queryForm'>
          <el-form-item label="机台编号">
            <el-input v-model="queryForm.eqpId" placeholder="请选择机台编号"></el-input>
          </el-form-item>
          <el-form-item label="时间范围">
            <el-select v-model="queryForm.timeSpan" placeholder="时间范围" class="oeealy-query-box">
              <el-option label="最近一周" value="7"></el-option>
              <el-option label="最近一个月" value="30"></el-option>
              <el-option label="最近三个月" value="90"></el-option>
              <el-option label="最近半年" value="180"></el-option>
              <el-option label="最近一年" value="365"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-row>
      <el-row>
        <button class='oeealy-query-btn'>查询</button>
        <button class='oeealy-reset-btn'>重置</button>
      </el-row>
    </div>
    
    <!--</editor-fold>-->
    
    
    <el-row class='oee-aly-row'>
      <el-col :span='14' class='oee-aly-form'>
        <el-table :data="OrderRateList" border stripe style="width: 100%" class='hp-or-table'>
          <el-table-column fixed prop="orderId" label="机台" sortable='true' header-align='center' align='center' width="180"></el-table-column>
          <el-table-column prop="prodId" label="工作中心" header-align='center' align='center'></el-table-column>
          <el-table-column prop="moldId" label="车间" header-align='center' align='center'></el-table-column>
          <el-table-column prop="eqpId" label="时间稼动率" header-align='center' align='center' sortable='true'></el-table-column>
          <el-table-column prop="prodCenter" label="性能稼动率" header-align='center' align='center' sortable='true'></el-table-column>
          <el-table-column prop="planNum" label="良品率" header-align='center' align='center' sortable='true'></el-table-column>
          <el-table-column prop="prodName" label="OEE" header-align='center' align='center' sortable='true'></el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[15, 30, 50, 100]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="500">
        </el-pagination>
      </el-col>
      <el-col :span='10' class='oee-aly-chart'>
        <oee-chart></oee-chart>
      </el-col>
    </el-row>
  </div>
</template>

<script type='text/javascript'>
  
  import OeeChart from '@/components/OeeLineChart.vue'
  
  export default {
    data() {
      return {
        queryForm: {
          eqpId: '',
          timeSpan: '7'
        },
        currentPage: 1
      }
    },
    components: { OeeChart },
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`)
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .oeealy-query-btn, .oeealy-reset-btn {
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
</style>
