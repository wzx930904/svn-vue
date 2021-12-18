<template>
  <div>
    <el-form :model="queryInfo" label-width="100px" size="mini" style="padding: 10px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="系统编码" prop="systemCode">
            <el-input></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <div style="float: right;margin-top: 10px">
          <el-button icon="el-icon-search" round>查询</el-button>
          <el-button icon="el-icon-circle-plus" type="primary" round @click.native="addSystemManage()">新增</el-button>
        </div>
      </el-row>
    </el-form>
    <div style="margin-top: 20px">
      <el-table :data="systemLists" ref="systemTable" stripe border style="width: 100%"
                :header-cell-style="{background:'#eef1f6',color:'#909399'}"
                highlight-current-row @row-click="singleElection">
        <el-table-column width="38">
          <template slot-scope="scope">
            <el-radio :label="scope.$index">&nbsp</el-radio>
          </template>
        </el-table-column>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="systemName" label="系统名称"></el-table-column>
        <el-table-column prop="systemCode" label="系统编码"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
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
        :total="queryInfo.total" background></el-pagination>
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
        queryInfo:{
          systemCode:'',
          currentPage:1,
          pageSize:10,
          total:0
        },
        systemLists:[{systemName:'业服',systemCode:'bsp'},
          {systemName:'会服',systemCode:'msp'}],

      };
    },
    methods:{
      singleElection(row) {
        this.selection = row;

      },
      handleSizeChange(newSize){
        this.queryInfo.pageSize = newSize;
      },
      handleCurrentChange(newPage) {
        this.queryInfo.pageNum = newPage;
      },
      addSystemManage() {
        this.$router.push({name:'addsystemManage'});
      },
      updateSysManage() {
        var data = this.selection;
        if (data == undefined) {
          this.$message({
            message:"请选择一条记录，进行修改",
            type:'warning'
          });
          return;
        }
      },
      deleteSystem(index,row) {
        var self = this;
        this.$confirm('此操作将永久删除该系统, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var id = row.id;
          this.axios.delete('http://localhost:8081/svnrecord/svn/platform/delete.htm/' + id)
            .then(function(response) {
              if (response.data.success) {
                self.$message({
                  type: 'success',
                  message: '删除成功!'
                })
                self.querySystem();
              } else {
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
      }
    }
  }
</script>
<style>
  .el-table__body tr.current-row> td {
    background-color: #fdf3ea;
  }
</style>

