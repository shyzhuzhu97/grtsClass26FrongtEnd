<template>
  <div class="app-container">
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
    <el-button type="primary" plain style="float: left;margin-left:50px;margin-bottom:50px" @click="back()"
      >上一步</el-button
    >
    <el-button type="primary" plain style="float: right;margin-right:50px;margin-bottom:50px" @click="submit()"
      >下一步</el-button
    >
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {},
  methods: {
    submit() {
      this.$router.push("/course/publishCourse");
    },
    back() {
      this.$router.push("/course/addCourse");
    },
  },
};
</script>

<style>
</style>