<template>
  <div class="shophome" v-if="shopAllList.length!==0">

    <!-- 搜索框 -->
    <div class="search">
      <van-search
        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @focus="onSearch"
        background="#1c2635"
      >
        <div slot="action" @click="onSearch" style="color:#fff">搜索</div>
      </van-search>
    </div>

    <div class="main">
      <!-- 轮播图 -->
      <div class="swiper">
        <div class="swiper-container">
          <div class="swiper-wrapper">
              <div
              class="swiper-slide swiper-photos"
              v-for="item in swiperList"
              :key="item.image"
              @click="toshopSearch(item.url)">
                <img :src="item.image" alt="">
              </div>
          </div>
          <div class="swiper-pagination"></div> <!--分页器-->
        </div>
      </div>

      <!-- 导航栏 -->
      <div class="m-nav">
        <ul>
          <li v-for="item in navList" :key="item.image" @click="navSearch(item.url)">
            <img :src="item.image" alt="">
            <span>{{item.iconTitle}}</span>
          </li>
        </ul>
      </div>

      <!-- mallshop -->
      <div class="mall-shop">
        <div class="mshop01" @click="toshopSearch(shopAllList.cellA.url)">
          <img :src="shopAllList.cellA.img" alt="">
        </div>
        <div class="mshop02" @click="toshopSearch(shopAllList.cellC.list[0].url)">
          <img :src="shopAllList.cellC.list[0].image" alt="">
        </div>
        <div class="mshop03" @click="toshopSearch(shopAllList.cellC.list[1].url)">
          <img :src="shopAllList.cellC.list[1].image" alt="">
        </div>
        <div class="mshop04" @click="toshopSearch(shopAllList.cellB.url)">
          <img :src="shopAllList.cellB.img" alt="">
        </div>
      </div>

      <!-- 手办 -->
      <div class="garage-kit">
        <div class="g-banner-backg">
          <img :src="bannerKitBG.backgroupImage" alt="">
           <ul class="g-banner">
            <li v-for="(item,index) in bannerKit" :key="index" @click='handleChangePic(index)'>
              <img :src="item.uncheckImage" alt="">
            </li>
          </ul>
        </div>
        <div class="garage-kit-commodity">
          <div class="garage-kit-commodity-title">
            <p class="garage-kit-commodity-title-eng">{{bannerKitBG.titleEn}}</p>
            <p class="garage-kit-commodity-title-cn">{{bannerKitBG.titleCn}}</p>
          </div>
          <ul>
            <li v-for="item in bannerKitBG.subList" :key="item.goodsId" @click='todetail'>
              <img :src="item.image" alt="">
              <p class="commodity-name">{{item.title}}<span>&nbsp; </span></p>
              <p class="commodity-price" v-if="goodsPrice.length !== 0">￥{{ getGoodsPrice(item.goodsId)}}<span></span></p>
            </li>
          </ul>
        </div>
      </div>

      <!-- 商品展示 -->
      <div class="shop-show" v-for="item in shopAllList.category" :key="item.image">
        <div class="show-head">
            <span :style="{background:item.colorValue}" class="sor"></span>
            <span :style="{color:item.colorValue}" class="toys-title">{{item.name}}</span>
            <span class="toys-more">更多<i class="iconfont icon-more"></i></span>
        </div>
        <div class="show-toys">
          <div class="show-toys-big" @click='todetail'>
            <img :src="item.image" alt="">
          </div>
          <ul class="show-toys-small">
            <li v-for="data in item.subList" :key="data.goodsId" @click='todetail'>
              <img :src="data.image" alt="">
              <p class="toys-name">{{data.title}}</p>
              <p class="toys-price" v-if="goodsPrice.length !== 0">￥<span>{{getGoodsPrice(data.goodsId)}}</span></p>
            </li>
          </ul>
        </div>
      </div>

      <!-- 猜你喜欢 -->
      <div class="you-like">
        <h4>你可能感兴趣</h4>
        <ul>
          <li v-for="item in YouLikeShop" :key="item.goodId" @click="todetail">
            <img :src="item.image" alt="">
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

    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Swiper from 'swiper'
import { Search, Toast } from 'vant'
import http from '@/util/http'
import 'swiper/css/swiper.min.css'
import { mapMutations, mapState, mapActions } from 'vuex'
Vue.use(Search).use(Toast)
export default {
  data () {
    return {
      value: '',
      shopAllList: [],
      bannerBgId: 0,
      YouLikeShop: [],
      goodsPrice: [],
      closure: true,
      pageIndex: 1
    }
  },
  methods: {
    ...mapMutations('Market', ['setpageTitle']),
    ...mapActions('Market', ['getShopList2', 'getShopList']),
    // 点击搜索
    onSearch (val) {
      this.$router.push('/ShopSearch')
    },
    // 手办ID判断
    handleChangePic (index) {
      this.bannerBgId = index
    },
    // 点击模块跳转search
    toshopSearch (path) {
      path = decodeURI(path)
      var num = path.indexOf('=')
      var Str = path.substr(num + 1)
      this.setpageTitle(Str)
      this.getShopList(Str)
      this.$router.push('/ShopListShow')
    },
    // 过滤价格
    getGoodsPrice (id) {
      return this.goodsPrice.filter(item => item.id === id)[0].price / 100
    },
    // 滚动抖动
    getlist () {
      if (!this.closure) return // 如果开关关闭，说明上次没有完成
      this.closure = false
      this.pageIndex++
      if (this.pageIndex >= 10) {
        this.closure = false
      } else {
        http.get(`/Service/callback-mall.mi/ECommerce/RecommendProducts.api?t=2020359491126012&goodsIds=&pageIndex=${this.pageIndex}`)
          .then(res => {
            this.YouLikeShop = [...this.YouLikeShop, ...res.data.goodsList]
            this.closure = true
          })
      }
    },
    // nav跳转
    navSearch (path) {
      // 判断地址类型
      if (path.indexOf('q=') != -1) {
        var num = path.indexOf('=')
        var Str = path.substr(num + 1)
        this.getShopList(Str)
      } else if (path.indexOf('c1=') != -1) {
        var num = path.indexOf('=')
        var Str = path.substr(num + 1)
        this.getShopList2(Str)
      } else {
        this.getShopList2('')
      }
      this.$router.push('/ShopListShow')
    },
    // 跳转到详情页
    todetail () {
      this.$router.push('/detail')
    }
  },
  beforeMount() {
  },
  mounted () {
    // 监听滚动事件判断是否加载猜你喜欢
    const _this = this
    var clientH = document.documentElement.clientHeight // 网页可见区域高
    window.onscroll = function () {
      var srcT = document.documentElement.scrollTop // 当前页面的滚动条
      var bodyH = document.body.offsetHeight // 网页总共加载的高（包括边线的高
      if (clientH + srcT >= bodyH - 50) {
        _this.getlist()
      }
    }
    // 总和数据请求
    http.get('/Service/callback-mall.mi/PageSubArea/MarketFirstPageNew.api?t=20203416222559202')
      .then(res => {
        this.shopAllList = res.data
      })
    // 价格数据
    http.get('/Service/callback-mall.mi/ECommerce/GoodsPrices.api?t=20203422135079291&goodsIds=106277%2C106476%2C106469%2C106560%2C106475%2C106577%2C108868%2C108861%2C108836%2C108874%2C108867%2C108824%2C108973%2C108977%2C108998%2C108984%2C108989%2C109110%2C107091%2C107094%2C105242%2C107095%2C101829%2C104706%2C107061%2C107063%2C107179%2C107113%2C107145%2C107157%2C107857%2C107858%2C105808%2C107731%2C106476%2C108170%2C108794%2C108771%2C108141%2C108155%2C108136')
      .then(res => {
        this.goodsPrice = res.data.result
      })
    // 商品列表数据
    http.get('/Service/callback-mall.mi/ECommerce/RecommendProducts.api?t=2020359491126012&goodsIds=&pageIndex=1')
      .then(res => {
        this.YouLikeShop = res.data.goodsList
      })
    // if(this.shopAllList != [] && this.goodsPrice != [] && this.goodsPrice != []){
    //   Toast.clear()
    // }
  },
  updated () {
    // 更新swiper
    var mySwiper = new Swiper('.swiper-container', {
      direction: 'horizontal', // 垂直切换选项
      loop: true, // 循环模式选项
      autoplay: true,
      pagination: { // 如果需要分页器
        el: '.swiper-pagination'
      }
    })
  },
  computed: {
    ...mapState('Market', ['pageTitle', 'listAllShop']),
    // swiper图片
    swiperList () {
      return this.shopAllList.scrollImg
    },
    // nav图片
    navList () {
      return this.shopAllList.navigatorIcon
    },
    // 手办圆图
    bannerKit () {
      return this.shopAllList.topic
    },
    bannerKitBG () {
      return this.shopAllList.topic[this.bannerBgId]
    }
  }
}
</script>

<style lang="scss" scoped>
.shophome{
  background: rgb(245, 241, 241);
  .search{
    width:100%;
    position: fixed;
    top: 3.125rem;
    left: 0;
    z-index: 2;
  }
  .main{
    .swiper{
      margin-top: 5.25rem;
      .swiper-photos{
        img{
          width: 100%;
        }
      }
    }
    .m-nav{
      background: #fff;
      margin-bottom: .9375rem;
      border-bottom: .0625rem solid rgb(199, 192, 192);
      ul{
        display: flex;
        list-style: none;
        flex-wrap: wrap;
        li{
          display: flex;
          width: 25%;
          flex-shrink: 0;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: .3125rem;
          box-sizing: border-box;
          img{
            height: 2.75rem;
            width: 2.75rem;
          }
          span{
            padding: .3rem;
            line-height: 1.4rem;
            color: #777;
          }
        }
      }
    }
    .mall-shop{
      position: relative;
      border-bottom: .0625rem solid rgb(199, 192, 192);
      margin-bottom: .9375rem;
      height: calc(14.0625rem + 6.95625rem);
      div{
        box-sizing: border-box;
        overflow: hidden;
      }
      img{
        height: 100%;
        width: 100%;
      }
      .mshop01{
        width: 50%;
        height: 14.0625rem;
        // float: left;
        position: absolute;
        left: 0;
        top: 0;
        border-right: .0625rem solid rgb(150, 147, 147);
        border-bottom: .0625rem solid rgb(150, 147, 147);
      }
      .mshop02{
        // float: right;
        height: 7.03125rem;
        width: 50%;
        border-bottom: .0625rem solid rgb(150, 147, 147);
        position: absolute;
        right: 0;
        top: 0;
      }
      .mshop03{
        // float: right;
        height:7.03125rem;
        width: 50%;
        border-bottom: .0625rem solid rgb(150, 147, 147);
        position: absolute;
        right: 0;
        top: 7.03125rem;
      }
      .mshop04{
        // float: left;
        height: 6.95625rem;
        width: 100%;
        position: absolute;
        left: 0;
        bottom: 0;
      }
    }
    .garage-kit{
      width: 100%;
      background: #fff;
      border-bottom: .0625rem solid rgb(199, 192, 192);
      margin-bottom: .9375rem;
      // height: 9.25rem;
      .g-banner-backg{
        position: relative;
        img{
          height: 100%;
          width: 100%;
        }
        .g-banner{
          display: flex;
          list-style: none;
          overflow: auto;
          position: absolute;
          bottom: -0.3125rem;
          left: 0;
          width: 100%;
          li{
            flex-shrink: 0;
            margin: 0 .3125rem;
            img{
              width: 4.8125rem;
              height: 5.125rem;
            }
          }
        }
      }
      .garage-kit-commodity{
        .garage-kit-commodity-title{
          text-align: center;
          .garage-kit-commodity-title-eng{
            display: inline-block;
            line-height: .75rem;
            font-size: .75rem;
          }
          .garage-kit-commodity-title-cn{
            font-size: 1.375rem;
          }
        }
        ul{
          display: flex;
          padding: .9375rem;
          flex-wrap: wrap;
          li{
            display: flex;
            width: calc(100% / 3);
            justify-content: center;
            flex-direction: column;
            align-content: center;
            padding: .3125rem;
            box-sizing: border-box;
            text-align: center;
            img{
              width: 100%;
            }
            .commodity-name{
              font-size: .75rem;
              overflow: hidden;
              text-overflow:ellipsis;
              white-space: nowrap;
              width: 100%;
            }
            .commodity-price{
              font-size: .875rem;
              color: rgb(182, 69, 69);
              span{
                font-size: 1rem;
              }
            }
          }
        }
      }
    }
    .shop-show{
      background: #fff;
      border-bottom: .0625rem solid rgb(199, 192, 192);
      margin-bottom: .9375rem;
      line-height: 1.6rem;
      .show-head{
        padding-top: .9375rem;
        position: relative;
          .toys-more{
            font-size: 1.1rem;
            float: right;
            color: #777;
          }
          .toys-title{
            font-size: 1.5rem;
            margin-left: 5px;
          }
          .sor{
            width: 2%;
            height: 0;
            padding-top: 6%;
            display: inline-block;
            transform: translateY(13%);
          }
      }
      .show-toys{
        padding: 5px;
        box-sizing: border-box;
        .show-toys-big{
          img{
            width: 100%;
          }
          border-bottom: .0625rem solid #ddd
        }
        .show-toys-small{
          display: flex;
          justify-content: space-around;
          li{
            display: flex;
            width:calc(100% / 3);
            justify-content: center;
            flex-direction: column;
            align-items: center;
            padding: .5rem;
            box-sizing: border-box;
            img{
              width: 100%;
            }
            .toys-name{
              width: 100%;
              overflow: hidden;
              text-overflow:ellipsis;
              white-space: nowrap;
            }
            .toys-price{
              color: rgb(182, 69, 69);
              font-size: 0.875rem;
              span{
                font-size: 1rem;
              }
            }
          }
        }
      }
    }
    .you-like{
      h4{
        font-size: 0.8rem;
        color: #777;
        text-align: center;
        line-height: 2rem;
      }
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
  }
}
</style>
