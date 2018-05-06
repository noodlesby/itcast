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
          <a href="#" class="logout-btn">退出</a>
        </div></el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  beforeCreate() {
    // 获取本地存储中的token
    const token = localStorage.getItem('token');
    if (!token) {
      this.$router.push({
        name: 'login'
      });
    }
  },
  data() {
    return {

    };
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
    text-align: center;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
  }

  .el-container {
    height: 100%;
  }
</style>
