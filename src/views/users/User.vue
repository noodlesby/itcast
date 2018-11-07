<template>
  <el-card class="card">
    <!--面包屑组件 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 输入框组件 -->
    <el-row class="serachInput">
      <el-col :span="24">
        <el-input placeholder="请输入内容" class="input-with-select">
         <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-button type="success" round>添加用户</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
        <el-table
      :data="data"
      stripe
      border
      style="width: 100%">
       <el-table-column
      type="index"
      width="50">
    </el-table-column>
      <el-table-column
        prop="username"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
        width="180">
      </el-table-column>
      <el-table-column
        prop="mobile"

        label="电话">
      </el-table-column>
      <el-table-column
        prop="create_time"
        label="时间">
         <template slot-scope="scope">
         {{ scope.row.create_time | dateFormat('YYYY-MM-DD') }}
        </template>
      </el-table-column>
      <el-table-column
        prop="mg_state"
        label="用户状态"
        width="80">
         <template slot-scope="scope">
           <el-switch
             v-model="scope.row.mg_state"
             active-color="#13ce66"
             inactive-color="#ff4949">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini" plain></el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" plain></el-button>
          <el-button type="success" icon="el-icon-check" size="mini" plain></el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      data: [

      ]
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      axios.defaults.headers.common.Authorization = sessionStorage.getItem('token');
      const res = await axios.get('http://localhost:8888/api/private/v1/users?pagenum=1&pagesize=10');
      const { meta: { status, msg } } = res.data;
      if (status === 200) {
        this.data = res.data.data.users;
      } else {
        this.$message.error(msg);
      }
    }
  }
};
</script>
<style>
.card {
  height: 100%;
}
.input-with-select {
  width: 300px;
}
.serachInput {
  margin: 10px 0;
}
</style>
