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
        <el-input class="searchInput" clearable placeholder="请输入内容" v-model="idval">
          <el-button slot="append" icon="el-icon-search" @click="handleSeach"></el-button>
        </el-input>
        <el-button type="success" plain @click="handleUser=true">添加用户</el-button>
          <el-dialog title="添加用户" :visible.sync="handleUser">
            <el-form ref="formData"
              :model="formData"
              label-width="80px"
              class="login-form">
                <el-form-item label="用户名">
                    <el-input v-model="formData.username"  placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="formData.password" type="password" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input v-model="formData.email"  placeholder="请输入邮箱"></el-input>
                </el-form-item>
                <el-form-item label="电话">
                    <el-input v-model="formData.mobile"  placeholder="请输入电话"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="handleUser = false">取 消</el-button>
              <el-button type="primary" @click="handleUserAdd" >确 定</el-button>
            </div>
        </el-dialog>
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
            inactive-color="#ff4949"
            @change="changeSwitch($event,scope.row)">
          </el-switch>
        </template>
      </el-table-column>
       <el-table-column
        label="操作">
        <template slot-scope="scope">
            <el-button type="primary" size="mini" plain icon="el-icon-edit"  @click="handelEdit(scope.row)" >
            </el-button >
                  <el-dialog title="修改用户" :visible.sync="handelEditlist" >
                    <el-form
                       ref="editlist"
                      :model="editlist"
                      label-width="80px"
                      class="edit-form">
                        <el-form-item label="用户名" >
                            <el-input  v-model="editlist.username"  :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="邮箱">
                            <el-input v-model="editlist.email"></el-input>
                        </el-form-item>
                        <el-form-item label="电话">
                            <el-input v-model="editlist.mobile" ></el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                          <el-button @click="handelEditlist=false">取 消</el-button>
                         <el-button type="primary" @click="handelEditlUsers" >修 改</el-button>
                    </div>
                </el-dialog>
             <el-button type="danger" size="mini" plain icon="el-icon-delete" @click="handelDel(scope.row)"></el-button>
            <el-button type="success" size="mini" plain icon="el-icon-check" @click="handelRole(scope.row)"></el-button>
            <el-dialog title="收货地址" :visible.sync="handeleRoleDialog">
              <el-form :model="Roleform">
                    <el-form-item label="当前用户" :label-width="RoleformLabelWidth">
                      <el-input v-model="Roleform.username"
                       size="medium"
                      auto-complete="off"
                      style="width: 215px"
                      :disabled="true"></el-input>
                    </el-form-item>
                <el-form-item label="请选择角色" :label-width="RoleformLabelWidth" >
                  <el-select v-model="Roleform.rid" placeholder="请选择角色" @change="selectChange">
                     <el-option v-for="item in selectlist"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        :disabled="item.disabled"></el-option>
                    <el-option
                          v-for="item in roleList"
                          :key="item.id"
                          :label="item.roleName"
                          :value="item.id">
                        </el-option>
                  </el-select>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="handeleRoleDialog = false">取 消</el-button>
                <el-button type="primary" @click="handeleRoleCheck(scope.row)">确 定</el-button>
              </div>
            </el-dialog>
        </template>
      </el-table-column>
    </el-table>
    <template>
           <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[5, 10, 15]"
              :page-size="pagesize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
            </el-pagination>
      </template>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: [],
      loading: true,
      handleUser: false,
      formData: {
        username: '',
        password: '',
        email: '',
        mobile: '',
        time: ''
      },
      handelEditlist: false,
      editlist: {
      },
      total: 0,
      pagesize: 5,
      currentPage: 1,
      idval: '',
      RoleformLabelWidth: '120px',
      handeleRoleDialog: false,
      Roleform: {
      },
      roleList: [],
      selectlist: [{
        value: '-1',
        label: '请选择角色',
        disabled: true
      }
      ]
    }
  },
  created () {
    this.locadata()
  },
  methods: {
    handleSizeChange (val) {
      // size发生变化
      this.pagesize = val
      this.locadata()
      console.log(`每页 ${val} 条`, val)
    },
    handleCurrentChange (val) {
      // 页码发生变化
      // this.pagesize = 5
    // 当每页条数发生变化，修改当前页码为第一页
      this.currentPage = val
      this.locadata()
      console.log(`当前页: ${val}`, val)
    },
    async locadata () {
      this.loading = true
      // 发送请求之前，获取token
      const token = sessionStorage.getItem('token')
      // 在请求头中设置token
      this.$http.defaults.headers.common['Authorization'] = token
      const params = {pagenum: this.currentPage, pagesize: this.pagesize}
      const res = await this.$http.get('/users', { params })
      // this.loading = 'true'
      const data = res.data
      this.total = data.data.total
      // console.log(data)
      this.loading = false
      const {meta: {status, msg}} = data
      if (status === 200) {
        const {data: { users }} = data
        this.list = users
      } else {
        this.$message.error(msg)
      }
    },
    // 搜索id
    async handleSeach () {
      const id = this.idval
      const res = await this.$http.get('users/' + id)
      const data = res.data
      const {meta: {status, msg}} = data
      if (status === 200) {
        this.list = data.data
        console.log(data.data)
      } else {
        this.$message.error(msg)
      }
    },
    // 添加数据
    async handleUserAdd () {
      if (!this.formData.username || !this.formData.password) {
        this.$message('用户名和密码不能为空')
      } else {
        // 发送请求之前，获取token
        const token = sessionStorage.getItem('token')
        // 在请求头中设置token
        this.$http.defaults.headers.common['Authorization'] = token
        this.formData.time = Number(new Date())
        const formData = this.formData
        const res = await this.$http.post('users', formData)
        const data = res.data
        const {meta: {status, msg}} = data
        if (status === 201) {
          this.$message.success('添加成功')
          this.handleUser = false
          this.locadata()
        } else {
          this.$message.error(msg)
        }
      }
    },
    // 删除数据
    handelDel (row) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const id = row.id
          this.$http.delete('users/' + id, function (res) {
            const {meta: {status, msg}} = res.data
            if (status === 200) {
              this.$message.success('删除成功')
              //  this.locadata()
            } else {
              this.$message.error(msg)
            }
          })
        })
        .catch(() => {
          this.$message({ type: 'info', message: '已取消删除' })
        })
    },
    // change  改变swithc事件
    async changeSwitch ($event, row) {
      const id = row.id
      const res = await this.$http.put('users/' + id + '/state/' + $event)
      const data = res.data
      const {meta: {status, msg}} = data
      if (status === 200) {
        this.locadata()
        this.$message.success('设置状态成功')
      } else {
        this.$message.error(msg)
      }
    },
    async handelEdit (row) {
      this.handelEditlist = true
      const id = row.id
      const res = await this.$http.get('users/' + id)
      const data = res.data
      const {meta: {status, msg}} = data
      if (status === 200) {
        this.editlist = data.data
        console.log(data.data)
      } else {
        this.$message.error(msg)
      }
    },
    // 修改用户数据
    async handelEditlUsers () {
      const id = this.editlist.id
      const res = await this.$http.put('users/' + id, this.editlist)
      const data = res.data
      const {meta: {status, msg}} = data
      if (status === 200) {
        this.$message.success(msg)
        this.handelEditlist = false
        this.locadata()
      } else {
        this.$message.error(msg)
      }
    },
    // 角色分配
    async handelRole (row) {
      this.handeleRoleDialog = true
      // 获取用户名称
      const id = row.id
      const res = await this.$http.get('users/' + id)
      const data = res.data
      const {meta: {status, msg}} = data
      if (status === 200) {
        this.Roleform = data.data
        console.log(data.data)
      } else {
        this.$message.error(msg)
      }
      // 获取角色列表
      this.handelRoleList()
    },
    // 获取角色列表
    async handelRoleList () {
      const res = await this.$http.get('roles')
      const data = res.data
      const {meta: {status, msg}} = data
      if (status === 200) {
        this.roleList = data.data
        console.log(data.data)
      } else {
        this.$message.error(msg)
      }
    },
    // 获取选中的管理员角色ID
    selectChange (value) {
      this.roleid = value
    },
    // 修改该用户的管理员角色
    async handeleRoleCheck (row) {
      const role = this.roleid
      const id = row.id
      const res = await this.$http.put('users/' + id + '/role', {rid: role})
      const data = res.data
      const {meta: {status, msg}} = data
      if (status === 200) {
        this.$message.success(msg)
        this.handeleRoleDialog = false
      } else {
        this.$message.error(msg, status)
      }
    }
  }
}
</script>

<style>
.searchAt{
  margin: 10px 0 10px 0;
}
.searchAt .searchInput {
  width: 350px;
}
</style>
