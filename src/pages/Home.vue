<template>
  <el-container>
    <el-header>
      Header
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
import Menu from '@/components/Menu'
import { getMenuList } from '@/services/menu'
export default {
  data () {
    return {
      menuList: []
    }
  },
  components: {
    Menu
  },
  created () {
    getMenuList().then(resp => {
      this.menuList = resp.data
    })
  },
  methods: {
    logout () {
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
            message: '取消退出'
          })
        })
    }
  }
}
</script>

<style lang="stylus" scoped>
.el-header,.el-footer
  background #B3C0D1
.el-aside
  background #D3DCE6
.el-main
  background #E9EEF3
</style>
