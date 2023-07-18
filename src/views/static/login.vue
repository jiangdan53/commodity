<template>
  <div class="login">
    <!-- 登陆页面设计
        1.表单
        2.验证（自定义）
        3.登录实现，效果：loading
        4 状态信息的保存 （pinia，vuex）,
        问题刷新会出现状态信息丢失的问题，数据持久化 数据库，
        本地持久化：持久化插件 //持久化插件 安装cnpm install pinia-plugin-persist
        5 页面跳转
        6 reset 
        数据接口：http://api.jqrjq.cn/doc.html
    -->
    <!-- <div>数量{{userStore.count}}</div>
    <button @click="userStore.increat">count++</button> -->
    <div class="login-form">
      <div class="login-form-logo">
        <el-image :src="src" fit="fill" :lazy="true"></el-image>
      </div>

      <el-form
        ref="ruleFormRef"
        :model="userForm"
        status-icon
        :rules="rules"
        class="login-ruleForm"
      >
        <el-form-item prop="email">
          <el-input
            v-model="userForm.email"
            autocomplete="off"
            placeholder="请输入你的用户邮箱"
            suffix-icon="Message"
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="userForm.password"
            type="password"
            autocomplete="off"
            placeholder="请输入你的用户密码"
            suffix-icon="Lock"
          />
        </el-form-item>

        <el-form-item class="login-form-btns">
          <el-button type="primary" @click="btnLogin">用户登录</el-button>
          <el-button @click="resetForm">Reset</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref } from "vue";
import { mapActions, storeToRefs } from "pinia";
import { userLogin } from "../../http/school.js";
import { useUserStore } from "../../store/user";
export default defineComponent({
  setup() {
    const src = ref("../../src/assets/logo.png");
    return {
      src,
    };
  },
  data() {
    return {
      n: 30,
      userForm: {
        email: "",
        password: "",
      },
      rules: {
        email: [
          { required: true, message: "请输入正确的电子邮箱", trigger: "blur" },
          { type: "email", message: "电子邮箱格式错误", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入正确的用户密码", trigger: "blur" },
          { min: 8, message: "密码长度不得小于8个字符", trigger: "blur" },
        ],
      },
    };
  },
  mounted() {},
  methods: {
    ...mapActions(useUserStore, ["setToken", "fillUserinfo"]),
    btnLogin() {
      const that = this;
      const formEl = that.$refs.ruleFormRef; //取ref对象
      //console.log(formEl);
      if (!formEl) return;
      formEl.validate((valid) => {
        if (valid) {
          if (
            that.userForm.email === "2845634514@qq.com" &&
            that.userForm.password === "12345678"
          ) {
            const userinfo = {
              state: 1,
              id: 1,
              userName: "丹丹",
              userType: "admin",
              token: "2845634514@qq.com",
              binding: 0,
              createTime: "1687364590427",
              updateTime: "1687364590427",
              email: "2845634514@qq.com",
            };
            that.setToken(userinfo.token);
            that.fillUserinfo(userinfo);
            that.$router.push("/");
          } else {
            console.log(that.userForm)
            return false;
          }
          // const res = userLogin(that.userForm)

          // res.then(result => {

          //     /**
          //      * 选项式
          //      * 用户的状态：登陆状态  token='',未登录，token='adbdfsdfsdfdsfds',已经登录
          //      * setToken
          //      *  保存登录用户的信息
          //      * fillUserinfo
          //      * 调用状态存储pinia的辅助函数 mapActions
          //      * methods:{
          //      * ...mapActions(useUserStore, ['setToken', 'fillUserinfo']),
          //      * }
          //      * */

          //     // pinia 下次解决
          //     // 跳转页面

          //     if (result.success) {
          //         const userinfo = result.data.userinfo;
          //         console.log(that);
          //         that.setToken(userinfo.token);
          //         that.fillUserinfo(userinfo);
          //         that.$router.push('/');

          //     }
          //     else {

          //         return false;
          //     }

          // }).catch(err => {
          //     console.log(err)
          // })
        } else {
          console.log("error submit!");
          return false;
        }
      });
    },
    resetForm() {
      const formEl = this.$refs.ruleFormRef; //取ref对象
      formEl.resetFields();
    },
  },
});
</script>

<style lang="scss" scoped>
body,
html {
  margin: 0;
}
canvas {
  display: block;
}
.login {
  height: calc(100vh - 20px);
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-form {
  width: 300px;
  height: 400px;
  display: flex;
  flex-direction: column;
  box-shadow: var(--el-box-shadow);
}

.login-form-logo {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 150px;
}

.login-form-btns {
  display: flex;
}

.login-form-btns .el-button {
  flex: 1;
}

.login-ruleForm {
  margin: 10px;
}
</style>