<template>
  <div>
    <!-- 搜索框 -->
    <div class="search">
      <van-search
        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        background="#1c2635"
      >
        <div slot="action" @click="onSearch" style="color:#fff">搜索</div>
      </van-search>
    </div>

    <!-- 筛选分类 -->
    <div class="classification">
      <ul>
        <li>
          <p>综合排序 <i class="iconfont icon-moreunfold"></i></p>
        </li>
        <li>
          <p>主题角色 <i class="iconfont icon-moreunfold"></i></p>
        </li>
        <li>
          <p>全部分类 <i class="iconfont icon-moreunfold"></i></p>
        </li>
      </ul>
    </div>

    <!-- 列表展示 -->
    <div class="shop-list" v-if="listAllShop!=0">
      <ul>
        <li v-for="item in shopList" :key="item.goodId">
          <img :src="item.imageSrc" alt="">
          <p>
            <span class="you-goodsTip">{{item.goodsTip}}</span>
            <span class="you-name">{{item.name}}</span>
          </p>
          <p class="you-price">
            ￥{{item.minSalePrice / 100}}
          </p>
          <span class="you-text">{{item.iconText}}</span>
        </li>
      </ul>
    </div>
    <div class="no-nore">
      没有更多了哟~
    </div>
  </div>
</template>

<script>
import http from '@/util/http'
import Vue from 'vue'
import { Search, List, Cell,Toast } from 'vant'
import { mapState, mapMutations, mapActions } from 'vuex'
Vue.use(Search).use(List).use(Cell).use(Toast)
export default {
  data () {
    return {
      value: ''
    }
  },
  methods: {
    ...mapMutations('Market', ['setpageTitle', 'setlistAllShop']),
    ...mapActions('Market', ['getShopList']),
    // 点击或回车设置关键字和请求数据
    onSearch (val) {
      this.setpageTitle(this.value)
      this.getShopList(this.value)
      this.value = this.pageTitle
    }
  },
  beforeMount() {
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      overlay:true, //是否显示背景遮罩层
      duration:1500 //不会消失
    });
  },
  mounted () {
    if (this.pageTitle) {
      this.value = this.pageTitle
      this.getShopList(this.pageTitle)
    }
    this.hide
  },
  computed: {
    ...mapState('Market', ['pageTitle', 'listAllShop']),
    ...mapMutations('tabbar', ['hide', 'show']),
    // 返回数据给页面
    shopList () {
      return this.listAllShop
    }
  },
  // tabbar出现
  destroyed () {
    this.show
    this.setlistAllShop([])
    this.setpageTitle('')
  }
}
</script>

<style scoped lang="scss">
.classification{
  width: 100%;
  ul{
    display: flex;
    height: 2.875rem;
    border-bottom:1px solid #ddd ;
    li{
      flex: 1;
      text-align: center;
      p{
        line-height: 2.875rem;
      }
    }
  }
}
.shop-list{
  width: 100%;
  background: rgb(245, 241, 241);
   ul{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    li{
      width: 49%;
      display: flex;
      position: relative;
      flex-direction: column;
      justify-content: flex-start;
      background: #fff;
      margin-bottom: .3125rem;
      img{
        width: 100%;
      }
      p{
        margin-top: .9375rem;
        padding: 0 .625rem;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        .you-name{
          font-size: .8rem;
          line-height: 1.5rem;
          color: rgb(94, 91, 91);
        }
        .you-goodsTip{
          font-size: .8rem;
          color: #ff8600;
          border: 1px solid #ff8600;
          border-radius: .2rem;
          margin-right:.325rem;
        }
      }
      .you-price{
        padding: .625rem;
        color: #ff8600;
        font-size: .8rem;
        margin:0;
      }
      .you-text{
        position: absolute;
        top: 0;
        left: 0;
        background: #25ACBD;
        color: #fff;
        font-size: .625rem;
      }
    }
  }
}
.no-nore{
  text-align: center;
  font-size: 1.125rem;
  color: rgb(124, 121, 121);
  background: rgb(245, 241, 241);;
}

</style>
