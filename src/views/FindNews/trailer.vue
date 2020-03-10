<template>
  <div class="trailer" v-if="trailerList!=[]">
    <div class="banner" v-if="serBanner">
      <img :src="serBanner.coverImg" alt="">
      <h3><b>{{serBanner.movieName}}</b></h3>
    </div>
    <ul class="t-ul-list">
      <li v-for="item in ulList" :key="item.movieId">
        <div class="ul-list-pic">
          <img :src="item.coverImg" alt="">
          <i class="iconfont icon-iconfontplay2"></i>
        </div>
        <div class="ul-list-title">
          <h4>
            {{item.movieName}}
          </h4>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import http from '@/util/http'
export default {
  data () {
    return {
      trailerList: []
    }
  },
  mounted () {
    http.get('/discovery/trailerList.api')
      .then(res => {
        this.trailerList = res.data.data.trailers
      })
  },
  computed: {
    serBanner () {
      return this.trailerList[0]
    },
    ulList () {
      return this.trailerList.slice(1)
    }
  }
}
</script>

<style lang="scss" scoped>
  .trailer{
    .banner{
      padding: 0;
      margin: 0;
      position: relative;
      height: 13.125rem;
      img{
        width: 100%;
      }
      h3{
        text-align: center;
        position: absolute;
        bottom: 0;
        left: 0;
        background:rgba(0,0,0,0.5);
        width: 100%;
        b{
          font-size: 1.125rem;
          color: #fff;
          line-height: 2.875rem;
        }
      }
    }
    .t-ul-list{
      list-style: none;
      padding: 0 15px;
      box-sizing: border-box;
      li{
        display: flex;
        width: 100%;
        padding: .625rem 0;
        border-bottom: .0625rem #ddd solid;
        .ul-list-pic{
          width: 9.125rem;
          position: relative;
          img{
            width: 100%;
          }
          i{
            position: absolute;
            bottom: .2rem;
            right: .2rem;
            color: #fff;
            font-size: 2.2rem;
          }
        }
        .ul-list-title{
          width: calc(100% - 9.125rem);
          padding: .3125rem;
        }
      }
    }
  }
</style>
