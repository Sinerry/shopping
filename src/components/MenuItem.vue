<template>
  <el-submenu v-if="isExist" :index="menu.path">
    <template slot="title">
      <i :class="icons[menu.path] | prefix"></i>
      <span>{{ menu.authName }}</span>
    </template>
    <el-menu-item-group v-if="isExist">
      <MenuItem v-for="item in menu.children"
                :key="item.id"
                :menu="item"/>
    </el-menu-item-group>
  </el-submenu>
  <el-menu-item v-else :index="menu.path">
    <template slot="title">
      <i class="el-icon-menu"></i>
      <span>{{ menu.authName }}</span>
    </template>
  </el-menu-item>
</template>
<script>
export default {
  name: 'MenuItem',
  created () {
    this.icons = {
      users: 'custom',
      reports: 'data',
      orders: 'order',
      rights: 'check',
      goods: 'shop'
    }
  },
  props: {
    menu: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    isExist () {
      const { children } = this.menu
      return children && children.length
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>
