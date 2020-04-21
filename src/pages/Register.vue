<template>
  <div class="reg_box">
    <div class="logo">
      <img src="/logo.jpg" alt="logo" width="300">
    </div>
    <el-form :model="model" :rules="rules" ref="regFormRef" label-width="70px" class="demo-model">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="model.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="model.password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="repassword">
        <el-input v-model="model.repassword"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="model.email"></el-input>
      </el-form-item>
      <el-form-item label="QQ" prop="qq">
        <el-input v-model="model.qq"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
      <el-radio-group v-model="model.sex">
        <el-radio v-for="item in sexs" :key="item"
                  :label="item"></el-radio>
      </el-radio-group>
      </el-form-item>
      <el-form-item label="学历" prop="edu">
        <el-select v-model="model.edu" placeholder="请选择教育背景">
          <el-option v-for="item in edu" :key="item"
                     :label="item" :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="爱好" prop="hobby">
        <el-checkbox-group v-model="model.hobby">
          <el-checkbox v-for="item in hobbies" :key="item"
                       :label="item" name="hobby"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="个人简介" prop="introduce">
        <el-input type="textarea" v-model="model.introduce"></el-input>
      </el-form-item>
      <el-form-item>
        <el-checkbox-group v-model="model.flag">
          <el-checkbox label="同意遵守协议..."></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :disabled="!model.flag" v-if="!model.flag">注册</el-button>
        <el-button type="primary" @click="regHandler('regFormRef')" v-else>注册</el-button>
        <el-button @click="resetHandler('regFormRef')">重置</el-button>
        <el-button type="success">
          <router-link to="/login">已有账号、去登录</router-link>
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  created () {
    this.sexs = ['男', '女', '保密']
    this.edu = ['大专以下', '大专', '本科', '硕士', '博士', '博士后']
    this.hobbies = ['读书', '打篮球', '踢足球', '跑步', '吃鸡', '听音乐', '刷抖音', '追剧']
  },
  data () {
    return {
      model: {
        username: '',
        password: '',
        qq: '',
        email: '',
        repassword: '',
        hobby: [],
        sex: '',
        flag: false,
        introduce: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        date1: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        date2: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
        type: [
          { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 注册
    regHandler (regFormRef) {
      this.$refs[regFormRef].validate(valid => {
        if (valid) {
          alert('submit!')
        }
      })
    },
    // 重置
    resetHandler (regFormRef) {
      this.$refs[regFormRef].resetFields()
    }
  }
}
</script>

<style lang="stylus">
  .reg_box
    width 500px
    margin 100px auto
    padding 40px 70px
    border: 2px solid #d1d1d1
    .logo
      margin-left 70px
      padding-bottom 20px
    a
      color #fff
</style>
