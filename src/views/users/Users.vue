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
      v-loading="loading"
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
         width="160">
      </el-table-column>
       <el-table-column
        label="创建时间"
         width="120">
         <template slot-scope="scope">
          <!-- 当前行绑定到的数据对象 -- 用户对象 -->
          <!-- {{ scope.row }} -->
          <!-- <hr> -->
          <!-- 当前行的索引 -->
          <!-- {{ scope.$index }} -->
          <!-- <hr> -->
          <!-- 当前列的配置内容 -->
          <!-- {{ scope.column }} -->
          <!-- <hr> -->
          {{ scope.row.create_time | frmData('YYYY-MM-DD') }}
        </template>
      </el-table-column>
       <el-table-column
        label="状态"
         width="80">
           <template slot-scope="scope">
          <!-- scope.row 就是当前行绑定的数据对象 -->
          <el-switch
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </template>
      </el-table-column>
       <el-table-column
        prop=""
        label="操作">
        <template slot-scope="scope">
            <el-button type="primary" size="mini" plain icon="el-icon-edit"></el-button>
             <el-button type="danger" size="mini" plain icon="el-icon-delete"></el-button>
            <el-button type="success" size="mini" plain icon="el-icon-check" ></el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: [],
      loading: true
    }
  },
  created () {
    this.locadata()
  },
  methods: {
    async locadata () {
      this.loading = true
      // 发送请求之前，获取token
      const token = sessionStorage.getItem('token')
      // 在请求头中设置token
      this.$http.defaults.headers.common['Authorization'] = token
      const res = await this.$http.get('/users?pagenum=1&pagesize=10')
      // this.loading = 'true'
      const data = res.data
      // console.log(data)
      this.loading = false
      const {meta: {status, msg}} = data
      if (status === 200) {
        const {data: { users }} = data
        this.list = users
      } else {
        this.$message.error(msg)
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
