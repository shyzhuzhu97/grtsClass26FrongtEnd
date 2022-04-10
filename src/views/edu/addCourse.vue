<template>
  <div class="app-container">
    <el-steps
      :space="500"
      :active="0"
      finish-status="success"
      align-center
      style="margin-top: 10px"
    >
      <el-step title="填写课程基本信息"></el-step>
      <el-step title="创建课程大纲"></el-step>
      <el-step title="提交审核"></el-step>
    </el-steps>
    <el-form
      ref="form"
      :model="courseInfo"
      label-width="80px"
      style="margin-top: 80px"
    >
      <el-form-item label="课程标题">
        <el-input
          v-model="courseInfo.title"
          placeholder="请输入课程标题"
        ></el-input>
      </el-form-item>
      <el-form-item label="课程类别">
        <template>
          <el-select
            v-model="courseInfo.subjectParentId"
            placeholder="请选择课程一级分类"
            @change="getSubjectTwos"
          >
            <el-option
              v-for="item in subjectOnes"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            >
            </el-option>
          </el-select>

          <el-select
            v-model="courseInfo.subjectId"
            style="margin-left: 20px"
            placeholder="请选择课程二级分类"
          >
            <el-option
              v-for="item in subjectTwos"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </template>
      </el-form-item>
      <el-form-item label="课程讲师">
        <el-select v-model="courseInfo.teacherId" placeholder="请选择讲师">
          <el-option
            v-for="item in teacherList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="总课时">
        <el-input
          v-model="courseInfo.lessonNum"
          placeholder="请输入课时数"
          type="number"
          style="width: 200px"
        ></el-input>
      </el-form-item>
      <el-form-item label="课程封面">
        <el-upload
          class="avatar-uploader"
          action="http://localhost:8080/eduservice/course/uploadImg"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="courseInfo.cover" :src="courseInfo.cover" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <!-- 课程简介 富文本编辑器 -->
      <el-form-item label="课程简介">
        <quill-editor
          ref="myQuillEditor"
          v-model="courseInfo.des"
          :options="editorOption"
        />
        <input type="file" @change="change" id="upload" style="display: none" />
      </el-form-item>
    </el-form>
    <el-button
      type="primary"
      plain
      style="float: right; margin-right: 50px; margin-bottom: 50px"
      @click="submit()"
      >下一步</el-button
    >
  </div>
</template>

<script>
import { uploadImg } from "@/api/course";
import subjectApi from "@/api/subject";
import teacherApi from "@/api/teacher";
import courseApi from "@/api/course";
import { quillEditor, Quill } from "vue-quill-editor";
import { container, ImageExtend } from "quill-image-extend-module";
Quill.register("modules/ImageExtend", ImageExtend);
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
export default {
  components: {
    quillEditor,
  },
  data() {
    return {
      subjectOnes: [],
      subjectTwos: [],
      teacherList: [],
      courseInfo: {
        id: null,
        title: "",
        teacherId: null,
        subjectId: null,
        subjectParentId: null,
        lessonNum: null,
        cover:"",
      },
      // 富文本框参数设置
      editorOption: {
        modules: {
          ImageExtend: {
            loading: true, // 可选参数 是否显示上传进度和提示语
            name: "image", // 图片参数名
            size: 3, // 可选参数 图片大小，单位为M，1M = 1024kb
            action: uploadImg, // 服务器地址, 如果action为空，则采用base64插入图片 // response 为一个函数用来获取服务器返回的具体图片地址 // 例如服务器返回{code: 200; data:{ url: 'xxx.com'}} // 则 return res.data.url
            response: (res) => {
              return res.data.imgPath;
            },
            headers: (xhr) => {}, // 可选参数 设置请求头部
            start: () => {}, // 可选参数 自定义开始上传触发事件
            end: () => {}, // 可选参数 自定义上传结束触发的事件，无论成功或者失败
            error: () => {}, // 可选参数 自定义网络错误触发的事件
            change: (xhr, formData) => {}, // 可选参数 选择图片触发，也可用来设置头部，但比headers多了一个参数，可设置formData
          },
          toolbar: {
            container: container, // container为工具栏，此次引入了全部工具栏，也可自行配置
            handlers: {
              image: function (value) {
                if (value) {
                  document.querySelector("#upload").click(); // 劫持原来的图片点击按钮事件
                } else {
                  this.quill.format("image", false);
                }
              },
            },
          },
        },
      },
    };
  },
  created() {
    this.getSubjectOnes();
    this.getTeachers();
  },
  methods: {
    submit() {
      console.log(this.courseInfo);
      this.$router.push("/course/addChapter");
    },
    //得到课程一级分类
    getSubjectOnes() {
      subjectApi
        .getSubjectOne()
        .then((res) => {
          this.subjectOnes = res.data.subjectList;
        })
        .catch((err) => {
          this.$message({
            message: "连接超时",
            type: "warning",
          });
        });
    },
    //得到课程二级分类
    getSubjectTwos() {
      subjectApi
        .getSubjectTwo(this.courseInfo.subjectParentId)
        .then((res) => {
          this.subjectTwos = res.data.subjectList;
        })
        .catch((err) => {
          this.$message({
            message: "连接超时",
            type: "warning",
          });
        });
    },
    //得到讲师
    getTeachers() {
      teacherApi
        .findTeacherAll()
        .then((res) => {
          this.teacherList = res.data.teacherList;
        })
        .catch((err) => {
          this.$message({
            message: "连接超时",
            type: "warning",
          });
        });
    },
    //富文本上传图片
    change(e) {
      let file = e.target.files[0];
      const formData = new FormData();
      //吧图片装载到formData里面去 图片上传的时候 ajax异步要传图片 必须用
      //formData来传递
      formData.append("file", file);
      uploadImg(formData)
        .then((res) => {
          console.log(res);
          let quill = this.$refs.myQuillEditor.quill;
          let length = quill.getSelection().index; //光标位置 // 插入图片  图片地址
          quill.insertEmbed(length, "image", res.data.imgPath); // 调整光标到最后
          quill.setSelection(length + 1); //光标后移一位
        })
        .catch((err) => {
          this.$message({
            message: "连接超时",
            type: "warning",
          });
        });
    },
     //封面上传校验
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传课程图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传课程图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    //封面上传回显
    handleAvatarSuccess(res, file) {
      this.courseInfo.cover = res.data.imgPath;
    },
  },
};
</script>

<style>
.ql-editor {
  height: 300px;
}
.ql-picker {
  line-height: 100%;
}
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
  width: 238px;
  height: 238px;
  line-height: 238px;
  text-align: center;
}
.avatar {
  width: 238px;
  height: 238px;
  display: block;
}
</style>