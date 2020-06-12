<template>
  <div class="password">
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
          <h3>找回密码</h3>
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

        <!-- 找回密码 -->
        <el-form-item>
          <el-button type="primary" style="width:100%" @click.stop="handleSubmit('ruleForm')">找回密码</el-button>
        </el-form-item>
      </el-form>
    </LoginHeader>
  </div>
</template>

<script lang="ts">
import { Provide, Component, Vue } from "vue-property-decorator";

import { Message } from "element-ui";

import LoginHeader from "./LoginHeader.vue";

@Component({
  components: { LoginHeader }
})
export default class Password extends Vue {
  @Provide() ruleForm: {
    username: String;
    email: String;
  } = {
    username: "",
    email: ""
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
          .post("/api/users/findPwd", this.ruleForm)
          .then((res: any) => {
            console.log(res);
            if (res.data.state === "suc") {
              Message.success(res.data.msg);
            } else {
              Message.error(res.data.msg);
              this.ruleForm = {
                username: "",
                email: ""
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
</style>