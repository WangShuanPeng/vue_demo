<template>
   <el-card class="box-card">
     <!-- 面包屑 -->
     <my-breadcrumb level1="商品管理" level2="商品列表" class="mianbao"></my-breadcrumb>
     <!--搜索框 -->
<!-- <el-row class="searchAt">
        <el-col :span="24">
          <el-input class="searchInput" clearable placeholder="请输入内容" v-model="idval">
            <el-button slot="append" icon="el-icon-search" @click="handleSeach"></el-button>
          </el-input>
          <el-button type="success" plain @click="handleUserDialog">添加用户</el-button>
            <el-dialog title="添加用户" :visible.sync="handleUser" @closed="handleUserfalse">
              <div slot="footer" class="dialog-footer">
                <el-button @click="handleUserfalse">取 消</el-button>
                <el-button type="primary" @click="handleUserAdd" >确 定</el-button>
              </div>
          </el-dialog>
        </el-col>
      </el-row> -->
   </el-card>
</template>

<script>
export default {
  data () {
    return {

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
