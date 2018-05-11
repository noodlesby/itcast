<template>
  <div class="login-wrap">
    <el-form label-position="top" ref="form" :model="formData" label-width="80px">
      <h2>用户登录</h2>
      <el-form-item label="用户名">
        <el-input v-model="formData.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="formData.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="login-btn" type="primary" @click="login">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        username: '',
        password: ''
      }
    };
  },
  methods: {
    async login() {
      const res = await this.$http.post('/login', this.formData);
      const data = res.data;
      console.log(data);
      if (data.meta.status === 200) {
        this.$message({
          type: 'success',
          message: '登录成功!'
        });
        // 登录成功，把token记录到本地存储中
        localStorage.setItem('token', data.data.token);
        this.$router.push({
          name: 'home'
        });
      } else {
        // 登录失败，返回失败的原因
        this.$message({
          type: 'error',
          message: data.meta.msg
        });
      }
    }
  }
};
</script>

<style scoped>
  .login-wrap {
    background-color: #324152;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .el-form.el-form--label-top {
    padding: 40px;
    width: 500px;
    border-radius: 5px;
    background-color: #fff;
  }
  .el-form .login-btn {
    width: 100%;
  }
</style>
