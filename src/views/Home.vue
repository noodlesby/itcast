<template>
  <el-container class="container">
   <el-header class="header">
     <el-row :gutter="20">
       <el-col :span="4"><a href="javascript:void(0);"><img src="@/assets/logo.png"></a></el-col>
       <el-col :span="18"><div class="grid-content bg-purple title">电商后台管理系统</div></el-col>
       <el-col :span="2"><a class="logout" @click.prevent = "logoutHandler">退出</a></el-col>
    </el-row>
   </el-header>
   <el-container>
     <el-aside width="200px" class="aside">
        <el-menu
      default-active="1-1"
      style="height:100%"
      unique-opened="true"
      router
        >
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>用户管理</span>
        </template>
         <el-menu-item index="/users"><i class="el-icon-menu"></i>用户列表</el-menu-item>
      </el-submenu>
       <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>权限管理</span>
        </template>
         <el-menu-item index="/roles"><i class="el-icon-view"></i>角色列表</el-menu-item>
         <el-menu-item index="/rights"><i class="el-icon-setting"></i>权限列表</el-menu-item>
      </el-submenu>
       <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>商品管理</span>
        </template>
         <el-menu-item index="3-1"><i class="el-icon-goods"></i>商品列表</el-menu-item>
         <el-menu-item index="3-2"><i class="el-icon-news"></i>分类参数</el-menu-item>
         <el-menu-item index="3-3"><i class="el-icon-bell"></i>商品分类</el-menu-item>
      </el-submenu>
       <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>订单管理</span>
        </template>
         <el-menu-item index="4-1"><i class="el-icon-menu"></i>订单列表</el-menu-item>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>数据统计</span>
        </template>
         <el-menu-item index="5-1"><i class="el-icon-menu"></i>数据报表</el-menu-item>
      </el-submenu>
     </el-menu>
     </el-aside>
     <el-main class="bgmain">Main</el-main>
  </el-container>
 </el-container>
</template>
<script>
export default {
  created() {
    const token = sessionStorage.getItem('token');
    if (!token) {
      this.$message.warning('您尚未登陆，请登录后访问');
      this.$router.push('/');
    }
  },
  methods: {
    logoutHandler() {
      sessionStorage.clear();
      this.$message.success('退出成功');
      this.$router.push('/');
    }
  }
};
</script>
<style>
 .container {
   height: 100%;
 }
 .header {
   background-color: #b3c0d1;
   padding-left: 0;
 }
.header .title {
  text-align: center;
  font-size: 24px;
  color: #fff;
  line-height: 60px;
}
.header .logout {
  text-align: center;
  line-height: 60px;
  font-size: 16px;
  color: hotpink;
  display: block;
}
 .aside {
   background-color: #d3dce6;
 }
 .bgmain {
   background-color: #e9eef3;
 }
.logout a {
  cursor: pointer;
}
</style>
