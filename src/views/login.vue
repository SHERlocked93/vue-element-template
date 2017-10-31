<template>
  <div id='login'>
    <!-- header -->
    <div class='navbar navbar-default navbar-fixed-top index-navbar' id='header'>
      <div class='container-fluid'>
        <div class='navbar-header'>
          <a class='navbar-brand' href='http://www.panda-fa.com/' target='_blank'>
            <img id='logo-img' src='../assets/logo.png'/>
          </a>
          <span id='logo-text' class='navbar-text'>Panda SPA Simple</span>
        </div>
      </div>
    </div>
    
    <!-- form -->
    <el-form class='index-container animated fadeInDown' id='login-form' :rules='rules' :model='loginForm' ref='loginForm'>
      <span class='login-text'>LOGIN</span>
      <span id='username-label'>用户名</span>
      <input type='text' id='username' name='userId' title='用户名' autocomplete='on' autofocus tabindex='1' v-model.trim='loginForm.username'>
      
      <span id='userpsd-label'>密码</span>
      <input type='password' id='password' name='loginPassword' title='密码' tabindex='2' v-model='loginForm.password' @keyup.enter.native="handleLogin">
      
      <el-button type='reset' id='btn-cancel' tabindex='3'>取消</el-button>
      <el-button type='button' id='btn-login' :loading='loading' tabindex='4' @click.native.prevent='handleLogin'>登陆</el-button>
    
    </el-form>
    
    <a id='bottom' href='http://www.panda-fa.com/' target='_blank'>
      <span id='company'>南京熊猫电子装备有限公司</span>
    </a>
  </div>
</template>

<script type='text/javascript'>
  import { isvalidUsername } from '@/utils/validate'
  import { Message } from 'element-ui'
  
  export default {
    name: 'login',
    data() {
      const validateUsername = (rule, value, callback) => {
        if (!isvalidUsername(value)) {
          callback(new Error('请输入正确的用户名'))
        } else {
          callback()
        }
      }
      const validatePass = (rule, value, callback) => {
        if (value.length < 6) {
          callback(new Error('密码不能小于6位'))
        } else {
          callback()
        }
      }
      
      return {
        loading: false,
        loginForm: {
          username: 'admin',
          password: '123456'
        },
        rules: {
          username: [{ required: true, trigger: 'blur', validator: validateUsername }],
          password: [{ required: true, trigger: 'blur', validator: validatePass }]
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
            Message({
              message: '不合法的用户名',
              type: 'error',
              duration: 5 * 1000
            })
            return false
          }
        })
      }
    },
    mounted() {
      document.body.style.background = `url(${require('../assets/login/bigsea.png')}) no-repeat center`
      document.body.style.backgroundSize = `cover`
    },
    destroyed() {
      document.body.style.background = ''
    }
  }
</script>

<style rel='stylesheet/scss' scoped>
  #login {
    height: 100vh;
    background-size: cover;
  }
  
  /*region 导航条*/
  #header {
    background: rgba(244, 245, 246, .1);
  }
  
  .index-navbar {
    width: 100%;
    height: 50px;
    border-width: 0;
  }
  
  #logo-img {
    width: 30px;
    height: 30px;
    margin-top: -3px;
    margin-left: 45px;
  }
  
  #logo-text {
    text-align: left;
    margin-left: 13px;
    font-size: 16px;
    font-family: PingFangSC-Regular, sans-serif;
  }
  
  #lan {
    width: 104px;
    height: 20px;
    float: right;
    margin-top: 19px;
    margin-right: 170px;
  }
  
  #chineseLan {
    width: 46px;
    height: 20px;
    letter-spacing: 0.2em;
    line-height: 20px;
    font-size: 14px;
    color: #4a4a4a;
    font-family: PingFangSC-Regular, sans-serif;
  }
  
  #englishLan {
    width: 56px;
    height: 20px;
    letter-spacing: 0.2em;
    line-height: 20px;
    font-size: 14px;
    font-family: PingFangSC-Regular, sans-serif;
  }
  
  /*endregion*/
  
  /*region 内容*/
  .index-container {
    width: 750px;
    height: 450px;
    position: absolute;
    border-radius: 5px;
    padding: 0;
    left: 50%;
    top: 50%;
    -webkit-transition: 0.3s;
    -moz-transition: 0.3s;
    -ms-transition: 0.3s;
    -o-transition: 0.3s;
    transition: 0.3s;
    margin: -255px 0 0 -405px;
    box-shadow: 1px 10px 10px rgba(0, 0, 0, .5);
    background: url('../assets/login/major.png') no-repeat;
  }
  
  .index-container:hover {
    -webkit-transform: translate(1px, -2px);
    -moz-transform: translate(1px, -2px);
    -ms-transform: translate(1px, -2px);
    -o-transform: translate(1px, -2px);
    transform: translate(1px, -2px);
    box-shadow: 8px 8px 15px rgba(0, 0, 0, .6);
  }
  
  .login-text {
    position: absolute;
    width: 76px;
    height: 28px;
    margin: 110px 321px 312px 353px;
    font-size: 24px;
    font-family: LucidaGrande, sans-serif;
    color: #4990e2;
  }
  
  #username-label {
    position: absolute;
    width: 42px;
    height: 20px;
    margin: 194px 350px 236px 358px;
    font-size: 14px;
    font-family: PingFangSC-Medium, sans-serif;
    color: #818181;
  }
  
  #userpsd-label {
    position: absolute;
    width: 42px;
    height: 20px;
    margin: 258px 350px 172px 358px;
    font-size: 14px;
    font-family: PingFangSC-Medium, sans-serif;
    color: #818181;
  }
  
  #username {
    position: absolute;
    width: 260px;
    height: 37px;
    margin: 186px 69px 227px 421px;
    font-size: 14px;
    font-family: PingFangSC-Medium, sans-serif;
    color: #000;
    padding: 0 0 0 17px;
    background: #fff;
    border: 1px solid #eaeaea;
    border-radius: 2px;
    text-align: left;
    line-height: 37px;
  }
  
  #password {
    position: absolute;
    width: 260px;
    height: 37px;
    margin: 250px 69px 163px 421px;
    font-size: 14px;
    font-family: PingFangSC-Medium, Microsoft YaHei UI, sans-serif;
    color: #000;
    padding: 0 0 0 17px;
    background: #fff;
    border: 1px solid #eaeaea;
    border-radius: 2px;
  }
  
  input:focus {
    outline: none;
    box-shadow: 0 0 7px 0 rgba(188, 188, 188, 0.50);
  }
  
  #btn-cancel {
    position: absolute;
    width: 146px;
    height: 32px;
    margin: 344px 276px 134px 388px;
    background: #aab5c7;
    border-radius: 2px;
    font-size: 14px;
    font-family: PingFangSC-Medium, sans-serif;
    color: #fff;
    border: none;
  }
  
  #btn-login {
    position: absolute;
    width: 146px;
    height: 32px;
    margin: 344px 100px 134px 564px;
    background: #4990e2;
    border-radius: 2px;
    font-size: 14px;
    font-family: PingFangSC-Medium, sans-serif;
    color: #fff;
    border: none;
  }
  
  /*endregion*/
  
  /*region 底部*/
  #bottom {
    position: fixed;
    bottom: 26px;
    left: 0;
    text-align: center;
    width: 100%;
    height: 20px;
    text-decoration-line: none;
  }
  
  #company {
    width: 150px;
    height: 14px;
    font-size: 18px;
    font-weight: 600;
    font-family: PingFangSC-Regular, sans-serif;
    color: #4a4a4a;
    letter-spacing: 0.43em;
    line-height: 18px;
  }
  
  /*endregion*/
</style>
