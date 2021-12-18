<template>
  <div>
    <el-form :model="queryInfo" label-width="100px" size="mini" style="padding: 10px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="系统" prop="system">
            <el-select  v-model="queryInfo.systemCode" placeholder="--请选择--">
              <el-option v-for="item in systems" :key="item.id"
                         :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <div style="float: right;margin-top: 10px">
          <el-button icon="el-icon-search" round @click.native="query()">查询</el-button>
          <el-button icon="el-icon-circle-plus" type="primary" round @click.native="addBranch()">新增</el-button>
        </div>
      </el-row>
    </el-form>
    <div style="margin-top: 20px">
      <el-table :data="branchLists" ref="branchTable" stripe border style="width: 100%">
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="systemName" label="系统名称"></el-table-column>
        <el-table-column prop="branchName" label="分支名"></el-table-column>
        <el-table-column prop="creator" label="创建人"></el-table-column>
        <el-table-column prop="createTime" label="创建时间"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-link :underline="false" @click="queryChange(scope.$index, scope.row)"><i class="el-icon-view el-icon--right" ></i>变更</el-link>
            <el-link :underline="false" @click="queryMerge(scope.$index, scope.row)"><i class="el-icon-view el-icon--right" ></i>合并</el-link>
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
        queryInfo:{
          systemCode:'',
          pageNum:1,
          pageSize:10
        },
        systems:[],
        branchLists:[{
          systemName:'业服',
          branchName:'202010',
          creator:'test',
          createTime:'2020-10-01'
        },
         {
           systemName:'业服',
           branchName:'202005',
           creator:'test',
           createTime:'2020-05-01'
        }],
        total:0
      };
    },
    methods:{
      handleSizeChange(newSize){
        this.queryInfo.pageSize = newSize;
      },
      handleCurrentChange(newPage) {
        this.queryInfo.pageNum = newPage;
      },
      deleteBranch: function (index, row) {
        var self = this;
        this.$confirm('此操作将永久删除该分支, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var id = row.id;
          this.axios.delete('http://180.3.13.11:8081/svnrecord/svn/branch/delete.htm/' + id)
            .then(function(response) {
              if (response.data.success) {
                self.$message({
                  type: 'success',
                  message: '删除成功!'
                })
                self.queryBranch(self.pfId);
              }else {
                self.$message({
                  type:"error",
                  message:response.data.message
                })
              }

            }).catch(function(error){

          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      addBranch() {
        this.$router.push({name:'addBranch'});
      },
      getBranch: function (index,row) {
        var branchId = row.id;
        this.$router.push({name: 'ProjectIndex',params:{branchId:branchId}})
      },
      queryMerge: function (index, row) {
        var branchId = row.id;
        var platformId = this.pfId
        this.$router.push({name: 'mergeInfo',params:{branchId:branchId,platformId:platformId}})
      },
      queryBranch(platformId) {
        var self = this;
        this.axios.get("http://180.3.13.11:8081/svnrecord/svn/branch/querybranch.htm/" + platformId)
          .then(function(response) {
            if (response.data.success) {
              self.tableData = response.data.result;
            }
          }).catch(function() {

        })
      }
    }
  }
</script>


