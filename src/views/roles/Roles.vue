<template>
  <el-card class="box-card">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
     <el-button class="addRole" @click="handleAddBtn">添加角色</el-button>
     <!-- 添加角色弹出框 -->
        <el-dialog title="添加角色" :visible.sync="handleAddDialog" @closed="handleAddDialogfalse">
          <el-form
          ref="myfromrole"
          :rules="Rolerules"
          :model="formData" >
            <el-form-item label="角色名称" :label-width="formLabelWidth1" prop="roleName">
              <el-input
              v-model="formData.roleName"
               auto-complete="off"
              style="width: 400px"
              placeholder="请输入角色名称"
              ></el-input>
            </el-form-item>
            <el-form-item label="角色描述" :label-width="formLabelWidth1" prop="roleDesc">
              <el-input
               v-model="formData.roleDesc"
               auto-complete="off"
              style="width: 400px"
              placeholder="请输入角色描述"
              ></el-input>
            </el-form-item>
          </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleAddDialogfalse">取 消</el-button>
        <el-button type="primary" @click="handleAddRole">确 定</el-button>
      </div>
    </el-dialog>
          <!--角色列表 -->
          <template>
              <el-table
              :data="listone"
              v-loading="loading"
                stripe  border
              style="width: 100%">
              <el-table-column type="expand">
                <template slot-scope="props">
                  <el-form label-position="left" inline class="demo-table-expand">
                    <!-- <el-tree :data="listtwo" :props="defaultProps" @node-click="handleNodeClick"></el-tree> -->
                    <!-- <el-tag
                        v-for="tag in listtwo"
                        :key="tag.authName"
                        closable>
                        {{tag.authName}}
                      </el-tag>
                       <el-tag
                        v-for="tag in listthree"
                        :key="tag.authName"
                        closable
                        type="success">
                        {{tag.authName}}
                      </el-tag> -->
                  </el-form>
                </template>
              </el-table-column>
               <el-table-column
                type="index"
                width="50">
               </el-table-column>
              <el-table-column
                label="角色名称"
                prop="roleName">
              </el-table-column>
              <el-table-column
                label="角色描述"
                prop="roleDesc">
              </el-table-column>
              <el-table-column
                label="操作">
                 <template slot-scope="scope">
                    <el-button type="primary" size="mini" plain icon="el-icon-edit" @click="handleEditDialog(scope.row)">
                    </el-button>
                     <!-- 修改弹出框 -->
                        <el-dialog title="修改用户" :visible.sync="handelEditlistDialog" >
                          <el-form
                            ref="editlist"
                            :model="editlist"
                            :rules="Rolerules"
                            label-width="80px"
                            class="edit-form">
                              <el-form-item label="角色名称"  prop="roleName">
                                  <el-input  v-model="editlist.roleName"></el-input>
                              </el-form-item>
                              <el-form-item label="角色描述" prop="roleDesc">
                                  <el-input v-model="editlist.roleDesc"></el-input>
                              </el-form-item>
                          </el-form>
                          <div slot="footer" class="dialog-footer">
                                <el-button @click="handelEditlistDialogfalse">取 消</el-button>
                              <el-button type="primary"  @click="handelEditlUsers">修 改</el-button>
                          </div>
                      </el-dialog>
                    <el-button type="danger" size="mini" plain icon="el-icon-delete" @click="handelDel(scope.row)" ></el-button>
                    <el-button type="success" size="mini" plain icon="el-icon-check" @click="handelRolelist(scope.row)"></el-button>
                    <!-- 权限分配dialog -->
                    <el-dialog title="权限分配" :visible.sync="handelRolelistDialog" >

                          <div slot="footer" class="dialog-footer">
                                <el-button @click="handelRolelistDialogfalse">取 消</el-button>
                              <el-button type="primary" @click="handelRoleListEdit">确 认</el-button>
                          </div>
                      </el-dialog>
                 </template>

              </el-table-column>
            </el-table>
        </template>
    </el-card>
</template>

<script>
export default {
  data() {
    return {
      listone: [],
      listtwo: [],
      listthree: [],
      listfour: [],
      loading: true,
      formData: {
        roleName: '',
        roleDesc: ''
      },
      handleAddDialog: false,
      formLabelWidth1: '120px',
      Rolerules: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
          { min: 3, max: 9, message: '长度在 3 到 9 个字符', trigger: 'blur' }
        ],
        roleDesc: [
          { required: true, message: '请输入角色描述', trigger: 'blur' },
          { min: 3, max: 9, message: '长度在 3 到 9 个字符', trigger: 'blur' }
        ]
      },
      handelEditlistDialog: false,
      editlist: {
      },
      handelRolelistDialog: false
    }
  },
  created () {
    this.locadata()
  },
  methods: {
    // 获取角色列表
    async locadata () {
      this.loading = true
      const res = await this.$http.get('/roles')
      // this.loading = 'true'
      const data = res.data
      console.log(data)
      this.loading = false
      // 一级分类
      this.listone = data.data
      // this.listone.lable = this.listone.authName
      // // 二级分类
      this.listtwo = this.listone[0].children
      // // 三级分类
      // this.listthree = this.listtwo[0].children
      // // 四级分类
      // this.listfour = this.listthree[0].children
    },
    // 弹出添加dialog框
    handleAddBtn () {
      this.handleAddDialog = true
    },
    // 取消添加dialog框
    handleAddDialogfalse () {
      this.handleAddDialog = false
      for (let key in this.formData) {
        this.formData[key] = ''
      }
    },
    // 添加角色信息
    async handleAddRole () {
      this.$refs.myfromrole.validate(async (valid) => {
        if (!valid) {
          return this.$message.error('请完整输入内容')
        }
        // const formData = this.formData
        const res = await this.$http.post('roles', this.formData)
        const data = res.data
        const {meta: {status, msg}} = data
        if (status === 201) {
          this.$message.success(msg)
          this.handleAddDialog = false
          for (let key in this.formData) {
            this.formData[key] = ''
          }
          this.locadata()
        } else {
          this.$message.error(msg)
        }
      })
    },
    // 弹出修改角色信息dialog框
    async handleEditDialog (row) {
      this.handelEditlistDialog = true
      const id = row.id
      const res = await this.$http.get(`roles/${id}`)
      const data = res.data
      this.editlist = data.data
    },
    // 关闭修改弹出框
    handelEditlistDialogfalse () {
      this.handelEditlistDialog = false
    },
    // 修改用户数据
    async handelEditlUsers () {
      const listData = this.editlist
      const id = this.editlist.roleId
      const res = await this.$http.put(`roles/${id}`, listData)
      const {meta: {status, msg}} = res.data
      if (status === 200) {
        this.handelEditlistDialog = false
        this.$message.success('修改成功')
        this.locadata()
      } else {
        this.$message.error(msg)
      }
    },
    // a删除角色信息
    async handelDel (row) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const id = row.id
          const res = await this.$http.delete(`roles/${id}`)
          const {meta: {status, msg}} = res.data
          if (status === 200) {
            this.$message.success(msg)
            this.locadata()
          } else {
            this.$message.error(msg)
          }
        })
        .catch(() => {
          this.$message({ type: 'info', message: '已取消删除' })
        })
    },
    // 开启权限分配dialog
    handelRolelist (row) {
      this.handelRolelistDialog = true
    },
    // 关闭权限分配dialog
    handelRolelistDialogfalse () {
      this.handelRolelistDialog = false
    },
    // 确认权限分配
    handelRoleListEdit () {
      this.$message.success('分配成功')
      this.handelRolelistDialog = false
    }
  }
}
</script>

<style>
.addRole {
 margin: 10px 0 10px 0;
}
</style>
