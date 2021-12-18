<template>
  <div>
    <el-menu>
      <el-row>
        <el-button size="small" type="info" style="float: right;" @click="createNew" >新增</el-button>
        <el-dialog title="编辑系统" :visible.sync="dialogFormVisible">
          <el-form :model="form">
            <el-form-item label="系统名称" :label-width="formLabelWidth">
              <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="系统描述" :label-width="formLabelWidth">
              <el-input v-model="form.desc" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="cancel()">取 消</el-button>
            <el-button type="primary" @click="submitSystem()">确 定</el-button>
          </div>
        </el-dialog>
      </el-row>
    </el-menu>
    <el-table :data="tableData" style="width: 100%;cursor: pointer">
      <el-table-column prop="id" v-if="show" label="id"></el-table-column>
      <el-table-column prop="systemName" label="系统名称" align="center">
      </el-table-column>
      <el-table-column prop="desc" label="描述" align="center">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">

          <!--<el-link icon="el-icon-edit" :underline="false" @click="editSystem(scope.$index, scope.row)">编辑</el-link>-->
          <!--<el-link icon="el-icon-circle-plus-outline" :underline="false" @click="addBranch(scope.$index, scope.row)">添加分支</el-link>-->
          <el-link icon="el-icon-delete" :underline="false" @click="deleteSystem(scope.$index, scope.row)">删除</el-link>
          <el-link icon="el-icon-setting" :underline="false" @click="settingsSystem(scope.$index, scope.row)">分支设置</el-link>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: 'System',
    data() {
      return {
        show:false,
        tableData: [],
        dialogFormVisible: false,
        form: {
          name: '',
          desc: ''
        },
        formLabelWidth: '120px'
      }
    },
    methods: {
      querySystem() {
        var self = this;
        console.log(this.axios.getInstance)
        this.axios.get('http://180.3.13.11:8081/svnrecord/svn/platform/query.htm')
          .then(function(response) {
            if (response.data.success) {
              self.tableData = response.data.result;
            } else {

            }
          }).catch(function(error){

        })
      },
      submitSystem: function () {

        var self = this
        var params = new URLSearchParams();
        params.append('systemName',this.form.name);
        params.append('desc',this.form.desc);
        this.axios.post('http://180.3.13.11:8081/svnrecord/svn/platform/save.htm',params)
          .then(function(response) {
              if (response.data.success) {
                self.dialogFormVisible = false;
                self.$message({
                  type: 'success',
                  message: '数据添加成功!'
                })
                self.querySystem();
              }else {
                self.$message({
                  type:"error",
                  message:response.data.message
                })
              }

          }).catch(function(error){
          console.log(error);
        })
      },
      editSystem: function (index, row) {
        this.form.name = row.systemName
        this.dialogFormVisible = true
      },
      cancel: function () {
        this.form.name = ''
        this.form.desc = ''
        this.dialogFormVisible = false
      },
      createNew: function () {
        this.form.name = ''
        this.form.desc = ''
        this.dialogFormVisible = true
      },
      deleteSystem: function (index, row) {
          var self = this;
        this.$confirm('此操作将永久删除该系统, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var id = row.id;
          this.axios.delete('http://180.3.13.11:8081/svnrecord/svn/platform/delete.htm/' + id)
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
      },
      addBranch: function (index, row) {

      },
      settingsSystem: function (index, row) {
        this.$router.push({name: 'SystemSettings',
          params: {
            systemName: row.systemName,
            parentPlatformId:row.id
        }})
      }
    },
    created(){
      this.querySystem();
    }

  }
</script>

<style scoped>

</style>
