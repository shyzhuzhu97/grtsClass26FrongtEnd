<template>
  <div class="app-container">
    <h2 style="text-align: center">{{ infoTitle }}</h2>
    <el-steps
      :space="500"
      :active="2"
      finish-status="success"
      align-center
      style="margin-top: 10px"
    >
      <el-step title="填写课程基本信息"></el-step>
      <el-step title="创建课程大纲"></el-step>
      <el-step title="提交审核"></el-step>
    </el-steps>
    <el-button type="primary" plain style="float: left" @click="back()"
      >上一步</el-button
    >
    <el-button type="primary" plain style="float: right" @click="submit()"
      >发布课程</el-button
    >
  </div>
</template>

<script>
export default {
  data() {
    return {
      infoTitle: "发布课程",
    };
  },
  created() {},
  methods: {
    submit() {
      this.$router.push("/course/showCourse");
    },
    back() {
      this.$router.push("/course/addChapter/" + this.$route.params.id);
    },
  },
};
</script>

<style>
</style>