<template>
  <div class="login-wrap">
      <el-form ref="formData"
      :model="formData"
      label-width="80px"
      class="login-form">
        <h2>用户登录</h2>
        <el-form-item label="账号">
            <el-input v-model="formData.username"  placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="密码">
            <el-input v-model="formData.password" type="password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="handelLogin" class="login-btn">立即登录</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
   async handelLogin() {
     const res = await this.$http.post('login',this.formData)
     const data=res.data
     const {meta:{status,msg}}=data
     if(data.meta.status===200){
       const token=data.data.token;
       sessionStorage.setItem('token',token)
         this.$message.success(msg)
         console.log(token)
     }else{
       this.$message.error(msg)
     }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.login-wrap {
  background-color: #324152;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
    text-align: center;
}

.login-wrap .login-form {
  background-color: #fff;
  width: 500px;
  padding: 30px;
  padding-left:0;
  border-radius: 5px;
}

.login-wrap .login-form .login-btn {
  width: 100%;
}
</style>
