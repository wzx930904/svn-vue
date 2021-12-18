<template>
  <div class="portlet">
    <div class="portlet-title">
      <div class="caption">新增系统</div>
    </div>
    <div class="portlet-body form">
      <el-form :model="systemForm" label-width="100px" size="mini" style="padding: 10px">
        <div class="form-body">
          <el-row>
            <el-col :span="12">
              <el-form-item label="系统编码" prop="systemCode">
                <el-input></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="系统名称" prop="systemName">
                <el-input></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <div style="float: right;margin: 0px 20px">
              <el-col>
                <el-button round @click.native="save()">保存</el-button>
                <el-button round @click.native="back()">返回</el-button>
              </el-col>
            </div>
          </el-row>
        </div>
      </el-form>
    </div>
  </div>
</template>

<style>
  @import '../assets/svntest.css';
</style>
<script>
  export default {
    data() {
      return {
        systemForm:{
          systemCode:'',
          systemName:''
        }
      }
    },
    methods:{
      save() {

      },
      back() {
        this.$router.go(-1);
      }
    }
  }
</script>
