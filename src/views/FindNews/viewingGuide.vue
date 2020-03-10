<template>
  <div class="viewingGuide">
    <div class="banner">
      <div class="banner-pic">
      <img :src="viewingGuideBanner.posterUrl" alt="">
      </div>
      <div class="banner-title">
        <img :src="viewingGuideBanner.posterUrl" alt="">
        <div>
          <h2>{{viewingGuideBanner.movieName}}</h2>
          <p>{{viewingGuideBanner.title}}</p>
        </div>
      </div>
    </div>
    <div class="viewe-list">
      <ul>
        <li v-for="item in vieweValuate" :key="item.id">
          <h3>{{item.title | setStr}}</h3>
          <div>
            <img :src="item.userImage" alt="">
            <span class="user">{{item.nickname}}-评分</span>
            <span class="movie-name">《{{item.relatedObj.title}}》</span>
            <span class="movie-grade">{{item.rating}}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import http from '@/util/http'
export default {
  data () {
    return {
      viewingGuideBanner: [],
      vieweValuate: []
    }
  },
  mounted () {
    http.get('/Service/callback.mi/PageSubArea/GetRecommendationIndexInfo.api?t=20203710484434096')
      .then(res => {
        this.viewingGuideBanner = res.data.review
      })
    http.get('/Service/callback.mi/MobileMovie/Review.api?needTop=false&t=20203711185351074')
      .then(res => {
        this.vieweValuate = res.data
        console.log(this.vieweValuate)
      })
  }
}
</script>

<style scoped lang="scss">
ul,li{
  list-style: none;
}
  .viewingGuide{
    .banner{
      width: 100%;
      position: relative;
      .banner-pic{
        width: 100%;
        height: 13.125rem;
        overflow: hidden;
        img{
          width: 100%;
        }
      }
      .banner-title{
        width: 100%;
        height: 4.625rem;
        padding: .9375rem;
        background: rgba(0,0,0,0.5);
        position: absolute;
        bottom: 0;
        left: 0;
        box-sizing: border-box;
        img{
          width: 4.625rem;
          float: left;
          transform: translateY(-54%);
          border: .0625rem snow solid;
          box-sizing: border-box;
        }
        div{
          float:right;
          width: calc(100% - 4.625rem);
          padding: 0 .9375rem;
          box-sizing: border-box;
          h2{
            font-size: 1.5rem;
            color: #fff;
            line-height: 1.625rem;
          }
          p{
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            color: #ddd;
          }
        }
      }
    }
    .viewe-list{
      padding: 0 .9375rem ;
      box-sizing: border-box;
      ul{
        width: 100%;
        li{
          padding: .9375rem 0;
          border-bottom: solid .0625rem #ddd;
          position: relative;
          h3{
            margin-bottom: .9375rem;
          }
          div{
            display: flex;
            img{
              width: 1.5625rem;
              height: 1.5625rem;
              border-radius: 50%;
            }
            .movie-name{
              font-weight: bold;
            }
            .movie-grade{
              color: snow;
              background: #659d0e;
              border-radius: 10%;
              line-height: 1.5rem;
              position: absolute;
              top: .6875rem;
              right: 0;
            }
          }
        }
      }
    }
  }
</style>
