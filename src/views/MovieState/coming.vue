<template>
  <div class="upcoming">
    <div class="mosemovie">
      <h2 class="title">
        <b>最受关注</b>
        <span>（{{ attention.length }}部）</span>
      </h2>
      <div class="filmscroll" v-for="item in attention" :key="item.id">
        <ul class="table transition4" style="width: 329px; left: 5px;">
          <li>
            <time
              ><span>{{ item.rMonth }}月{{ item.rDay }}日</span></time
            >
            <div class="table movielist">
              <div class="upmovie_pic">
                <img class="m_img img_box" :src="item.image" />
              </div>
              <div class="upmovie_txt td">
                <dl>
                  <dt>
                    <b>{{ item.title }}</b>
                  </dt>
                  <dd>
                    <p>
                      <b class="color">{{ item.wantedCount }}</b> 人想看 - 剧情
                    </p>
                    <p class="txt_elli">导演：{{ item.director }}</p>
                    <p class="txt_elli">
                      演员：{{ item.actor1 }},{{ item.actor2 }}
                    </p>
                    <div class="btns" v-if="item.videos.length">
                      <van-button round type="info" plain size="small"
                        >预告片</van-button
                      >
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div class="commovie">
      <h2 class="title">
        <b>即将上映</b>
        <span>(48部)</span>
      </h2>
      <div class="commovielist">
        <div v-for="month in months" :key="month">
          <p class="months">{{ month }}月</p>
          <ul class="cominglist">
            <li v-for="item in coming" :key="item.id">
              <p class="day">{{ item.rDay }}日</p>
              <p class="pic"><img :src="item.image" alt="" /></p>
              <div class="cominginfo">
                <dl>
                  <dt>
                    <b>{{ item.title }}</b>
                  </dt>
                  <dd>
                    <p>
                      <b class="color">{{ item.wantedCount }}</b> 人想看 - 剧情
                    </p>
                    <p class="txt_elli">导演：{{ item.director }}</p>
                    <p class="txt_elli">
                      演员：{{ item.actor1 }},{{ item.actor2 }}
                    </p>
                    <div class="btns" v-if="item.videos.length">
                      <van-button
                        v-if="item.isTicket"
                        round
                        type="info"
                        color="orange"
                        size="small"
                        >超前预售</van-button
                      >
                      <van-button round type="info" plain size="small"
                        >预告片</van-button
                      >
                    </div>
                  </dd>
                </dl>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { Button } from 'vant'
import http from '@/utils/http'
Vue.use(Button)
export default {
  data () {
    return {
      attention: [],
      coming: [],
      months: []
    }
  },
  mounted () {
    this.getAttention()
    this.getcomings()
  },
  methods: {
    async getAttention () {
      const { data: res } = await http.request({
        url:
          '/Service/callback.mi/Movie/MovieComingNew.api?locationId=292&t=2020361148485700'
      })
      this.attention = res.attention
    },
    async getcomings () {
      const { data: res } = await http.request({
        url:
          '/Service/callback.mi/Movie/MovieComingNew.api?locationId=974&t=20203615322384062'
      })

      this.coming = res.moviecomings
      const newarr = res.moviecomings.map(item => item.rMonth)
      this.months = Array.from(new Set(newarr))
    }
  }
}
</script>
<style lang="scss" scoped>
dl {
  width: 12.5rem;
  padding-top: 0.125rem;
  box-sizing: border-box;
}
.table,
.table_v,
.table_v_c,
.table_h_c,
.table_vh_c {
  width: 100%;
  display: -webkit-box;
  display: -moz-box;
  display: box;
}
.filmscroll .movielist .upmovie_txt dl {
  width: 12.4375rem;
}
.movielist .upmovie_txt dl {
  padding-top: 0.05em;
  min-height: 10.2em;
}

.upcoming {
  padding-left: 0.875rem;
  .title {
    height: 1.75rem;
    font-size: 1.2625rem;
    > span {
      color: grey;
    }
  }
  .filmscroll {
    padding-top: 1.5rem;

    margin-right: -1.5em;
    z-index: 0;
    overflow-x: auto;
    overflow: hidden;
    .transition4 {
      -webkit-transition: 0.4s all;
      -moz-transition: 0.4s all;
      -o-transition: 0.4s all;
      -ms-transition: 0.4s all;
      transition: 0.4s all;
      > li {
        position: relative;
        border-top: 1px solid #777;
        border-right: 1px solid #777;
        height: 10.6875rem;
        time {
          background: #fff;
          color: #777;
          position: absolute;
          left: 0;
          top: -1.0625rem;
          padding: 0 0.4375rem 0 0;
        }
        .upmovie_pic {
          width: 8.5em;
          height: 12.75em;
          margin-top: 0.725rem;
          .m_img {
            width: 6.5875rem;
            height: auto;
            display: block;
          }
        }
        .upmovie_txt {
          margin-top: 0.725rem;
          dl {
            dt {
              b {
                font-size: 1rem;
              }
            }
            dd {
              .color {
                color: orange;
              }
              .btns {
                margin-top: 1.625rem;
              }
            }
          }
        }
      }
    }
  }
}

.commovie {
  padding-top: 1.09375rem;
  .commovielist {
    .months {
      color: black;
      border-bottom: 1px solid #bbb;
      padding-top: 0.875rem;
      padding-bottom: 0.875rem;
    }
    .cominglist {
      > li {
        border-bottom: 1px solid grey;
        padding-top: 0.5125rem;

        display: flex;
        box-sizing: border-box;
        .pic {
          margin-left: 0.625rem;
          img {
            width: 4.75rem;
          }
        }
        .cominginfo {
          margin-left: 0.625rem;
          dl {
            dt {
              b {
                font-size: 1rem;
              }
            }
            dd {
              box-sizing: border-box;
              .color {
                color: orange;
              }
              .btns {
                margin-top: 0.525rem;

                margin-bottom: 0.5rem;
                .van-button:nth-child(2) {
                  margin-left: 0.3875rem;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
