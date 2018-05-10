<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row>
      <el-col :span="24">
        <div>
          <el-input placeholder="请输入内容" clearable>
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
          <el-button type="success" plain>添加用户</el-button>
        </div>
      </el-col>
    </el-row>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        type="index"
        width="30">
      </el-table-column>
      <el-table-column
        prop="username"
        label="姓名"
        width="160">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
        width="300">
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="电话"
        width="300">
      </el-table-column>
      <el-table-column
        label="用户状态"
        width="80">
      </el-table-column>
      <el-table-column
        label="操作"
        width="200">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      tableData: []
    };
  },
  mounted() {
    this.load();
  },
  methods: {
    async load() {
      // 从本地存储中获取令牌
      const token = localStorage.getItem('token');
      const param = { pagenum: 1, pagesize: 10 };
      const data = await axios.get('http://127.0.0.1:8888/api/private/v1/users', {
        headers: {
          Authorization: token
        },
        params: param
      });
      console.log(data);
      this.tableData = data.data.data.users;
    }
  }
};
</script>

<style scoped>
  .el-breadcrumb {
    background-color: #d3dce6;
    height: 45px;
    font-size: 15px;
    padding-left: 10px;
    line-height: 45px;
  }
  .el-input {
    width: 300px;
  }
</style>
