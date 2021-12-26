<template>
  <div>
    <el-dialog :title="titleName" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="系统名称" :label-width="formLabelWidth" prop="platformId">
          <el-select  v-model="form.platformId" placeholder="--请选择--" autocomplete="off" style="width: 400px;">
            <el-option v-for="item in systems" :key="item.id" :label-width="formLabelWidth"
                       :label="item.systemName" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分支名称" prop="branchName" :label-width="formLabelWidth">
          <el-input maxlength="100" v-model="form.branchName" autocomplete="off" style="width: 400px"></el-input>
        </el-form-item>
        <el-form-item label="创建日期:" prop="createDate" :label-width="formLabelWidth">
          <el-date-picker placeholder="yyyy-mm-dd" value-formt="yyyy-MM-dd"
                          style="width: 400px;" v-model="form.createDate" format="yyyy-MM-dd" type="date">
          </el-date-picker>
        </el-form-item>
        <el-form-item prop="id">
          <el-input v-model="form.id" v-if="false"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="submitSystem()">保 存</el-button>
      </div>
    </el-dialog>
    <el-form :model="queryInfo" :rules="queryRules" ref="queryInfo" label-width="100px" size="mini" style="padding: 10px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="系统" prop="queryPId">
            <el-select  v-model="queryInfo.queryPId" placeholder="--请选择--">
              <el-option v-for="item in systems" :key="item.id"
                         :label="item.systemName" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <div style="float: right;margin-top: 10px">
          <el-button icon="el-icon-search" round @click.native="queryBranch(1)">查询</el-button>
          <el-button icon="el-icon-circle-plus" type="primary" round @click.native="addBranch()">新增</el-button>
        </div>
      </el-row>
    </el-form>
    <div style="margin-top: 20px">
      <el-table :data="branchLists" ref="branchTable" stripe border style="width: 100%">
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="id" label="id" v-if="false"></el-table-column>
        <el-table-column prop="platformId" label="platformId" v-if="false"></el-table-column>
        <el-table-column prop="systemName" label="系统名称"></el-table-column>
        <el-table-column prop="branchName" label="分支名"></el-table-column>
        <el-table-column prop="createDate" label="创建时间"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-link :underline="false" @click="queryChange(scope.$index, scope.row)"><i class="el-icon-view el-icon--right" ></i>变更</el-link>
            <el-link :underline="false" @click="queryMerge(scope.$index, scope.row)"><i class="el-icon-view el-icon--right" ></i>合并</el-link>
            <el-link icon="el-icon-edit" :underline="false" @click="updateBranch(scope.$index, scope.row)">修改</el-link>
            <el-link icon="el-icon-delete" :underline="false" @click="deleteBranch(scope.$index, scope.row)">删除</el-link>
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
    components: {ElRow},
    data() {
      return {
        dialogFormVisible: false,
        formLabelWidth : "120px",
        form : {
          id:'',
          platformId:'',
          branchName:'',
          createDate:''
        },
        queryInfo:{
          queryPId:'',
          pageNum:1,
          pageSize:10
        },
        queryRules:{
          queryPId : [{
            required:true,
            message:'请选择系统',
            trigger:'blur'
          }]
        },
        rules:{
          platformId:[{
            required:true,
            message:"请选择系统",
            trigger:'blur'
          }],
          branchName:[{
            required:true,
            message:'请输入分支名称',
            trigger:'blur'
          }],
          createDate:[{
            required:true,
            message:'请输入创建日期',
            trigger:'blur'
          }]
        },
        systems:[],
        branchLists:[],
        total:0,
        titleName:''
      };
    },
    methods:{
      handleSizeChange(newSize){
        this.queryInfo.pageSize = newSize;
        this.queryBranch(1)
      },
      handleCurrentChange(newPage) {
        this.queryInfo.pageNum = newPage;
        this.queryBranch(newPage)
      },
      deleteBranch: function (index, row) {
        var self = this;
        this.$confirm('此操作将永久删除该分支, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var id = row.id;
          this.axios.delete(this.global.BASEURL + '/svn/branch/delete.htm/' + id)
            .then(function(response) {
              if (response.data.success) {
                self.$message({
                  type: 'success',
                  message: '删除成功!'
                })
                self.queryBranch(1);
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
      },
      addBranch() {
        this.querySystem();
        this.titleName = '新增分支';
        if (this.$refs['form'] !== undefined) {
          this.$refs['form'].resetFields();
          this.form.id = '';
          this.form.platformId = '';
          this.form.branchName = '';
          this.form.createDate = '';
        }
        this.dialogFormVisible = true;
      },
      queryMerge: function (index, row) {
        var branchId = row.id;
        var platformId = row.platformId;
        this.$router.push({name:'mergeInfo',params:{bId:branchId,pId:platformId}})
      },
      queryChange(indxe,row) {
        var branchId = row.id;
        this.$router.push({name:'changeInfo',params:{bId:branchId}});
      },
      queryBranch(pageNum) {
        this.$refs['queryInfo'].validate(valid => {
          if (valid) {
            var self = this;
            var platformId = this.queryInfo.queryPId;
            var url = this.global.BASEURL + "/svn/branch/querybranch.htm"
            if (platformId != '') {
              url = url + "/" + platformId;
            }
            url = url + "/" + pageNum + "/" + this.queryInfo.pageSize;
            this.axios.get(url)
              .then(function(response) {
                if (response.data.success) {
                  self.branchLists = response.data.result.content;
                  self.total = response.data.result.totalElements;
                }
              }).catch(function() {
              self.$message({
                message:'系统异常，请联系管理员',
                type:'error'
              })
            })
          }
        })
      },
      querySystem() {
        var self = this;
        this.axios.get(this.global.BASEURL + "/svn/platform/findall.htm")
          .then(function (response) {
            if (response.data.success) {
              self.systems = response.data.result;
            }
          }).catch(function (error) {
          self.$message({
            message:'系统异常，请联系管理员',
            type:'error'
          })
        })
      },
      cancel() {
        this.dialogFormVisible = false;
      },
      submitSystem() {
        this.$refs['form'].validate(valid => {
          if (valid) {
            var self = this;
            var params = new URLSearchParams();
            var id = this.form.id;
            var url =this.global.BASEURL + "/svn/branch/save.htm";
            if (!(id == '' || id == undefined)) {
              params.append('id',id);
              url = this.global.BASEURL  + "/svn/branch/update.htm";
            }
            params.append('platformId',this.form.platformId);
            params.append('branchName',this.form.branchName);
            params.append('createDate',this.form.createDate);
            this.$refs['form'].validate(valid => {
              if (valid) {
                this.axios.post(url,params)
                  .then(function (response) {
                    if (response.data.success) {
                      self.dialogFormVisible = false;
                      self.$message({
                        message:'保存成功',
                        type:'success'
                      })
                      self.queryBranch(1);
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
          }
        })
      },
      updateBranch(index,row) {
        if (this.$refs['form'] !== undefined) {
          this.$refs['form'].resetFields();
        }
        this.querySystem();
        this.form.id = row.id;
        this.form.platformId = row.platformId;
        this.form.branchName = row.branchName;
        this.form.createDate = row.createDate;
        this.titleName = '修改分支'
        this.dialogFormVisible = true;
      }
    },
    created() {
      this.querySystem();
    }
  }
</script>


