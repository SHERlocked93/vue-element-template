/**
* 创建于 2018/2/2
* 作者: SHERlocked93
* 功能: 系统配置-用户管理-新建用户/编辑用户/查看用户组件
*/


<template>
  <el-dialog width='60%' center class='new-user-dialog'
             label-position='right'
             top='5vh'
             @close='onDialogClose'
             @open='onDialogOpen'
             :title='dialogTitle'
             :visible.sync='thisVisible'
             :before-close="newUserBeforeClose">
    
    <el-form ref='newUserForm' label-width="80px" class='new-user-form'
             :model='newUserForm'
             :rules='newUserRules'>
      
      <el-form-item label='头像' prop='photo'>
        <el-upload ref="uploadPhoto"
                   list-type="picture-card"
                   action=''
                   :disabled='isDialogCheck'
                   :on-change="handleChange"
                   :file-list="fileList"
                   :auto-upload="false">
          <span slot="trigger" class='new-user-trigger'>上传头像</span>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
      
      <el-form-item label='用户名' prop='userName'>
        <el-input v-model='newUserForm.userName' auto-complete="off"
                  :disabled='isDialogCheck'></el-input>
      </el-form-item>
      
      <el-form-item label='姓名' prop='realName'>
        <el-input v-model='newUserForm.realName' auto-complete="off"
                  :disabled='isDialogCheck'></el-input>
      </el-form-item>
      
      <el-form-item label='手机号' prop='mobile'>
        <el-input v-model='newUserForm.mobile' auto-complete="off"
                  :disabled='isDialogCheck'></el-input>
      </el-form-item>
      
      <el-form-item label='WEB角色' prop='webRoleIds' class='new-user-webrole'>
        <el-select v-model="newUserForm.webRoleIds" multiple placeholder="请选择WEB角色"
                   :disabled='isDialogCheck'>
          <el-option v-for="item in webRoleToChoose"
                     :key="item.id+item.updateName"
                     :label="item.roleName"
                     :value="item.id">
            <span style="float: left">{{ item.roleName }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.id }}</span>
          </el-option>
        </el-select>
      </el-form-item>
      
      <el-form-item label='APP角色' prop='appRoleIds' class='new-user-approle'>
        <el-select v-model="newUserForm.appRoleIds" multiple placeholder="请选择APP角色"
                   :disabled='isDialogCheck'>
          <el-option v-for="item in appRoleToChoose"
                     :key="item.id+item.updateName"
                     :label="item.roleName"
                     :value="item.id">
            <span style="float: left">{{ item.roleName }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.id }}</span>
          </el-option>
        </el-select>
      </el-form-item>
      
      <el-form-item label='HMI角色' prop='hmiRoleIds' class='new-user-hmirole'>
        <el-select v-model="newUserForm.hmiRoleIds" multiple placeholder="请选择HMI角色"
                   :disabled='isDialogCheck'>
          <el-option v-for="item in hmiRoleToChoose"
                     :key="item.id+item.updateName"
                     :label="item.roleName"
                     :value="item.id">
            <span style="float: left">{{ item.roleName }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.id }}</span>
          </el-option>
        </el-select>
      </el-form-item>
      
      <el-form-item label='备注' prop='remark'>
        <el-input type="textarea" placeholder="请输入内容"
                  class='new-user-textarea'
                  :disabled='isDialogCheck'
                  :rows="2"
                  v-model="newUserForm.remark">
        </el-input>
      </el-form-item>
    </el-form>
    
    <span slot="footer">
      <el-button @click="newUserClose">取消</el-button>
      <el-button type="primary"
                 v-if='!isDialogCheck'
                 @click="confirmNewUser"
                 :loading='btnLoadingNewUser'>确定</el-button>
      <el-button type="primary"
                 v-if='isDialogCheck'
                 @click="editThisUser">修改</el-button>
    </span>
  </el-dialog>
</template>

<script type='text/javascript'>
  import * as Utils from 'utils/validate'
  import * as Users from 'api/user/user'
  
  export default {
    name: 'NewUser',
    props: {
      newUserVisible: Boolean,                        // dialog的visible状态
      webRoleToChoose: Array,                         // web角色列表的对象
      appRoleToChoose: Array,                         // app角色列表的对象
      hmiRoleToChoose: Array,                         // hmi角色列表的对象
      dialogType: String,                             // dialog类型: new edit check
      dialogUserData: Object                          // dialog用户信息
    },
    data() {
      const checkUserName = (rule, value, callback) => {
        if (!Utils.validateUserName(value)) {
          callback(new Error('用户名由1-12位字母、数字组成，请重新输入'))
        } else {
          Users.userQueryList(value, 10, 1).then(({ data }) => {
            if (!data.total) callback()
            data.dataList.some(T => T.roleName === value)
              ? callback(new Error('该用户名已存在，请重新输入'))
              : callback()
          }).catch(err => { callback(err) })
        }
      }
      
      const checkName = (rule, value, callback) => {
        if (!Utils.validateName(value)) {
          callback(new Error('姓名2-4位汉字组成，请重新输入'))
        } else {
          callback()
        }
      }
      
      const checkMobile = (rule, value, callback) => {
        if (!Utils.validateMobile(value)) {
          callback(new Error('手机号码为11位数字，请重新输入'))
        } else {
          callback()
        }
      }
      
      return {
        thisVisible: false,                       // 当前dialog的visible状态
        btnLoadingNewUser: false,                 // 确定按钮的Loading状态
        isDialogCheck: false,                     // 是否是查看用户状态
        newUserForm: {                            // form数据
          id: '',                                 //    id
          mobile: '',                             //    用户名
          remark: '',                             //    备注
          userName: '',                           //    用户名
          realName: '',                           //    中文名
          webRoleIds: [],                         //    web角色id
          appRoleIds: [],                         //    app角色id
          hmiRoleIds: []                          //    hmi角色id
        },
        fileList: [],                             // 头像上传的list
        newUserRules: {                           // 校验规则
          realName: [
            { trigger: 'blur', required: true, message: '请输入用户姓名' },
            { trigger: 'blur', validator: checkName }],
          mobile: [
            { trigger: 'blur', required: true, message: '请输入手机号' },
            { trigger: 'blur', validator: checkMobile }],
          userName: [
            { trigger: 'blur', required: true, message: '请输入用户名' },
            { trigger: 'blur', validator: checkUserName }]
        }
      }
    },
    computed: {
      /**
       * 当前dialog的title
       */
      dialogTitle() {
        return this.dialogType === 'new'
          ? '新建用户'
          : this.dialogType === 'edit'
                 ? '编辑用户'
                 : '查看用户'
      }
    },
    methods: {
      /**
       * 新建用户dialog关闭
       */
      newUserBeforeClose(done) {
        done()
      },
      
      /**
       * 点击取消按钮
       */
      newUserClose() {
        this.$emit('newUserDialogClosed')
        this.thisVisible = false
      },
      
      /**
       * close的时候的回调
       */
      onDialogClose() {
        this.dataReset()
        this.$emit('newUserDialogClosed')
      },
      
      /**
       * open的时候的回调
       */
      onDialogOpen() {
        this.$nextTick(() => {
          if (this.dialogType !== 'new') {                  // 如果不是新建用户就取用户信息
            for (const item of Object.entries(this.dialogUserData)) {
              if (Object.keys(this.newUserForm).includes(item[0])) {
                this.newUserForm[item[0]] = item[1]
              }
              item[0] === 'photo' && this.fileList.push({ name: '', url: item[1] })
              item[0] === 'webRoles' && this.newUserForm.webRoleIds.push(...item[1].map(T => T.id))
              item[0] === 'appRoles' && this.newUserForm.appRoleIds.push(...item[1].map(T => T.id))
              item[0] === 'hmiRoles' && this.newUserForm.hmiRoleIds.push(...item[1].map(T => T.id))
            }
          }
          this.isDialogCheck = this.dialogType === 'check'
        })
      },
      
      /**
       * 确认新建用户
       */
      confirmNewUser() {
        this.$refs['newUserForm'].validate(valid => {
          if (!valid) return
          this.btnLoadingNewUser = true
          const formData = new FormData()
          for (const item of Object.entries(this.newUserForm)) {
            formData.append(item[0], item[1])
          }
          this.fileList.length && formData.append('file', this.fileList[0].raw)
          
          this.dialogType === 'new' &&                    // 新增用户
          Users.userAdd(formData)
            .then(({ data }) => {
              this.$message({ message: `新建用户 ${this.newUserForm.realName} 已成功`, type: 'success' })
              if (data.userName === this.$store.getters.username) {
                if (process.env.NODE_ENV === 'production') {
                  this.$store.dispatch('LogOut').then(() => location.reload())
                } else console.info(`%c注意喽~返回的用户名跟本地用户名一样\n用户登出 in 新建用户`, 'color: #fff; background: #f40; font-size: 24px; font-family: consolas;')
              }
              this.newUserClose()
            })
            .catch(err => {
              this.$message({ message: `新建用户 ${this.newUserForm.realName} 失败！${err}`, type: 'error' })
            })
          
          if (this.dialogType === 'edit') {              // 编辑用户
            formData.append('isSimpleEdit', 'N')
            Users.userEdit(formData)
              .then(({ data }) => {
                this.$message({ message: `修改用户 ${this.newUserForm.realName} 已成功`, type: 'success' })
                if (data.userName === this.$store.getters.username) {
                  if (process.env.NODE_ENV === 'production') {
                    this.$store.dispatch('LogOut').then(() => location.reload())
                  } else console.info(`注意喽~返回的用户名跟本地用户名一样\n用户登出 in 新建用户`)
                }
                this.newUserClose()
              })
              .catch(err => {
                this.$message({ message: `修改用户 ${this.newUserForm.realName} 失败！${err}`, type: 'error' })
              })
          }
        })
      },
      
      /**
       * 上传头像的change回调
       */
      handleChange(file, fileList) {
        const type = file.raw.type
        const isJpgPng = type === 'image/jpeg' || type === 'image/png'
        const isLt2M = file.size / 1024 / 1024 < 2
        
        !isJpgPng && this.$message.error('上传头像图片只能是 JPG/PNG 格式!')
        !isLt2M && this.$message.error('上传头像图片大小不能超过 2MB!')
        
        this.fileList = isJpgPng && isLt2M
          ? fileList.slice(-1)
          : []
      },
      
      /**
       * 数据清空
       */
      dataReset() {
        this.$refs['newUserForm'] && this.$refs['newUserForm'].resetFields()
        this.fileList = []
        this.btnLoadingNewUser = false
      },
      
      /**
       * 在查看页面  修改用户
       */
      editThisUser() {
        this.$emit('changeDialogType', 'change', this.dialogUserData)
      }
    },
    watch: {
      /**
       * 把prop的visible同步给本地visible
       * @param val
       * @param oldVal
       */
      newUserVisible(val, oldVal) {
        this.thisVisible = val
      }
    },
    mounted() { }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .new-user-dialog {
    .new-user-form {
      margin: 0 auto;
      width: 600px;
      .el-select {
        width: 100%;
      }
      
      .new-user-trigger {
        font-size: 20px;
        color: #bfcbd9;
      }
      
      .new-user-webrole {
        & /deep/ .el-tag--info {
          background-color: rgba(64, 158, 255, .1);
          color: #409eff;
        }
      }
      
      .new-user-approle {
        & /deep/ .el-tag--info {
          background-color: rgba(103, 194, 58, .1);
          color: #67c23a;
        }
      }
      
      .new-user-textarea {
        & /deep/ .el-textarea__inner {
          height: 80px;
        }
      }
    }
  }
</style>
