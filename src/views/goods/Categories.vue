<template>
   <el-card class="box-card">
     <!-- 面包屑 -->
     <my-breadcrumb level1="商品管理" level2="商品分类" class="mianbao"></my-breadcrumb>
      <!--添加商品分类 -->
       <el-button plain  class="addbtn" @click="handleAddDialog">添加分类</el-button>
       <!-- 添加商品分类的对话框 -->
                <el-dialog title="添加商品分类" :visible.sync="AddFormDialog" >
                  <el-form :model="listAdd" label-width="80px">
                    <el-form-item label="分类名称" >
                      <el-input v-model="listAdd.cat_name" style="width: 400px"></el-input>
                    </el-form-item>
                    <el-form-item label="分类名称">
                      <el-cascader
                        :options="optionslist"
                       :props="props"
                        slot-scope="scope"
                        @change="handleChange"
                        change-on-select
                        >
                      </el-cascader>
                    </el-form-item>
                  </el-form>
                  <div slot="footer" class="dialog-footer">
                    <el-button @click="handleAddDialogfalse">取 消</el-button>
                    <el-button type="primary" @click="handleAddCategos" >确 定</el-button>
                  </div>
                </el-dialog>
      <!-- 表格渲染 -->
      <template>
          <el-table
          border  v-loading="loading"
            :data="list"  height="350"
            style="width: 100%">
      <!-- tree grid
        treeKey 绑定到id，给每一个节点设置一个唯一值
        parentKey 绑定到父id属性，区分父子节点
        levelKey 绑定到层级的属性
        childKey 绑定到存储子元素的属性
       -->
            <el-tree-grid
             prop="cat_name"
              label="分类名称"
              treeKey="cat_id"
              parentKey="cat_pid"
              levelKey="cat_level"
              childKey="children"
              :indentSize="30">
            </el-tree-grid>
             <!-- <el-table-column
              prop="cat_name"
              label="分类名称"
              width="180">
            </el-table-column>-->
            <el-table-column
              prop="cat_level"
              label="级别"
              width="180">
              <template  slot-scope="props">
                <span v-if="props.row.cat_level === 0 ">一级</span>
                <span v-if="props.row.cat_level === 1 ">二级</span>
                <span v-if="props.row.cat_level === 2 ">三级</span>
          </template>
            </el-table-column>
            <el-table-column
              prop="cat_deleted"
              label="是否有效">
             <template  slot-scope="props">
                {{ props.row.cat_deleted ? '无效' : '有效' }}
            </template>
            </el-table-column>
            <el-table-column
              label="操作">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" plain icon="el-icon-edit" @click="handleEditCate(scope.row)" ></el-button>
                <!-- 修改的 对话框 -->
                <el-dialog title="编辑商品分类名称" :visible.sync="EditFormDialog" >
                  <el-form :model="listEdit" label-width="80px">
                    <el-form-item label="分类名称" >
                      <el-input v-model="listEdit.cat_name" style="width: 400px"></el-input>
                    </el-form-item>
                  </el-form>
                  <div slot="footer" class="dialog-footer">
                    <el-button @click="EditFormDialogfalse">取 消</el-button>
                    <el-button type="primary" @click="handelEditCateName">确 定</el-button>
                  </div>
                </el-dialog>
            <el-button type="danger" size="mini" plain icon="el-icon-delete" @click="handleDelCate(scope.row)"></el-button>
          </template>
      </el-table-column>
    </el-table>
</template>
      <!-- 分页功能 -->
       <template>
         <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="pagenum"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
     </template>
   </el-card>
</template>

<script>
import ElTreeGrid from 'element-tree-grid'
export default {
  data() {
    return {
      list: [],
      // 加载
      loading: true,
      // 分页
      total: 0,
      pagesize: 5,
      pagenum: 1,
      // 添加模块
      listAdd: {},
      AddFormDialog: false,
      optionslist: [],
      // selectedOptions: [],
      props: {
        label: 'cat_name',
        value: 'cat_id',
        children: 'children'
      },
      // 修改模块
      listEdit: {},
      EditFormDialog: false,
      casderlist: []
    }
  },
  created() {
    this.locadata()
  },
  methods: {
    // 分页方法
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
      this.pagenum = val
      this.locadata()
      console.log(`当前页: ${val}`, val)
    },
    async locadata() {
      this.loading = true
      const {data: resData} = await this.$http.get(`categories?type=3&pagenum=${this.pagenum}&pagesize=${this.pagesize}`)
      const {data: {result, total}} = resData
      this.loading = false
      this.list = result
      this.total = total
    },
    // 添加分类
    //  打开添加对话框
    async handleAddDialog () {
      this.AddFormDialog = true
      const {data: resData} = await this.$http.get(`categories?type=2`)
      const {data} = resData
      this.optionslist = data
    },
    // 关闭添加分类对话框
    handleAddDialogfalse () {
      this.AddFormDialog = false
    },
    handleChange (value) {
      this.casderlist = value
      console.log(this.casderlist, value)
      // console.log(this.selectedOptions)
    },
    // 添加分类
    async handleAddCategos () {
      const pid = this.casderlist
      const name = this.listAdd.cat_name
      console.log(this.casderlist[0])
      if (pid.length === 0) {
        const {data: resData} = await this.$http.post(`categories`, {cat_pid: 0, cat_name: name, cat_level: 0})
        const {meta: {status, msg}} = resData
        if (status === 201) {
          this.$message.success(msg)
          this.AddFormDialog = false
          this.locadata()
        } else {
          this.$message.error(msg)
        }
      }
      if (pid.length === 1) {
        const {data: resData} = await this.$http.post(`categories`, {cat_pid: this.casderlist[0], cat_name: name, cat_level: 1})
        const {meta: {status, msg}} = resData
        if (status === 201) {
          this.$message.success(msg)
          this.AddFormDialog = false
          this.locadata()
        } else {
          this.$message.error(msg)
        }
      }
      if (pid.length === 2) {
        const {data: resData} = await this.$http.post(`categories`, {cat_pid: this.casderlist[1], cat_name: name, cat_level: 2})
        const {meta: {status, msg}} = resData
        if (status === 201) {
          this.$message.success(msg)
          this.AddFormDialog = false
          this.locadata()
        } else {
          this.$message.error(msg)
        }
      }
    },
    // 删除分类
    async handleDelCate (row) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const id = row.cat_id
          const res = await this.$http.delete(`categories/${id}`)
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
    // 修改分类名称
    // 1.弹出修改对话框
    async handleEditCate (row) {
      this.EditFormDialog = true
      const id = row.cat_id
      const res = await this.$http.get(`categories/${id}`)
      this.listEdit = res.data.data
    },
    // 2.关闭弹出框
    EditFormDialogfalse () {
      this.EditFormDialog = false
    },
    async handelEditCateName () {
      const id = this.listEdit.cat_id
      const listEdit = this.listEdit
      const res = await this.$http.put(`categories/${id}`, listEdit)
      const {meta: {status, msg}} = res.data

      if (status === 200) {
        this.$message.success(msg)
        this.EditFormDialog = false
        this.locadata()
      } else {
        this.$message.error(msg)
      }
    }
  },
  components: {
    ElTreeGrid
  }

}
</script>

<style>
.box-card{
   height: 100%;
   overflow: auto;
}
.addbtn{
  margin: 10px 0  10px 0;
}
</style>
