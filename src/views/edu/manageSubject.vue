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
    <!-- <el-input
      placeholder="输入关键字进行搜索"
      v-model="filterText"
      clearable
      @keyup.enter.native="loadNode"
    ></el-input> -->
    <div style="margin-top: 50px;">
      <p>
        课程分类管理<el-button
          type="danger"
          size="mini"
          style="float: right; margin-right: 100px"
          >批量删除</el-button
        >
      </p>

      <el-tree node-key="id" :props="props" :load="loadNode" lazy show-checkbox>
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span>{{ node.label }}</span>
          <span>
            <el-button type="text" size="mini" @click="() => update(node)">
              <i class="el-icon-edit"></i>
              修改
            </el-button>
            <el-button
              type="text"
              size="mini"
              @click="() => remove(node, data)"
            >
              <i class="el-icon-delete"></i>
              删除
            </el-button>
          </span>
        </span>
      </el-tree>
    </div>
  </div>
</template>

<script>
import subjectApi from "@/api/subject";
export default {
  data() {
    return {
      expandNode: [],
      filterText: "",
      props: {
        label: "title",
        isLeaf: "leaf",
      },
    };
  },
  created() {},
  methods: {
    // 节点过滤
    // filterNode(value, data) {
    //   if (!value) {
    //     return true;
    //   } else {
    //     //这里面的name是用来对比过滤的tree的属性 一般使用label 根据个人需要进行写
    //     return data.title.indexOf(value) !== -1;
    //   }
    // },
    // search() {
    //   //如果输入的字符不为null或者“”则进行搜索
    //   if (
    //     this.filterText != null &&
    //     this.filterText != "" &&
    //     this.filterText != " "
    //   ) {
    //     //querySubject 根据课程名称进行过滤
    //     subjectApi.querySubject(this.filterText).then((res) => {
    //       if(res.data.subjectList != [] && res.data.subjectList != '' && res.data.subjectList != null && res.data.subjectList != undefined){
    //         res.data.subjectList.forEach(r=>{
    //           let node = this.$refs.tree.getNode(r.deptLid)
    //           //部门节点存在 直接展开部门节点 过滤数据
    //           if (node != null && node != undefined){
    //             //如果节点展开 直接过滤
    //             if(node.expanded == false || node.loaded == false){
    //               //节点未展开 展开后过滤
    //               node.expand()
    //             }else{
    //               return this.$refs.tree.filter(this.filterText)
    //             }
    //           }
    //         })
    //       }else {
    //         //查无此人
    //         this.$message({
    //           message: "所要查询的课程信息不存在",
    //           type: 'warning'
    //         })
    //       }

    //     });
    //   }
    //   // }else {
    //   //   //  不存在搜索数据 重新渲染树
    //   //   this.treeNode.childNodes = []// 把存起来的node的子节点清空，不然会界面会出现重复树！
    //   //   this.loadNode(this.treeNode, this.treeResolve)
    //   //   // 将保存的组织id也清空
    //   //   this.expandNode = []
    //   //   return
    //   // }
    // },
    beforeRemove(file) {
      return this.$confirm(`确定移除 ${file.name}?`);
    },

    loadNode(node, resolve) {
      //加载一级课程分类
      if (node.level === 0) {
        subjectApi
          .getSubjectOne()
          .then((res) => {
            return resolve(res.data.subjectList);
            
          })
          .catch((err) => {
            this.$message({
              message: "连接超时",
              type: "warning",
            });
          });
      }
      //加载二级课程分类
      if (node.level == 1) {
        subjectApi
          .getSubjectTwo(node.data.id)
          .then((res) => {
            return resolve(res.data.subjectList);
          })
          .catch((err) => {
            this.$message({
              message: "连接超时",
              type: "warning",
            });
          });
      }
      //节点下没有节点时，设置0.5秒后不再刷新
      if (node.level == 2) {
        setTimeout(() => {
          resolve([]);
        }, 500);
      }
    },
    update(node) {
      console.log(node);
    },
    remove(node, data) {
      console.log(node);
      console.log(data);
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
