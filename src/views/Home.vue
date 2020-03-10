<template>
  <div>
    <div class="wrap_cont" style="min-height: 490px;">
      <!-- 搜索组件 -->
      <my-search style="margin-top:3.125rem"></my-search>
      <section class="indexmovie" :key="hotMovieList.length">
        <router-link to="/Films"
          ><h2>
            <b style="color:black;">正在热映（{{ hotMovieList.length }}部）</b>
            <van-icon name="arrow" color="#000000" />
          </h2>
        </router-link>
        <ul class="hotlist">
          <li
            v-for="item in hotMovieList"
            :key="item.movieId"
            class="hotlistmovie"
          >
            <div class="mpic">
              <img :src="item.img" class="img_box" />
              <em class="m_score" v-show="item.r != -1"
                ><i>{{ item.r }}</i></em
              >
            </div>
            <p class="hotlistname">
              <span>{{ item.t }}</span>
            </p>
          </li>
        </ul>
      </section>
      <section class="indexmovie indexclick" :key="totalComingMovie">
        <router-link to="/Film/coming">
          <h2>
            <b style="color:black;">即将上映（{{ totalComingMovie }}部）</b>
            <van-icon style="margin-left:120px" name="arrow" color="#000000" />
          </h2>
        </router-link>
      </section>
      <section class="m_bg_gray" style="min-height: 589px;">
        <div class="shopmid">
          <img :key="Mallarea.goodsId" :src="Mallarea.image" class="m_img" />
        </div>
        <div class="todayhot">
          <h2>今日热点</h2>
          <ul class="hotpoints">
            <li v-for="(item, index) in TodayTopic" :key="index">
              <div
                v-show="item.tag != '广告'"
                v-if="item.styleType === 2"
                class="styleType2"
              >
                <div class="todaypic_bigimg">
                  <img class="m_img img_box" :src="item.images[0].imgUrl" />
                  <van-icon name="play-circle-o" size="50" color="white" />
                </div>
                <div class="todaytxt">
                  <h2 class="hotpointTitle">
                    {{ item.title }}
                  </h2>
                  <p><span></span></p>
                  <p class="Time">
                    {{ item.publishTime | dateFilter }}
                  </p>
                </div>
              </div>
              <div
                v-show="item.tag != '广告'"
                v-if="item.styleType === 3"
                class="styleType3"
              >
                <h2 class="styleType3Title">
                  {{ item.title }}
                </h2>
                <div class="table piclist">
                  <p class="td" v-for="(i, index) in item.images" :key="index">
                    <img class="m_img img_box" :src="i.imgUrl" />
                  </p>
                </div>
                <p class="Time">
                  <time>{{ item.publishTime | dateFilter }}</time>
                </p>
              </div>
              <div
                v-show="item.tag != '广告'"
                v-if="item.styleType === 1"
                class="styleType1"
              >
                <div class="todaypic">
                  <img class="m_img img_box" :src="item.images[0].imgUrl" />
                </div>
                <div class="td1">
                  <h2 class="styleType3Title">
                    {{ item.title }}
                  </h2>

                  <p class="Time">
                    <time>{{ item.publishTime | dateFilter }}</time>
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </section>
      <div class="findMore" @click="getMoreTopic"><p>查看更多</p></div>
    </div>
  </div>
</template>

<script>
import http from '@/utils/http'
import Vue from 'vue'
import { Icon, Field } from 'vant'
import { mapState } from 'vuex'
Vue.use(Icon).use(Field)
export default {
  data () {
    return {
      hotMovieList: [],
      totalComingMovie: '',
      Mallarea: '',
      TodayTopic: []
    }
  },
  mounted () {
    this.gethotMovieList()
    this.gettotalComingMovie()
    this.getMallarea()
    this.getTodayTopic()
  },
  computed: {
    ...mapState('city', ['cityId'])
  },
  methods: {
    async gethotMovieList () {
      const { data: res } = await http.request({
        url: `/Service/callback.mi/Showtime/LocationMovies.api?locationId=${this.cityId}&t=20203811493954690`
      })
      this.hotMovieList = res.ms
    },
    async gettotalComingMovie () {
      const { data: res } = await http.request({
        url: `/Service/callback.mi/Showtime/LocationMovies.api?locationId=${this.cityId}&t=202035932410459`
      })

      this.totalComingMovie = res.totalComingMovie
    },
    async getMallarea () {
      const { data: res } = await http.request({
        url:
          '/Service/callback-mall.mi/PageSubArea/MallAreaFirstH5Url.api?t=20203510565526604'
      })
      this.Mallarea = res.areaFirst
    },
    async getTodayTopic () {
      const { data: res } = await http.request({
        url: 'ajax/article/originalInfoList.api'
      })
      this.TodayTopic = res.data.list
    },
    async getMoreTopic () {
      const t = this.TodayTopic.slice(-1)[0].publishTime
      const { data: res } = await http.request({
        url: `ajax/article/originalInfoList.api?t=202031019474416583&locationId=371&time=${t}`
      })
      const newarr = res.data.list
      for (let i = 0; i < newarr.length; i++) {
        this.TodayTopic.push(newarr[i])
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.indexmovie {
  box-sizing: border-box;
  border-top: 1px solid rgba($color: grey, $alpha: 0.5);
  h2 {
    position: relative;
    zoom: 1;
    height: 3.625rem;
    width: 21.25rem;
    margin-left: 0.625rem;
    font-size: 1.3125rem;
    line-height: 2.625rem;
    box-sizing: border-box;
    .van-icon {
      display: inline-block;
      margin-left: 9.375rem;
    }
  }
  .hotlist {
    display: flex;
    overflow: hidden;
    flex-wrap: wrap;
    max-height: 20.125rem;
    .hotlistmovie {
      text-align: center;
      position: relative;
      margin-left: 0.725rem;
      .m_score {
        position: absolute;
        top: 0.525rem;
        left: 2.5rem;
        width: 1.925rem;
        height: 1.125rem;
        background-color: #659d0e;
      }
      .mpic {
        .img_box {
          width: 4.75rem;
          height: 7.0625rem;
        }
      }
      .hotlistname {
        width: 4.575rem;
      }
    }
  }
}
.indexclick {
  margin-top: 1.625rem;
}
.m_bg_gray {
  background: #f6f6f6;
  padding-top: 0.625rem;
  border-top: 1px solid rgba($color: grey, $alpha: 0.5);
  .shopmid {
    img {
      width: 100%;
    }
  }
  .todayhot {
    padding-top: 0.625rem;
    padding-left: 0.825rem;
    .hotpoints {
      margin-top: 0.625rem;
      width: 96%;
      li {
        margin-top: 0.625rem;
        height: auto;
        padding-top: 0.375rem;
        box-sizing: border-box;

        .styleType2 {
          border-bottom: 1px solid rgba($color: #999999, $alpha: 0.7);

          min-height: 15rem;
          .todaypic_bigimg {
            position: relative;
            // margin-bottom: 1.5em;
            .m_img {
              width: 21.1875rem;
              height: 10.375rem;
              display: block;
            }
            .van-icon {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
            }
          }
          .todaytxt {
            .hotpointTitle {
              margin-top: 0.3125rem;
              font-size: 1.2rem;
              color: #333333;
            }
            .Time {
              margin-top: 0.5125rem;
              color: #999999;
              height: 1.3125rem;
            }
          }
        }
        .styleType3 {
          border-bottom: 1px solid rgba($color: #999999, $alpha: 0.7);
          padding-bottom: 0.35rem;
          .styleType3Title {
            font-size: 1.2rem;
            color: #333333;
          }
          .piclist {
            display: flex;
            .td {
              margin-left: 0.2875rem;
              img {
                width: 6.8125rem;
                height: 4.625rem;
              }
            }
          }
          .Time {
            margin-top: 0.3125rem;
            color: #999999;
          }
        }
        .styleType1 {
          border-bottom: 1px solid rgba($color: #999999, $alpha: 0.7);

          padding-bottom: 0.35rem;
          display: flex;
          .todaypic {
            width: 8.1875rem;
            height: 5.75rem;
            img {
              width: 8.1875rem;
              height: 5.75rem;
            }
          }
          .td1 {
            margin-left: 0.625rem;
            .styleType3Title {
              font-size: 1.2rem;
              color: #333333;
            }
            .Time {
              margin-top: 0.4125rem;
              color: #999999;
            }
          }
        }
      }
    }
  }
}
.findMore {
  width: 100%;
  height: 3.125rem;
  text-align: center;
  line-height: 3.125rem;
  p {
    font-size: 18px;
    color: blue;
  }
}
</style>
