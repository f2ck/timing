import Vue from 'vue'
import Vuex from 'vuex'
import Market from './module/Market'
import tabbar from './module/tabbar'
import cinema from './module/cinemaModule'
import city from './module/CityModule'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState({
    reducer (data) {
      return {
        city: data.city
      }
    }
  })],
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    Market,
    tabbar,
    city,
    cinema

  }
})
