<template>
  <div class="index">
    <!-- 头部 -->
    <LayoutHeader></LayoutHeader>
    <!-- 内容 -->
    <Content>
      <Sidebar slot="left"></Sidebar>
      <router-view slot="content"></router-view>
    </Content>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src

import { Component, Prop, Vue } from "vue-property-decorator";

import LayoutHeader from "./LayoutHeader.vue";

import Content from "./Content.vue";

import Sidebar from "./Sidebar.vue";

@Component({
  components: { LayoutHeader, Content, Sidebar }
})
export default class Index extends Vue {}
</script>

<style lang="scss">
.index {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background: #f5f7f9;
}
</style>
