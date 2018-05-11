<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row>
      <el-col :span="24">
        <div class="search">
          <el-input v-model="searchValue" placeholder="请输入内容" clearable>
            <el-button @click="handleSearch" slot="append" icon="el-icon-search"></el-button>
          </el-input>
          <el-button type="success" @click="userFormVisible = true" plain>添加用户</el-button>
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
            @change="(val) => {
              handleChange(val, scope.row.id)
            }"
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
      :page-sizes="[10, 20]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>

    <el-dialog title="添加用户" :visible.sync="userFormVisible">
      <el-form label-position="right" label-width="120px" :model="form">
        <el-form-item label="用户名">
          <el-input v-model="form.username"  auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="form.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="form.email" ></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="form.mobile" ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="userFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      pagesize: 10,
      currentPage: 1,
      total: 0,
      searchValue: '',
      userFormVisible: false,
      form: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      }
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
    },
    // 处理
    async handleChange(val, id) {
      const data = await this.$http.put(`/users/${id}/state/${val}`);
      if (data.data.meta.status === 200) {
        this.$message({
          type: 'success',
          message: data.data.meta.msg
        });
      } else {
        this.$message({
          type: 'error',
          message: data.data.meta.msg
        });
      }
    },
    // 提交表单
    async submitForm() {
      const data = await this.$http.post('/users', this.form);
      if (data.data.meta.status === 201) {
        // 重新加载列表
        this.load();
        // 隐藏添加窗口
        this.userFormVisible = false;
        this.$message({
          type: 'success',
          message: data.data.meta.msg
        });
      } else {
        this.$message({
          type: 'error',
          message: data.data.meta.msg
        });
      }
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
  .search .el-input {
    width: 300px;
  }
</style>
