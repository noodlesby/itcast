<template>
  <el-card class="card">
    <!-- 面包屑 -->
     <my-bread-crumb level1="商品管理" level2="分类列表"></my-bread-crumb>
     <!--搜索栏 -->
     <el-row class="search">
       <el-col :span="24">
         <el-input placeholder="请输入内容"
           v-model="searchValue"
           style="width: 350px"
           class="input-with-select" clearable>
           <el-button icon="el-icon-search"
           slot="append"
          ></el-button>
         </el-input>
      <el-button type="success" round @click="addgoods">
        添加商品
      </el-button>
       </el-col>
     </el-row>
     <!-- 表格 -->
      <el-table
      :data="tableData"
      border
      stripe
      style="width: 100%">
      <el-table-column
        type="index"
        width="40">
      </el-table-column>
      <el-table-column
        prop="goods_name"
        label="商品名称"
        width="400">
      </el-table-column>
      <el-table-column
        prop="goods_price"
        label="商品价格（元）"
        width="130">
      </el-table-column>
      <el-table-column
        prop="goods_weight"
        label="商品重量">
      </el-table-column>
      <el-table-column
        prop="add_time"
        width="200"
        label="创建时间">
        <template slot-scope="scope">
          {{scope.row.add_time | dateFormat('YYYY-MM-DD')}}
        </template>
      </el-table-column>
       <el-table-column
        label="操作">
        <template slot-scope="scope">
           <el-button
             type="primary"
              icon="el-icon-edit"
              size="mini"
             @click="openEditDialog(scope.row)"
              plain>
          </el-button>
          <el-button
             type="danger"
             icon="el-icon-delete"
              @click="delAddDialog(scope.row.cat_id)"
            size="mini" plain>
        </el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>
<script>
export default {
  data() {
    return {
      searchValue: '',
      tableData: [],
      pagenum: 1,
      pagesize: 100
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      const res = await this.$http.get(`goods?pagenum=${this.pagenum}&pagesize=${this.pagesize}`);
      const { meta: { status, msg } } = res.data;
      if (status === 200) {
        this.$message.success(msg);
        this.tableData = res.data.data.goods;
      } else {
        this.$message.error(msg);
      }
    },
    addgoods() {
      this.$router.push('/goods/add');
    }
  }
};
</script>
<style>
.search {
  margin: 10px 0;
}
</style>
