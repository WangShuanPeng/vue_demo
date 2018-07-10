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
                    <!-- <el-tag
                        v-for="tag in tags"
                        :key="tag.name"
                        closable
                        :type="tag.type">
                        {{tag.name}}
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
      }
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

      const res = await this.$http.get('/roles')
      // this.loading = 'true'
      const data = res.data
      console.log(data)
      this.loading = false
      const {meta: {status, msg}} = data
      if (status === 200) {
        // this.listone = data
        this.listone = data.data
         console.log(this.listone[0].children)

      } else {
        this.$message.error(msg)
      }

    },
    handleAddBtn () {
      this.handleAddDialog = true
    },
    handleAddDialogfalse () {
       this.handleAddDialog = false
       for (let key in this.formData) {
            this.formData[key] = '';
          }
    },
    // 添加角色信息
   async  handleAddRole () {
      this.$refs.myfromrole.validate(async (valid) => {
        if (!valid) {
          return this.$message.error('请完整输入内容');
        }

        // const formData = this.formData
        const res = await this.$http.post('roles',this.formData)
        const data = res.data
        const {meta: {status, msg}} = data
        if (status === 201) {
          this.$message.success(msg)
          this.handleAddDialog = false
          for (let key in this.formData) {
            this.formData[key] = '';
          }
          // this.locadata()
        } else {
          this.$message.error(msg)
        }
      })
    }
  }
}
</script>

<style>
.addRole {
 margin: 10px 0 10px 0;
}
</style>
