<template>
  <div class="app-container">
    <h2 style="text-align: center">{{ infoTitle }}</h2>
    <el-steps
      :space="500"
      :active="1"
      finish-status="success"
      align-center
      style="margin-top: 10px"
    >
      <el-step title="填写课程基本信息"></el-step>
      <el-step title="创建课程大纲"></el-step>
      <el-step title="提交审核"></el-step>
    </el-steps>
    <el-form
      :inline="true"
      :model="chapter"
      class="demo-form-inline"
      style="margin-left: 50px; margin-top: 50px"
    >
      <el-form-item style="width: 600px">
        <el-input
          v-model="chapter.courseName"
          placeholder="请输入课程章节名称"
          style="width: 600px"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="findChapter">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="info" @click="clear">清空</el-button>
      </el-form-item>
      <el-form-item style="float: right; margin-right: 50px">
        <el-button
          type="primary"
          @click="
            dialogFormVisible = true;
            clearVideos();
          "
          >添加新章节</el-button
        >
      </el-form-item>
    </el-form>
    <!-- dialog -->
    <el-dialog title="添加章节" :visible.sync="dialogFormVisible">
      <el-form :model="chapter">
        <el-form-item label="章节名称" :label-width="formLabelWidth">
          <el-input v-model="chapter.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="章节排序" :label-width="formLabelWidth">
          <el-input v-model="chapter.sort" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-upload
            class="upload-demo"
            ref="upload"
            action="http://localhost:8080/eduservice/video/uploadVideo"
            :before-upload="beforeUpload"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-success="handleSuccess"
            :file-list="fileList"
            :auto-upload="false"
            style="margin-left: 50px"
          >
            <el-button slot="trigger" size="small" type="primary"
              >选取文件</el-button
            >
            <el-button
              style="margin-left: 10px"
              size="small"
              type="success"
              @click="submitUpload"
              >上传到服务器</el-button
            >
            <div slot="tip" class="el-upload__tip">只能上传mp4/flv文件</div>
          </el-upload>
        </el-form-item>
        <!-- <el-form-item label="是否收费" :label-width="formLabelWidth">
          <el-select v-model="video.isFree" placeholder="请选择视频是否收费">
            <el-option label="收费" value="0"></el-option>
            <el-option label="免费" value="1"></el-option>
          </el-select>
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="
            dialogFormVisible = false;
            addChapter();
          "
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <el-table
      stripe
      border
      :data="chapters"
      style="width: 92%; margin-left: 4%; margin-bottom: 10px"
    >
      <el-table-column prop="sort" label="编号" width="150"> </el-table-column>
      <el-table-column prop="title" label="章节名称" width="250">
      </el-table-column>
      <el-table-column prop="gmtCreated" label="创建时间" width="250">
      </el-table-column>
      <el-table-column prop="gmtModified" label="修改时间" width="250">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini">添加</el-button>
          <el-button size="mini">修改</el-button>
          <el-button
            size="mini"
            type="danger"
            style="margin-left: 5px"
            @click="handleDelete(scope.row)"
            >删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-table
      stripe
      border
      :data="videoList"
      style="width: 92%; margin-left: 4%; margin-bottom: 10px"
    >
      <el-table-column prop="sort" label="章节编号" width="150">
      </el-table-column>
      <el-table-column
        prop="videoOriginalName"
        label="章节视频名称"
        width="320"
      >
      </el-table-column>
      <el-table-column prop="isFree" label="是否收费" width="120">
        <template slot-scope="scope">
          <span v-if="scope.row.isFree == false">收费</span>
          <span v-if="scope.row.isFree == true">免费</span>
        </template>
      </el-table-column>
      <el-table-column prop="size" label="视频大小" width="150">
      </el-table-column>
      <el-table-column prop="duration" label="视频时长（秒）" width="150">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini">修改</el-button>
          <el-button
            size="mini"
            type="danger"
            style="margin-left: 5px"
            @click="handleDelete(scope.row)"
            >删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-button
      type="primary"
      plain
      style="float: left; margin-left: 50px; margin-bottom: 50px"
      @click="back()"
      >上一步</el-button
    >
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
import courseApi from "@/api/course";
import chapterApi from "@/api/chapter";
export default {
  data() {
    return {
      fileList: [],
      infoTitle: "添加章节",
      chapters: [],
      videoList: [],
      chapter: {
        sort: "",
        title: "",
        courseId: null,
        gmtCreated: "",
        gmtModified: "",
        videoList: [],
      },
      videos: [], //暂存后端传来的视频数据
      video: {
        title: "",
        isFree: null,
        videoOriginalName: "",
        videoSourceId: "",
        size: "",
        duration: "",
        courseId: null,
        chapterId: null,
        sort: "",
      },
      dialogFormVisible: false,
      formLabelWidth: "120px",
    };
  },
  created() {
    this.init();
  },
  methods: {
    //通过courseId寻找chapter
    init() {
      chapterApi
        .findChapterAll(this.$route.params.id)
        .then((res) => {
          console.log(res.data.chapterList[0].videoList[0]);
          this.chapters = res.data.chapterList;

          for (let i = 0; i < res.data.chapterList.length; i++) {
            for (let j = 0; j < res.data.chapterList[i].videoList.length; j++) {
              this.videoList.push(res.data.chapterList[i].videoList[j]);
            }
          }
          console.log(this.videoList);

          // for(let i = 0;i<this.chapters.length;i++){
          //     this.videoList.push(this.chapters.videoList)
          //     console.log(this.videoList);
          // }
        })
        .catch((err) => {
          this.$message({
            message: "连接超时!",
            type: "warning",
          });
        });
    },
    submit() {
      this.$router.push("/course/publishCourse/" + this.$route.params.id);
    },
    back() {
      this.$router.push("/course/updateCourse/" + this.$route.params.id);
    },
    handleDelete(row) {},
    findChapter() {},
    clear() {},
    //上传视频
    submitUpload() {
      this.$refs.upload.submit();
    },
    //视频上传成功钩子,多选也会一个一个执行
    handleSuccess(res, file) {
      let videoSize = parseFloat(file.size / 1024 / 1024).toFixed(2) + "Mb";
      this.videos.push({
        courseId: this.$route.params.id,
        size: videoSize,
        title: res.data.title,
        videoSourceId: res.data.videoSourceId,
        videoOriginalName: res.data.videoOriginalName,
      });
    },
    //每次点击上传章节时  清空videos
    clearVideos() {
      this.videos = [];
      this.chapter = {};
      this.fileList = [];
    },
    //移除文件的钩子
    handleRemove(file, fileList) {},
    //文件上传列表点击钩子
    handlePreview(file) {},
    //校验文件类型
    beforeUpload(file) {
      let FileExt = file.name.replace(/.+\./, "");
      if (["mp4", "flv"].indexOf(FileExt.toLowerCase()) === -1) {
        this.$message.error("文件格式有误，请重新上传!");
        return false;
      }
    },
    addChapter() {
      if (this.chapter.title == "") {
        this.$message({
          message: "章节名称不能为空!",
          type: "warning",
        });
        return;
      } else if (this.chapter.sort == "") {
        this.$message({
          message: "章节排序不能为空!",
          type: "warning",
        });
        return;
      }
      this.chapter.courseId = this.$route.params.id;
      this.chapter.videoList = this.videos;
      chapterApi
        .addChapter(this.chapter)
        .then((res) => {
          if (res.code == 200) {
            this.$message({
              message: "添加成功!",
              type: "success",
            });
            this.init();
          } else {
            this.$message({
              message: "添加失败!",
              type: "warning",
            });
          }
        })
        .catch((err) => {
          this.$message({
            message: "连接超时!",
            type: "warning",
          });
        });
    },
  },
};
</script>

<style>
</style>