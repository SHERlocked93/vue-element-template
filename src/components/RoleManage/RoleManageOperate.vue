/**
* 创建于 2018/2/2
* 作者: Qianyu
* 功能: 系统配置-角色管理-操作角色组件
*/


<template>
  <div class='role-operate'>
    <!--信息栏-->
    <el-row type='flex' justify='space-between' class='role-op-info'>
      <!--新建和删除按钮 左边栏-->
      <el-col :span='12' class='role-op-info-left'>
        <el-button type='success' @click='handleAdd' icon='el-icon-my-xinjian'>新建</el-button>
        <el-button type='success' @click='handleDelete' icon='el-icon-my-shanchu-m'>删除</el-button>
      </el-col>
      
      <!--查询框 右边栏-->
      <el-col :span='12' class='role-op-info-right'>
        <el-button type='primary'
                   class='role-op-info-btn'
                   icon='el-icon-my-chaxun'
                   @click='queryAtPage'>查询
        </el-button>
        
        <div class='role-op-info-query'>
          <el-autocomplete placeholder='请输入以查询'
                           value-key='roleName'
                           v-model='queryStr'
                           :fetch-suggestions="queryRoleList"
                           @keyup.enter.native='queryAtPage'>
          </el-autocomplete>
          <i v-show='queryStr' class='role-op-clear el-icon-my-guanbi' @click='clearQueryRole'></i>
        </div>
      </el-col>
    </el-row>
    
    <!--列表栏-->
    <el-table :data="tableData" border class='role-op-table'
              @selection-change="handleSelectionChange">
      <el-table-column align='center' type='selection' width="55"/>
      <el-table-column align='center' type='index' label="序号" width="55"/>
      <el-table-column align='center' prop="roleName" label="角色名称" width="180">
        <template slot-scope='scope'>
          <a @click='checkThisRole(scope.row)' class='role-op-check'>{{scope.row.roleName}}</a>
        </template>
      </el-table-column>
      <el-table-column align='center' prop="updateName" label="最新操作人"/>
      <el-table-column align='center' prop="updateTime" label="更新时间"/>
      <el-table-column align='center' label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleEditRow(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDeleteRow(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    
    <!--分页-->
    <el-row class='role-op-pagin'>
      <el-pagination layout="total, sizes, prev, pager, next" background
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="pagin.page"
                     :page-sizes="pagin.sizes"
                     :page-size="pagin.rows"
                     :total="pagin.total">
      </el-pagination>
    </el-row>
    
    <!--新建角色 / 修改角色 / 查看角色-->
    <el-dialog width="60%" center top='12vh'
               :title="dialogTitle"
               :visible.sync="dialogEditVisible"
               :before-close="handleDialogEditClose">
      <!--角色名称-->
      <el-form ref='formEditRole'
               label-width="80px"
               :model="roleInfo"
               :rules='inputRules'>
        <el-form-item label="角色名称" prop='roleName'>
          <el-input v-model="roleInfo.roleName" autofocus/>
        </el-form-item>
      </el-form>
      
      <!--权限树-->
      <el-tree ref='treeEdit' default-expand-all show-checkbox check-strictly accordion
               node-key='id'
               :data='treeData'
               :props='defaultProps'
               :default-expand-all='false'
               :default-checked-keys='defaultCheckedKeys'
               :default-expanded-keys='defaultExpandedKeys'
               @check-change='handleNodeClick'/>
      
      <span slot="footer">
        <el-button @click="dialogEditVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmOperate" :loading='btnLoading'>确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script type='text/javascript'>
  import { mapGetters } from 'vuex'
  import * as Roles from 'api/user/role'
  import * as Utils from 'utils/validate'
  
  export default {
    name: 'RoleManageOperate',
    props: ['manageType'],
    // manageType: 角色管理类型，可为web hmi app三种
    data() {
      const checkRoleName = (rule, value, callback) => {
        if (value === this.checkRoleName && value) callback()
        if (!Utils.validateRoleName(value)) {
          callback(new Error('请输入正确的角色名称，由2-9位字母、数字、汉字组成'))
        } else {
          this.tableData.some(T => T.roleName === value)
          ? callback(new Error('该角色名已存在，请重新输入'))
          : callback()
        }
      }
      
      return {
        queryStr: '',                              // 查询的角色 输入框中的
        queryStrReal: '',                          // 查询的角色 real
        tableData: [],                              // 角色表中数据
        multiSelects: [],                           // 角色表中选择的数据数组
        pagin: {                                    // 分页
          sizes: [10, 20, 30, 50, 80, 100],
          page: 1,
          rows: 10,
          total: 1
        },
        operateType: 'new',                         // dialog的类型: 新建 new 修改 edit 查看 check
        dialogEditVisible: false,                   // dialog修改角色与新增角色 visible
        treeData: [],                               // 绑定到tree data
        authTreeInDialog: [],                       // tree组件绑定的data
        authTreeInDialogDisabled: [],               // tree组件绑定的data,checked查看状态,disabled=true
        authTreeIsReadOnly: false,                  // tree是不是只读的
        sysconfigId: '',                            // 系统配置的id
        defaultProps: {                             // tree的显示配置
          label: 'name',
          children: 'children',
          disabled: 'disabled'
        },
        defaultCheckedKeys: [],                     // tree默认选择的节点id数组
        defaultExpandedKeys: [],                    // tree默认展开的节点
        btnLoading: false,                          // dialog中按钮的loading状态
        roleInfo: {                                 // 修改dialog中当前角色的信息
          id: '',                                   //   id
          roleName: '',                             //   用户名
          type: this.manageType,                    //   角色类型 web hmi app
          menuIds: []                               //   权限数组
        },
        checkRoleName: '',                          // 编辑角色时候保存角色名以便验证是否已经编辑
        inputRules: {                               // form表单验证规则
          roleName: [{ required: true, trigger: 'blur', validator: checkRoleName }]
        }
      }
    },
    computed: {
      ...mapGetters([
        'permission_web',
        'permission_hmi',
        'permission_app'
      ]),
      
      /**
       * dialog的title
       */
      dialogTitle() {
        return this.operateType === 'new'
               ? '新建角色'
               : this.operateType === 'edit'
                 ? '修改角色'
                 : '查看角色'
      }
    },
    methods: {
      /**
       * 新建角色 按钮
       */
      handleAdd() {
        this.roleInfo.id = ''
        this.roleInfo.roleName = ''
        this.operateType = 'new'
        this.dialogEditVisible = true
        this.treeData = this.authTreeInDialog
        
        this.resetChecked()
      },
      
      /**
       * 编辑角色，点击编辑按钮
       * @param row 用户信息 scope.row
       */
      handleEditRow(row) {
        this.roleInfo.id = row.id
        this.roleInfo.roleName = row.roleName
        this.checkRoleName = row.roleName
        this.operateType = 'edit'
        this.dialogEditVisible = true
        this.treeData = this.authTreeInDialog
        
        this.$nextTick(() => {
          this.resetChecked()
          Roles.getMenubyRole(row.id).then(({ data }) => {
            this.$refs['treeEdit'].setCheckedKeys(data)
          })
        })
      },
      
      /**
       * 查看角色
       */
      checkThisRole(row) {
        this.roleInfo.id = row.id
        this.roleInfo.roleName = row.roleName
        this.checkRoleName = row.roleName
        this.operateType = 'check'
        this.dialogEditVisible = true
        
        this.$nextTick(() => {
          this.resetChecked()
          Roles.getMenubyRole(row.id).then(({ data }) => {
            this.$refs['treeEdit'].setCheckedKeys(data)
            setTimeout(() => this.treeData = this.authTreeInDialogDisabled, 5)
          })
        })
      },
      
      /**
       * 删除多个角色 按钮
       */
      handleDelete() {
        const { length } = this.multiSelects
        if (length > 1) {                             // 删除多个角色
          this.$confirm(`确认删除这 ${length} 个角色?`, { type: 'warning' })
            .then(() => {
              const deletes = []
              this.multiSelects.forEach(T => deletes.push(T.id))
              Roles.roleDelete(deletes, this.manageType)
                .then(() => {
                  this.$message({ message: `这 ${length} 个角色已成功删除`, type: 'success' })
                  this.tableGetData(null, this.manageType)
                })
                .catch(err => this.$message({ message: `角色删除失败，${err}`, type: 'error' }))
            })
            .catch(() => {})
        } else if (length === 1) {                      // 删除一个角色
          this.$confirm(`确认删除角色 ${this.multiSelects[0].roleName} ?`, { type: 'warning' })
            .then(() => this.handleDeleteRow(this.multiSelects[0]))
            .catch(() => {})
        }
      },
      
      /**
       * 表格选择某行
       */
      handleSelectionChange(selects) {
        this.multiSelects = selects
      },
      
      /**
       * 删除某行角色，点击删除按钮
       */
      handleDeleteRow(row) {
        Roles.roleDelete(row.id, this.manageType)
          .then(() => {
            this.$message({ message: `角色 ${row.roleName} 已成功删除`, type: 'success' })
            this.tableData.splice(this.tableData.findIndex(T => T.id === row.id), 1)
          })
          .catch(err => this.$message({ message: `角色 ${row.roleName} 删除失败，${err}`, type: 'error' }))
      },
      
      /**
       * 查询角色列表建议
       */
      queryRoleList(queryString, cb) {
        Roles.roleList(queryString, this.manageType, 1, 99)
          .then(({ data: { dataList } }) => cb(dataList))
      },
      
      /**
       * 查询输入框中的角色
       */
      tableGetData(roleName, type = this.manageType, page = 1, rows = this.pagin.rows) {
        this.pagin.page = page
        this.pagin.rows = rows
        Roles.roleList(roleName, type, page, rows)
          .then(({ data }) => {
            this.pagin.total = data.total
            this.tableData = data.dataList
          })
      },
      
      /**
       * 查询按钮
       */
      queryAtPage() {
        this.queryStrReal = this.queryStr
        this.tableGetData(this.queryStrReal)
      },
      
      /**
       * 清除查询str
       */
      clearQueryRole() {
        this.queryStr = ''
        this.queryAtPage()
      },
      
      /**
       * 分页: 每页x条
       */
      handleSizeChange(val) {
        this.pagin.rows = val
        if (this.pagin.page !== 1) {
          this.pagin.page = 1
        } else this.tableGetData(this.queryStrReal, this.manageType, 1, val)
      },
      
      /**
       * 分页: 跳转第x页
       */
      handleCurrentChange(val) {
        this.tableGetData(this.queryStrReal, this.manageType, val, this.pagin.rows)
      },
      
      /**
       * dialog:关闭回调
       */
      handleDialogEditClose(done) {
        // this.operateType = 'new'
        this.treeData = this.authTreeInDialog
        done()
      },
      
      /**
       * tree:修改节点的checked状态
       */
      handleNodeClick(data, selfState, sonState) {
        this.$nextTick(() => data.children && data.children.forEach(T => {
          if (!['修改密码', '我的信息'].includes(T.name)) {
            T.disabled = !selfState
          }
          const checkedKeys = this.$refs['treeEdit'].getCheckedKeys()
          if (T.children && T.children.length) {          // 如果点的是一级，修改三级的disabled状态
            selfState
            ? checkedKeys.includes(T.id)
              ? T.children.forEach(T2 => T2.disabled = !selfState)
              : T.children.forEach(T2 => T2.disabled = selfState)
            : T.children.forEach(T2 => T2.disabled = !selfState)
          }
        }))
      },
      
      /**
       * dialog:确认权限修改或添加，并过滤掉没页面选项的按钮权限和没模块权限的页面权限
       */
      confirmOperate() {
        let checkedKeys = this.$refs['treeEdit'].getCheckedKeys()
        checkedKeys = checkedKeys
          .filter((T, idx, arr) => Utils.num2To1(T) ? arr.includes(Utils.num2To1(T)) : true)
          .filter((T, idx, arr) => Utils.num3To2(T) ? arr.includes(Utils.num3To2(T)) : true)
          .concat([...this.defaultCheckedKeys, this.sysconfigId])
        this.roleInfo.menuIds = [...new Set(checkedKeys)].sort()
        
        if (this.operateType === 'edit') {                                                 // 编辑角色
          Roles.roleEdit(this.roleInfo)
            .then(T => {
              this.dialogEditVisible = false
              this.$message({ message: `修改角色 ${this.roleInfo.roleName} 已成功`, type: 'success' })
              this.tableGetData(null, this.manageType)
            })
            .catch(err => this.$message({ message: `操作失败，${err}`, type: 'error' }))
        } else if (this.operateType === 'new') {                                            // 添加角色
          this.$refs['formEditRole'].validate(valid => {
            if (valid) {
              Roles.roleAdd(this.roleInfo, this.manageType)
                .then(() => {
                  this.dialogEditVisible = false
                  this.$message({ message: `新建角色 ${this.roleInfo.roleName} 已成功`, type: 'success' })
                  this.tableGetData(null, this.manageType)
                })
                .catch(err => this.$message({ message: `操作失败，${err}`, type: 'error' }))
            }
          })
        }
      },
      
      /**
       * 重置Tree的checked状态
       */
      resetChecked() {
        this.$nextTick(() =>
          this.$refs['treeEdit'].setCheckedKeys(this.defaultCheckedKeys)
        )
      },
      
      /**
       * 格式化authTree，方便Tree组件识别
       * @param authTree
       */
      formateAuthTree(authTree) {
        const newAuthTree = [...authTree]
        newAuthTree.forEach(T1 => {                            // 一级
          T1.disabled = false
          if (['首页'].includes(T1.name)) {
            T1.disabled = true
            this.defaultCheckedKeys.push(T1.id)
          }
          if (['系统配置'].includes(T1.name)) {
            this.sysconfigId = T1.id
            this.defaultExpandedKeys.push(T1.id)
          }
          
          if (T1.children) {
            T1.children.forEach(T2 => {                        // 二级
              if (['修改密码', '我的信息'].includes(T2.name)) {
                this.defaultCheckedKeys.push(T2.id)
                T2.disabled = true
              }
              if (T2.props) {                                  // props转化成children
                const proplist = []
                for (const value of Object.keys(T2.props)) {
                  proplist.push({
                    'id': T2.props[value].id,
                    'name': T2.props[value].name,
                    'pnode': T2.id,
                    'disabled': true
                  })
                }
                T2.children = proplist
                delete T2.props
              }
            })
          }
        })
        return newAuthTree
      },
      
      /**
       * 复制一份所有节点disabled=true的到checked用来:查看角色
       */
      authTreeChecked(authTreeFormated) {
        const authTreeDeepCopy = JSON.parse(JSON.stringify(authTreeFormated))
        authTreeDeepCopy.forEach(T1 => {
          T1.disabled = true
          T1.children &&
          T1.children.length &&
          T1.children.forEach(T2 => {
            T2.disabled = true
            T2.children &&
            T2.children.length &&
            T2.children.forEach(T3 => T3.disabled = true)
          })
        })
        return authTreeDeepCopy
      },
      
      /**
       * dialog:根据type格式化并填充权限树结构
       */
      fillAuthTreeData(type) {
        switch (type) {
          case 'WEB':
            this.authTreeInDialog = this.formateAuthTree(this.permission_web)
            this.authTreeInDialogDisabled = this.authTreeChecked(this.authTreeInDialog)
            break
          case 'HMI':
            this.authTreeInDialog = this.formateAuthTree(this.permission_hmi)
            this.authTreeInDialogDisabled = this.authTreeChecked(this.authTreeInDialog)
            break
          case 'APP':
            this.authTreeInDialog = this.formateAuthTree(this.permission_app)
            this.authTreeInDialogDisabled = this.authTreeChecked(this.authTreeInDialog)
            break
          default :
            throw new Error('不合法的manageType in RoleManageOperate.vue')
        }
      }
    },
    watch: {
      /**
       * dialog关闭的时候清空checkRoleName
       * @param val
       * @param oldVal
       */
      dialogEditVisible(val, oldVal) {
        if (!val) {
          this.checkRoleName = ''
        }
      },
      
      /**
       * 查询string为空的时候清空real的查询条件
       * @param val
       */
      queryStr(val) {
        val === '' || val === undefined && (this.queryStrReal = '')
      }
    },
    mounted() {
      !this.permission_hmi.length && this.$store.dispatch('GetHmiBaseMenuTree')
      !this.permission_app.length && this.$store.dispatch('GetAppBaseMenuTree')
      
      this.fillAuthTreeData(this.manageType)
      this.tableGetData(null, this.manageType)
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  // 角色操作
  .role-operate {
    .role-op-info {
      .role-op-info-left {
      }
      .role-op-info-right {
        .role-op-info-query {
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
        .role-op-info-btn {
          float: right;
        }
      }
    }
    
    .role-op-table {
      margin-top: 15px;
      .role-op-check {
        color: #20a0ff;
        &:hover {
          text-decoration-line: underline;
        }
      }
    }
    
    .role-op-pagin {
      margin-top: 15px;
      display: flex;
      justify-content: flex-end;
    }
  }
</style>
