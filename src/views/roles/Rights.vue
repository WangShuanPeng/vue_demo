<template>
  <el-card class="box-card">
     <!-- 面包屑 -->
      <my-breadcrumb level1="权限管理" level2="权限列表" class="mianbao"></my-breadcrumb>
  <!-- 表格 -->
      <el-table
      v-loading="loading"
        :data="list"
        height="400"
        border  show-header
        stripe
        style="width: 67.3%">
         <el-table-column
         fixed
          type="index"
          width="50">
        </el-table-column>
        <el-table-column
          prop="authName"
          label="权限名称"
          width="210">
        </el-table-column>
        <el-table-column
          prop="path"
          label="路径"
          width="220">
        </el-table-column>
        <el-table-column
          prop="level"
          label="层级"
          width="220" >
          <template  slot-scope="props">
            <span v-if="props.row.level === '0' ">一级</span>
            <span v-if="props.row.level === '1' ">二级</span>
            <span v-if="props.row.level === '2' ">三级</span>
          </template>
        </el-table-column>
      </el-table>
   </el-card>
</template>

<script>
export default {
  data () {
    return {
      loading: true,
      list: []
    }
  },
  created () {
    this.locadata()
  },
  methods: {
    async locadata () {
      this.loading = true
      const res = await this.$http.get('rights/list')
      const data = res.data
      this.loading = false
      const {meta: {status, msg}} = data
      if (status === 200) {
        this.list = data.data
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
.mianbao{
    margin-bottom: 15px;
}
</style>
