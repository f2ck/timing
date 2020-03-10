import http from '@/utils/http'
const module = {
  namespaced: true, // 开启命名空间
  state: {
    Cinemalist: []
  },
  mutations: {
    Cinemalist (state, data) {
      state.Cinemalist = data
    }
  },
  actions: {
    getCinemaAction (store, id) {
      http
        .request({
          url: `/position/api/proxy/ticket/onlineCinemasByCity.api?locationId=${id}&_=1583750661142`
        })
        .then(res => {
          store.commit('Cinemalist', res.data.data.cinemaList)
        })
    }
  }
  //   getters: {
  //     topDataList (state) {
  //       // state形参s， vuex自动调用时候，传来值
  //       return state.cityList.slice(0, 9)
  //     }

  //   }
}
export default module
