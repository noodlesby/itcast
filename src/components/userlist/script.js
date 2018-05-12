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
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 11, message: '长度在 6 到 11 个字符', trigger: 'blur' }
        ],
        email: [
          { type: 'email', message: '邮箱地址格式不正确', trigger: 'blur' }
        ],
        mobile: [
          { type: '', message: '请输入用户名', trigger: 'blur' }
        ]
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
      // 表单提交前，先进行表单验证
      this.$refs.ruleForm.validate(async (valid) => {
        if (!valid) {
          return;
        }
        // 表单提交
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
          // this.$refs.ruleForm.resetFields();
        } else {
          this.$message({
            type: 'error',
            message: data.data.meta.msg
          });
        }
      });
    },
    // 删除
    async handleDelete(user) {
      // 删除提示
      this.$confirm('确认要删除该用户么？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const data = await this.$http.delete(`/users/${user.id}`);
        if (data.data.meta.status === 200) {
          console.log(this.load);
          // 删除成功重新加载数据
          this.load();
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
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    }
  }
};
