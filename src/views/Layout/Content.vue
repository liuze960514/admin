<template>
  <el-container>
    <!-- 左侧菜单 -->
    <el-aside width="200px">
      <slot name="left"></slot>
    </el-aside>
    <!-- 右侧页面 -->
    <el-main>
      <!-- 面包屑 -->
      <div class="top">
        <i class="fa fa-bars"></i>
        <el-breadcrumb class="breadcrumb" separator="/">
          <el-breadcrumb-item>活动管理</el-breadcrumb-item>
          <el-breadcrumb-item>活动列表</el-breadcrumb-item>
          <el-breadcrumb-item>活动详情</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 页面内容 -->
      <div class="content">
        <slot name="content"></slot>
      </div>
    </el-main>
  </el-container>
</template>

<script lang="ts">
// @ is an alias to /src

import { Component, Prop, Vue } from "vue-property-decorator";


@Component({
  components: {  }
})
export default class Content extends Vue {}
</script>

<style lang="scss">
.el-container {
  width: 100%;
  height: calc(100% - 64px);
  .top {
    background: #fff;
    height: 54px;
    border-right: none;
    border-bottom: 1px solid #e6e6e6;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    // justify-content: center;
    i {
      font-size: 20px;
      cursor: pointer;
      padding-left: 16px;
    }
    .breadcrumb {
      padding-left: 16px;
    }
  }
  .content {
    padding: 10px;
    // height: calc(100% - 54px);
    box-sizing: border-box;
  }
}
</style>
