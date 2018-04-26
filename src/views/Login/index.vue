/**
* 创建于 2018/2/9
* 作者: SHERlocked93
* 功能: 登陆页面
*/

<!--suppress CssUnknownTarget, HtmlUnknownTarget -->
<template>
  <div class="login-container">
    <!-- 左侧介绍 -->
    <div class='login-notice'>
      <div class='login-bg'></div>
      <span class='login-desc2'>VUE Element Template</span>
      <span class='login-desc3'>VUE And ElementUI Based Simple Backstage Management</span>
      <span class='login-desc4'>SPA system</span>
      <div class='login-sanjiao'>
        <div class='login-icon-sanjiao'></div>
      </div>
    </div>
    
    <!-- 登陆表单 -->
    <div class="login-tabs">
      <div class='login-tabs-title'>用户登陆</div>
      
      <el-form autoComplete="on"
               class="login-form"
               ref="loginForm"
               label-position="left"
               label-width="0px"
               :model="loginForm"
               :rules="loginRules">
        <el-form-item prop="userName">
          <el-input name="userName" type="text" autoComplete="on"
                    placeholder="请输入用户名"
                    v-model="loginForm.userName"
                    @keyup.enter.native="handleLogin">
            <i slot='prefix' class='el-icon-my-yonghuming'></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input name="password" type="password" autoComplete="on"
                    placeholder="请输入密码"
                    @keyup.enter.native="handleLogin"
                    v-model="loginForm.password">
            <i slot='prefix' class='el-icon-my-webicon204'></i>
          </el-input>
        </el-form-item>
        
        <el-form-item class='login-btns'>
          <el-button type="primary" @click="handleCancel">
            取消
          </el-button>
          <el-button type="primary"
                     :loading="loading"
                     @click.native.prevent="handleLogin">
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  
  </div>
</template>

<script>
  import * as Validate from '@/utils/validate'
  import Cookies from 'js-cookie'
  
  export default {
    name: 'Login',
    data() {
      const checkUsername = (rule, value, callback) => {
        if (!Validate.validateUserName(value)) {
          callback(new Error('请输入正确的用户名'))
        } else {
          callback()
        }
      }
      
      const checkPass = (rule, value, callback) => {
        if (!Validate.validatePassword(value)) {
          callback(new Error('请输入正确的密码'))
        } else {
          callback()
        }
      }
      
      return {
        cardId: '',
        focusState: false,
        loginForm: {
          userName: Cookies.get('LastLoginUsername') || 'admin',
          password: '888888'
        },
        loginRules: {
          userName: [{ required: true, trigger: 'blur', validator: checkUsername }],
          password: [{ required: true, trigger: 'blur', validator: checkPass }]
        },
        loading: false
      }
    },
    methods: {
      /**
       * 登陆
       */
      handleLogin() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true
            this.$store.dispatch('Login', this.loginForm).then(() => {
              this.loading = false
              Cookies.set('LastLoginUsername', this.loginForm.userName)
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
      
      /**
       * 取消
       */
      handleCancel() {
        this.loading = false
        this.$refs['loginForm'].resetFields()
      }
    }
  }

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  //noinspection CssUnknownTarget
  @import '~@/styles/mixin.scss';
  
  $dark_gray: #889aa4;
  
  .login-container {
    @include relative;
    background-size: cover;
    height: 100vh;
    min-width: 454px;
    overflow: hidden;
    margin: 0 auto;
    position: relative;
    
    /* 左侧介绍 */
    .login-notice {
      position: absolute;
      width: calc(100vw - 454px);
      min-width: 593px;
      margin-right: 454px;
      height: 100vh;
      background: url('~assets/loginBg.jpg') no-repeat;
      background-size: cover;
      z-index: -1;
      
      /* 半透明蒙层 */
      .login-bg {
        width: inherit;
        height: inherit;
        background-color: rgba(0, 0, 0, .4);
        z-index: 0;
      }
      
      .login-desc2,
      .login-desc3,
      .login-desc4,
      .login-sanjiao {
        position: absolute;
        right: 90px;
        font-family: PingFangSC-Regular;
        color: rgba(255, 255, 255, .67);
        font-size: 20px;
      }
      
      .login-desc2 {
        bottom: 230px;
        font-size: 56px;
        letter-spacing: 3.5px;
        color: #fff;
      }
      
      .login-desc3 {
        bottom: 190px;
        color: rgba(255, 255, 255, .67);
      }
      
      .login-desc4 {
        bottom: 158px;
      }
      
      /* 三角箭头 */
      .login-sanjiao {
        right: 40px;
        bottom: 240px;
        height: 32px;
        width: 32px;
        background-color: rgba(175, 175, 175,.5);
        border-radius: 50%;
        
        .login-icon-sanjiao {
          position: absolute;
          top: 10px;
          left: 12px;
          width: 0;
          height: 0;
          border-left: 6px solid transparent;
          border-right: 6px solid transparent;
          border-bottom: 12px solid white;
          transform: rotate(90deg);
        }
      }
      
    }
    
    /* 登陆表单 */
    .login-tabs {
      position: fixed;
      right: 0;
      width: 454px;
      height: 100vh;
      padding-top: calc(50vh - 170px);
      box-shadow: 0 0 30px 0 rgba(180, 180, 180, 0.50);
      background-color: #fff;
      overflow: hidden;
      z-index: 0;
      
      /* 表单标题：用户登录 */
      .login-tabs-title {
        font-family: PingFangSC-Medium, "Microsoft YaHei UI Light";
        font-size: 32px;
        color: #4f64ff;
        letter-spacing: 2.8px;
        text-align: center;
        margin-bottom: 86px;
      }
      
      /* 表单 */
      .login-form {
        .el-icon-my-yonghuming {
          margin-left: 2px;
        }
        .el-icon-my-webicon204 {
          margin-left: 2px;
        }
      }
      
      .el-form-item {
        margin-bottom: 20px;
        text-align: center;
        
        .el-input {
          display: inline-block;
          height: 36px;
          width: 318px;
        }
        
        /deep/ .el-form-item__error {
          margin-left: 70px;
        }
      }
      
      /* 按钮：取消、登陆 */
      .login-btns {
        padding-top: 40px;
        
        .el-button {
          box-shadow: 2px 2px 4px 0 rgba(42, 74, 215, 0.35);
          width: 120px;
          letter-spacing: 1px;
          &:nth-of-type(1) {
            margin-right: 35px;
          }
        }
      }
      
      .el-tabs__nav {
        float: none;
        text-align: center;
        margin-top: 8.76px;
      }
      
      .el-tabs,
      .el-tabs__header,
      .el-tabs__item {
        border: none;
        box-shadow: none;
        background-color: #fff;
      }
    }
  }

</style>
