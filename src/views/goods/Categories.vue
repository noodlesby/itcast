<template>
  <el-card class="card">
<!-- 面包屑组件 -->
 <my-bread-crumb level1="商品管理" level2="商品列表"></my-bread-crumb>
 <!-- 添加按钮 -->
 <el-row class="button">
   <el-col :span="24">
     <el-button type="success" plain>添加分类</el-button>
   </el-col>
 </el-row>
  </el-card>
</template>
<script>
export default {

};
</script>
<style>
.button {
  margin:10px 0;
}
</style>
