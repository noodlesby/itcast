<template>
  <el-card class="card">
<!-- 面包屑组件 -->
 <my-bread-crumb level1="商品管理" level2="商品列表"></my-bread-crumb>
 <!-- 添加按钮 -->
 <el-row class="row">
   <el-col :span="24">
     <el-button type="success" plain @click="openCatDialogHandler">添加分类</el-button>
   </el-col>
 </el-row>
 <!-- 表格 -->
   <el-table
      border
      stripe
      v-loading="loading"
      :data="tableData"
      style="width: 100%"
      class="table">
      <!-- <el-table-column
        prop="cat_name"
        label="分类名称"
        width="180">
      </el-table-column> -->
      <el-table-tree-column
        prop="cat_name"
        treeKey="cat_id"
        levelKey="cat_level"
        childKey="children"
        parentKey="cat_pid"
         label="分类名称" width="300"
         >
      </el-table-tree-column>
      <el-table-column
        prop="cat_level"
        label="级别"
        width="180">
        <template slot-scope="scope">
          <span v-if="scope.row.cat_level === 0">一级</span>
          <span v-else-if="scope.row.cat_level === 1">二级</span>
          <span v-else-if="scope.row.cat_level === 2">三级</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="cat_deleted"
        label="是否有效">
        <template slot-scope="scope">
          {{ scope.row.cat_deleted ? '无效' : '有效' }}
        </template>
      </el-table-column>
       <el-table-column
        prop=""
        label="操作">
        <template slot-scope="scope">
        <el-button
        type="primary"
         icon="el-icon-edit"
         size="mini"
         @click="openEditDialog(scope.row)"
         plain></el-button>
        <el-button type="danger"
        icon="el-icon-delete"
        @click="delAddDialog(scope.row.cat_id)"
        size="mini" plain></el-button>
        </template>
      </el-table-column>
   </el-table>

 <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageNum"
      :page-sizes="[4, 6, 8, 10]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>

  <!-- 添加分类的对话框 -->
<el-dialog title="添加商品分类" :visible.sync="addDialogFormVisible">
  <el-form :model="form" label-width="100">
    <el-form-item label="分类名称">
      <el-input v-model="form.cat_name" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="分类列表" :label-width="formLabelWidth">
      <el-cascader
      change-on-select
       clearable
       placeholder="默认添加一级分类"
       expand-trigger="hover"
       :options="options"
       :props="defaultProps"
       v-model="catIds">
  </el-cascader>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="addDialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="addHandler">确 定</el-button>
  </div>
</el-dialog>

 <!-- 编辑分类的对话框 -->
 <el-dialog title="编辑商品分类" :visible.sync="editDialogFormVisible">
  <el-form :model="form" label-width="100">
    <el-form-item label="分类名称">
      <el-input v-model="form.cat_name" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="editDialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="editHandler">确 定</el-button>
  </div>
</el-dialog>
</el-card>
</template>
<script>
import ElTreeGrid from 'element-tree-grid';

export default {
  components: {
    'el-table-tree-column': ElTreeGrid
  },
  data() {
    return {
      tableData: [],
      // 分页数据
      pageNum: 1,
      pageSize: 6,
      total: 0,
      loading: true,
      addDialogFormVisible: false,
      editDialogFormVisible: false,
      form: {
        cat_pid: -1,
        cat_name: '',
        cat_level: 0
      },
      options: [],
      defaultProps: {
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'
      },
      catIds: [],
      currentCatId: -1

    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      this.loading = true;
      const res = await this.$http.get(`categories?type=3&pagenum=${this.pageNum}&pagesize=${this.pageSize}`);
      const { meta: { status, msg } } = res.data;
      this.loading = false;
      if (status === 200) {
        this.total = res.data.data.total;
        this.tableData = res.data.data.result;
      } else {
        this.$message.error(msg);
      }
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getData();
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getData();
    },
    async openCatDialogHandler() {
      this.addDialogFormVisible = true;
      const res = await this.$http.get('categories?type=2');
      this.options = res.data.data;
    },
    async addHandler() {
      this.form.cat_level = this.catIds.length;
      if (this.catIds.length === 0) {
        this.form.cat_pid = 0;
      } else if (this.catIds.length === 1) {
        this.form.cat_pid = this.catIds[0];
      } else if (this.catIds.length === 2) {
        this.form.cat_pid = this.catIds[1];
      }
      const res = await this.$http.post('categories', this.form);
      const { meta: { status, msg } } = res.data;
      if (status === 201) {
        this.addDialogFormVisible = false;
        this.getData();
        this.$message.success(msg);
      } else {
        this.$message.error(msg);
      }
    },
     delAddDialog(catId) {
      // 删除提示
      this.$confirm('确定删除该分类么?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {

          const res = await this.$http.delete(`categories/${catId}`);
          const { meta: { status, msg } } = res.data;
          if (status === 200) {
            this.$message({
            type: 'success',
            message: msg
          });
          this.getData();
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    },
    openEditDialog(info) {
      this.editDialogFormVisible = true;
      this.form.cat_name = info.cat_name;
      this.currentCatId = info.cat_id;
    },
    async editHandler() {
      const res = await this.$http.put(`categories/${this.currentCatId}`,{ cat_name: this.form.cat_name });
      const { meta: { status, msg } } = res.data;
      if (status === 200) {
        this.$message.success(msg);
        this.editDialogFormVisible = false;
        this.getData();
      } else {
        this.$message.error(msg);
      }
    }
  }

};
</script>
<style>
.row {
  margin:10px 0;
}
</style>
