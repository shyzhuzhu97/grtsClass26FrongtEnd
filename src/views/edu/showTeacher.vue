<template>
  <div class="app-container">
    <el-form :inline="true" :model="teacher" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="teacher.name" placeholder="讲师名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-select v-model="teacher.level" placeholder="讲师头衔">
          <el-option label="首席讲师" value="1"></el-option>
          <el-option label="高级讲师" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-col :span="6">
          <el-date-picker
            type="date"
            placeholder="选择开始日期"
            v-model="teacher.gmtCreated"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-col :span="6">
          <el-date-picker
            type="date"
            placeholder="选择截止日期"
            v-model="teacher.gmtUpdated"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-col>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="findTeacher()">查询</el-button>
        <el-button @click="clear()">清空</el-button>
      </el-form-item>
    </el-form>
    <el-table
      stripe
      border
      :data="rows"
      @selection-change="handleSelectionChange"
      style="width: 100%"
      height="480"
    >
      <el-table-column type="selection" width="45"></el-table-column>
      <el-table-column type="index" width="50" label="编号"></el-table-column>
      <el-table-column prop="name" label="讲师名称" width="120">
      </el-table-column>
      <el-table-column prop="avatar" label="讲师头像" width="120">
        <template slot-scope="scope">
          <img :src="scope.row.avatar" width="95" height="80" />
        </template>
      </el-table-column>
      <el-table-column prop="level" label="讲师头衔" width="120">
        <template slot-scope="scope">
          <span v-if="scope.row.level == 1">首席讲师</span>
          <span v-if="scope.row.level == 2">高级讲师</span>
        </template>
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
          <router-link :to="'/updateTeacher/' + scope.row.id">
            <el-button size="mini">修改</el-button>
          </router-link>

          <el-button
            size="mini"
            type="danger"
            style="margin-left: 5px"
            @click="handleDelete(scope.row)"
            >删除
          </el-button>
          <el-button
            size="mini"
            type="info"
            style="margin-left: 5px"
            @click="dialogTableVisible = true; teacherInfo(scope.row)"
            >查看详情
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="讲师详情" :visible.sync="dialogTableVisible">
      <el-descriptions
        class="margin-top"
        :column="1"
        :size="'mediun'"
        border
      >
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user"></i>
            讲师名称
          </template>
          <span v-text="info.name"></span>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user"></i>
            讲师头像
          </template>
          <img :src="info.avatar" width="95" height="80" />
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-mobile-phone"></i>
            讲师头衔
          </template>
          <span v-if="info.level == 1">首席讲师</span>
          <span v-if="info.level == 2">高级讲师</span>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-location-outline"></i>
            讲师资历
          </template>
          <span v-text="info.career"></span>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-tickets"></i>
            讲师简介
          </template>
          <span v-text="info.intro"></span>
        </el-descriptions-item>
       
      </el-descriptions>
    </el-dialog>
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
      dialogTableVisible: false,
      currentPage: 1,
      limit: 8,
      teacher: {
        id: null,
        name: "",
        level: "",
        gmtCreated: "",
        gmtModified: "",
        avatar: "",
        sort: "",
        career: "",
        intro: "",
      },
      info: {
        id: null,
        name: "",
        level: "",
        gmtCreated: "",
        gmtModified: "",
        avatar: "",
        sort: "",
        career: "",
        intro: "",
      },
      rows: [],
      total: 0,
      dialogFormVisible: false,
      formLabelWidth: "120px",
      values: [
        { value: 1, label: "首席讲师" },
        { value: 2, label: "高级讲师" },
      ],
    };
  },

  created() {
    this.showTeacher();
  },

  methods: {
    teacherInfo(row){
      this.info = row
      console.log(this.info);
    },
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
    findTeacher() {
      this.currentPage = 1;
      this.showTeacher();
      this.teacher = {};
    },
    clear() {
      this.teacher = {};
    },
    //修改按钮回显
    handleEdit(row) {
      teacherApi
        .findTeacherById(row.id)
        .then((res) => {
          this.teacher = res.data.teacher;
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
            style="margin-left: 60px"
            onClick={() => this.deleteIds()}
          >
            批量删除
          </el-button>
        </div>
      );
    },

    //修改头像
    handleAvatarSuccess(res, file) {
      this.teacher.avatar = res.data.imgPath;
      this.$message({
        message: "上传图片成功",
        type: "success",
      });
    },
    //校验头像格式
    beforeAvatarUpload() {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传菜品图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传菜品图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
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
.avatar-uploader {
  width: 80px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  margin-left: 20px;
  margin-top: 5px;
  display: inline-block;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>