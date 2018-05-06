<template>
  <div>
    <form action="#" >
      <label for="username">用户名</label>
      <input type="text" v-model="formData.username" id="username"> <br>

      <label for="pwd">密码</label>
      <input type="text" v-model="formData.password" id="pwd"> <br>

      <input type="button" value="登 录" @click="login">
    </form>
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
