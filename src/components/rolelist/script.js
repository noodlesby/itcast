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
    }
  }
};
