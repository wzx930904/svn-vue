<template>
  <div>
    <el-form :model="queryInfo" label-width="100px" size="mini" style="padding: 10px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="开始时间" prop="startTime">
            <el-date-picker placeholder="yyyy-mm-dd" value-formt="yyyy-MM-dd"
                            :picker-options="dateBefore"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="结束时间" prop="endTime">
            <el-date-picker placeholder="yyyy-mm-dd" value-formt="yyyy-MM-dd"
                            :picker-options="dateAfter"></el-date-picker>
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
        <el-table-column prop="branch" label="分支"></el-table-column>
        <el-table-column prop="message" label="SVN LOG"></el-table-column>
        <el-table-column prop="merge" label="merge to"></el-table-column>
        <el-table-column prop="mergeOperator" label="合并人"></el-table-column>
        <el-table-column prop="mergeTime" label="合并时间"></el-table-column>
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
          branch:'202005',
          message:'测试功能',
          merge:'trunk',
          mergeOperator:'test',
          mergeTime:'2020-10-01'
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


