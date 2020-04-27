import Vue from 'vue'
import moment from 'moment'
Vue.filter('prefix', v => 'el-icon-s-' + v)
Vue.filter('formatDate', timestamp => {
  return moment(timestamp * 1000).format('YYYY-MM-DD HH:mm:ss')
})
