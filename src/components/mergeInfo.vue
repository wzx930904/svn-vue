<template>
  <div>
    <el-dialog :title="titleName" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="分支" :label-width="formLabelWidth">
          <el-input v-model="form.branchName" autocomplete="off" disabled="disabled" style="width: 400px;"></el-input>
        </el-form-item>
        <el-form-item label="merge to:" prop="mergeBranchId" :label-width="formLabelWidth">
          <el-select  v-model="form.mergeBranchId" style="width: 400px;" placeholder="--请选择--">
            <el-option v-for="item in branchs" :key="item.id"
                       :label="item.branchName" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="合并信息:" prop="message" :label-width="formLabelWidth">
          <el-input maxlength="100" autocomplete="off" v-model="form.message"
                    style="width: 400px;"></el-input>
        </el-form-item>
        <el-form-item label="合并人:" prop="mergeOperator" :label-width="formLabelWidth">
          <el-input maxlength="100" v-model="form.mergeOperator" autocomplete="off"
                    style="width: 400px;"></el-input>
        </el-form-item>
        <el-form-item label="合并时间:" prop="mergeDate" :label-width="formLabelWidth">
          <el-date-picker placeholder="yyyy-mm-dd" value-formt="yyyy-MM-dd"
                          style="width: 400px;" v-model="form.mergeDate" format="yyyy-MM-dd" type="date">
          </el-date-picker>
        </el-form-item>
        <el-input v-model="form.branchId" autocomplete="off" v-if="false"></el-input>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel()" round>取 消</el-button>
        <el-button type="primary" round @click="submitMerge()">保 存</el-button>
      </div>
    </el-dialog>
    <div style="float: right;margin-top: 10px">
      <el-button icon="el-icon-search" round @click.native="addMerge()">新增</el-button>
    </div>
    <div style="margin-top: 20px">
      <el-table :data="mergeInfos" ref="branchTable" stripe border style="width: 100%">
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="branchName" label="分支"></el-table-column>
        <el-table-column prop="message" label="SVN LOG"></el-table-column>
        <el-table-column prop="mergeBranchName" label="merge to"></el-table-column>
        <el-table-column prop="mergeOperator" label="合并人"></el-table-column>
        <el-table-column prop="mergeDate" label="合并时间"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import ElRow from "element-ui/packages/row/src/row";
  export default {
    components: {ElRow},
    props:['bId','pId'],
    data() {
      return {
        dialogFormVisible:false,
        formLabelWidth:"120px",
        mergeInfos:[],
        titleName:'',
        form:{
          branchId : this.$route.params.bId,
          branchName : '',
          mergeBranchId : '',
          message : '',
          mergeOperator : '',
          mergeDate : ''
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
      };
    },
    methods:{
      query() {
        var branchId = this.$route.params.bId;
        var self = this;
        this.axios.get("/svn/merge/query.htm/" + branchId)
          .then(function (response) {
            if (response.data.success) {
              self.mergeInfos = response.data.result;
            }
          }).catch(function (error) {
          self.$message({
            type:"error",
            message:'系统错误，请联系管理员'
          })
        })
      },
      addMerge() {
        this.getBranchsByPlatformId();
        this.dialogFormVisible = true;
        if (this.$refs['form'] !== undefined) {
          this.$refs['form'].resetFields();
        }
        this.titleName = '新增合并信息'
      },
      cancel() {
        this.dialogFormVisible = false;
      },
      submitMerge() {
        this.$refs['form'].validate(valid => {
          if (valid) {
            var self = this;
            var params = new URLSearchParams();
            params.append('branchId',this.form.branchId);
            params.append('message',this.form.message);
            params.append('mergeBranchId',this.form.mergeBranchId);
            params.append('mergeOperator',this.form.mergeOperator);
            params.append('mergeDate',this.form.mergeDate)
            this.axios.post('/svn/merge/save.htm',params)
              .then(function(response) {
                if (response.data.success) {
                  self.query();
                  self.dialogFormVisible = false;
                  self.$message({
                    type:"success",
                    message:'数据添加成功'
                  })
                } else {
                  self.$message({
                    type:"error",
                    message:response.data.message
                  })
                }
              }).catch(function (error) {
              self.$message({
                type:"error",
                message:'系统错误，请联系管理员'
              })
            })
          }
        })
      },
      getBranchsByPlatformId() {
        var platformId = this.$route.params.pId;
        var bId = this.$route.params.bId;
        var self = this;
        this.axios.get("/svn/branch/getBranchsAndName.htm/"+platformId + "/" + bId)
          .then(function(response) {
            if (response.data.success) {
              self.branchs = response.data.result.branchs;
              self.form.branchName = response.data.result.name;
            }
          })
          .catch(function() {
            self.$message({
              message:'系统异常，请联系管理员',
              type:'error'
            })
          })
      }
    },
    created() {
      this.query();
    }
  }
</script>


