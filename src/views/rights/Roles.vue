<template>
<el-card class="card">
  <!-- 面包屑组件 -->
 <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>权限管理</el-breadcrumb-item>
    <el-breadcrumb-item>权限列表</el-breadcrumb-item>
  </el-breadcrumb> -->
  <my-bread-crumb level1="权限管理" level2="角色列表"></my-bread-crumb>
  <!--添加按钮 -->
   <el-row class="button">
     <el-col :span="24">
       <el-button>添加角色</el-button>
     </el-col>
   </el-row>
   <!-- 表格 -->
    <el-table
      v-loading="loading"
      border
      stripe
      :data="tableData"
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="scope">
         <el-row
         class="level1"
         v-for="level1 in scope.row.children"
         :key="level1.id"
          >
           <el-col :span="4">
             <el-tag
             @close='closeHandler(scope.row.id, level1.id)'
             closable
             >
             {{ level1.authName }}
             </el-tag>
           </el-col>
           <el-col :span="20">
             <el-row v-for="level2 in level1.children"
             :key="level2.id"
             >
               <el-col :span="4">
                  <el-tag
                  @close='closeHandler(scope.row.id, level2.id)'
                  closable type="success">
                  {{ level2.authName }}
                  </el-tag>
               </el-col>
               <el-col :span="20">
                  <el-tag closable type="warning"
                  @close='closeHandler(scope.row.id, level3.id)'
                  class="level3"
                  v-for="level3 in level2.children"
                  :key="level3.id"
                  >
                  {{ level3.authName }}
                  </el-tag>
               </el-col>
             </el-row>
           </el-col>
         </el-row>
        <el-row v-if="scope.row.children.length === 0">
          <el-col :span="24">没有权限</el-col>
        </el-row>
        </template>
      </el-table-column>
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        prop="roleName"
        label="角色名称"
        width="220">
      </el-table-column>
      <el-table-column
        prop="roleDesc"
        label="角色描述">
      </el-table-column>
       <el-table-column
        label="操作">
          <template slot-scope="scope">
        <el-button
        type="primary"
         icon="el-icon-edit"
         size="mini"
         plain></el-button>
        <el-button type="danger"
        icon="el-icon-delete"
        size="mini" plain></el-button>
        <el-button type="success"
        icon="el-icon-check" size="mini" plain
        @click="openSetRightsDialogHandler(scope.row)"
        ></el-button>
      </template>
      </el-table-column>
    </el-table>
    <!--点击按钮分配权限 -->
    <el-dialog
  title="分配权限"
  :visible.sync="setRightsDialogVisible">
  <el-tree
   ref="tree"
  :data="treeData"
  :props="defaultProps"
   node-key="id"
   :default-checked-keys="checkedList"
   show-checkbox
   default-expand-all
  @node-click="handleNodeClick">
  </el-tree>
  <span slot="footer" class="dialog-footer">
    <el-button @click="setRightsDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="setRightsSendHandler">确 定</el-button>
  </span>
</el-dialog>
</el-card>
</template>
<script>
export default {
  data() {
    return {
      tableData: [],
      loading: true,
      setRightsDialogVisible: false,
      treeData: [],
      defaultProps: { label: 'authName', children: 'children' },
      checkedList: [],
      halfCheckedList: [],
      currentRoleId: -1

    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      const res = await this.$http.get('roles');
      this.loading = false;
      const { meta: { status, msg } } = res.data;
      if (status === 200) {
        this.tableData = res.data.data;
      } else {
        this.$message.success(msg);
      }
    },
    async closeHandler(roleId, rightId) {
      const res = await this.$http.delete(`roles/${roleId}/rights/${rightId}`);
      const { meta: { status, msg } } = res.data;
      if (status === 200) {
        this.$message.success(msg);
        this.getData();
      } else {
        this.$message.error(msg);
      }
    },
    async openSetRightsDialogHandler(role) {
    //  清空数组
      this.checkedList = [];
      this.currentRoleId = role.id;
      this.setRightsDialogVisible = true;
      const res = await this.$http.get('rights/tree');
      this.treeData = res.data.data;
      role.children.forEach(level1 => {
        level1.children.forEach(level2 => {
          level2.children.forEach(level3 => {
            this.checkedList.push(level3.id);
          });
        });
      });
    },
    async setRightsSendHandler() {
      const checkedList = this.$refs.tree.getCheckedKeys();
      const halfCheckedList = this.$refs.tree.getHalfCheckedKeys();
      const arr = checkedList.concat(halfCheckedList);
      const str = arr.join(',');
      const res = await this.$http.post(`roles/${this.currentRoleId}/rights`, { rids: str });
      const { meta: { status, msg } } = res.data;
      if (status === 200) {
        this.$message.success(msg);
        this.setRightsDialogVisible = false;
        this.getData();
      } else {
        this.$message.error(msg);
      }

    }
  }
};
</script>
<style>
.button {
  margin: 10px 0;
}
.level3 {
  margin: 5px;
}
.level1 {
  margin-bottom: 15px;
}
</style>
