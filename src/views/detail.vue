<template>
  <div class="detail">
    <div class="header">
      <ul>
        <li class="back"><i class="iconfont icon-back"></i></li>
        <li><i class="iconfont icon-favorite"></i></li>
        <li><i class="iconfont icon-skip"></i></li>
        <li><i class="iconfont icon-cart"></i></li>
      </ul>
    </div>
    <div class="swiper">
      <div class="swiper">
        <div class="swiper-container">
          <div class="swiper-wrapper">
              <div class="swiper-slide">
                <img  alt="">
              </div>
          </div>
          <div class="swiper-pagination"></div> <!--分页器-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import Swiper from 'swiper'
import 'swiper/css/swiper.min.css'
import http from '@/util/http'
export default {
  data () {
    return {

    }
  },
  mounted () {
    this.hide
    http.get('/Service/callback-mall.mi/product/detail.api?goodsId=106277&locationId=880&t=202037213149315')
      .then(res => {
        console.log(res.data)
      })
  },
  computed: {
    ...mapMutations('tabbar', ['hide', 'show'])
  },
  updated () {
    new Swiper()
  },
  destroyed () {
    this.show
  }
}
</script>

<style scoped lang="scss">
  .detail{
    .header{
      height: 3.125rem;
      background: #1c2635;
      width: 100%;
      ul{
        display: flex;
        list-style: none;
        height: 100%;
        li{
          color: #fff;
          float: right;
          flex: 1;
          height: 100%;
          line-height: 3.125rem ;
          i{
            font-size:1.5rem;
          }
        }
        .back{
          flex: 6;
        }
      }
    }
  }
</style>
