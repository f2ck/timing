import Vue from 'vue'

Vue.filter('setStr', function (str, num) {
  const xx = str.replace(/[^\u0000-\u00ff]/g, 'a').length
  if (xx >= 14) {
    return str.substr(0, 14) + '...'
  } else {
    return str
  }
})
