<template>
  <div class="app-container">
    <el-form ref="form" :model="teacher" label-width="80px">
      <el-form-item label="讲师名称">
        <el-input style="width: 300px" v-model="teacher.name"></el-input>
      </el-form-item>
      <el-form-item label="讲师头像">
        <el-upload
          class="avatar-uploader"
          action="http://localhost:8080/eduservice/teacher/uploadAvatar"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="teacher.avatar" :src="teacher.avatar" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="讲师排序">
        <el-input style="width: 300px" v-model="teacher.sort"></el-input>
      </el-form-item>
      <el-form-item label="讲师头衔">
        <el-select v-model="teacher.level">
          <el-option label="首席讲师" :value="1"></el-option>
          <el-option label="高级讲师" :value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="讲师资历">
        <el-input style="width: 800px" v-model="teacher.career"></el-input>
      </el-form-item>
      <el-form-item label="讲师简介">
        <el-input
          type="textarea"
          :rows="4"
          style="width: 800px"
          v-model="teacher.intro"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          round
          style="width: 200px"
          @click="submitTeacher"
          >保存</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import teacherApi from "@/api/teacher";
export default {
  data() {
    return {
      teacher: {
        id: null,
        name: "",
        sort: "",
        level: "",
        career: "",
        intro: "",
        avatar: "",
      },
    };
  },
  created() {
    this.init();
  },
  watch: {
    $route(to, from) {
      this.teacher = {}; //主要处理从修改跳到添加时删除回显信息
      this.init();
    },
  },
  methods: {
    //判断url是否有id参数，有就赋值给teacher.id
    init() {
      if (this.$route.params && this.$route.params.id) {
        this.teacher.id = this.$route.params.id;
        this.findTeacherById();
      }
    },
    //回显讲师信息
    findTeacherById() {
      teacherApi
        .findTeacherById(this.teacher.id)
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
    //头像上传校验
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    //头像上传回显
    handleAvatarSuccess(res, file) {
      this.teacher.avatar = res.data.imgPath;
    },
    submitTeacher() {
      if (this.teacher.name == "") {
        this.$message({
          message: "讲师名称不能为空!",
          type: "warning",
        });
        return;
      } else if (this.teacher.sort == "") {
        this.$message({
          message: "讲师排序不能为空!",
          type: "warning",
        });
        return;
      } else if (this.teacher.level == "") {
        this.$message({
          message: "讲师头衔不能为空!",
          type: "warning",
        });
        return;
      } else if (this.teacher.career == "") {
        this.$message({
          message: "讲师资历不能为空!",
          type: "warning",
        });
        return;
      } else if (this.teacher.intro == "") {
        this.$message({
          message: "讲师介绍不能为空!",
          type: "warning",
        });
        return;
      }
      if (this.teacher.id == null) {
        teacherApi
          .addTeacher(this.teacher)
          .then((res) => {
            if (res.code == 200) {
              this.$message({
                message: "保存成功！",
                type: "success",
              });
              this.$router.push("/showTeacher");
            }
          })
          .catch((err) => {
            this.$message({
              message: "连接超时",
              type: "warning",
            });
          });
      } else {
        teacherApi
          .updateTeacher(this.teacher)
          .then((res) => {
            if (res.code == 200) {
              this.$message({
                message: "保存成功！",
                type: "success",
              });
              this.$router.push("/teacher/showTeacher");
            }
          })
          .catch((err) => {
            this.$message({
              message: "连接超时",
              type: "warning",
            });
          });
      }
    },
  },
};
</script>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
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