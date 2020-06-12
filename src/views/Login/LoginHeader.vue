<template>
  <div class="login-header">
    <div class="page-center">
      <div class="info">
        <div class="title">
          <img src="@/assets/logo.png" alt="logo" />
          <span>管理系统</span>
        </div>
        <!-- <div class="detail">
          <span>在线管理系统</span>
        </div>-->
      </div>
      <!-- 插槽 -->
      <div class="container">
        <slot name="container"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {}
})
export default class LoginHeader extends Vue {}
</script>

<style lang="scss" scoped>
.login-header {
  width: 100%;
  height: 100%;
  background: url("../../assets/login-back.svg");
  background-repeat: no-repeat;
  background-position: center 110px;
  background-size: 100%;
  .page-center {
    position: absolute;
    width: 440px;
    height: 540px;
    margin: auto;
    top: 60px;
    right: 0;
    left: 0;
    .info {
      text-align: center;
      height: 150px;
      .title {
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;
        font-size: 32px;
        color: rgba(0, 0, 0, 0.85);
        font-family: "Myrida Pro", Arial, Helvetica, sans-serif, "微软雅黑";
        font-weight: 600;
        img {
          width: 300px;
          padding: 0 0 3px 0;
        }
      }
      // .detail {
      //   font-size: 14px;
      //   color: rgba(0, 0, 0, 0.45);
      //   margin-bottom: 40px;
      //   line-height: 1.5;
      // }
    }
    .container {
      border-radius: 5px;
      background-clip: padding-box;
      padding: 35px 35px 15px 35px;
      background: #fff;
      border: 1px solid #eaeaea;
      box-shadow: 0 0 25px #cacac6;
    }
  }
}
</style>