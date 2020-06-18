<template>
  <div class="login">
    <LoginHeader>
      <el-form
        slot="container"
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-position="left"
        label-width="0px"
      >
        <div class="title">
          <h3>账号密码登录</h3>
        </div>

        <!-- username -->
        <el-form-item prop="username">
          <el-input type="text" v-model="ruleForm.username" auto-complete="off" placeholder="账号">
            <i slot="prefix" class="fa fa-user"></i>
          </el-input>
        </el-form-item>

        <!-- password -->
        <el-form-item prop="pwd">
          <el-input type="password" v-model="ruleForm.pwd" auto-complete="off" placeholder="密码">
            <i slot="prefix" class="fa fa-lock"></i>
          </el-input>
        </el-form-item>

        <!-- 登录按钮 -->
        <el-form-item>
          <el-button type="primary" style="width:100%" @click.stop="handleSubmit('ruleForm')">登录</el-button>
        </el-form-item>

        <!-- 七天内自动登录 -->
        <el-form-item>
          <el-checkbox v-model="ruleForm.autoLogin" :checked="ruleForm.autoLogin">7天内自动登录</el-checkbox>
          <el-button type="text" @click.stop="$router.push('/password')" class="forget">忘记密码?</el-button>
        </el-form-item>
      </el-form>
    </LoginHeader>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Provide } from "vue-property-decorator";

import { State, Getter, Mutation, Action } from "vuex-class";

import { Message } from "element-ui";

import LoginHeader from "./LoginHeader.vue";

@Component({
  components: { LoginHeader }
})
export default class Login extends Vue {
  // 存储用户信息
  @Action("setUser") setUser: any;

  @Provide() ruleForm: {
    username: String;
    pwd: String;
    autoLogin: Boolean;
  } = {
    username: "",
    pwd: "",
    autoLogin: true
  };

  @Provide() rules = {
    username: [
      { required: true, message: "请输入用户名", trigger: "blur" },
      { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "change" }
    ],
    pwd: [
      { required: true, message: "请输入密码", trigger: "blur" },
      { min: 3, max: 16, message: "长度在 3 到 16 个字符", trigger: "change" }
    ]
  };

  handleSubmit(formName: any): void {
    (this.$refs[formName] as any).validate((valid: boolean) => {
      if (valid) {
        (this as any).$axios
          .post("/api/users/login", this.ruleForm)
          .then((res: any) => {
            if (res.data.state === "suc") {
              Message.success(res.data.msg);
              localStorage.setItem("tsToken", res.data.token);
              // 存储用户信息到vuex
              this.setUser(res.data.token);
              this.$router.push("/");
            } else {
              Message.error(res.data.msg);
              this.ruleForm = {
                username: "",
                pwd: "",
                autoLogin: true
              };
            }
          })
          .catch((err: any) => {
            console.log(err);
          });
      }
    });
  }
}
</script>

<style lang="scss" scoped>
.title {
  margin: 0 auto 40px auto;
  text-align: center;
  color: #505458;
}

i {
  font-size: 14px;
  margin-left: 8px;
}

.forget {
  float: right;
}
</style>