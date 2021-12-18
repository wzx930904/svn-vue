<template>
  <div>
    <div style="float: right;margin-top: 10px">
      <el-button icon="el-icon-search" round @click.native="addMerge()">新增</el-button>
    </div>
    <div style="margin-top: 20px">
      <el-table :data="tableData" ref="branchTable" stripe border style="width: 100%">
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="branchId" v-if="false" label="branchId"></el-table-column>
        <el-table-column prop="branchName" label="分支"></el-table-column>
        <el-table-column prop="mergeBranchName" label="merge to"></el-table-column>
        <el-table-column prop="message" label="合并信息"></el-table-column>
        <el-table-column prop="mergeOperator" label="合并人"></el-table-column>
        <el-table-column prop="mergeDate" label="合并时间"></el-table-column>
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
    props:['branchId','platformId'],
    data() {
      return {
        queryInfo:{
          systemCode:'',
          pageNum:1,
          pageSize:10
        },
        tableData:[],
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
      addMerge() {
        var bId = this.branchId;
        var platformId = this.platformId
        this.$router.push({name:'addMergeInfo',params:{bId:bId,platformId:platformId}});
      },
      query() {
          var branchId = this.branchId;
          var self = this;
          this.axios.get("http://180.3.13.11:8081/svnrecord/svn/merge/query.htm/" + branchId)
            .then(function (response) {
              if (response.data.success) {
                  self.tableData = response.data.result;
              }
            }).catch(function (error) {

          })
      }
    },
    created() {
        this.query();
    }
  }
</script>
