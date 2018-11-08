<template>
<el-card class="card">
  <!-- 面包屑组件 -->
 <my-bread-crumb level1="权限管理" level2="权限列表"></my-bread-crumb>
  <!-- 表格 -->
   <el-table
      border
      stripe
      :data="tableData"
      style="width: 100%"
      class="table">
       <el-table-column
      type="index"
      width="80">
    </el-table-column>
      <el-table-column
        prop="authName"
        label="权限名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="path"
        label="路径"
        width="180">
      </el-table-column>
      <el-table-column
        prop="level"
        label="层级">
       <template slot-scope="scope">
         <span v-if="scope.row.level == 0">一级</span>
         <span v-else-if="scope.row.level == 1">二级</span>
         <span v-else-if="scope.row.level == 2">三级</span>
       </template>
      </el-table-column>
    </el-table>
</el-card>
</template>
<script>
export default {
  data() {
    return {
      tableData: []
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      const res = await this.$http.get('rights/list');
      const { meta: { status, msg } } = res.data;
      if (status === 200) {
        this.tableData = res.data.data;
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
  overflow: auto;
}
.table {
  margin-top: 10px;
}
</style>
