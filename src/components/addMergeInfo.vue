<template>
  <div class="portlet">
    <div class="portlet-title">
      <div class="caption">新增合并记录</div>
    </div>
    <div class="portlet-body form">
      <el-form :model="mergeinfo" :rules="rules" ref="mergeinfo" label-width="100px" size="mini" style="padding: 10px">
        <div class="form-body">
          <el-row>
            <el-col :span="8">
              <el-form-item label="分支">
                <el-input v-model="mergeinfo.branchName" autocomplete="off" disabled="disabled"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="merge to:" prop="mergeBranchId">
                <el-select  v-model="mergeinfo.mergeBranchId" placeholder="--请选择--">
                  <el-option v-for="item in branchs" :key="item.id"
                             :label="item.name" :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="合并信息:" prop="message">
                <el-input autocomplete="off" v-model="mergeinfo.message" :validate-event="false"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="合并人:" prop="mergeOperator">
                <el-input v-model="mergeinfo.mergeOperator" autocomplete="off" :validate-event="false"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="合并时间:" prop="mergeDate">
                <el-date-picker placeholder="yyyy-mm-dd" value-formt="yyyy-MM-dd"
                                v-model="mergeinfo.mergeDate" format="yyyy-MM-dd" type="date" :validate-event="false">
                </el-date-picker>
              </el-form-item>
              <el-form-item v-if="false">
                <el-input v-model="mergeinfo.branchId" autocomplete="off"></el-input>
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
  import ElCol from "element-ui/packages/col/src/col";
  export default {
    components: {ElCol},
    props:['bId','platformId'],
    data() {
      return {
        mergeinfo:{
          branchName:'',
          mergeBranchId:'',
          branchId:this.bId,
          message:'',
          mergeOperator:'',
          mergeDate:''
        },
        branchs:[],
        rules:{
          mergeBranchId:[{
            required:true,
            message:'请选择要合并到的分支',
            trigger:'blur'
          }],
          message:[{
            required:true,
            message:'合并信息不能为空',
            trigger:'blur'
          }],
          mergeOperator:[{
            required:true,
            message:'合并人不能为空',
            trigger:'blur'
          }],
          mergeDate:[{
            required:true,
            message:'合并时间不能为空',
            trigger:'blur'
          }]
        }
      }
    },
    methods:{
      save() {
        this.$refs['mergeinfo'].validate(valid => {
          if (valid) {
            var self = this;
            var bId = this.bId;
            var platformId = this.platformId
            var params = new URLSearchParams();
            params.append('branchId',this.mergeinfo.branchId);
            params.append('message',this.mergeinfo.message);
            params.append('mergeBranchId',this.mergeinfo.mergeBranchId);
            params.append('mergeOperator',this.mergeinfo.mergeOperator);
            params.append('mergeDate',this.mergeinfo.mergeDate)
            this.axios.post('http://180.3.13.11:8081/svnrecord/svn/merge/save.htm',params)
              .then(function(response) {
                if (response.data.success) {
                  self.$router.push({name: 'mergeInfo',params:{branchId:bId,platformId:platformId}})
                } else {
                    self.$message({
                      type:"error",
                      message:response.data.message
                    })
                }
              }).catch(function (error) {
                  console.log(error);
            })
          }
        })
      },
      back() {
        this.$router.go(-1);
      },
      getBranchsByPlatformId() {
        var platformId = this.platformId;
        var bId = this.bId;
        var self = this;
        this.axios.get("http://180.3.13.11:8081/svnrecord/svn/branch/getBranchsAndName.htm/"+platformId + "/" + bId)
          .then(function(response) {
            if (response.data.success) {
              self.branchs = response.data.result.branchs;
              self.mergeinfo.branchName = response.data.result.name;
            }
          }).catch(function() {

        })
      }
    },
    created(){
      this.getBranchsByPlatformId()
    }
  }
</script>
