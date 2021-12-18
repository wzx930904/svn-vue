<template>
  <div class="portlet">
    <div class="portlet-title">
      <div class="caption">新增变更记录</div>
    </div>
    <div class="portlet-body form">
      <el-form :model="changeLogform" :rules="rules" ref="changeLogform" label-width="100px" size="mini" style="padding: 10px">
        <div class="form-body">
          <el-row>
            <el-col :span="12">
              <el-form-item label="文件" prop="fileName">
                <el-input v-model="changeLogform.fileName" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="SVN LOG" prop="svnLog">
                <el-input autocomplete="off" v-model="changeLogform.svnLog"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="变更人" prop="author">
                <el-input  v-model="changeLogform.author" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="变更说明" prop="desc">
                <el-input v-model="changeLogform.desc" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-form-item v-if="false">
              <el-input v-model="changeLogform.branchId" autocomplete="off"></el-input>
            </el-form-item>
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
    props:['bId'],
    data() {
      return {
        changeLogform:{
          fileName:'',
          branchId:this.bId,
          svnLog:'',
          author:'',
          desc:''
        },
        rules:{
          fileName:[{
              required:true,
              message:'请输入文件名',
            trigger:'blur'
          }],
          svnLog:[{
            required:true,
            message:'请输入SVN LOG',
            trigger:'blur'
          }],
          author:[{
            required:true,
            message:'请输入变更人',
            trigger:'blur'
          }],
          desc:[{
            required:true,
            message:'请输入变更说明',
            trigger:'blur'
          }]
        }
      }
    },
    methods:{
      save() {
          this.$refs['changeLogform'].validate(valid => {
              if (valid) {
                var self = this;
                var bId = this.bId;
                var params = new URLSearchParams();
                params.append('branchId',this.changeLogform.branchId);
                params.append('author',this.changeLogform.author);
                params.append('desc',this.changeLogform.desc);
                params.append('svnLog',this.changeLogform.svnLog);
                params.append('fileName',this.changeLogform.fileName)
                this.axios.post('http://180.3.13.11:8081/svnrecord/svn/svnrecord/save.htm',params)
                  .then(function(response) {
                    if (response.data.success) {
                      self.$router.push({name: 'ProjectIndex',params:{branchId:bId}})
                    }else {
                      self.$message({
                        type:"error",
                        message:response.data.message
                      })
                    }
                  }).catch(function (error) {

                })
              }
          })

      },
      back() {
        this.$router.go(-1);
      }
    }
  }
</script>
