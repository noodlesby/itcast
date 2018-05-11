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
          <el-input v-model="searchValue" placeholder="请输入内容" clearable>
            <el-button @click="handleSearch" slot="append" icon="el-icon-search"></el-button>
          </el-input>
          <el-button type="success" plain>添加用户</el-button>
        </div>
      </el-col>
    </el-row>
    <el-table
      :border="true"
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
        <template slot-scope="scope">
           <el-switch
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="200">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" icon="el-icon-edit" plain></el-button>
          <el-button type="danger" size="mini" icon="el-icon-delete" plain></el-button>
          <el-button type="warning" size="mini" icon="el-icon-check" plain></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[1, 2]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      pagesize: 1,
      currentPage: 1,
      total: 0
    };
  },
  mounted() {
    this.load();
  },
  methods: {
    async load() {
      // 从本地存储中获取令牌
      const params = { pagenum: this.currentPage, pagesize: this.pagesize };
      const data = await this.$http.get('/users', {
        params
      });
      // 表格数据
      this.tableData = data.data.data.users;
      // 总数据条数
      this.total = data.data.data.total;
    },
    async handleSearch() {
      // 从本地存储中获取令牌
      const params = {
        pagenum: this.currentPage,
        pagesize: this.pagesize,
        query: this.searchValue
      };
      const data = await this.$http.get('/users', {
        params
      });
      // 表格数据
      this.tableData = data.data.data.users;
      // 总数据条数
      this.total = data.data.data.total;
    },
    // 分页方法
    handleSizeChange(val) {
      this.pagesize = val;
      // 当每页条数发生变化，修改当前页码为第一页
      this.currentPage = 1;
      this.load();
      // size发生变化
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.load();
      // 页码发生变化
      console.log(`当前页: ${val}`);
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
