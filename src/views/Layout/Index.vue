<template>
  <div class="index">
    <!-- 头部 -->
    <LayoutHeader></LayoutHeader>
    <!-- 内容 -->
  </div>
</template>

<script lang="ts">
// @ is an alias to /src

import { Component, Prop, Vue } from "vue-property-decorator";

import LayoutHeader from "@/views/Layout/LayoutHeader.vue";

@Component({
  components: { LayoutHeader }
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
