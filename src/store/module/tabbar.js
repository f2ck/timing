const module = {
  namespaced: true,
  state: {
    isTabbar: true
  },
  mutations: {
    hide (state) {
      state.isTabbar = false
    },
    show (state) {
      state.isTabbar = true
    }
  },
  actions: {

  }
}

export default module
