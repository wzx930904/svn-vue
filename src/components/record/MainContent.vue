<template>
  <el-container>
    <el-header style="text-align: left; font-size: 12px">
      <el-form :model="queryInfo" label-width="100px" size="mini" style="padding: 10px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="变更人">
              <el-input v-model="queryInfo.author"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="文件名">
              <el-input v-model="queryInfo.file"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <div style="float: right">
            <el-button icon="el-icon-search" round @click.native="query()">查询</el-button>
            <el-button icon="el-icon-circle-plus"  type="info" round @click="addChangeLog()">新增</el-button>
          </div>
        </el-row>
      </el-form>
    </el-header>

    <el-main style="margin-top: 30px">
      <el-table :data="tableData">
        <el-table-column prop="fileName" label="FILE">
        </el-table-column>
        <el-table-column prop="svnLog" label="SVN LOG">
        </el-table-column>
        <el-table-column prop="author" label="变更人">
        </el-table-column>
        <el-table-column prop="desc" label="变更说明">
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
    </el-main>
  </el-container>
</template>

<script>
  export default {
    name: 'MainContent',
    props:['bId'],
    data () {
      return {
        tableData: [],
        queryInfo: {
          file:'',
          author: '',
          pageSize: 10,
          pageNum: 1
        }
      }
    },
    methods: {
      query:function() {

      },
      addChangeLog: function () {
        var bId = this.bId;
        this.$router.push({name:'addChangeLog',params:{bId:bId}});
      },
      queryChangeLog: function () {
        var branchId = this.bId;
        var self = this;
        this.axios.get('http://180.3.13.11:8081/svnrecord/svn/svnrecord/changelog/' + branchId)
          .then(function(response){
            if(response.data.success) {
              self.tableData = response.data.result;
            }
          }).catch(function(error){

        })
      }
    },
    created(){
      this.queryChangeLog();
    }
  }
</script>

<style scoped>
  .el-header {
    /*background-color: #B3C0D1;*/
    color: #333;
    line-height: 60px;
  }
  .el-dropdown-link {
    cursor: pointer;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
</style>
