import Vue from 'vue'
import moment from 'moment'

Vue.filter('dateFilter', function (data) {
  return moment(data * 1000).format('YYYY-MM-DD HH:mm:ss')
})
