<template>
  <el-container>
    <el-main>
      <!--main content-->
      <main-content ref="changeLog" :bId="bId"></main-content>
    </el-main>
  </el-container>
</template>

<script>
  import MainContent from './MainContent'
  export default {
    name: 'ProjectIndex',
    props:['branchId'],
    components: {MainContent},
    data() {
        return {
            bId:this.branchId
        }
    },
    methods:{

    }
  }

</script>

<style scoped>
</style>
