/**
* 创建于 2018/2/2
* 作者: Qianyu
* 功能: 系统配置-用户信息
*/


<!--suppress JSIgnoredPromiseFromCall -->
<template>
  <div class="myinfo">
    <!--头像-->
    <el-upload class='avatar-uploader'
               ref='photoUpload'
               action=""
               :show-file-list="false"
               :auto-upload='false'
               :file-list='fileList'
               :on-change='handleChange'>
      <img v-if="fileList.length" :src="fileList[0].url" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    
    
    <!--用户信息-->
    <el-form label-position="right" label-width="80px" :model='myinfo' ref='myinfo' :rules='inputRules' class='myinfo-form'>
      <el-form-item label='用户名'>
        <el-input v-model='existUsername' :disabled='true'></el-input>
      </el-form-item>
      <el-form-item label='姓名' prop='realName'>
        <el-input v-model='myinfo.realName'></el-input>
      </el-form-item>
      <el-form-item label='手机号' prop='mobile'>
        <el-input v-model='myinfo.mobile'></el-input>
      </el-form-item>
    </el-form>
    
    <!--按钮-->
    <el-button type='primary' :loading='loading' @click='submitInfoEdit'>保存</el-button>
    <el-button type='primary' @click='handleCancel'>取消</el-button>
  </div>
</template>

<script type='text/javascript'>
  import { mapGetters } from 'vuex'
  import * as Users from 'api/user/user'
  import * as Utils from '@/utils/validate'
  
  export default {
    name: 'UserInfo',
    data() {
      const changeRealname = (rule, value, cb) => {
        if (!Utils.validateName(value)) {
          return cb(new Error('请输入合法中文姓名'))
        } else cb()
      }
      
      const changeMobile = (rule, value, cb) => {
        if (!Utils.validateMobile(value)) {
          return cb(new Error('请输入合法手机号'))
        } else cb()
      }
      
      return {
        loading: false,                       // 保存按钮的 loading 状态
        fileList: [],
        myinfo: { realName: '', mobile: '' },
        inputRules: {
          realName: [{ required: true, trigger: 'blur', validator: changeRealname }],
          mobile: [{ required: true, trigger: 'blur', validator: changeMobile }]
        }
      }
    },
    computed: {
      ...mapGetters({
        existUid: 'uid',
        existPhoto: 'photo',
        existUsername: 'username',
        existRealname: 'realname',
        existMobile: 'mobile'
      })
    },
    methods: {
      /**
       * 提交用户信息修改
       */
      submitInfoEdit() {
        this.loading = true
        this.$refs['myinfo'].validate(valid => {
          if (valid) {
            const formData = new FormData()
            formData.append('isSimpleEdit', 'Y')
            formData.append('id', this.existUid)
            for (const item of Object.entries(this.myinfo)) {
              formData.append(item[0], item[1])
            }
            if (this.fileList.length && this.fileList[0].url !== this.existPhoto) {
              formData.append('file', this.fileList[0].raw)
            }
            
            Users.userEdit(formData).then(({ data }) => {
              this.loading = false
              this.$message({ message: '修改成功!', type: 'success' })
              this.$store.dispatch('ChangePhoto', data.photo)
              this.$store.dispatch('EditUserInfo', data)
            })
          } else {
            this.loading = false
            this.$message({ message: '请确认表单内容合法', type: 'warning' })
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
          : [{ name: 'ORIGIN_PHOTO', url: this.existPhoto }]
      },
      
      /**
       * 取消
       */
      handleCancel() {
        this.$router.push({ path: '/' })
      }
    },
    mounted() {
      this.existPhoto && (this.fileList = [{ name: 'ORIGIN_PHOTO', url: this.existPhoto }])
      this.myinfo.realName = this.existRealname
      this.myinfo.mobile = this.existMobile
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "~styles/mixin.scss";
  
  .myinfo {
    @include moduleArea;
    width: 100%;
    text-align: center;
    padding: 120px 0;
    
    & /deep/ .avatar-uploader .el-upload {
      margin-bottom: 15px;
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409eff;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 120px;
      height: 120px;
      line-height: 120px;
      text-align: center;
    }
    .avatar {
      width: 120px;
      height: 120px;
      display: block;
    }
    
    .myinfo-form {
      width: 495px;
      padding-right: 55px;
      margin: 0 auto;
    }
  }
</style>
