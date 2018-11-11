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

  <!-- 选项卡 -->
  <el-tabs :tab-position="left" style="height: 200px;">
    <el-tab-pane label="用户管理">用户管理</el-tab-pane>
    <el-tab-pane label="配置管理">配置管理</el-tab-pane>
    <el-tab-pane label="角色管理">角色管理</el-tab-pane>
    <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
  </el-tabs>
 </el-card>
</template>
<script>
export default {
  data() {
    return {
      active: 0
    };
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
</style>
