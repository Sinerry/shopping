<template>
  <el-container>
    <el-header>
      <div class="logo">
        <a href='/'><img src="/logo.jpg" alt="logo" height="60"></a>
      </div>
      <el-dropdown v-if="userInfo.username" @command="logoutHandler">
        <span class="el-dropdown-link">
          {{ userInfo.username }}、欢迎回来
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <Menu :menu-list="menuList"/>
      </el-aside>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
    <el-footer>Footer</el-footer>
  </el-container>
</template>

<script>
import { mapState } from 'vuex'
import Menu from '@/components/Menu'
import { getMenuList } from '@/services/menu'
export default {
  data () {
    return {
      menuList: []
    }
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo
    })
  },
  components: {
    Menu
  },
  created () {
    getMenuList().then(resp => {
      this.menuList = resp
    })
  },
  methods: {
    logoutHandler () {
      window.localStorage.removeItem('token')
      this.$confirm('此操作将会退出登录、是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$message({
            showClose: true,
            type: 'success',
            message: '退出成功!'
          })
          this.$router.push('/login')
        })
        .catch(() => {
          this.$message({
            showClose: true,
            type: 'info',
            message: '取消退出!'
          })
        })
    }
  }
}
</script>

<style lang="stylus" scoped>
.el-header,.el-footer
  background #B3C0D1
.el-header
  display flex
  justify-content space-between
  align-items center
  .el-dropdown-link
    cursor pointer
    font-size 16px
    color #409EFF
.el-aside
  background #D3DCE6
.el-main
  background #E9EEF3
</style>
