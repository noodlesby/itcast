<template>
 <div class="login-wrapper">
   <el-form label-position="top" label-width="80px" :model="formData" class="login-form">
     <h2>用户登录</h2>
  <el-form-item label="用户名">
    <el-input v-model="formData.username"></el-input>
  </el-form-item>
  <el-form-item label="密码">
    <el-input type="password" v-model="formData.password"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitHandler" class="login-btn">登陆</el-button>
  </el-form-item>
</el-form>
 </div>
</template>
<script>
import axios from 'axios';

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
    async submitHandler() {
      const res = await axios.post('http://localhost:8888/api/private/v1/login', this.formData);
      console.log(res);
      const {
        data: {
          meta: {
            status, msg
          }
        }

      } = res;
      if (status === 200) {
        this.$message.success(msg);
        const token = res.data.data.token;
        sessionStorage.setItem('token', token);
      } else {
        this.$message.error(msg);
      }
    }
  }
};
</script>
<style scoped>
  .login-wrapper {
    background-color: #324152;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .login-wrapper .login-form {
    background-color: #fff;
    width: 400px;
    padding: 30px;
    border-radius: 5px;
    border: 1px solid #ccc;
  }
  .login-wrapper .login-form .login-btn {
    width: 100%;
  }
</style>
