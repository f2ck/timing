<template>
  <div class="newslist">
    <div class="banner">
      <img :src="bannerPic.imageUrl" alt="">
      <h2><b>{{bannerPic.title}}</b></h2>
    </div>
    <ul class="main">
      <li v-for="item in newsList" :key="item.id" class="m-list">
        <div v-if="item.type === 0 || item.type === 2" class="type0">
          <div class="new-pic">
            <img :src="item.image" alt="">
          </div>
          <div class="new-title">
            <h3>{{item.title | setStr}}</h3>
            <p>
              <span>{{item.publishTime | setMoment}}</span>
              <span v-if="item.commentCount!=0">评论 {{item.commentCount}}</span>
            </p>
          </div>
        </div>

        <div v-if="item.type===1" class="type1">
          <h3>
            {{item.title | setStr}}
          </h3>
          <ul>
            <li v-for="data in item.images" :key="data.url1">
              <img :src="data.url1" alt="">
            </li>
          </ul>
          <p>
            <span>{{item.publishTime | setMoment}}</span>
            <span v-if="item.commentCount!=0">评论 {{item.commentCount}}</span>
          </p>
        </div>

      </li>
    </ul>
  </div>
</template>

<script>
import http from '@/util/http'
import moment from 'moment'
import filter from '@/util/filter'
export default {
  data () {
    return {
      bannerPic: {},
      newsList: []
    }
  },
  mounted () {
    http.get('/Service/callback.mi/News/NewsList.api')
      .then(res => {
        this.newsList = res.data.newsList
      })
    http.get('/Service/callback.mi/PageSubArea/GetRecommendationIndexInfo.api')
      .then(res => {
        this.bannerPic = res.data.news
      })
  },
  filters: {
    setMoment (time) {
      var date = new Date()
      const num = date.getTime()
      if (moment(num).format('M-D') === moment(time * 1000).format('M-D')) {
        return moment(time * 1000).format('h') + '小时前'
      } else {
        return moment(time * 1000).format('M-D')
      }
    }
    // setStr (str) {
    //   const xx = str.replace(/[^\u0000-\u00ff]/g, 'a').length
    //   if (xx >= 14) {
    //     return str.substr(0, 14) + '...'
    //   }
    // }
  }
}
</script>

<style lang="scss" scoped>
ul,li{
  list-style: none;
}
  .newslist{
    width: 100%;
    .banner{
      height: 13.125rem;
      overflow: hidden;
      position: relative;
      img{
        width: 100%;
      }
      h2{
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
    .main{
      padding: 0 .625rem;
      font-family: "helvetica neue","微软雅黑";
      li{
        padding: .9375rem 0;
        box-sizing: border-box;
      }
      .m-list{
        border-bottom: 1px solid #ddd;
        .type0{
          display: flex;
          .new-pic{
            width: 10.4375rem;
            height: 5.4375rem;
            overflow: hidden;
            background: #ddd;
            img{
              width: 100%;
              height: 100%;
              object-fit:cover;
            }
          }
          .new-title{
            padding: 0 .625rem;
            width: 100%;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            p{
              width: 100%;
              span{
                width: 50%;
                display: inline-block;
                color: rgb(116, 112, 112);
              }
            }
          }
        }
        .type1{
          h3{
            width: 100%;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            box-sizing: border-box;
            text-align: left;
            margin-left: .5rem;
          }
          ul{
            display: flex;
            width: 100%;
            margin-bottom: .625rem;
            li{
              height: 4.75rem;
              width: calc(100% / 3);
              padding: .1875rem;
              overflow: hidden;
              img{
                object-fit:cover;
                width: 100%;
                height: 100%;
              }
            }
          }
          p{
            width: 100%;
            span{
              width: 50%;
              display: inline-block;
              color: rgb(116, 112, 112);
            }
          }
        }
      }
    }
  }
</style>
