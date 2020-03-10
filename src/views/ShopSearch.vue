<template>
  <div class="shop-search">
    <div class="search">
      <van-search
        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @input="onInput"
        background="#1c2635"
      >
        <div slot="action" @click="onSearch" style="color:#fff">搜索</div>
      </van-search>
      <van-list
        v-model="loading"
        :finished="finished"

      >
        <van-cell v-for="item in list" :key="item" :title="item" />
      </van-list>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import http from '@/util/http'
import Vue from 'vue'
import { Search, List, Cell } from 'vant'

Vue.use(Search).use(List).use(Cell)
export default {
  data () {
    return {
      value: '',
      list: [],
      loading: false,
      finished: true
    }
  },
  methods: {
    ...mapMutations('Market', ['setpageTitle']),
    ...mapActions('Market', ['getShopList']),
    // 点击搜索事件
    onSearch (val) {
      // 储存关键字
      this.setpageTitle(this.value)
      // 跳转到search列表页
      this.$router.push('/ShopListShow')
    },
    // 搜索框事件
    onInput (str) {
      str ? this.value = str : ''
      // 设置list加载状态
      this.finished = false
      // list为空时重新加载
      this.list = []
      this.setpageTitle(this.value)
      // 请求数据
      http({
        methods: 'post',
        url: `/Service/callback-mall.mi/Search/GoodsSuggestionKeywords.api?keyword=${this.value}`,
        data: {
          t: 2020371530744752,
          locationId: 880
        }
      }).then(res => {
        // 重新赋值给list
        this.list = res.data.keywords.map(item => item.keyword)
        // 显示加载完毕
        this.finished = true
      })
    }
  },
  mounted () {
    this.hide
    // 默认请求一次list的数据
    this.onInput(this.pageTitle)
  },
  computed: {
    ...mapState('Market', ['pageTitle']),
    ...mapMutations('tabbar', ['hide', 'show'])
  },
  destroyed () {
    this.show
  }
}
</script>

<style scoped lang="scss">
.shop-search{
  .search{
    width:100%;
    position: fixed;
    top: 0rem;
    left: 0;
    z-index: 2;
  }
}

</style>
