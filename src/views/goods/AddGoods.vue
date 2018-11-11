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
       <el-checkbox-group v-model="item.params">
          <el-checkbox
        v-for="param in item.params" :key="param"
        :label="param" border>
         </el-checkbox>
       </el-checkbox-group>
       </el-form-item>
    </el-tab-pane>
    <el-tab-pane label="商品属性">
       <el-form-item
       v-for="item in staticParams" :key="item.attr_id"
       :label="item.attr_name">
          <el-input v-model="item.attr_vals"></el-input>
        </el-form-item>
    </el-tab-pane>
    <el-tab-pane label="商品图片">
      <el-upload
        action="http://localhost:8888/api/private/v1/upload"
        list-type="picture"
        :headers="headers"
        :on-remove="removeHandler"
        :on-success="successHandler">
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
   </el-tab-pane>
    <el-tab-pane label="商品内容">
      <el-button class="addgoods" @click="addgoodsHandler">添加商品</el-button>
      <quill-editor
      v-model="form.goods_introduce">
      </quill-editor>
    </el-tab-pane>
  </el-tabs>
</el-form>
 </el-card>
</template>
<script>
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import { quillEditor } from 'vue-quill-editor';

export default {
  data() {
    return {
      active: 1,
      form: {
        goods_name: '',
        goods_price: '',
        goods_weight: '',
        goods_number: '',
        goods_cat: '',
        pics: [],
        goods_introduce: '',
        attrs: []
      },
      // 多级选择器
      options: [],
      selectedOptions: [],
      // 动态参数和静态参数
      dynamicParams: [],
      staticParams: [],
      headers: {
        Authorization: sessionStorage.getItem('token')
      }
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
          const arr = item.attr_vals.length === 0 ? [] : item.attr_vals.split(',');
          return this.$set(item, 'params', arr);
        });
      } else {
        this.staticParams = res.data.data;
      }
    },
    // 上传图片和移除图片
    removeHandler(file) {
      const index = this.form.pics.findIndex(item => item.pic === file.response.data.tmp_path);
      this.form.pics.splice(index, 1);
      console.log(this.form.pics);
    },
    successHandler(response) {
      if (response.meta.status === 200) {
        this.form.pics.push({ pic: response.data.tmp_path });
      } else {
        this.$message.error('图片上传失败');
      }
      console.log(this.form.pics);
    },
    async addgoodsHandler() {
      this.form.goods_cat = this.selectedOptions.join(',');
      // 基于动态参数生成的数据
      const arr1 = this.dynamicParams.map(item => {
        return { attr_id: item.attr_id, attr_value: item.params.join(',') };
      });
      const arr2 = this.staticParams.map(item => {
        return { attr_id: item.attr_id, attr_value: item.attr_vals };
      });
      this.form.attrs = [...arr1, ...arr2];
      const res = await this.$http.post('goods', this.form);
      const { meta: { status, msg } } = res.data;
      if (status === 201) {
        this.$message.success(msg);
        this.$router.push('/goods');
      } else {
        this.$message.error(msg);
      }

    }

  },
  components: {
    quillEditor
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
.ql-editor {
  height: 300px;
}
.addgoods {
  margin-bottom: 10px;
}
</style>
