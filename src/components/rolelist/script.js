export default {
  data() {
    return {
      tableData: [],
      loading: true,
      addRoleFormVisible: false,
      addRoleFormData: {
        roleName: '',
        roleDesc: ''
      },
      rules: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ],
        roleDesc: [
          { required: true, message: '请输入角色描述', trigger: 'blur' }
        ]
      }
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    // 加载表格数据
    async loadData() {
      const res = await this.$http.get('/roles');
      if (res.data.meta.status === 200) {
        this.tableData = res.data.data;
        this.loading = false;
      }
    },
    // 添加角色
    async handleAddRole() {
      // 表单验证
      this.$refs.addRoleForm.validate(async (valid) => {
        if (!valid) {
          // 表单验证失败，返回
          return;
        }
        // 表单验证成功，添加角色
        this.addRoleFormVisible = false;
        const res = await this.$http.post('/roles', this.addRoleFormData);
        if (res.data.meta.status === 201) {
          this.$message({
            type: 'success',
            message: '创建角色成功'
          });
          // 重新加载数据
          this.loadData();
        } else {
          this.$message({
            type: 'erroe',
            message: '创建角色失败'
          });
        }
      });
    },
    // 删除角色
    async handleDelete(role) {
      // 删除提示
      this.$confirm('确认删除该角色？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 删除操作
        const { id: roleId } = role;
        const res = await this.$http.delete(`/roles/${roleId}`);
        if (res.data.meta.status === 200) {
          this.$message({
            type: 'success',
            message: '删除角色成功'
          });
          this.loadData();
        } else {
          this.$message({
            type: 'error',
            message: '删除角色失败'
          });
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    async showEditRoleDialog(role) {
      // 显示编辑角色的对话框
      this.addRoleFormVisible = true;
      const { id: roleId } = role;
      const res = await this.$http.get(`/roles/${roleId}`);
      this.addRoleFormData = res.data.data;
    },
    // 编辑角色
    async handleEidtRole() {
      const { roleId } = this.addRoleFormData;
      const res = await this.$http.put(`/roles/${roleId}`, this.addRoleFormData);
      this.addRoleFormVisible = false;
      if (res.data.meta.status === 200) {
        this.$message({
          type: 'success',
          message: '编辑用户成功'
        });
        this.loadData();
      } else {
        this.$message({
          type: 'error',
          message: '编辑用户错误'
        });
      }
    }
  }
};
