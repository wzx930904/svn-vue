<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column prop="id" v-if="show" label="id"></el-table-column>
      <el-table-column prop="platformId" v-if="show" label="platformId"></el-table-column>
      <el-table-column prop="createDate" label="日期"></el-table-column>
      <el-table-column prop="name" label="分支名称" ></el-table-column>
      <el-table-column prop="operate" label="操作">
        <template slot-scope="scope">
          <el-link :underline="false" @click="getBranch(scope.$index, scope.row)"><i class="el-icon-view el-icon--right" ></i>变更</el-link>
          <el-link :underline="false" @click="queryMerge(scope.$index, scope.row)"><i class="el-icon-view el-icon--right" ></i>合并</el-link>
          <el-link icon="el-icon-delete" :underline="false" @click="deleteBranch(scope.$index, scope.row)">删除</el-link>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination style="float: left"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.pageNum"
      :page-sizes="[10,20]"
      :page-size="queryInfo.pageSize"
      layout="total,sizes,prev,pager,next,jumper"
      :total="total" background></el-pagination>
  </div>
</template>

<script>
  export default {
    name: 'BranchSettings',
    props:['pfId'],
    data() {
      return {
        show:false,
        tableData: [],
        queryInfo: {
          pageSize: 10,
          pageNum: 1
        },
        total:0
      }
    },
    methods: {
      handleCurrentChange() {

      },
      handleSizeChange() {

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
    },
    created(){
      this.queryBranch(this.pfId);
    }
  }
</script>

<style scoped>

</style>
