<template>
  <el-menu
    default-active="1"
    class="el-menu-vertical-demo"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    :router="true">
    <MenuItem v-for="menu in menuList" :key="menu.id" :menu="menu"/>
  </el-menu>
</template>

<script>
import MenuItem from '@/components/MenuItem'
export default {
  props: {
    menuList: {
      type: Array,
      default: () => []
    }
  },
  components: {
    MenuItem
  }
}
</script>

<style lang="stylus" scoped>

</style>