<template>
  <div class="top-list">
    <div class="top-banner">
      <img :src="topBanner.imageUrl" alt="">
      <h2><b>{{topBanner.title}}</b></h2>
    </div>
    <div class="nav">
      <ul>
        <li style="color:#1498c9">
          <i class="iconfont icon-hot" ></i>
          <p>时光Top100</p>
        </li>
        <li style="color:#3bc7c2">
          <i class="iconfont icon-favoritesfilling"></i>
          <p>华语Top100</p>
        </li>
        <li  style="color:#ffc12d">
          <i class="iconfont icon-logistic"></i>
          <p>全球票房榜</p>
        </li>
      </ul>
    </div>
    <div class="information">
      <ul>
        <li v-for="item in topAllList" :key="item.id">
          <h3>{{item.topListNameCn}}</h3>
          <p>{{item.summary}}</p>
          <i class="iconfont icon-more"></i>
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
      topBanner: [],
      topAllList: []
    }
  },
  mounted () {
    http.get('/Service/callback.mi/PageSubArea/GetRecommendationIndexInfo.api?t=20203710152456320')
      .then(res => {
        this.topBanner = res.data.topList
      })
    http.get('/Service/callback.mi/TopList/TopListOfAll.api?t=20203710152429611&pageIndex=1')
      .then(res => {
        console.log(res.data.topLists)

        this.topAllList = res.data.topLists
      })
  }
}
</script>

<style scoped lang="scss">
ul,li{
  list-style: none;
}
  .top-list{
    .top-banner{
      height: 13.125rem;
      position: relative;
      overflow: hidden;
      img{
        width: 100%;
      }
      h2{
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 3.125rem;
        background: rgba(0,0,0,0.5);
        text-align: center;
        b{
          color: #fff;
          line-height: 3.125rem;
        }
      }
    }
    .nav{
      padding: .9375rem;
      border-bottom: 1px solid #ddd;
      ul{
        display: flex;
        width: 100%;
        li{
          display: flex;
          flex: 1;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          i{
            font-size: 1.875rem;
          }
          p{
            font-size: .75rem;
          }
        }
      }
    }
    .information{
      padding: 0 .9375rem;
      ul{
        li{
          border-bottom: 1px #ddd solid;
          width: 100%;
          padding: .9375rem 0;
          position: relative;
          h3{
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            line-height: 2.5rem;
            width: 80%;
          }
          p{
            font-size: 12px;
            color: slategray;
            overflow: hidden;
            text-overflow: ellipsis;
            width: 65%;
            white-space: nowrap;
          }
          i{
            position: absolute;
            top: 50%;
            right: 0;
            font-size: 1.5rem;
            transform: translateY(-50%);
          }
        }
      }
    }
  }
</style>
