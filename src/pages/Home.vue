<template>
  <section class="layout">
    <el-container>
      <el-header>
        <el-button type="info" @click="logout">退出</el-button>
      </el-header>
    </el-container>
  </section>
</template>

<script>
export default {
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

<style lang="stylus" scoped></style>
