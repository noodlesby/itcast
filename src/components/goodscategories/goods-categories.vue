<template>
  <div>
    <my-breadcrumb
      level2='商品管理'
      level3='商品分类'></my-breadcrumb>
    <el-button type='success' plain>添加分类</el-button>
    <!-- 分类表格 -->
    <el-table v-loading="loading" :data="tableData" border max-height="400">
      <el-table-tree-column
          prop="cat_name"
          label="分类名称"
          tree-key="cat_id"
          level-key="cat_level"
          parent-key="cat_pid"
          child-key="children"
          :show-overflow-tooltip="true"
          width="320"
          :indent-size="20">
      </el-table-tree-column>
      <el-table-column
          label="级别" width="180">
        <template
          slot-scope="scope">
          <span v-if="scope.row.cat_level === 0">一级</span>
          <span v-if="scope.row.cat_level === 1">二级</span>
          <span v-if="scope.row.cat_level === 2">三级</span>
        </template>
      </el-table-column>
      <el-table-column
          label="是否有效" width="180">
        <template
          slot-scope="scope">{{ !scope.row.cat_deleted ? '有效' : '无效' }}</template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary"
            @click="handleEdit(scope.row.cat_name)"
            size="mini"
            icon="el-icon-edit"
            plain></el-button>
          <el-button type="danger"
            @click="handleDelete(scope.row.cat_id)"
            size="mini"
            icon="el-icon-delete"
            plain></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 编辑对话框 -->
    <el-dialog title="编辑商品分类" :visible.sync="editCategoryVisible">
      <el-form label-position="right" label-width="80px" :model="formData">
        <el-form-item label="分类名称">
          <el-input v-model="formData.cat_name" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editCategoryVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleEdit">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 添加对话框 -->
  </div>
</template>

<script>
import Vue from 'vue';
import ElTreeGrid from 'element-tree-grid';

Vue.component(ElTreeGrid.name, ElTreeGrid);

export default {
  data() {
    return {
      tableData: [],
      loading: false,
      editCategoryVisible: false,
      formData: {
        cat_id: -1,
        cat_pid: -1,
        cat_name: ''
      }
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    // 加载商品分类数据列表
    async loadData() {
      this.loading = true;
      const res = await this.$http.get('/categories');
      if (res.data.meta.status === 200) {
        this.loading = false;
        this.tableData = res.data.data;
      } else {
        this.loading = false;
        this.$message({
          type: 'error',
          message: '获取数据失败'
        });
      }
    },
    // 删除分类
    async handleDelete(catId) {
      this.$confirm('是否删除此商品分类?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await this.$http.delete(`/categories/${catId}`);
        if (res.data.meta.status === 200) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.loadData();
        } else {
          this.$message({
            type: 'error',
            message: '删除失败!'
          });
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    async handleEdit(catName) {
      this.editCategoryVisible = true;
      this.formData.cat_name = catName;
    }
  }
};
</script>

<style scoped>

</style>
