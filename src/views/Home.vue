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
                    <el-submenu index="1">
                      <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>用户管理</span>
                      </template>
                        <el-menu-item index="/users">
                          <i class="el-icon-menu"></i>
                          用户列表
                          </el-menu-item>
                    </el-submenu>
                     <el-submenu index="2">
                      <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>权限管理</span>
                      </template>
                        <el-menu-item index="/roles">
                          <i class="el-icon-menu"></i>
                          角色列表
                          </el-menu-item>
                          <el-menu-item index="/rights">
                          <i class="el-icon-menu"></i>
                          权限列表
                          </el-menu-item>
                    </el-submenu>
                     <el-submenu index="3">
                      <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>商品管理</span>
                      </template>
                        <el-menu-item index="3-1">
                          <i class="el-icon-menu"></i>
                          用户列表
                          </el-menu-item>
                    </el-submenu>
                    <el-submenu index="4">
                      <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>订单管理</span>
                      </template>
                        <el-menu-item index="4-1">
                          <i class="el-icon-menu"></i>
                          用户列表
                          </el-menu-item>
                    </el-submenu>
                     <el-submenu index="5">
                      <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>数据统计</span>
                      </template>
                        <el-menu-item index="5-1">
                          <i class="el-icon-menu"></i>
                          用户列表
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
  methods: {
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
