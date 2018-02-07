/**
* 创建于 2018/2/2
* 作者: Qianyu
* 功能: 系统配置-用户管理
*/


<template>
  <div class='usermanage'>
    <!--信息栏-->
    <el-row type='flex' justify='space-between' class='user-mn-info'>
      <!--新建和删除按钮 左边栏-->
      <el-col :span='12' class='user-mn-info-left'>
        <el-button type='success' @click='handleAdd' icon='el-icon-my-xinjian'>新建</el-button>
      </el-col>
      
      <!--查询框 右边栏-->
      <el-col :span='12' class='user-mn-info-right'>
        <el-button type='primary'
                   class='user-mn-info-btn'
                   icon='el-icon-my-chaxun'
                   @click='queryAtPage'>查询
        </el-button>
        <div class='user-mn-info-query'>
          <el-autocomplete placeholder='请输入姓名/用户名/角色以查询'
                           value-key='userName'
                           v-model='queryStr'
                           :fetch-suggestions="queryUserList"
                           @keyup.enter.native='queryAtPage'>
          </el-autocomplete>
          <i v-show='queryStr' class='role-op-clear el-icon-my-guanbi' @click='clearQueryUser'></i>
        </div>
      </el-col>
    </el-row>
    
    <!--表格数据-->
    <el-table :data="tableData" border class='user-mn-table'>
      <el-table-column align='center' label='用户名' width='120' prop='userName'>
        <template slot-scope='scope'>
          <a @click='checkThisUser(scope.row)' class='user-mn-check'>{{scope.row.userName}}</a>
        </template>
      </el-table-column>
      <el-table-column align='center' label='姓名' width='120' prop='realName'></el-table-column>
      <el-table-column align='center' label='手机号码' width='130' prop='mobile'></el-table-column>
      <el-table-column align='center' label='角色名称'>
        <template slot-scope='scope'>
          <el-tag v-for='item in scope.row.webRoles' :key='item.id'>
            {{item.roleName}}
          </el-tag>
          <el-tag v-for='item in scope.row.appRoles' :key='item.id' type='success'>
            {{item.roleName}}
          </el-tag>
          <el-tag v-for='item in scope.row.hmiRoles' :key='item.id' type='info'>
            {{item.roleName}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column align='center' label='操作' width='270'>
        <template slot-scope='scope'>
          <el-button size="mini" type="primary" @click="editThisUser(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="deleteThisUser(scope.row)">删除</el-button>
          <el-button size="mini" type="warning" @click="resetPwd(scope.row)">重置密码</el-button>
        </template>
      </el-table-column>
    </el-table>
    
    <!--分页-->
    <el-row class='user-mn-pagin'>
      <el-pagination layout="total, sizes, prev, pager, next" background
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="pagin.page"
                     :page-sizes="pagin.sizes"
                     :page-size="pagin.rows"
                     :total="pagin.total">
      </el-pagination>
    </el-row>
    
    <!--新建用户 / 编辑用户 / 查看用户-->
    <new-user :dialogType='dialogType'
              :dialogUserData='dialogUserData'
              :newUserVisible='newUserVisible'
              :webRoleToChoose='webRoleToChoose'
              :appRoleToChoose='appRoleToChoose'
              :hmiRoleToChoose='hmiRoleToChoose'
              @changeDialogType='changeDialogType'
              @newUserDialogClosed='newUserDialogClosed'></new-user>
  </div>
</template>

<script type='text/javascript'>
  import * as Users from 'api/user/user'
  import * as Roles from 'api/user/role'
  import NewUser from 'components/UserManage/NewUser'
  
  export default {
    name: 'UserManage',
    components: { NewUser },
    data() {
      return {
        tableData: [],                          // table绑定的data
        queryStr: '',                           // 查询的string
        queryStrReal: '',                       // 查询的string, real
        webRoleToChoose: [],                    // web 角色备选
        appRoleToChoose: [],                    // app 角色备选
        hmiRoleToChoose: [],                    // hmi 角色备选
        newUserVisible: false,                  // 新建用户 dialog的visible
        dialogType: 'new',                      // dialog 的类型: new edit check
        dialogUserData: {},                      // dialog 是edit/check需要显示用户信息
        pagin: {
          sizes: [10, 20, 30, 50, 80, 100],
          page: 1,
          rows: 10,
          total: 1
        }
      }
    },
    methods: {
      /**
       * 查询输入框中的String
       */
      queryAtPage() {
        this.queryStrReal = this.queryStr
        this.tableGetData(this.queryStrReal)
      },
      
      /**
       * 清除查询str
       */
      clearQueryUser() {
        this.queryStr = ''
        this.queryAtPage()
      },
      
      /**
       * 下拉建议
       */
      queryUserList(queryString, cb) {
        Users.userQueryList(queryString, 1, 100).then(({ data: { dataList } }) => cb(dataList))
      },
      
      /**
       * 分页: 每页x条
       */
      handleSizeChange(val) {
        this.pagin.rows = val
        if (this.pagin.page !== 1) {
          this.pagin.page = 1
        } else this.tableGetData(this.queryStrReal, 1, val)
      },
      
      /**
       * 分页: 跳转第x页
       */
      handleCurrentChange(val) {
        this.tableGetData(this.queryStrReal, val, this.pagin.rows)
      },
      
      /**
       * table:获取数据
       */
      tableGetData(keyword = '', page = 1, rows = this.pagin.rows) {
        this.pagin.page = page
        this.pagin.rows = rows
        Users.userQueryList(keyword, page, rows)
          .then(({ data }) => {
            this.tableData = data.dataList
            this.pagin.total = data.total
          })
      },
      
      /**
       * 编辑用户
       */
      editThisUser(row) {
        this.dialogType = 'edit'
        this.newUserVisible = true
        this.dialogUserData = row
      },
      
      /**
       * 查看用户
       */
      checkThisUser(row) {
        this.dialogType = 'check'
        this.newUserVisible = true
        this.dialogUserData = row
      },
      
      /**
       * 删除用户
       */
      deleteThisUser(row) {
        Users.userDelete(row.id)
          .then(() => {
            this.$message({ message: `用户 ${row.roleName} 已成功删除`, type: 'success' })
            this.tableData.splice(this.tableData.findIndex(T => T.id === row.id), 1)
          })
          .catch(err => this.$message({ message: `用户 ${row.roleName} 删除失败，${err}`, type: 'error' }))
      },
      
      /**
       * 重置用户密码
       */
      resetPwd(row) {
        Users.userResetPassword(row.id)
          .then(() => this.$message({ message: `用户 ${row.realName} 密码已成功重置`, type: 'success' }))
          .catch(err => this.$message({ message: `用户 ${row.realName} 密码重置失败，${err}`, type: 'error' }))
      },
      
      /**
       * newUser: 打开新建用户dialog
       */
      handleAdd() {
        this.dialogType = 'new'
        this.newUserVisible = true
      },
      
      /**
       * dialog:newUser关闭回调
       */
      newUserDialogClosed() {
        // this.dialogType = 'new'
        this.newUserVisible = false
        this.dialogUserData = {}
        this.tableGetData()
      },
      
      /**
       * dialog:改变type
       * @param val type：new edit check
       * @param row 用户信息 row
       */
      changeDialogType(val, row) {
        this.newUserVisible = false
        this.$nextTick(() =>
          this.editThisUser(row)
        )
      }
      
    },
    watch: {
      /**
       * 查询string为空的时候清空real的查询条件
       * @param val
       */
      queryStr(val) {
        val === '' || val === undefined && (this.queryStrReal = '')
      }
    },
    mounted() {
      this.tableGetData()
      Roles.roleList(null, 'WEB').then(({ data: { dataList } }) => this.webRoleToChoose = dataList)
      Roles.roleList(null, 'APP').then(({ data: { dataList } }) => this.appRoleToChoose = dataList)
      Roles.roleList(null, 'HMI').then(({ data: { dataList } }) => this.hmiRoleToChoose = dataList)
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "~styles/mixin.scss";
  
  .usermanage {
    @include moduleArea;
    width: 100%;
    .user-mn-info {
      .user-mn-info-left {
      }
      .user-mn-info-right {
        .user-mn-info-query {
          float: right;
          width: 300px;
          margin-right: 20px;
          margin-top: 1px;
          position: relative;
          .el-autocomplete {
            width: 100%;
          }
        }
        .role-op-clear {
          color: #c0c4cc;
          position: absolute;
          right: 5px;
          top: 10px;
          transition: 0.5s;
          &:hover {
            color: #909399;
          }
        }
        .user-mn-info-btn {
          float: right;
        }
      }
    }
    .user-mn-table {
      margin-top: 15px;
      
      .user-mn-check {
        color: #20a0ff;
        &:hover {
          text-decoration-line: underline;
        }
      }
      
      .el-tag {
        margin: 0 10px;
      }
    }
    
    .user-mn-pagin {
      margin-top: 15px;
      display: flex;
      justify-content: flex-end;
    }
  }
</style>
