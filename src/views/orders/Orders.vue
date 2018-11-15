<template>
  <el-card class="card">
    <!-- 面包屑 -->
  <my-bread-crumb level1="订单管理" level2="订单列表"></my-bread-crumb>
  <!-- 表格 -->
  <el-table
       border
       stripe
      :data="data"
      style="width: 100%; margin-top:10px">
      <el-table-column
        type="index"
        width="60">
      </el-table-column>
      <el-table-column
        prop="order_number"
        label="订单编号"
        width="280">
      </el-table-column>
      <el-table-column
        prop="order_price"
        label="订单价格">
      </el-table-column>
      <el-table-column
        prop="order_pay"
        label="是否付款">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.order_pay === 1">付款</el-tag>
          <el-tag type="danger" v-else>未付款</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="is_send"
        label="是否发货">
      </el-table-column>
      <el-table-column
        prop="create_time"
        label="下单时间"
        width="280"
        >
        <template slot-scope="scope">
          {{ scope.row.create_time | dateFormat('YYYY-MM-DD') }}
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
        <el-button
        type="primary"
         icon="el-icon-edit"
         size="mini"
         plain
         @click="openDialog"
         ></el-button>
        </template>
      </el-table-column>
    </el-table>

      <!-- 分页 -->
     <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[8, 10, 15, 20]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>

    <!-- 对话框 -->
    <el-dialog title="修改订单地址" :visible.sync="dialogFormVisible">
        <el-form :label-width="100" :model="form" >
          <el-form-item label="省市区/县">
             <el-cascader
                expand-trigger="hover"
                :options="options"
                v-model="form.region">
             </el-cascader>
          </el-form-item>
          <el-form-item label="详细地址" >
             <el-input v-model="form.address" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
</el-dialog>
  </el-card>
</template>
<script>
import cityData from './city_data2017_element';

export default {
  data() {
    return {
      data: [],
      pagenum: 1,
      pagesize: 10,
      total: 0,
      dialogFormVisible: false,
      options: [],
      form: {
        address: '',
        region: []
      }
    };
  },
  methods: {
    async getData() {
      const res = await this.$http.get(`orders?pagenum=${this.pagenum}&pagesize=${this.pagesize}`);
      /* const { meta: { status, msg } } = res.data; */
      this.data = res.data.data.goods;
      this.total = res.data.data.total;
     /*  if (status === 200) {

      } else {
        this.$message.error(msg);
      } */
    },
    // 分页方法
    handleSizeChange(val) {
      this.pagesize = val;
      this.getData();
    },
    handleCurrentChange(val) {
      this.pagenum = val;
      this.getData();
    },
    openDialog() {
      this.dialogFormVisible = true;
      // 加载多级下拉的数据
      this.options = cityData;
    }
  },
  created() {
    this.getData();
  }
};
</script>
<style>

</style>
