<template>
   <el-card class="box-card">
     <!-- 面包屑 -->
     <my-breadcrumb level1="商品管理" level2="分类参数" class="mianbao"></my-breadcrumb>
     <!-- 消息提示框 -->

       <el-alert class="alertWarning"
          title="注意：只允许为第三级分类设置相关参数！"
          type="warning"
           :closable="false"
          show-icon>
        </el-alert>

        <div class="block">
        <span class="demonstration"> 请选择商品分类：</span>
         <el-cascader
          expand-trigger="hover"
          :props="props"
           :options="optionslist"
          @change="handleChange"
          :show-all-levels="false">
            </el-cascader>
          </div>
           <el-tabs v-model="activeName" >
          <el-tab-pane label="动态参数" name="first">
            <template>
               <el-button type="primary" class="tabbtn" @click="handleMany" :disabled="paramsid == -1">添加动态参数</el-button>
               <!-- 添加动态参数对话框 -->
               <el-dialog title="添加动态参数" :visible.sync="AddManyFormDialog" >
                  <el-form :model="listAddMany" label-width="80px">
                    <el-form-item label="动态参数" >
                      <el-input v-model="listAddMany.attr_name" style="width: 400px"></el-input>
                    </el-form-item>
                  </el-form>
                  <div slot="footer" class="dialog-footer">
                    <el-button @click="AddManyFormDialogfalse">取 消</el-button>
                    <el-button type="primary"  @click="handelAddMany">确 定</el-button>
                  </div>
                </el-dialog>
                 <el-table
                      :data="manyData"   stripe  border
                      style="width: 100%">
                      <el-table-column type="expand">
                        <template slot-scope="props">
                          <el-tag
                          :key="tag"
                          v-for="tag in props.row.attr_vals.split(',')"
                          closable
                          :disable-transitions="false"
                          @close="handleClose(props.row,tag)">
                          {{tag}}
                        </el-tag>
                        <!-- <el-input
                          class="input-new-tag"
                          v-if="inputVisible"
                          v-model="inputValue"
                          ref="saveTagInput"
                          size="small"
                          @keyup.enter.native="handleInputConfirm"
                          @blur="handleInputConfirm"
                        > -->
                        </template>
                      </el-table-column>
                      <el-table-column
                      type="index"
                      width="50">
                      </el-table-column>
                      <el-table-column
                        label="商品参数"
                        prop="attr_name">
                      </el-table-column>
                      <el-table-column
                        label="操作">
                        <template slot-scope="scope">
                          <el-button type="primary" size="mini" plain icon="el-icon-edit"  ></el-button>
                          <el-button type="danger" size="mini" plain icon="el-icon-delete" @click="handleDelMany(scope.row)" ></el-button>
                    </template>
                      </el-table-column>
                    </el-table>
            </template>
          </el-tab-pane>
          <el-tab-pane label="静态参数" name="second">
             <template>
               <el-button type="primary" class="tabbtn" :disabled="paramsid == -1" @click="handelOnly">添加静态参数</el-button>
                <!-- 添加静态参数对话框 -->
               <el-dialog title="添加静态参数" :visible.sync="AddOnlyFormDialog" >
                  <el-form :model="listAddOnly" label-width="100px">
                    <el-form-item label="静态参数" >
                      <el-input v-model="listAddOnly.attr_name" style="width: 400px"></el-input>
                    </el-form-item>
                    <el-form-item label="静态参数值" >
                      <el-input v-model="listAddOnly.attr_vals" style="width: 400px"></el-input>
                    </el-form-item>
                  </el-form>
                  <div slot="footer" class="dialog-footer">
                    <el-button @click="AddOnlyFormDialogfalse">取 消</el-button>
                    <el-button type="primary"  @click="handelAddOnly">确 定</el-button>
                  </div>
                </el-dialog>
                <el-table
                    :data="onlyData" stripe  border
                    style="width: 100%">
                    <el-table-column
                      type="index"
                      width="50">
                    </el-table-column>
                    <el-table-column
                      prop="attr_name"
                      label="属性名称"
                      width="180">
                    </el-table-column>
                    <el-table-column
                      prop="attr_vals"
                      label="属性值"
                      width="180">
                    </el-table-column>
                    <el-table-column
                      label="操作">
                       <template slot-scope="scope">
                          <el-button type="primary" size="mini" plain icon="el-icon-edit"  ></el-button>
                          <el-button type="danger" size="mini" plain icon="el-icon-delete" @click="handelDelOnly(scope.row)" ></el-button>
                    </template>
                    </el-table-column>
                  </el-table>
            </template>
          </el-tab-pane>
        </el-tabs>
   </el-card>
</template>

<script>


export default {
  data () {
    return {
      // 级联菜单数据源
       optionslist: [],
      // selectedOptions: [],
      props: {
        label: 'cat_name',
        value: 'cat_id',
        children: 'children'
      },
      // casderlist: [],
      paramsid: -1,
      activeName: 'first',
      // 静态动态数据
      onlyData: [],
      manyData: [],
      // 添加动态参数
      AddManyFormDialog: false,
      listAddMany: {
        attr_sel: 'many'
      },
      AddOnlyFormDialog: false,
      listAddOnly: {
        attr_sel: 'only'
      }
    }
  },
  created() {
    this.locaData()
  },
  methods: {
    // 获取级联菜单数据
    async locaData() {
      const {data: resData} = await this.$http.get(`categories?type=3`)
      const {data} = resData
      this.optionslist = data
    },
    // 在选择到三级菜单凑发送请求获取动态列表静态类别
    async handleChange (value) {
      console.log(value)
      const id = value[value.length - 1]
      this.paramsid = id
      const resonly = await this.$http.get(`categories/${id}/attributes?sel=only`)
      const resmany = await this.$http.get(`categories/${id}/attributes?sel=many`)

      this.onlyData = resonly.data.data
      this.manyData = resmany.data.data
    },

    // 添加动态参数对话框
    handleMany () {
     this.AddManyFormDialog = true
    },
    // 关闭添加动态参数对话框
    AddManyFormDialogfalse () {
      this.AddManyFormDialog = false
    },
    // 添加动态参数
    async handelAddMany () {
      console.log(this.listAddMany,this.paramsid)

      const res = await this.$http.post(`categories/${this.paramsid}/attributes`,this.listAddMany)
      const {data, meta: {status, msg}} =res.data
      if( status === 201) {
        this.$message.success(msg)
        this.manyData.push(data)
        this.AddManyFormDialog = false
      } else {
        this.$message.error(msg)
      }
    },
    // 删除动态参数
    async handleDelMany (row){
      // console.log(this.manyData.length)
     this.$confirm('此操作将永久删除该参数, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const id = this.paramsid
          const attrid = row.attr_id
          const res = await this.$http.delete(`categories/${id}/attributes/${attrid}`)
          const {meta: {status, msg}} = res.data
          if (status === 200) {
            this.$message.success(msg)
              this.manyData = this.manyData.slice(0, this.manyData.length-1)
          } else {
            this.$message.error(msg)
          }
        })
        .catch(() => {
          this.$message({ type: 'info', message: '已取消删除' })
        })
    },
    // 删除商品动态参数
    handleClose (row,tag) {
      console.log(tag)
      //  row.attr_vals.splice(this.dynamicTags.indexOf(tag), 1)
    },
    // 静态参数事件
    // 打开静态参数对话框
    handelOnly () {
      this.AddOnlyFormDialog = true
    },
    // 关闭静态参数对话框
    AddOnlyFormDialogfalse () {
      this.AddOnlyFormDialog = false
    },
    // 添加动态参数按钮
    async handelAddOnly () {

      const res = await this.$http.post(`categories/${this.paramsid}/attributes`,this.listAddOnly)
      const {data, meta: {status, msg}} =res.data
      if( status === 201) {
        this.$message.success(msg)
        this.onlyData.push(data)
        this.AddOnlyFormDialog = false
      } else {
        this.$message.error(msg)
      }
    },
    // 删除静态参数
    handelDelOnly (row) {
       this.$confirm('此操作将永久删除该参数, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const id = this.paramsid
          const attrid = row.attr_id
          const res = await this.$http.delete(`categories/${id}/attributes/${attrid}`)
          const {meta: {status, msg}} = res.data
          if (status === 200) {
            this.$message.success(msg)
              this.onlyData = this.onlyData.slice(0, this.onlyData.length-1)
          } else {
            this.$message.error(msg)
          }
        })
        .catch(() => {
          this.$message({ type: 'info', message: '已取消删除' })
        })
    }
  }
}
</script>

<style>
.box-card{
   height: 100%;
   overflow: auto;
}
.alertWarning {
  margin: 15px 0 15px 0;
}
.block {
  margin-bottom: 20px;
}
.tabbtn {
  margin-bottom: 20px;
}
</style>
