<template>
  <div class="login-bg">
    <el-form :model="formdata" status-icon :rules="loginRules" ref="loginForm" label-width="0px" class="login-form">
      <h1 class="login-title">{{title}}</h1>
      <el-form-item class="form-item" prop="name">
        <i class="iconfont icon-user"></i>
        <el-input type="text" class="login-input" v-model="formdata.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="pass">
        <i class="iconfont icon-mima"></i>
        <el-input  :type="passType" class="login-input" @keyup.enter.native="handleLogin" v-model="formdata.pass" autocomplete="on"></el-input>
        <i class="iconfont icon-eye-slash" @click="passToggle"></i>
      </el-form-item>
      <el-form-item class="form-item">
        <el-button :loading="loading" type="primary" class="login-btn" @click="handleLogin">{{btnText}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data(){
    return {
      title:"欢迎登录",
      btnText:"登录",
      loading:false,
      passType:"password",
      redirect: undefined,
      formdata:{
        name:"admin",
        pass:"123456",
        checkPass:"",

      },
      loginRules:{
         name:[
            { required: true, message: '请输入帐号', trigger: 'blur' },
         ],
         pass:[
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
         ],
      }
    }
  },
  methods:{
    passToggle(){
      if(this.passType==""){
        this.passType="password"
      }else{
        this.passType=""
      }
    },
    handleLogin(){
      this.$refs.loginForm.validate(valid=>{
        if (valid) {
          this.loading = true
          this.$store.dispatch('loginIn', this.formdata).then((data) => {
           // console.log('loginIn',data)
            this.loading = false
            this.$router.push({ path: this.redirect || '/index' })
          }).catch((err) => {
            //console.log(err)
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  }, 
}
</script>
<style lang="scss" scoped>
</style>

  
