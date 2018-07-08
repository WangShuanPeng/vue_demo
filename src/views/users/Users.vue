<template>
  <el-card class="box-card">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    <el-breadcrumb-item>用户列表</el-breadcrumb-item>
  </el-breadcrumb>
  <!-- 搜索区域-->
   <el-row class="searchAt">
      <el-col :span="24">
        <el-input class="searchInput" clearable placeholder="请输入内容">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-button type="success" plain>添加用户</el-button>
      </el-col>
    </el-row>
    <!-- 表格区域 -->
      <el-table
      stripe
       border
      :data="list"
      style="width: 100%">
      <el-table-column
      type="index"
      width="50">
    </el-table-column>
      <el-table-column
        prop="username"
        label="名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
        width="180">
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="电话"
         width="180">
      </el-table-column>
       <el-table-column
        prop=""
        label="状态"
         width="180">
      </el-table-column>
       <el-table-column
        prop=""
        label="操作">
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      list : [],
       loading: true
    }
  },
  created () {
    this.locadata ()
  },
  methods :{
    async locadata () {
      // 发送请求之前，获取token
      const token = sessionStorage.getItem('token')
      // 在请求头中设置token
      this.$http.defaults.headers.common['Authorization'] = token
      const res = await this.$http.get ('/users?pagenum=1&pagesize=10')
      // this.loading = 'true'
      const data = res.data
      // console.log(data)

      const { meta : {status, msg}}=data
      if(status === 200 ){
        const { data : { users }} =data
        this.list = users
      }else{
        this.$message.error (msg)
      }
    }
  }
}
</script>

<style>
.box-card{
  height: 100%;
}
.searchAt{
  margin: 10px 0 10px 0;
}
.searchAt .searchInput {
  width: 350px;
}
</style>
