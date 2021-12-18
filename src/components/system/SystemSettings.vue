<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div style="float: left;margin-bottom: 20px;">{{this.systemName}}</div>
      </el-col>
    </el-row>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="分支" name="first">
        <branch-settings ref="branchinfo" :pfId="pfId"></branch-settings>
      </el-tab-pane>
      <el-tab-pane label="分支添加" name="second">
        <el-form :model="form" label-width="80px" size="small">
          <el-form-item label="id" v-if="show">
            <el-input v-model="form.platformId"></el-input>
          </el-form-item>
          <el-form-item  label="分支名称:">
            <el-input v-model="form.name" placeholder="分支名称"></el-input>
          </el-form-item>
          <el-form-item label="创建日期:">
            <el-date-picker placeholder="yyyy-mm-dd" value-formt="yyyy-MM-dd"
                v-model="form.createDate" format="yyyy-MM-dd" type="date">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">保存</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import BranchSettings from './BranchSettings'
  export default {
    name: 'SystemSettings',
    props:['systemName','parentPlatformId'],
    components: {BranchSettings},
    data() {
      return {
        activeName: 'first',
        show:false,
        pfId:this.parentPlatformId,
        form: {
          platformId:this.parentPlatformId,
          name: '',
          createDate: ''
        }
      }
    },
    methods: {
      handleClick(tab, event) {

      },
      onSubmit: function () {
        var self = this;
        var params = new URLSearchParams();
        params.append('platformId',this.form.platformId);
        params.append('name',this.form.name);
        params.append("createDate",this.form.createDate);
        this.axios.post('http://180.3.13.11:8081/svnrecord/svn/branch/save.htm',params)
          .then(function(response) {
            if (response.data.success) {
              self.$message({
                type: 'success',
                message: '数据添加成功!'
              })
              self.$refs.branchinfo.queryBranch(self.pfId);
              self.activeName='first';
            }else {
              self.$message({
                type:"error",
                message:response.data.message
              })
            }
          }).catch(function(error){
          console.log(error);
        })
      }
    }
  }
</script>

<style scoped>
  .el-input{
    width: 500px;
  }
</style>
