<template>
  <div>
    <div>
      <my-header></my-header>
    </div>
    <div>
      <el-container>
        <el-aside>
          <navbar></navbar>
        </el-aside>
        <el-main>
          <my-main></my-main>
        </el-main>
      </el-container>
    </div>
  </div>
</template>
<script>
  import MyHeader from '@/components/Header'
  import Navbar from '@/components/Navbar'
  import MyMain from '@/components/Main'
  export default {
    components:{MyHeader,Navbar,MyMain}
  }

</script>
<style scoped>
  .header {
    position: absolute;
    line-height: 50px;
    top: 0px;
    left: 0px;
    right: 0px;
    background-color: #2c3e50;
  }
  .navbar {
    position: absolute;
    width: 230px;
    top: 50px;
    left: 0px;
    bottom: 0px;
    overflow-y: auto;
    background-color: gainsboro;
  }
  .main {
    position: absolute;
    top: 50px;
    left: 230px;
    bottom: 0px;
    right: 0px;
    overflow-y: auto;
  }

</style>
