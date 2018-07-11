<template>
    <el-container class="container">
        <el-header class="header">
            <el-row>
                <el-col :span="4"><img src="../../static/images/logo.png" alt=""></el-col>
                <el-col :span="18" class="heder-mid">
                    <h2>电商后台管理系统</h2>
                </el-col>
                <el-col :span="2" class="loginOut">
                  <a href="#" @click.prevent="loginout">退出</a>
                </el-col>
            </el-row>
        </el-header>
        <el-container>
            <el-aside width="200px" class="aside">
                <el-menu
                    :unique-opened="true"
                    :router="true"
                   class="menu">
                    <el-submenu
                    v-for="item in meuns"
                    :key="item.id"
                    :index="item.id+''">
                      <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>{{ item.authName }}</span>
                      </template>
                        <el-menu-item
                          v-for="item1 in item.children"
                          :key="item1.id"
                         :index="'/'+ item1.path">
                          <i class="el-icon-menu"></i>
                          {{ item1.authName  }}
                          </el-menu-item>
                    </el-submenu>
                  </el-menu>
            </el-aside>
            <el-main class="main">
              <router-view></router-view>
            </el-main>
        </el-container>
        </el-container>
</template>

<script>
export default {
  data () {
    return {
      meuns: []
    }
  },
  beforeCreate () {
    const token = sessionStorage.getItem('token')
    // console.log(token)
    if (!token) {
      this.$message.error('请先登录')
      this.$router.push({
        name: 'login'
      })
    }
  },
  created() {
    this.locadata()
  },
  methods: {
    async locadata () {
      const res = await this.$http.get('menus')
      const {data, meta: {status, msg}} = res.data
      if (status === 200 ) {
        this.meuns = data
      }
    },
    loginout () {
      this.$confirm('确认退出后台系统?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        sessionStorage.clear()
        this.$router.push({
          name: 'login'
        })
        this.$message({
          type: 'success',
          message: '退出成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消退出'
        })
      })
    }
  }
}
</script>

<style>
.container{
    height: 100%;
}
.header{
    background: #BBCCDD;
    margin: 0;
    padding: 0;
}
.header .heder-mid{
  color:#Fff;
  text-align: center;
  line-height: 60px;
}
.header .loginOut{
  line-height: 60px;
  color: orange;
  text-align: center;
}
.aside{
    background: #EEEEFF;
      height: 100%;
}

.main{
    background: #DDDDEE;

}
</style>
