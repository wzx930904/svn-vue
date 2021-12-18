<template>
  <div>
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
        <div style="float: right;margin-top: 10px">
          <el-button icon="el-icon-search" round @click.native="query()">查询</el-button>
        </div>
      </el-row>
    </el-form>
    <div style="margin-top: 20px">
      <el-table :data="changeInfos" ref="branchTable" stripe border style="width: 100%">
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="fileName" label="文件"></el-table-column>
        <el-table-column prop="message" label="SVN LOG"></el-table-column>
        <el-table-column prop="operation" label="操作"></el-table-column>
        <el-table-column prop="desc" label="变更说明"></el-table-column>
        <el-table-column prop="updateOperator" label="变更人"></el-table-column>
        <el-table-column prop="changeTime" label="变更时间"></el-table-column>
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
        changeInfos:[{
          fileName:'DayBreachService.java',
          message:'测试功能',
          operation:'add',
          updateOperator:'test',
          changeTime:'2020-10-01'
        },
          {
            fileName:'DayBreachService.java',
            message:'修改代码',
            operation:'update',
            updateOperator:'test',
            changeTime:'2020-10-01'
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
      dateBefore() {

      },
      dateAfter() {

      }
    }
  }
</script>


