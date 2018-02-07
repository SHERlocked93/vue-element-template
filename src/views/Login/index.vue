<template>
  <div class="login-container">
    <div class="loginTabs">
      <h2>Vue Element SPA</h2>
      <el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left" label-width="0px" class="card-box login-form">
        <el-form-item prop="userName">
          <span class="svg-container ">用户名</span>
          <el-input name="userName" type="text" v-model="loginForm.userName" autoComplete="on" placeholder="请输入用户名"/>
        </el-form-item>
        <el-form-item prop="password">
          <span class="svg-container">密  码</span>
          <el-input name="password" type="password" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on" placeholder="请输入密码"/>
        </el-form-item>
        <el-form-item style="margin-top:40px;">
          <el-button type="primary" :loading="loading" @click.native.prevent="handleLogin">
            登 录
          </el-button>
          <el-button type="primary" @click="handleCancel">
            取 消
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
  import { validatePassword } from '@/utils/validate'
  
  export default {
    name: 'Login',
    data() {
      const checkUsername = (rule, value, callback) => {
        if (!validatePassword(value)) {
          callback(new Error('请输入正确的用户名'))
        } else {
          callback()
        }
      }
      const checkPass = (rule, value, callback) => {
        if (!validatePassword(value)) {
          callback(new Error('请输入正确的密码'))
        } else {
          callback()
        }
      }
      return {
        cardId: '',
        focusState: false,
        loginForm: {
          userName: 'adminadmin',
          password: '88888888'
        },
        loginRules: {
          userName: [{ required: true, trigger: 'blur', validator: checkUsername }],
          password: [{ required: true, trigger: 'blur', validator: checkPass }]
        },
        loading: false
      }
    },
    directives: {
      focus: {
        update: function(el, { value }) {
          if (value) {
            el.focus()
          }
        }
      }
    },
    methods: {
      handleLogin() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true
            this.$store.dispatch('Login', this.loginForm).then(() => {
              this.loading = false
              this.$router.push({ path: '/' })
            }).catch(() => {
              this.loading = false
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      handleCancel() {
        this.loading = false
        this.$refs['loginForm'].resetFields()
      }
    }
  }

</script>

<!--suppress SassScssResolvedByNameOnly, CssUnknownTarget -->
<style rel="stylesheet/scss" lang="scss">
  @import '~styles/mixin.scss';
  
  $dark_gray: #889aa4;
  h2 {
    text-align: center;
    color: #2864d0;
    margin-top: 61px;
    font-size: 28px;
  }
  
  .login-container {
    @include relative;
    background: url('~@/assets/bigsea.png') no-repeat;
    background-size: 100% 100%;
    height: 100vh;
    overflow: hidden;
    margin: 0 auto;
    
    input {
      border: 1px solid #bfcbd9;
      -webkit-appearance: none;
      border-radius: 4px;
      padding: 8px 5px 8px 15px;
      height: 36px;
    }
    .el-input {
      display: inline-block;
      height: 36px;
      width: 64%;
    }
    .svg-container {
      vertical-align: middle;
      display: inline-block;
      width: 60px;
      &_login {
        font-size: 20px;
      }
    }
    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
    }
    .thirdparty-button {
      position: absolute;
      right: 35px;
      bottom: 28px;
    }
    .el-form-item {
      margin-bottom: 20px;
      text-align: center;
      .el-form-item__error {
        margin-left: 120px;
      }
    }
    .el-tabs__item.is-active {
      color: #000;
    }
    .loginTabs {
      position: absolute;
      top: 17%;
      left: 38%;
      width: 516px;
      height: 436px;
      border-radius: 10px;
      background-color: #fff;
      overflow: hidden;
      -webkit-transition: 0.5s;
      -moz-transition: 0.5s;
      -o-transition: 0.5s;
      transition: 0.5s;
      box-shadow: 1px 10px 10px rgba(0, 0, 0, .5);
      
      & .login-form {
        margin-top: 60px;
      }
      
      &:hover {
        -webkit-transform: translate(1px, -1px);
        -moz-transform: translate(1px, -1px);
        -ms-transform: translate(1px, -1px);
        -o-transform: translate(1px, -1px);
        transform: translate(1px, -1px);
        box-shadow: 2px 12px 12px rgba(0, 0, 0, .6);
      }
    }
    .loginTabs .el-tabs__nav {
      float: none;
      text-align: center;
      margin-top: 8.76px;
    }
    .loginTabs .el-tabs,
    .loginTabs .el-tabs__header,
    .loginTabs .el-tabs__item {
      border: none;
      box-shadow: none;
      background-color: #fff;
    }
    button {
      height: 36px;
      width: 37%;
      font-size: 16px;
    }
  }

</style>
