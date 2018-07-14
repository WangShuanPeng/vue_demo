<template>
  <el-card class="box-card">
    <!-- 加载表格 -->
    <el-table
          v-loading="loadding"
          :data="list"
          stripe border  height="480"
          style="width: 100%">
          <el-table-column
            type="index"
            width="50">
          </el-table-column>
          <el-table-column
            prop="order_number"
            label="订单编号"
            width="190">
          </el-table-column>
          <el-table-column
            prop="order_price" align="center"
            label="订单价格"
            width="100">
          </el-table-column>
          <el-table-column
            prop="order_pay" align="center"
            label="是否付款" width="100">
            <template  slot-scope="props">
              <el-tag  v-if="props.row.order_pay === '0' " type="success">未付款</el-tag>
              <el-tag  v-if="props.row.order_pay === '1' " type="danger">已付款</el-tag>
          </template>
          </el-table-column>
           <el-table-column
            prop="is_send" align="center" width="100"
            label="是否发货">
          </el-table-column>
           <el-table-column
            align="center"
            label="下单时间">
             <template slot-scope="scope">
               {{ scope.row.create_time | frmData('YYYY-MM-DD') }}
              </template>
          </el-table-column>
           <el-table-column
            label="操作">
              <template slot-scope="scope">
              <el-button type="primary" size="mini" plain icon="el-icon-edit"></el-button>
            </template>
          </el-table-column>
        </el-table>
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
export default {
  data () {
    return {
      // 加载类别
      list: [],
      loadding: true,
      // 分页
      total: 0,
      pagesize: 10,
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
    async locadata () {
      this.loadding = true
      const  resData = await this.$http.get(`orders?pagenum=${this.pagenum}&pagesize=${this.pagesize}`)
      const {data: {goods, total}} = resData.data
      this.loadding = false
      this.list = goods
      this.total = total
    }
  }
}
</script>

<style>

</style>
