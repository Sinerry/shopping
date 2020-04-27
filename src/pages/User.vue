<template>
  <section>
    <!-- 面包屑区域 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/users/findAll">用户管理</a></el-breadcrumb-item>
      <el-breadcrumb-item><a href="/users/findAll">用户列表</a></el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索框区域 -->
    <el-row :gutter="20">
      <el-col :span="12">
        <div class="grid-content">
          <el-input placeholder="请输入内容" v-model="keyword"
                    class="input-with-select"
                    clearable
                    @clear="clearHandler"
                    @input="inputHandler">
            <el-select v-model="searchType" slot="prepend" placeholder="请选择搜索类别">
              <el-option label="姓名" value="SEARCH_By_Name"></el-option>
              <el-option label="角色" value="SEARCH_By_ROLE"></el-option>
            </el-select>
            <el-button slot="append" icon="el-icon-search" @click="searchHandler">搜索</el-button>
          </el-input>
        </div>
      </el-col>
      <el-col :span="4">
        <el-button type="primary">添加用户</el-button>
      </el-col>
    </el-row>
    <!-- 表格区域 -->
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        fixed
        prop="id"
        label="ID"
        width="100">
      </el-table-column>
      <el-table-column
        prop="username"
        label="用户名"
        width="150">
      </el-table-column>
      <el-table-column
        prop="role_name"
        label="角色"
        width="150">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
        width="200">
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="电话"
        width="200">
      </el-table-column>
      <el-table-column
        prop="create_time"
        label="创建时间"
        width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.create_time | formatDate }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="mg_state"
        label="状态"
        width="100">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.mg_state" @change="stateChangeHandler(scope.row)"/>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="200">
        <template slot-scope="scope">
          <el-tooltip content="编辑" placement="left" :enterable="false">
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="editHandler(scope.row)"></el-button>
          </el-tooltip>
          <el-tooltip content="删除" placement="top" :enterable="false">
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="delHandler(scope.row)"></el-button>
          </el-tooltip>
          <el-tooltip content="设置" placement="right" :enterable="false">
            <el-button type="info" icon="el-icon-setting" size="mini" @click="delHandler(scope.row)"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页区域 -->
    <el-pagination
      @size-change="sizeChangeHandler"
      @current-change="currentChangeHandler"
      :current-page="currentPage"
      :page-sizes="[2, 3, 5, 10]"
      :page-size="queryInfo.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </section>
</template>

<script>
import { getUserList, toggleUserState } from '@/services/user'
import { debounce } from '@/assets/js/dom'
const PAGE_NUM = 1
const PAGE_SIZE = 2
export default {
  methods: {
    sizeChangeHandler (pagesize) {
      this.queryInfo.pagesize = pagesize
      this.getUserList()
    },
    currentChangeHandler (currentPage) {
      this.queryInfo.pagenum = currentPage
      this.getUserList()
    },
    stateChangeHandler (row) {
      toggleUserState(row.id, row.mg_state)
        .then(resp => {
          this.$message.success('操作成功')
        })
    },
    inputHandler: debounce(function () {
      this.search()
    }),
    search () {
      const { keyword } = this
      if (!keyword.trim()) {
        this.queryInfo.query = ''
      }
      let { searchType } = this
      if (!searchType.trim()) {
        searchType = 'SEARCH_BY_NAME'
      }
      switch (searchType) {
        case 'SEARCH_BY_NAME':
          this.queryInfo.query = keyword.trim()
          break
        case 'SEARCH_BY_ROLE':
          break
      }
      this.getUserList()
    },
    clearHandler () {
      if (!this.keyword.trim()) return
      this.queryInfo.query = ''
      this.getUserList()
    },
    editHandler (row) {
      console.log(row)
    },
    delHandler (row) {
      console.log(row)
    },
    searchHandler () {
      this.search()
    },
    getUserList () {
      getUserList(this.queryInfo).then(resp => {
        this.tableData = resp.users
        this.total = resp.total
      })
    }
  },
  created () {
    this.getUserList()
  },
  data () {
    return {
      tableData: [],
      keyword: '',
      searchType: '',
      total: 0,
      currentPage: PAGE_NUM,
      queryInfo: {
        query: '',
        pagenum: PAGE_NUM,
        pagesize: PAGE_SIZE
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
  .el-row
    margin 10px 0
    &:last-child
      margin-bottom 0
  .el-col
    border-radius 4px
  .grid-content
    border-radius 4px
    min-height 36px
    .el-select
      width 90px
  .el-table
    box-shadow 0 0 10px 5px rgba(0,0,0,.2)
  .el-pagination
    margin-top 15px
</style>
