<template>
  <el-card class="box-card">
      <!-- 面包屑 -->
     <my-breadcrumb level1="订单管理" level2="订单列表" class="mianbao"></my-breadcrumb>
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
              <el-button type="primary" size="mini" plain icon="el-icon-edit" @click="handeldialogForm"></el-button>
                  <el-dialog title="收货地址" :visible.sync="EditdialogFormVisible">
                    <el-form >
                      <el-form-item label="省市区/县" label-width="120px">
                              <el-cascader
                                  size="large"
                                  :options="options"
                                  v-model="selectedOptions"
                                  @change="handleChange">
                                </el-cascader>
                      </el-form-item>
                       <el-form-item label="详细地址" label-width="120px">
                        <el-input  auto-complete="off"></el-input>
                      </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                      <el-button @click="handeldialogFormfalse">取 消</el-button>
                      <el-button type="primary" @click="handeldialogFormfalse" >确 定</el-button>
                    </div>
                  </el-dialog>
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
     <el-button @click="handelMapMove">移动地图</el-button>
     <el-card id="Bmpcontainer">

     </el-card>
  </el-card>
</template>

<script>
import { regionData } from 'element-china-area-data'
const { BMap } = window
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
      EditdialogFormVisible: false,
      Editform: [],
      options: regionData,
      selectedOptions: [],
      map: null
    }
  },
  mounted() {
    this.map = new BMap.Map('Bmpcontainer')
    const point = new
    BMap.Point(116.404, 39.915)
    this.map.centerAndZoom(point, 15)
  },
  created() {
    this.locadata()
  },
  methods: {
    handelMapMove () {
      const { map } = this
      var point = new BMap.Point(116.404, 39.915)
      map.centerAndZoom(point, 15)
      var marker = new BMap.Marker(point)
      map.addOverlay(marker)
    },
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
      const resData = await this.$http.get(`orders?pagenum=${this.pagenum}&pagesize=${this.pagesize}`)
      const {data: {goods, total}} = resData.data
      this.loadding = false
      this.list = goods
      this.total = total
    },
    // 打开修改对话框
    handeldialogForm () {
      this.EditdialogFormVisible = true
    },
    // 关闭对话框
    handeldialogFormfalse () {
      this.EditdialogFormVisible = false
    },
    handleChange (value) {
      console.log(value)
    }
  }
}
</script>

<style>
#Bmpcontainer{
  width: 100%;
  height: 500px;
}
</style>
