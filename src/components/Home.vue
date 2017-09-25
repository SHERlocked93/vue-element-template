<template>
  <div>
    <h3>This is home page</h3>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <el-button>默认按钮</el-button>
          <el-button type="primary" icon="setting">主要按钮</el-button>
          <el-button type="text" icon="loading">文字按钮</el-button>
          <el-button type="primary" icon="search">搜索</el-button>
        </div>
      </el-col>
    </el-row>
    
    <el-row>
      <el-col :span="12">
        <div class="grid-content bg-purple">12</div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple-light">
          <Date></Date>
        </div>
      </el-col>
    </el-row>
    
    
    <el-row :gutter="20" type="flex" justify="end">
      <el-col :span="6">
        <div class="grid-content bg-purple">6</div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">6</div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">6</div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">6</div>
      </el-col>
    </el-row>
    
    <example></example>
  </div>
</template>

<script>
  import Date from './Date.vue'
  import Vue from 'vue'
  
  Vue.component('example', {
    template: '<span @click="updateMessage">{{ message }}</span>',
    data: function() {
      return {
        message: '没有更新'
      }
    },
    methods: {
      updateMessage: function() {
        this.message = '更新完成'
        console.log(this.$el.textContent) // => '没有更新'
        this.$nextTick(function() {
          console.log(this.$el.textContent) // => '更新完成'
        })
      }
    }
  })
  
  export default {
    data() {
      return {}
    },
    components: {
      Date
    }
  }
</script>

<style>
  .el-row {
    margin-bottom: 20px;
  }
  
  .el-col {
    border-radius: 4px;
  }
  
  .bg-purple-dark {
    background: #99a9bf;
  }
  
  .bg-purple {
    background: #d3dce6;
  }
  
  .bg-purple-light {
    background: #e5e9f2;
  }
  
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
