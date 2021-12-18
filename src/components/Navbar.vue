<template>
  <div class="navbar" id="menu">
    <el-menu default-active="$route.path" router class="el-menu-vertical-demo">
      <el-menu-item index="/systemManage">平台管理</el-menu-item>
      <el-menu-item index="/branch">分支管理</el-menu-item>
      <el-submenu index="3">
        <template slot="title">系统设置</template>
        <el-menu-item index="/user">用户设置</el-menu-item>
        <el-menu-item index="/role">角色设置</el-menu-item>
        <el-menu-item index="/menumanage">菜单管理</el-menu-item>
      </el-submenu>
    </el-menu>

  </div>
</template>
<script>

</script>

<style scoped>
  .nav-ul {
    list-style: none;
  }
  .nav-li {
    display: inline-block;
    margin-left: 20px;
    height: 60px;
  }
</style>
