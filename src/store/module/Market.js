import http from '@/util/http'
const module = {
  namespaced: true,
  state: {
    pageTitle: '', // 搜索框内容
    listAllShop: [],// 搜索后的内容
    suggestionsList: [],

  },
  mutations: {
    // 设置搜索框内容
    setpageTitle (state, title) {
      state.pageTitle = title
    },
    // 设置请求到的商品数据
    setlistAllShop (state, title) {
      state.listAllShop = title
    },
    suggestions (state, data) {
      state.suggestionsList = data
    }
  },
  actions: {
    // 请求数据
    getShopList (store, value) {
      http({
        methods: 'post',
        url: `/Service/callback-mall.mi/ECommerce/SearchGoods.api?keyword=${value}`,
        data: {
          t: 2020371530744752,
          locationId: 880
        }
      }).then(res => {
        store.commit('setlistAllShop', res.data.content.goods.goodsList)
      })
    },
    // 请求数据2
    getShopList2 (store, value) {
      http({
        methods: 'post',
        url: `/Service/callback-mall.mi/ECommerce/SearchGoods.api?keyword=&categoryId1=${value}`,
        data: {
          t: 2020371530744752,
          locationId: 880
        }
      }).then(res => {
        store.commit('setlistAllShop', res.data.content.goods.goodsList)
        console.log(res.data.content.goods.goodsList)
      })
    },
    searchInp (store, value) {
      store.commit('setpageTitle', value),
      http
        .request({
          url: `/Service/callback.mi/Search/SearchSuggestionNew.api?keyword=${value}`
        })
        .then(res => {
          console.log(res)
          store.commit('suggestions', res.data.suggestions)
        })
    }
  }
}

export default module
