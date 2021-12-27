<template>
  <div>
    <el-dialog :title="titleName" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="系统编码" prop="systemCode" :label-width="formLabelWidth">
          <el-input maxlength="100" v-model="form.systemCode" autocomplete="off" style="width: 400px;"></el-input>
        </el-form-item>
        <el-form-item label="系统名称" :label-width="formLabelWidth" prop="systemName">
          <el-input maxlength="100" v-model="form.systemName" autocomplete="off" style="width: 400px;"></el-input>
        </el-form-item>
        <el-input v-model="form.id" autocomplete="off" v-if="false"></el-input>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel()" round>取 消</el-button>
        <el-button type="primary" round @click="submitSystem()">保 存</el-button>
      </div>
    </el-dialog>
    <el-form :model="queryInfo" label-width="100px" size="mini" style="padding: 10px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="系统编码" prop="systemCode">
            <el-input v-model="queryInfo.systemCode" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <div style="float: right;margin-top: 10px">
          <el-button icon="el-icon-search" round @click.native="query(1)">查询</el-button>
          <el-button icon="el-icon-circle-plus" type="primary" round @click.native="addSystemManage()">新增</el-button>
        </div>
      </el-row>
    </el-form>
    <div style="margin-top: 20px">
      <el-table :data="systemLists" ref="systemTable" stripe border style="width: 100%"
                :header-cell-style="{background:'#eef1f6',color:'#909399'}"
                highlight-current-row>
        <el-table-column width="38">
          <template slot-scope="scope">
            <el-radio :label="scope.$index">&nbsp</el-radio>
          </template>
        </el-table-column>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="id" label="id" v-if="false"></el-table-column>
        <el-table-column prop="systemName" label="系统名称"></el-table-column>
        <el-table-column prop="systemCode" label="系统编码"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-link icon="el-icon-edit" :underline="false" @click="updateSystem(scope.$index, scope.row)">修改</el-link>
            <el-link icon="el-icon-delete" :underline="false" @click="deleteSystem(scope.$index, scope.row)">删除</el-link>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.currentPage"
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
        titleName:'新增系统',
        dialogFormVisible:false,
        form : {
          id:'',
          systemName:'',
          systemCode:''
        },
        rules:{
          systemName:[{
            required:true,
            message:"请输入系统名称",
            trigger:'blur'
          }
          ],
          systemCode:[{
            required:true,
            message:'请输入系统编码',
            trigger:'blur'
          }]
        },
        queryInfo:{
          systemCode:'',
          currentPage:1,
          pageSize:10
        },
        systemLists:[],
        formLabelWidth:"120px",
        total:0
      };
    },
    methods:{
      handleSizeChange(newSize){
        this.queryInfo.pageSize = newSize;
        this.query(1);
      },
      handleCurrentChange(newPage) {
        this.queryInfo.currentPage = newPage;
        this.query(newPage);
      },
      addSystemManage() {
        this.titleName = '新增系统';
        if (this.$refs['form'] !== undefined) {
          this.$refs['form'].resetFields();
          this.form.systemName = '';
          this.form.systemCode = '';
          this.form.id = '';
        }
        this.dialogFormVisible = true;
      },
      cancel() {
        this.dialogFormVisible = false;
      },
      submitSystem() {
        var self = this;
        var params = new URLSearchParams();
        var id = this.form.id;
        var url = "/svn/platform/save.htm";
        if (!(id == '' || id == undefined)) {
          params.append('id',id);
          url = "/svn/platform/update.htm";
        }
        params.append('systemCode',this.form.systemCode);
        params.append('systemName',this.form.systemName);
        this.$refs['form'].validate(valid => {
          if (valid) {
            this.axios.post(url,params)
              .then(function (response) {
                if (response.data.success) {
                  self.dialogFormVisible = false;
                  self.$message({
                    message:'保存成功',
                    type:'success'
                  });
                  self.query(1);
                } else {
                  self.$message({
                    message:response.data.message,
                    type:'error'
                  })
                }
              }).catch(function (error) {
              self.$message({
                message:'系统异常，请联系管理员',
                type:'error'
              })
            })
          }
        })
      },
      updateSystem(index,row) {
        this.titleName = '修改系统';
        if (this.$refs['form'] !== undefined) {
          this.$refs['form'].resetFields();
        }
        this.form.systemName = row.systemName;
        this.form.systemCode = row.systemCode;
        this.form.id = row.id;

        this.dialogFormVisible = true;
      },
      deleteSystem(index,row) {
        var self = this;
        this.$confirm('此操作将永久删除该系统, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var id = row.id;
          this.axios.delete('/svn/platform/delete.htm/' + id)
            .then(function(response) {
              if (response.data.success) {
                self.$message({
                  type: 'success',
                  message: '删除成功!'
                })
                self.query(1);
              } else {
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
      },
      query(pageNum) {
        var self = this;
        var sysCode = this.queryInfo.systemCode;
        var pageNum = pageNum;
        var pageSize = this.queryInfo.pageSize;
        var url = '/svn/platform/query.htm' +  "/" + pageSize + "/" + pageNum;
        if (sysCode != '') {
          url = url + "/" + sysCode;
        }
        this.axios.get(url)
          .then(function(response) {
            if (response.data.success) {
              self.systemLists = response.data.result.content;
              self.total = response.data.result.totalElements;
            }
          }).catch(function(error){
          self.$message({
            message:'系统异常，请联系管理员',
            type:'error'
          })
        })
      }
    },
    created() {
      this.query(1);
    }
  }
</script>
<style>
  .el-table__body tr.current-row> td {
    background-color: #fdf3ea;
  }
</style>

