<template>
  <div class="app-container">
    <el-table
      stripe
      border
      :data="rows"
      @selection-change="handleSelectionChange"
      style="width: 100%"
      height="750"
    >
      <el-table-column type="selection" width="45"> </el-table-column>
      <el-table-column type="index" width="50" label="编号"></el-table-column>
      <el-table-column prop="name" label="讲师名称" width="120">
      </el-table-column>
      <el-table-column prop="avatar" label="讲师头像" width="120">
        <template slot-scope="scope">
          <img :src="scope.row.avatar" width="95" height="80" />
        </template>
      </el-table-column>
      <el-table-column prop="level" label="讲师头衔" width="120">
      </el-table-column>
      <el-table-column prop="career" label="讲师资历" width="180">
      </el-table-column>
      <el-table-column prop="intro" label="讲师介绍" width="420">
      </el-table-column>
      <el-table-column prop="gmtCreated" label="创建时间" width="150">
      </el-table-column>
      <el-table-column prop="gmtModified" label="修改时间" width="150">
      </el-table-column>
      <el-table-column
        width="240px"
        :render-header="renderHeader"
        fixed="right"
      >
        <!-- <template slot="header">
          <el-button
            type="danger"
            style="margin-left: 20px"
            @click="deleteIds()"
            >批量删除</el-button
          >
        </template> -->
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="
              dialogFormVisible = true;
              handleEdit(scope.row);
            "
            >修改</el-button
          >
          <el-button
            size="mini"
            type="danger"
            style="margin-left: 5px"
            @click="handleDelete(scope.row)"
            >删除
          </el-button>
          <el-button size="mini" type="info" style="margin-left: 5px"
            >查看详情
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @current-change="showTeacher"
        :page-size="limit"
        layout="prev, pager, next, jumper"
        :total="total"
        :current-page.sync="currentPage"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import teacherApi from "@/api/teacher";
export default {
  data() {
    return {
      currentPage: 1,
      limit: 10,
      teacher: {
        name: "",
        level: "",
        gmtCreated: "",
        gmtModified: "",
      },
      rows: [],
      total: 0,
      dialogFormVisible: false,
      formLabelWidth: "120px",
    };
  },
  created() {
    this.showTeacher();
  },
  methods: {
    showTeacher() {
      teacherApi
        .findTeacherByPage(this.currentPage, this.limit, this.teacher)
        .then((res) => {
          this.rows = res.data.rows;
          this.total = res.data.total;
        })
        .catch((err) => {
          this.$message({
            message: "连接超时",
            type: "warning",
          });
        });
    },
    //批量删除
    handleSelectionChange(val) {},
    deleteIds() {
      // let ids = [];
      // for (let category in this.categories) {
      //   ids.push(this.categories[category].id);
      // }
      // this.$http
      //   .post("http://localhost:8081/category/deleteIds", ids)
      //   .then((res) => {
      //     if (res.data.code == 200) {
      //       this.$message({
      //         type: "success",
      //         message: "删除成功!",
      //       });
      //       this.handleCurrentChange(1);
      //       this.currentPage = 1;
      //     } else if (res.data.code == 500) {
      //       this.$message({
      //         message: "删除失败",
      //         type: "warning",
      //       });
      //     }
      //   })
      //   .catch((err) => {
      //     this.$message({
      //       message: "连接超时",
      //       type: "warning",
      //     });
      //   });
    },
    handleDelete(row) {
      let deleteId = row.id;
      this.$confirm("确认删除该讲师？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          teacherApi
            .deleteTeacherById(deleteId)
            .then((res) => {
              console.log(res);
              if (res.code == 200) {
                
                this.$message({
                  type: "success",
                  message: "删除成功!",
                });
                this.currentPage = 1;
                this.showTeacher();
              } else if (res.code == 500) {
                this.$message({
                  message: "删除失败",
                  type: "warning",
                });
              }
            })
            .catch((err) => {
              this.$message({
                message: "连接超时",
                type: "warning",
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    renderHeader() {
      return (
        <div>
          <el-button
            type="danger"
            style="margin-left: 20px"
            onClick={() => this.deleteIds()}
          >
            批量删除
          </el-button>
        </div>
      );
    },
  },
};
</script>
<style>
.block {
  width: 40%;
  height: 32px;
  margin-left: 40%;
  margin-top: 1%;
}
</style>