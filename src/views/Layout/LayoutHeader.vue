<template>
  <div class="layout-header">
    <el-row>
      <!-- 左侧 -->
      <el-col :xs="10" :sm="12" :md="14" :lg="16" :xl="18">
        <div class="system-info">
          <img src="https://vuejs.org/images/logo.png" class="logo" alt="logo" />
          <span class="title">在线管理系统</span>
        </div>
      </el-col>

      <!-- 右侧 -->
      <el-col :xs="14" :sm="12" :md="10" :lg="8" :xl="6">
        <el-dropdown class="system-user" @command="userCommand">
          <span class="userinfo-inner">
            <img :src="require('@/assets/' + getUser.key + '.jpg')" alt="userinfo" />
            <span>{{ getUser.username }}</span>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="usercenter">个人中心</el-dropdown-item>
            <el-dropdown-item command="logout" divided>注销登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src

import { Component, Prop, Vue } from "vue-property-decorator";

import { State, Getter, Mutation, Action } from "vuex-class";

@Component({
  components: {}
})
export default class LauoutHeader extends Vue {
  @Getter("user") getUser: any;

  created() {
    // console.log(this.getUser);
  }

  userCommand(command: String): void {
    // alert(command);
    if (command === "logout") {
      localStorage.removeItem("tsToken");
      this.$router.push("/login");
    }

    if (command === "usercenter") this.$router.push("/user");
  }
}
</script>


<style lang="scss">
.layout-header {
  background: #495060;
  line-height: 64px;
  height: 64px;
  .system-info {
    text-align: center;
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;
    .logo {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin: 12px 10px 10px 10px;
      position: relative;
      cursor: pointer;
    }
    .title {
      font-size: 18px;
      font-weight: bold;
      color: azure;
      line-height: 64px;
    }
  }

  .system-user {
    text-align: right;
    float: right;
    padding-right: 16px;
    .userinfo-inner {
      color: #fff;
      font-size: 16px;
      cursor: pointer;
      display: flex;
      flex-flow: row nowrap;
      justify-content: center;
      align-items: center;
      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin: 10px 0 10px 10px;
      }
      span {
        margin-left: 10px;
      }
    }
  }
}
</style>
