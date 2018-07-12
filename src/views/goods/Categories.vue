<template>
   <el-card class="box-card">
     <!-- 面包屑 -->
     <my-breadcrumb level1="商品管理" level2="商品分类" class="mianbao"></my-breadcrumb>
      <!--添加商品分类 -->
       <el-button plain  class="addbtn">添加分类</el-button>
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
                <el-button type="primary" size="mini" plain icon="el-icon-edit" ></el-button>
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
      loading: true,
      total: 0,
      pagesize: 5,
      pagenum: 1
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
