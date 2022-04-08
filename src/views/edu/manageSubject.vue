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
          :before-remove="beforeRemove"
          multiple
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
    <el-input placeholder="输入关键字进行过滤" v-model="filterText"> </el-input>
    <div class="block" >
      <p>课程分类管理</p>
      <el-tree
        class="filter-tree"
        :data="data"
        show-checkbox
        node-key="id"
        default-expand-all
        :expand-on-click-node="false"
        :filter-node-method="filterNode"
        ref="tree"
        style="margin-left:50px"
      >
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span>{{ node.label }}</span>
          <span>
            <el-button type="text" size="mini" @click="() => append(data)">
              修改
            </el-button>
            <el-button
              type="text"
              size="mini"
              @click="() => remove(node, data)"
            >
              删除
            </el-button>
          </span>
        </span>
      </el-tree>
    </div>
  </div>
</template>

<script>
export default {
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
  },
  data() {
    return {
      data: [
        {
          id: 1,
          label: "一级 1",
          children: [
            {
              id: 4,
              label: "二级 1-1",
              children: [
                {
                  id: 9,
                  label: "三级 1-1-1",
                },
                {
                  id: 10,
                  label: "三级 1-1-2",
                },
              ],
            },
          ],
        },
        {
          id: 2,
          label: "一级 2",
          children: [
            {
              id: 5,
              label: "二级 2-1",
            },
            {
              id: 6,
              label: "二级 2-2",
            },
          ],
        },
        {
          id: 3,
          label: "一级 3",
          children: [
            {
              id: 7,
              label: "二级 3-1",
            },
            {
              id: 8,
              label: "二级 3-2",
            },
          ],
        },
      ],
      //   data: JSON.parse(JSON.stringify(data)),
      //   data: JSON.parse(JSON.stringify(data)),
      filterText: "",
    };
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    beforeRemove(file) {
      return this.$confirm(`确定移除 ${file.name}?`);
    },
    append(data) {
      const newChild = { id: id++, label: "testtest", children: [] };
      if (!data.children) {
        this.$set(data, "children", []);
      }
      data.children.push(newChild);
    },

    remove(node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex((d) => d.id === data.id);
      children.splice(index, 1);
    },

    renderContent(h, { node, data, store }) {
      return (
        <span class="custom-tree-node">
          <span>{node.label}</span>
          <span>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.append(data)}
            >
              Append
            </el-button>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.remove(node, data)}
            >
              Delete
            </el-button>
          </span>
        </span>
      );
    },
  },
};
</script>

<style>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  
  padding-right: 88px;
}
</style>
