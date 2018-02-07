/**
* 创建于 2018/2/2
* 作者: Qianyu
* 功能: 系统配置-角色管理
*/


<template>
  <el-row class='rolemanage'>
    <el-tabs tab-position="left" v-model="activeName">
      <el-tab-pane label="WEB角色" name='WEB'>
        <role-manage-operate manage-type='WEB' v-if='activeName==="WEB"'/>
      </el-tab-pane>
      <el-tab-pane label="HMI角色" name='HMI'>
        <role-manage-operate manage-type='HMI' v-if='activeName==="HMI"'/>
      </el-tab-pane>
      <el-tab-pane label="APP角色" name='APP'>
        <role-manage-operate manage-type='APP' v-if='activeName==="APP"'/>
      </el-tab-pane>
    </el-tabs>
  </el-row>
</template>

<script type='text/javascript'>
  import RoleManageOperate from 'components/RoleManage/RoleManageOperate'
  
  export default {
    name: 'RoleManage',
    components: { RoleManageOperate },
    data() {
      return {
        activeName: 'WEB'
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "~styles/mixin.scss";
  
  .rolemanage {
    @include moduleArea;
    width: 100%;
  }
</style>
