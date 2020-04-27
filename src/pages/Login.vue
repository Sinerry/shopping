<template>
  <section class="login_box">
    <div class="logo">
      <img src="/logo.jpg" alt="logo" width="300">
    </div>
    <el-form :model="model" status-icon :rules="rules"
             ref="loginFormRef">
      <el-form-item prop="username">
        <el-input v-model="model.username" autocomplete="off"
                  prefix-icon="el-icon-user"
                  placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="model.password"
                  autocomplete="off" prefix-icon="el-icon-lock" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="loginHandler('loginFormRef')">登录</el-button>
        <el-button type="info" @click="resetHandler('loginFormRef')">重置</el-button>
        <el-button type="success">
          <router-link to="/register">没有账号、去注册</router-link>
        </el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data () {
    const validateUsername = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入用户名'))
      }
      if (!/^\w{5,15}$/.test(value)) {
        return callback(new Error('用户名由5-15个字符，可以包含字母、数字、下划线'))
      }
      callback()
    }
    const validatePassword = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入用密码'))
      }
      if (!/^.{6,16}$/.test(value)) {
        return callback(new Error('密码由6-16个字符，可以包含字母、数字、下划线、特殊字符'))
      }
      callback()
    }
    return {
      model: {
        username: '',
        password: ''
      },
      rules: {
        username: [{ validator: validateUsername, trigger: 'blur' }],
        password: [{ validator: validatePassword, trigger: 'blur' }]
      }
    }
  },
  methods: {
    // 登录
    loginHandler (formRef) {
      this.$refs[formRef].validate(async valid => {
        if (valid) {
          const token = await this.login(this.model)
          if (token) {
            window.localStorage.setItem('token', token)
            this.$message({
              showClose: true,
              type: 'success',
              message: '登录成功'
            })
            setTimeout(() => {
              this.$router.push('/')
            }, 1500)
          } else {
            this.$message({
              showClose: true,
              type: 'error',
              message: '登录失败、账号或密码不对'
            })
          }
        }
      })
    },
    // 重置
    resetHandler (formRef) {
      this.$refs[formRef].resetFields()
    },
    ...mapActions(['login'])
  }
}
</script>

<style lang="stylus">
  .login_box
    width 400px
    margin 100px auto
    padding 40px 70px
    border 2px solid #d1d1d1
    .logo
      padding-bottom 20px
    .el-input__prefix
      font-size 20px
    a
      color #fff
</style>
