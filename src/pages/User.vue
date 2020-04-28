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
            <el-select v-model="searchType" slot="prepend" placeholder="请选择">
              <el-option label="姓名" value="SEARCH_By_Name"></el-option>
              <el-option label="角色" value="SEARCH_By_ROLE"></el-option>
            </el-select>
            <el-button slot="append" icon="el-icon-search" @click="searchHandler">搜索</el-button>
          </el-input>
        </div>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="dialogVisible = true">添加用户</el-button>
        <el-dialog
          title="添加用户"
          :visible.sync="dialogVisible"
          width="40%"
          @close="closeHandler"
          @open="openHandler">

          <el-form :model="model" status-icon :rules="rules" ref="addUserFormRef"
                    label-width="0">
            <el-form-item prop="username">
              <el-input type="username" v-model="model.username" autocomplete="off" placeholder="用户名"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input type="password" v-model="model.password" autocomplete="off" placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item prop="email">
              <el-input v-model="model.email" placeholder="邮箱"></el-input>
            </el-form-item>
            <el-form-item prop="mobile">
              <el-input v-model.number="model.mobile" placeholder="手机号"></el-input>
            </el-form-item>
            <el-form-item>
              <el-select v-model="model.rid" placeholder="请选择角色">
                <el-option
                    :label="role.roleName" :value="role.id"
                    v-for="role in roles" :key="role.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取消</el-button>
              <el-button type="primary" @click="addUserHandler('addUserFormRef')">确定</el-button>
            </span>
        </el-dialog>
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
            <el-button type="info" icon="el-icon-setting" size="mini" @click="settingHandler(scope.row)"></el-button>
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
    <el-dialog
        title="更新用户"
        :visible.sync="updateDialogVisible"
        width="40%">
      <el-form :model="updateFormModel" status-icon :rules="updateFormModelRule" ref="updateUserFormRef"
            label-width="0">
        <el-form-item>
          <el-input placeholder="邮箱" :value="updateFormModel.id" readonly></el-input>
        </el-form-item>
        <el-form-item prop="email">
          <el-input v-model="updateFormModel.email" placeholder="邮箱"></el-input>
        </el-form-item>
        <el-form-item prop="mobile">
          <el-input v-model.number="updateFormModel.mobile" placeholder="手机号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-select v-model="updateFormModel.rid" placeholder="请选择角色">
            <el-option
                :label="role.roleName" :value="role.id"
                v-for="role in roles" :key="role.id"
                :selected="updateFormModel.rid === role.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="updateDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="editConfirmHandler">确定</el-button>
      </span>
    </el-dialog>
  </section>
</template>

<script>
import {
  getUserList, toggleUserState, addUser,
  getRoleList, getUserById, updateUser,
  delUserById
} from '@/services/user'
import { debounce } from '@/assets/js/dom'
const PAGE_NUM = 1
const PAGE_SIZE = 2
export default {
  methods: {
    settingHandler (row) {
    },
    resetAddUserDialogForm () {
      this.$refs.addUserFormRef.resetFields()
    },
    closeHandler () {
      this.resetAddUserDialogForm()
    },
    getRoleList () {
      getRoleList().then(resp => {
        this.roles = resp
      })
    },
    openHandler () {
      this.getRoleList()
    },
    addUserHandler (addUserFormRef) {
      this.$refs[addUserFormRef].validate(async valid => {
        if (!valid || !this.model.rid) return
        await addUser(this.model)
        this.getUserList()
      })
    },
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
    // 搜索
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
    async editHandler (row) {
      this.updateDialogVisible = true
      await this.getRoleList()
      const ret = await getUserById(row.id)
      Object.keys(this.updateFormModel).forEach(key => {
        this.updateFormModel[key] = ret[key]
      })
    },
    editConfirmHandler () {
      this.updateDialogVisible = false
      updateUser(this.updateFormModel.id, this.updateFormModel).then(() => {
        this.$message.success('更新成功')
        this.getUserList()
      })
    },
    delHandler (row) {
      this.$confirm('确定删除该用户么, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delUserById(row.id).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getUserList()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
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
    const validateUserName = (rule, value, cb) => {
      if (!value) {
        cb(new Error('用户名不能为空'))
      } else if (!/^\w{4,15}$/.test(value)) {
        cb(new Error('用户名长度在4-15之间，由字母、数字、下划线组成'))
      } else {
        cb()
      }
    }
    const validatePassword = (rule, value, cb) => {
      if (!value) {
        cb(new Error('密码不能为空'))
      } else if (!/^\w{5,15}$/.test(value)) {
        cb(new Error('密码长度在6-16之间，由任意字符组成'))
      } else {
        cb()
      }
    }
    const validateEmail = (rule, value, cb) => {
      if (!value) {
        cb(new Error('邮箱不能为空'))
      } else if (!/\w{1,20}@([1-9a-z]{2,}\.[a-z]{3,})+/.test(value)) {
        cb(new Error('邮箱格式不对'))
      } else {
        cb()
      }
    }
    const validateMobile = (rule, value, cb) => {
      if (!value) {
        cb(new Error('手机号不能为空'))
      } else if (!/^1[3-9]\d{9}$/.test(value)) {
        cb(new Error('手机必须由11位数字组成'))
      } else {
        cb()
      }
    }
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
      },
      dialogVisible: false,
      roles: [],
      model: {
        username: '',
        password: '',
        email: '',
        mobile: '',
        rid: ''
      },
      rules: {
        username: [{ validator: validateUserName, trigger: 'blur' }],
        password: [{ validator: validatePassword, trigger: 'blur' }],
        email: [{ validator: validateEmail, trigger: 'blur' }],
        mobile: [{ validator: validateMobile, trigger: 'blur' }]
      },
      updateFormModel: {
        rid: -1,
        id: '',
        mobile: '',
        email: ''
      },
      updateFormModelRule: {
        mobile: [{ validator: validateMobile, trigger: 'blur' }],
        email: [{ validator: validateEmail, trigger: 'blur' }]
      },
      updateDialogVisible: false
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
