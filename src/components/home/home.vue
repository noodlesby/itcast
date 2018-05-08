<template>
  <el-container>
    <el-header>
      <el-row>
        <el-col :span="4"><div class="grid-content bg-purple">
          <img src="/static/logo.png" alt="">
        </div></el-col>
        <el-col :span="16"><div class="grid-content bg-purple">
          <div class="title">电商后台管理系统</div>
        </div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple">
          <a href="#" @click.prevent="logout" class="logout-btn">退出</a>
        </div></el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu default-active="1-1"
          :unique-opened="true"
          :router="true">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">用户管理</span>
            </template>
            <el-menu-item index="userlist">
              <i class="el-icon-menu"></i>
              <span>用户列表</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">权限管理</span>
            </template>
            <el-menu-item index="rolelist">
              <i class="el-icon-menu"></i>
              <span>角色列表</span>
            </el-menu-item>
            <el-menu-item index="2-2">
              <i class="el-icon-menu"></i>
              <span>权限列表</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">商品管理</span>
            </template>
            <el-menu-item index="3-1">
              <i class="el-icon-menu"></i>
              <span>商品列表</span>
            </el-menu-item>
            <el-menu-item index="3-2">
              <i class="el-icon-menu"></i>
              <span>分类参数</span>
            </el-menu-item>
            <el-menu-item index="3-3">
              <i class="el-icon-menu"></i>
              <span>商品分类</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">订单管理</span>
            </template>
            <el-menu-item index="4-1">
              <i class="el-icon-menu"></i>
              <span>订单列表</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">数据统计</span>
            </template>
            <el-menu-item index="5-1">
              <i class="el-icon-menu"></i>
              <span>数据报表</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {

    };
  },
  methods: {
    logout() {
      this.$confirm('是否要退出系统？', '退出提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        // 1. 删除token
        localStorage.removeItem('token');
        // 2. 跳转到登录
        this.$router.push({
          name: 'login'
        });
        this.$message({
          type: 'success',
          message: '退出成功!'
        });
      }).catch(() => {
      });
    }
  }
};
</script>

<style scoped>
  .el-header{
    background-color: #B3C0D1;
    padding: 0;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-header .title {
    color: #fff;
    font-size: 24px;
    height: 100%;
    line-height: 60px;
  }

  .logout-btn {
    position: absolute;
    right: 10px;
    color: orange;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
  }

  .el-container {
    height: 100%;
  }

  /* 侧边导航 */
  .el-menu {
    width: 200px;
    height: 100%;
  }
</style>
