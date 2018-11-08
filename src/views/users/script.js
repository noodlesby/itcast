export default {
  data() {
    return {
      data: [

      ],
      /* 当前页数 */
      pagenum: 1,
      /* 每页显示条数 */
      pagesize: 2,
      /* 总数据数 */
      count: 0,
      /* 绑定搜索文本框 */
      searchValue: '',
      /* 控制添加用户的对话框的显示和隐藏 */
      addUserDialogFormVisible: false,
      /* 控制编辑用户的对话框的显示和隐藏 */
      editUserDialogFormVisible: false,
      /* 表单数据 */
      formData: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      /* 表单验证 */
      rules: {
        username: [
          { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' }
        ],
        password: [
          { min: 6, max: 8, message: '长度在 6 到 8 个字符', trigger: 'blur' }
        ]
      },
      currentName: '',
      currentUserId: 0,
      currentRoleId: -1,
      setRoleDialogFormVisible: false,
      roles: []
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      this.$http.defaults.headers.common.Authorization = sessionStorage.getItem('token');
      const res = await this.$http.get(`users?pagenum=${this.pagenum}&pagesize=${this.pagesize}&query=${this.searchValue}`);
      const { meta: { status, msg } } = res.data;
      if (status === 200) {
        this.data = res.data.data.users;
        this.count = res.data.data.total;
      } else {
        this.$message.error(msg);
      }
    },
    handleSizeChange(val) {
      this.pagesize = val;
      this.getData();
    },
    handleCurrentChange(val) {
      this.pagenum = val;
      this.getData();
    },
    searchHandler() {
      this.getData();
    },
    /* 添加用户 */
    async addUserHandler() {
      const res = await this.$http.post('users', this.formData);
      const { data: { meta: { status, msg } } } = res;
      if (status === 201) {
        this.$message.success(msg);
        this.addUserDialogFormVisible = false;
        this.getData();
        this.$refs.reset.resetFields();
      }
    },
    openEditDialog(info) {
      this.editUserDialogFormVisible = true;
      this.formData.username = info.username;
      this.formData.email = info.email;
      this.formData.mobile = info.mobile;
      this.formData.id = info.id;
    },
    async editUserHandler() {
      const res = await this.$http.put(`users/${this.formData.id}`);
      console.log(res);
      const { meta: { status, msg } } = res.data;
      if (status === 200) {
        // 提示成功
        this.$message.success(msg);
        // 关闭对话框
        this.editUserDialogFormVisible = false;
        // 清空form表单
        this.formData.username = '';
        this.formData.email = '';
        this.formData.mobile = '';
        // 重新加载页面
        this.getData();
      } else {
        this.$message.warning(msg);
      }
    },
    // 关闭编辑对话框时清空数据
    closeEditDialogHandler() {
      this.formData.username = '';
      this.formData.email = '';
      this.formData.mobile = '';
    },
    // 处理删除操作
    async delEditDialog(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await this.$http.delete(`users/${id}`);
        const { meta: { status, msg } } = res.data;
        if (status === 200) {
          if (this.data.length === 1 && this.pagenum !== 1) {
            this.pagenum = this.pagenum - 1;
            this.getData();
          }
          this.$message.success(msg);
          this.getData();
        } else {
          this.$message.error(msg);
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    /* 修改用户状态 */
    async changeHandler(user) {
      const res = await this.$http.put(`users/${user.id}/state/${user.mg_state}`);
      const { meta: { status, msg } } = res.data;
      if (status === 200) {
        this.$message.success(msg);
      } else {
        this.$message.error(msg);
      }
    },
    async openRoleEditDialogHandler(user) {
      this.setRoleDialogFormVisible = true;
      this.currentName = user.username;
      this.currentUserId = user.id;

      const res = await this.$http.get('roles');
      this.roles = res.data.data;
      const res1 = await this.$http.get(`users/${user.id}`);
      this.currentRoleId = res1.data.data.rid;
    },
    async setRoleHandler() {
      const res = await this.$http.put(`users/${this.currentUserId}/role`, { rid: this.currentRoleId });
      const { meta: { status, msg } } = res.data;
      if (status === 200) {
        this.$message.success(msg);
        this.setRoleDialogFormVisible = false;
      } else {
        this.$message.error(msg);
      }
    }
  }
};
