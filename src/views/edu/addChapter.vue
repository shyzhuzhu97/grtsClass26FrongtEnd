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
        <el-button type="primary" @click="clear">添加新章节</el-button>
      </el-form-item>
    </el-form>
    <el-table
      stripe
      border
      :data="chapters"
      style="width: 92%; margin-left: 4%; margin-bottom: 10px"
    >
      <el-table-column prop="sort" label="排序" width="150">
      </el-table-column>
      <el-table-column prop="title" label="章节名称" width="320">
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
      :data="videos"
      style="width: 92%; margin-left: 4%; margin-bottom: 10px"
    >
      <el-table-column prop="sort" label="小节编号" width="150">
      </el-table-column>
      <el-table-column prop="title" label="小节视频名称" width="320">
      </el-table-column>
      <el-table-column prop="title" label="是否收费" width="320">
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
export default {
  data() {
    return {
      infoTitle: "添加章节",
      chapters:[],
      videos:[],
      chapter: {
        sort:"",
        title: "",
        gmtCreated: "",
        gmtModified: "",
      },
      video:{
        
      },
    };
  },
  created() {},
  methods: {
    submit() {
      this.$router.push("/course/publishCourse");
    },
    back() {
      this.$router.push("/course/updateCourse/" + this.$route.params.id);
    },
    handleDelete(row){

    },
    findChapter(){},
    clear(){},
  },
};
</script>

<style>
</style>