<template>
  <div>
    <el-dialog :title="titleName" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="文件" prop="fileName" :label-width="formLabelWidth">
          <el-input maxlength="100" v-model="form.fileName" style="width: 400px;" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="SVN LOG " :label-width="formLabelWidth" prop="svnLog">
          <el-input maxlength="100" autocomplete="off" style="width: 400px;" v-model="form.svnLog"></el-input>
        </el-form-item>
        <el-form-item label="变更人" :label-width="formLabelWidth" prop="author">
          <el-input maxlength="100" v-model="form.author" style="width: 400px;" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="变更说明" :label-width="formLabelWidth" prop="desc">
          <el-input maxlength="100" v-model="form.desc" style="width: 400px;" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="变更时间:" prop="date" :label-width="formLabelWidth">
          <el-date-picker placeholder="yyyy-mm-dd" value-formt="yyyy-MM-dd"
                          style="width: 400px;" v-model="form.date" format="yyyy-MM-dd" type="date" :validate-event="false">
          </el-date-picker>
        </el-form-item>
        <el-form-item v-if="false">
          <el-input v-model="form.branchId" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel()" round>取 消</el-button>
        <el-button type="primary" icon="el-icon-circle-plus" round @click="submitChange()">保 存</el-button>
      </div>
    </el-dialog>
    <el-form :model="queryInfo" label-width="100px" size="mini" style="padding: 10px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="变更人">
            <el-input v-model="queryInfo.author"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="文件名">
            <el-input v-model="queryInfo.fileName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <div style="float: right;margin-top: 10px">
          <el-button icon="el-icon-search" round @click.native="query(1)">查询</el-button>
          <el-button icon="el-icon-circle-plus" type="primary" round @click.native="addChange()">新增</el-button>
        </div>
      </el-row>
    </el-form>
    <div style="margin-top: 20px">
      <el-table :data="changeInfos" ref="branchTable" stripe border style="width: 100%">
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="id" v-if="false" label="id"></el-table-column>
        <el-table-column prop="fileName" label="文件"></el-table-column>
        <el-table-column prop="svnLog" label="SVN LOG"></el-table-column>
        <el-table-column prop="desc" label="变更说明"></el-table-column>
        <el-table-column prop="author" label="变更人"></el-table-column>
        <el-table-column prop="date" label="变更时间"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!--<el-link icon="el-icon-edit" :underline="false" @click="updateMerge(scope.$index, scope.row)">修改</el-link>-->
            <el-link icon="el-icon-delete" :underline="false" @click="deleteChange(scope.$index, scope.row)">删除</el-link>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pageNum"
        :page-sizes="[10,20]"
        :page-size="queryInfo.pageSize"
        layout="total,sizes,prev,pager,next,jumper"
        :total="total" background></el-pagination>
    </div>
  </div>
</template>

<script>
  import ElRow from "element-ui/packages/row/src/row";
  export default {
    components: {
      ElRow},
    data() {
      return {
        dialogFormVisible:false,
        titleName:'',
        formLabelWidth:'120px',
        form:{
          fileName:'',
          branchId:this.$route.params.bId,
          svnLog:'',
          author:'',
          desc:'',
          date:''
        },
        queryInfo:{
          author:'',
          fileName:'',
          pageNum:1,
          pageSize:10
        },
        changeInfos:[],
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
          }],
          date:[{
            required:true,
            message:'请输入变更时间',
            trigger:'blur'
          }]
        },
        total:0
      };
    },
    methods:{
      handleSizeChange(newSize){
        this.queryInfo.pageSize = newSize;
        this.query(1);
      },
      handleCurrentChange(newPage) {
        this.queryInfo.pageNum = newPage;
        this.query(newPage);
      },
      cancel() {
        this.dialogFormVisible = false;
      },
      addChange() {
        if (this.$refs['form'] !== undefined) {
          this.$refs['form'].resetFields();
        }
        this.titleName = '新增变更信息'
        this.dialogFormVisible = true;
      },
      submitChange() {
        this.$refs['form'].validate(valid => {
          if (valid) {
            var self = this;
            var params = new URLSearchParams();
            params.append('branchId',this.form.branchId);
            params.append('author',this.form.author);
            params.append('desc',this.form.desc);
            params.append('svnLog',this.form.svnLog);
            params.append('fileName',this.form.fileName);
            params.append('date',this.form.date)
            this.axios.post('/svn/svnrecord/save.htm',params)
              .then(function(response) {
                if (response.data.success) {
                    self.dialogFormVisible = false;
                    self.query(1);
                }else {
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
      query(pageNum) {
        var branchId = this.$route.params.bId;
        var fileName = this.queryInfo.fileName;
        var author = this.queryInfo.author;
        var url = "/svn/svnrecord/changelog/"  + branchId;
        if (fileName.length > 0 && fileName != undefined) {
            url = url + "/fileName/" + fileName;
        }
        if (author.length > 0 && author != undefined) {
            url = url + "/author/" + author;
        }
        url = url + "/" + this.queryInfo.pageSize + "/" + pageNum
        var self = this;
        this.axios.get(url)
          .then(function(response){
            if(response.data.success) {
              self.changeInfos = response.data.result.content;
              self.total = response.data.result.totalElements;
            }
          }).catch(function(error){

        })
      },
      deleteChange(index,row) {
        var self = this;
        this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var id = row.id;
          this.axios.delete('/svn/svnrecord/delete.htm/' + id)
            .then(function(response) {
              if (response.data.success) {
                self.$message({
                  type: 'success',
                  message: '删除成功!'
                })
                self.query(1);
              }else {
                self.$message({
                  type:"error",
                  message:response.data.message
                })
              }
            }).catch(function(error){
            self.$message({
              message:'系统异常，请联系管理员',
              type:'error'
            })
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      }
    },
    created() {
        this.query(1);
    }
  }
</script>


