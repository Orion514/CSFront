<template>
  <div>
    <div style="display: flex; padding: 10px;">
      <div style="margin-right: 10px"><el-switch v-model="horizontal"></el-switch> 横向</div>
      <div style="margin-right: 10px"><el-switch v-model="collapsable"></el-switch> 可收起</div>
      <div style="margin-right: 10px"><el-switch v-model="disaled"></el-switch> 禁止编辑</div>
      <div style="margin-right: 10px"><el-switch v-model="onlyOneNode"></el-switch> 仅拖动当前节点</div>
      <div style="margin-right: 10px"><el-switch v-model="cloneNodeDrag"></el-switch> 拖动节点副本</div>
    </div>
    <div style="padding: 0 10px 10px; display: flex ; align-items: center;">
      <div style="margin-right: 5px; display: flex">
        <div style="justify-content: center; align-items: center;"><span>背景色：</span></div>
        <el-color-picker v-model="style.background" size="small"></el-color-picker>&nbsp;
      </div>
      <div style="margin-right: 5px ; display: flex; align-content: center">
        文字颜色：<el-color-picker  v-model="style.color" size="small"></el-color-picker>&nbsp;
      </div>
    </div>

    <div >
      <div class="canvas-container" style="height: 500px;">
        <vue3-tree-org class="canvas"
            ref="treeOrg"
            :data="data"
            center
            :horizontal="horizontal"
            :collapsable="collapsable"
            :label-style="style"
            :only-one-node="onlyOneNode"
            :clone-node-drag="cloneNodeDrag"
            :before-drag-end="beforeDragEnd"
            @on-node-drag="nodeDragMove"
            @on-node-drag-end="nodeDragEnd"
            @on-contextmenu="onMenus"
            @on-expand="onExpand"
            @on-node-dblclick="onNodeDblclick"
            @on-node-click="onNodeClick"
        />
      </div>
<!--      </el-scrollbar>-->
    </div>
  </div>
</template>
<script>
import { ElSwitch, ElColorPicker, ElMessage } from 'element-plus'
import { ref } from 'vue'
export default {
  name: "baseTree",
  components: {
    ElSwitch,
    ElColorPicker
  },
  setup() {
    const cloneNodeDrag = ref(true)
    return {
      cloneNodeDrag
    }
  },
  data() {
    return {
      data: {
        "id":1,"label":"xxx科技有限公司",
        "children":[
          {
            "id":2,"pid":1,"label":"产品研发部",
            "style":{"color":"#fff","background":"#108ffe"},
            "children":[
              {"id":6,"pid":2,"label":"禁止编辑节点","disabled":true},
              {"id":8,"pid":2,"label":"禁止拖拽节点","noDragging":true},
              {"id":10,"pid":2,"label":"测试"}
            ]
          },
          {
            "id":3,"pid":1,"label":"客服部",
            "children":[
              {"id":11,"pid":3,"label":"客服一部"},
              {"id":12,"pid":3,"label":"客服二部"}
            ]
          },
          {"id":4,"pid":1,"label":"业务部"}
        ]
      },
      horizontal: true,
      collapsable: true,
      onlyOneNode: false,
      expandAll: true,
      disaled: false,
      style: {
        background: "#fff",
        color: "#5e6d82",
      },
    };
  },
  created() {
    // this.toggleExpand(this.data, this.expandAll);
  },
  updated() {
    this.a();
  },
  mounted() {
    this.a();
  },
  methods: {
    a(){
      this.$nextTick(() => {
        const treeOrg = this.$refs.treeOrg;
        const canvas = treeOrg?.$el?.querySelector('.org-chart');
        console.log(canvas);
        const canvasHeight = canvas.clientHeight;
        const canvasWidth = canvas.clientWidth;

        console.log('Canvas Height:', canvasHeight);
        console.log('Canvas Width:', canvasWidth);

      })
    },
    onMenus({ node, command }) {
      console.log(node, command);
    },
    onExpand(e, data) {
      console.log(e, data);
    },
    onExpandAll(b) {
      console.log(b)
    },
    nodeDragMove(data) {
      console.log(data);
    },
    beforeDragEnd(node, targetNode) {
      return new Promise((resolve, reject) => {
        if (!targetNode) reject()
        if (node.id === targetNode.id) {
          reject()
        } else {
          resolve()
        }
      })
    },
    nodeDragEnd(data, isSelf) {
      console.log(data, isSelf);
    },
    onNodeDblclick() {
      console.log('onNodeDblclick')
    },
    onNodeClick(e, data) {
      ElMessage.info(data.label);
    },
    expandChange() {
      // this.toggleExpand(this.data, this.expandAll);
    },
    toggleExpand(data, val) {
      if (Array.isArray(data)) {
        data.forEach((item) => {
          item.expand = val
          if (item.children) {
            this.toggleExpand(item.children, val);
          }
        });
      } else {
        data.expand = val
        if (data.children) {
          this.toggleExpand(data.children, val);
        }
      }
    },
  },
};
</script>

<!--<style>-->
<!--.canvas-container {-->
<!--  width: 1000px; /* 设置容器宽度为100% */-->
<!--  height: 500px; /* 设置容器高度为100% */-->
<!--  overflow: auto; /* 添加滚动条 */-->
<!--  position: relative; /* 设置相对定位，用于定位无尽画布 */-->
<!--  background-color: #2c3e50;-->
<!--}-->

<!--.canvas {-->
<!--  width: 1000px; /* 让画布宽度适应内容 */-->
<!--  height: 4000px; /* 让画布高度适应内容 */-->
<!--  position: absolute; /* 设置绝对定位，用于实现无尽画布效果 */-->
<!--  /*bottom: 0; !* 将画布顶部对齐容器顶部 *!*/-->
<!--  /*right: 0; !* 将画布左侧对齐容器左侧 *!*/-->
<!--}-->
<!--</style>-->
