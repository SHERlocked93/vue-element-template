<template>
  <div class='pwd-edit'>
    <p class='pwd-header'>修改密码</p>
    <el-form label-position='right' label-width="80px" ref='password' :model="password" :rules='inputRules' class='pwd-form'>
      <el-form-item label="用户名" prop='userName'>
        <el-input v-model="password.userName" :disabled='true'></el-input>
      </el-form-item>
      <el-form-item label="旧密码" prop='oldpassword'>
        <el-input v-model="password.oldpassword" type='password'></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop='password'>
        <el-input v-model="password.password" type='password'></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop='password1'>
        <el-input v-model="password.password1" type='password'></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="loading" @click='handleEdit'>确认</el-button>
        <el-button type="primary" @click='handleCancel'>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>


<script>
  import * as Utils from '@/utils/validate'
  import * as User from '@/api/user/user'
  import * as Local from '@/utils/stock'
  
  export default {
    name: 'ModifyPassword',
    data() {
      const checkPassword = (rule, value, callback) => {
        if (!Utils.validatePassword(value)) {
          callback(new Error('请输入6-16位只包含数字或字母的密码'))
        } else {
          callback()
        }
      }
      
      const checkPassword1 = (rule, value, callback) => {
        if (value !== this.password.password) {
          callback(new Error('两次输入密码不一致'))
        } else {
          callback()
        }
      }
      
      return {
        loading: false,
        password: {
          userName: Local.getUsername(),
          oldpassword: '',
          password: '',
          password1: ''
        },
        inputRules: {
          oldpassword: [{ required: true, trigger: 'blur', validator: checkPassword }],
          password: [{ required: true, trigger: 'blur', validator: checkPassword }],
          password1: [{ required: true, trigger: 'blur', validator: checkPassword1 }]
        }
      }
    },
    methods: {
      /**
       * 确认修改
       */
      handleEdit() {
        this.$refs.password.validate(valid => {
          if (valid) {
            User.editPwd({
              oldpassword: this.password.oldpassword,
              password: this.password.password
            }).then(resp => {
              this.$message({
                type: 'success',
                message: '密码修改成功,请重新登录!'
              })
              setTimeout(function() {
                Local.removeAll()
                location.reload()
              }, 2000)
            }).catch(err => {
              console.err(err)
            })
          }
        })
      },
      
      /**
       * 取消修改
       */
      handleCancel() {
        this.$router.push({ path: '/' })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "~styles/mixin.scss";
  
  .pwd-edit {
    @include moduleArea;
    width: 100%;
    text-align: center;
    padding: 120px 0;
    .pwd-header {
      font-size: 26px;
      color: #4285f4;
    }
    
    .pwd-form {
      width: 495px;
      padding-right: 55px;
      margin: 15px auto;
    }
  }
</style>
