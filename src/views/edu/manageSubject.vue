<template>
  <div class="app-container">
    <el-form ref="form" label-width="180px">
      <el-form-item label="下载课程分类信息">
        <a
          href="http://localhost:8080/eduservice/subject/downloadExcel"
          style="color: #409eff"
          ><i class="el-icon-download" /> 点击下载</a
        >
      </el-form-item>
      <el-form-item label="上传课程分类信息">
        <el-upload
          class="upload-demo"
          action="http://localhost:8080/eduservice/subject/uploadExcel"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          multiple
          :on-exceed="handleExceed"
        >
          <el-tooltip
            class="item"
            effect="dark"
            content="上传格式请参考上方下载模板"
            placement="bottom-start"
          >
            <el-button size="small" type="primary"
              ><i class="el-icon-upload2" />点击上传</el-button
            >
          </el-tooltip>
          <div slot="tip" class="el-upload__tip"></div>
        </el-upload>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    handleExceed(files) {
      this.$message.warning(
        `当前限制选择1个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length
        } 个文件`
      );
    },
    beforeRemove(file) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
  },
};
</script>

<style>
</style>
