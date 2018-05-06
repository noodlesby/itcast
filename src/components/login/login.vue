<template>
  <div>
    <el-form label-position="left" ref="form" :model="formData" label-width="80px">
      <el-form-item label="用户名">
        <el-input v-model="formData.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="formData.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login">登录</el-button>
        <el-button>取消</el-button>
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
    async login() {
      const res = await axios.post('http://47.96.21.88:8888/api/private/v1/login', this.formData);
      const data = res.data;
      if (data.meta.status === 200) {
        this.$router.push({
          name: 'home'
        });
      }
    }
  }
};
</script>

<style scoped>

</style>
