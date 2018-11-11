<template>
  <el-card class="card">
 <!-- 面包屑 -->
  <my-bread-crumb level1="商品管理" level2="商品列表"></my-bread-crumb>
 <!-- 消息提示 -->
  <el-alert
    class="alert"
    title="添加商品信息"
    center
    show-icon
    :closable="true"
    type="info">
  </el-alert>

  <!-- 步骤条 -->
  <el-steps :active="active" finish-status="success" align-center="">
    <el-step title="基本信息"></el-step>
    <el-step title="商品参数"></el-step>
    <el-step title="商品属性"></el-step>
    <el-step title="商品图片"></el-step>
    <el-step title="商品内容"></el-step>
  </el-steps>


  <!-- 表单内部嵌套选项卡 -->
  <el-form :model="form" label-width="80px" label-position="top">
  <!-- 选项卡 -->
  <el-tabs
  tab-position="left"
  @tab-click="tabClickHandler"
  class="chosen">
    <el-tab-pane label="基本信息">
        <el-form-item label="商品名称">
          <el-input v-model="form.goods_name"></el-input>
        </el-form-item>
        <el-form-item label="商品价格">
          <el-input v-model="form.goods_price"></el-input>
        </el-form-item>
        <el-form-item label="商品重量">
          <el-input v-model="form.goods_weight"></el-input>
        </el-form-item>
        <el-form-item label="商品数量">
          <el-input v-model="form.goods_number"></el-input>
        </el-form-item>
        <el-form-item label="商品分类">
            <el-cascader
             placeholder="请选择商品分类"
              clearable
              expand-trigger="hover"
              :options="options"
              :props="{ label:'cat_name', value: 'cat_id', children }"
              v-model="selectedOptions"
              @change="handleChange">
            </el-cascader>
        </el-form-item>
    </el-tab-pane>
    <el-tab-pane label="商品参数">
       <el-form-item
       v-for="item in dynamicParams" :key="item.attr_id"
       :label="item.attr_name">
        <el-checkbox
        v-for="param in item.params" :key="param"
        checked
        :label="param" border></el-checkbox>
       </el-form-item>
    </el-tab-pane>
    <el-tab-pane label="商品属性">
       <el-form-item
       v-for="item in staticParams" :key="item.attr_id"
       :label="item.attr_name">
          <el-input v-model="item.attr_vals"></el-input>
        </el-form-item>
    </el-tab-pane>
    <el-tab-pane label="商品图片">商品图片</el-tab-pane>
    <el-tab-pane label="商品内容">商品内容</el-tab-pane>
  </el-tabs>
</el-form>
 </el-card>
</template>
<script>
export default {
  data() {
    return {
      active: 1,
      form: {
        goods_name: '',
        goods_price: '',
        goods_weight: '',
        goods_number: '',
        goods_cat: ''
      },
      // 多级选择器
      options: [],
      selectedOptions: [],
      // 动态参数和静态参数
      dynamicParams: [],
      staticParams: []
    };
  },
  methods: {
    tabClickHandler(tab) {
      this.active = tab.index - 0;
      if (tab.index === '0') {
        this.getOptions();
      }
      if (tab.index === '1' || tab.index === '2') {
        if (this.selectedOptions.length !== 3) {
          this.$message.warning('请先选择商品分类');
        }
        this.getParams(tab.index);
      }
    },
    handleChange() {
      if (this.selectedOptions.length !== 3) {
        this.selectedOptions.length = 0;
        this.$message.warning('请选择三级分类');
      }
    },
    async getOptions() {
      const res = await this.$http.get('categories?type=3');
      this.options = res.data.data;
    },
    // 加载动态参数
    // 加载静态参数
    async getParams(index) {
      const sel = index === '1' ? 'many' : 'only';
      const res = await this.$http.get(`categories/${this.selectedOptions[2]}/attributes?sel=${sel}`);
      if (index === '1') {
        this.dynamicParams = res.data.data;
        this.dynamicParams.map((item) => {
          item.params = item.attr_vals.length === 0 ? [] : item.attr_vals.split(',');
        });
      } else {
        this.staticParams = res.data.data;
      }
    }
  }
};
</script>
<style>
.alert {
  margin: 10px 0;
}
.el-step_title {
  font-size: 9px;
}
.chosen {
  margin-top: 20px;
}
.el-tabs--left {
  overflow: auto;
}
</style>
