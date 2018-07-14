<template>
   <el-card class="box-card">
     <!-- 面包屑 -->
     <my-breadcrumb level1="商品管理" level2="商品列表" class="mianbao"></my-breadcrumb>
     <!--搜索框 -->
      <el-row class="searchAt">
         <el-col :span="24">
          <el-input class="searchInput" clearable placeholder="请输入内容" v-model="goodsval">
            <el-button slot="append" icon="el-icon-search" @click="searchGoods"></el-button>
          </el-input>
          <!-- 添加商品 -->
           <el-button type="success" plain @click="$router.push({name:'goods-add'})">添加用户</el-button>
        </el-col>
      </el-row>
    <!-- 加载表格 -->
     <template>
        <el-table
          v-loading="loadding"
          :data="list" fit
           border  stripe  height="380"
          style="width: 100%">
           <el-table-column
            type="index"
            width="50">
          </el-table-column>
          <el-table-column
            prop="goods_name"
            label="商品名称"
            width="450"
            >
          </el-table-column>
          <el-table-column
            prop="goods_price"
            label="商品价格(元)"
            width="120" align="center">
          </el-table-column>
          <el-table-column
            prop="goods_weight"
            label="商品重量" align="center"
            width="100">
          </el-table-column>
          <el-table-column
            label="创建时间" align="center"
            width="120">
            <template slot-scope="scope">
               {{ scope.row.add_time | frmData('YYYY-MM-DD') }}
              </template>
          </el-table-column>
          <el-table-column
            label="操作">
              <template slot-scope="scope">
                    <el-button type="primary" size="mini" plain icon="el-icon-edit"  ></el-button>
                    <el-button type="danger" size="mini" plain icon="el-icon-delete" @click="handelDel(scope.row)"></el-button>
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
            :page-sizes="[10, 20, 30, 50, 100]"
            :page-size="pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
     </template>
   </el-card>
</template>

<script>
// import MyBreadcrumb from '@/compinents/MyBreadcrumb'
export default {
  data () {
    return {
      // 加载类别
      list: [],
      loadding: true,
      // 分页
      total: 0,
      pagesize: 10,
      pagenum: 1,
      // 查询
      goodsval: ''
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
      this.loadding = true
      const {data: resData} = await this.$http.get(`goods?pagenum=${this.pagenum}&pagesize=${this.pagesize}`)
      const {data: {goods, total}} = resData
      this.loadding = false
      this.list = goods
      this.total = total
    },
    // 删除该商品
    async handelDel (row) {
      this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const id = row.goods_id
          const res = await this.$http.delete(`goods/${id}`)
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
    // 根据id查询商品
    async searchGoods () {
      const id = this.goodsval
      console.log(id)
      const res = await this.$http.get(`goods?query=${id}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`)
      const data = res.data
      const {meta: {status, msg}} = data
      if (status === 200) {
        const {data: {total, goods}} = data
        this.total = total
        this.list = goods
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
   overflow: auto;
}
.searchAt{
  margin: 10px 0 10px 0;
}
.searchAt .searchInput {
  width: 350px;
}
</style>
