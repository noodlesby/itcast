<template>
  <el-card class="card">
    <!-- 面包屑 -->
     <my-bread-crumb level1="商品管理" level2="分类参数"></my-bread-crumb>
     <!-- 警告框 -->
     <el-alert title="注意： 仅允许为第三季分类设置参数" type="warning"
     show-icon
     :closable="false"
     class="alert">
  </el-alert>
  <!-- 下拉框 -->
  <el-row>
    <el-col :span="24">
      请选择商品分类:
      <el-cascader
        expand-trigger="hover"
        :options="options"
        v-model="selectedOptions"
        :props = "{ label: 'cat_name', value: 'cat_id' }"
        @change="handleChange">
      </el-cascader>
    </el-col>
  </el-row>
  <!-- tab栏 -->
    <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="动态参数" name="many">
      <el-button type="primary blue" :disabled="selectedOptions.length !== 3">添加动态参数</el-button>
      <!-- 表格 -->
       <el-table
        border
        stripe
        :data="tableData"
        style="width: 100%">
       <el-table-column type="expand">
          <template slot-scope="scope">
            <el-tag
              :key="item"
                v-for="item in scope.row.params"
                closable
                :disable-transitions="false"
                @close="handleClose(item, scope.row)">
                {{item}}
           </el-tag>
           <el-input
              class="input-new-tag"
              v-if="inputVisible"
              v-model="inputValue"
              ref="saveTagInput"
              size="small"
              @keyup.enter.native="handleInputConfirm(scope.row)"
              @blur="handleInputConfirm"
            >
           </el-input>
           <el-button v-else class="button-new-tag" size="small"
           @click="showInput">+ New Tag</el-button>
          </template>
       </el-table-column>
       <el-table-column type="index" width="60">
       </el-table-column>
      <el-table-column
        prop="attr_name"
        label="商品参数"
        width="180">
      </el-table-column>
      <el-table-column
        label="操作"
        width="180">
         <template slot-scope="scope">
        <el-button
        type="primary"
         icon="el-icon-edit"
         size="mini"
         plain></el-button>
        <el-button type="danger"
        icon="el-icon-delete"
        size="mini" plain></el-button>
        </template>
      </el-table-column>
    </el-table>
    </el-tab-pane>
    <el-tab-pane label="静态参数" name="only">
      <el-button type="primary" :disabled="selectedOptions.length !== 3">添加静态参数</el-button>
       <el-table
        border
        stripe
        :data="tableData"
        style="width: 100%">
       <el-table-column type="index" width="60">
       </el-table-column>
      <el-table-column
        prop="attr_name"
        label="属性名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="attr_vals"
        label="属性值"
        width="180">
      </el-table-column>
      <el-table-column
        label="操作"
        width="180">
         <template slot-scope="scope">
        <el-button
        type="primary"
         icon="el-icon-edit"
         size="mini"
         plain></el-button>
        <el-button type="danger"
        icon="el-icon-delete"
        size="mini" plain></el-button>
        </template>
      </el-table-column>
    </el-table>
    </el-tab-pane>
  </el-tabs>
  </el-card>
</template>
<script>
export default {
  data() {
    return {
      options: [],
      selectedOptions: [],
      activeName: 'many',
      tableData: [],
      inputVisible: false,
      inputValue: ''
    };
  },
  methods: {
    handleClick() {
      this.getData();
    },
    handleChange() {
      this.getData();
    },
    async getOptions() {
      const res = await this.$http.get('categories?type=3');
      this.options = res.data.data;
    },
    async getData() {
      if (this.selectedOptions.length === 3) {
        const id = this.selectedOptions[2];
        const res = await this.$http.get(`categories/${id}/attributes?sel=${this.activeName}`);
        const { meta: { status, msg } } = res.data;
        if (status === 200) {
          this.tableData = res.data.data;
          if (this.activeName === 'many') {
            this.tableData.forEach(item => {
              const arr = item.attr_vals.length === 0 ? [] : item.attr_vals.split(',');
              this.$set(item, 'params', arr);
            });
          } else {
            this.$message.error(msg);
          }
        }
      }
    },
  async handleClose(val, param) {
    const res = await this.$http.put(`categories/${this.selectedOptions[2]}/attributes/${param.attr_id}`, { attr_vals:         param.params.join(','), attr_sel: this.activeName, attr_name: param.attr_name });
    const { meta: { status, msg } } = res.data;
    if (status === 200) {
      this.$message.success(msg);
      const index = param.params.findIndex(item => {
        return item === val;
      });
      param.params.splice(index, 1);
    } else {
      this.$message.error(msg);
    }
  },
  async handleInputConfirm(row) {
    let inputValue = this.inputValue;
    if (!inputValue) {
      return;
    }
    // 发送请求向数据库添加数据
    const res = await this.$http.put(`categories/${this.selectedOptions[2]}/attributes/${row.attr_id}`, {attr_vals: row.params.join (','), attr_name: row.attr_name, attr_sel: this.activeName });
    const { meta: { status, msg } } = res.data;
    if (status === 200) {
      this.$message.success(msg);
      row.params.push(inputValue);
    } else {
      this.$message.error(msg);
    }
    this.inputVisible = false;
    this.inputValue = '';
  },
  showInput() {
    this.inputVisible = true;
  },
  },
  created() {
    this.getOptions();
  }

};
</script>
<style>
.alert {
  margin: 10px 0;
}
.el-tag + .el-tag {
    margin-left: 10px;
  }
</style>
