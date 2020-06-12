<template>
  <div class="register">
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
          <h3>注册</h3>
        </div>

        <!-- username -->
        <el-form-item prop="username">
          <el-input type="text" v-model="ruleForm.username" auto-complete="off" placeholder="账号">
            <i slot="prefix" class="fa fa-user"></i>
          </el-input>
        </el-form-item>

        <!-- email -->
        <el-form-item prop="email">
          <el-input type="text" v-model="ruleForm.email" auto-complete="off" placeholder="邮箱">
            <i slot="prefix" class="fa fa-envelope"></i>
          </el-input>
        </el-form-item>

        <!-- password -->
        <el-form-item prop="pwd">
          <el-input type="password" v-model="ruleForm.pwd" auto-complete="off" placeholder="密码">
            <i slot="prefix" class="fa fa-lock"></i>
          </el-input>
        </el-form-item>

        <!-- 重复密码 -->
        <el-form-item prop="twoPwd">
          <el-input
            type="password"
            v-model="ruleForm.twoPwd"
            auto-complete="off"
            placeholder="重复密码"
          >
            <i slot="prefix" class="fa fa-lock"></i>
          </el-input>
        </el-form-item>

        <!-- 注册按钮 -->
        <el-form-item>
          <el-button type="primary" style="width:100%" @click.stop="handleSubmit('ruleForm')">注册</el-button>
        </el-form-item>
      </el-form>
    </LoginHeader>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Provide } from "vue-property-decorator";

import LoginHeader from "../Login/LoginHeader.vue";

import { Message } from "element-ui";

@Component({
  components: { LoginHeader }
})
export default class Register extends Vue {
  @Provide() isLoading: boolean = false;

  @Provide() ruleForm: {
    username: String;
    email: String;
    pwd: String;
    twoPwd: String;
  } = {
    username: "",
    email: "",
    pwd: "",
    twoPwd: ""
  };

  @Provide() validateTwoPwd = (
    rule: any,
    value: String,
    callback: any
  ): void => {
    if (value === "") {
      callback(new Error("请再次输入密码"));
    } else if (value !== this.ruleForm.pwd) {
      callback(new Error("两次输入密码不一致"));
    }
    callback();
  };

  @Provide() validateEmail = (
    rule: any,
    value: String,
    callback: any
  ): void => {
    const emailReg: any = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailReg.test(value)) {
      callback(new Error("邮箱格式错误"));
    }
    callback();
  };

  @Provide() rules = {
    username: [
      { required: true, message: "请输入用户名", trigger: "blur" },
      { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "change" }
    ],
    pwd: [
      { required: true, message: "请输入密码", trigger: "blur" },
      { min: 3, max: 16, message: "长度在 3 到 16 个字符", trigger: "change" }
    ],
    twoPwd: [
      { required: true, message: "请输入密码", trigger: "blur" },
      { min: 3, max: 16, message: "长度在 3 到 16 个字符", trigger: "change" },
      { validator: this.validateTwoPwd, trigger: "change" },
      { validator: this.validateTwoPwd, trigger: "blur" }
    ],
    email: [
      { required: true, message: "请输入邮件地址", trigger: "blur" },
      { validator: this.validateEmail, trigger: "change" },
      { validator: this.validateEmail, trigger: "blur" }
    ]
  };

  handleSubmit(formName: any): void {
    (this.$refs[formName] as any).validate((valid: boolean) => {
      if (valid) {
        (this as any).$axios
          .post("/api/users/register", this.ruleForm)
          .then((user: any) => {
            if (user.data.state === "suc") {
              Message.success(user.data.msg);
              this.$router.push("/login");
            } else {
              Message.error(user.data.msg);
              this.ruleForm = {
                username: "",
                email: "",
                pwd: "",
                twoPwd: ""
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