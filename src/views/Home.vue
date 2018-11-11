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
      style="height:100%"
      :unique-opened = "true"
      router
        >
      <el-submenu :index="item.id + ''"
      v-for="item in menus" :key="item.id + ''"
      >
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>{{ item.authName }}</span>
        </template>
         <el-menu-item :index="'/'+ item1.path"
         v-for="item1 in item.children" :key="item1.id"
         ><i class="el-icon-menu"></i>{{ item1.authName }}</el-menu-item>
      </el-submenu>
     </el-menu>
     </el-aside>
     <el-main class="bgmain">
       <router-view></router-view>
     </el-main>
  </el-container>
 </el-container>
</template>
<script>
export default {
  data() {
    return {
      menus: []
    };
  },
  created() {
   /*  const token = sessionStorage.getItem('token');
    if (!token) {
      this.$message.warning('您尚未登陆，请登录后访问');
      this.$router.push('/');
    } */
    this.getMenus();
  },
  methods: {
    logoutHandler() {
      sessionStorage.clear();
      this.$message.success('退出成功');
      this.$router.push('/');
    },
    async getMenus() {
      const res = await this.$http.get('menus');
      this.menus = res.data.data;
    }
  },
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
