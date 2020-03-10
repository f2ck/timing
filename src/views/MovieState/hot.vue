<template>
  <div>
    <ul>
      <li v-for="item in hotList" :key="item.id">
        <div class="Hotplaying">
          <div class="imgContainer">
            <img :src="item.img" alt="" />
          </div>
          <div class="nowPlayingFilm-info">
            <p class="nowPlayingFilm-name info-col">
              <span class="name">{{ item.t }}</span
              >&nbsp;
              <span class="grade" v-if="item.r != -1">{{ item.r }}</span>
            </p>
            <p class="nowPlayingFilm-grade info-col">
              <span class="label" v-if="item.commonSpecial != ''">{{
                item.commonSpecial
              }}</span>
            </p>
            <div class="nowPlayingFilm-type info-col">
              <p class="type1" v-if="item.isIMAX">IMAX</p>
              <p class="type2" v-if="item.isDMAX">中国巨幕</p>
            </div>

            <p class="nowPlayingFilm-detail info-col">
              <span class="play-num">{{item.NearestCinemaCount}}家影院上映{{item.NearestShowtimeCount}} 场</span>
              <van-button
                class="van-btn"
                round
                type="info"
                size="small"
                color="orange"
                >购票</van-button
              >
            </p>
          </div>
        </div>
      </li>
    </ul>
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
      hotList: []
    }
  },
  mounted () {
    this.gethotList()
  },
  methods: {
    async gethotList () {
      const { data: res } = await http.request({
        url:
          '/Service/callback.mi/Showtime/LocationMovies.api?locationId=292&t=20203610163626810'
      })
      console.log(res.ms)
      this.hotList = res.ms
    }
  }
}
</script>
<style lang="scss" scoped>
.Hotplaying {
  height: 9.1875rem;
  margin-top: 0.1875rem;
  padding-left: 0.3125rem;
  display: flex;
  p {
    margin-bottom: 0;
  }
  .imgContainer {
    width: 4.75rem;
    height: 7.225rem;
    // border: 1px solid pink;
    margin-top: 0.5625rem;
    img {
      width: 4.75rem;
      height: 7.225rem;
    }
  }
  .nowPlayingFilm-info {
    width: 17.125rem;
    height: 6.875rem;

    margin-top: 0.5625rem;
    margin-left: 0.9375rem;

    .nowPlayingFilm-name .name {
      max-width: calc(100% - 25px);
      color: #191a1b;
      font-size: 1.2rem;
      font-weight: bold;
      height: 1.375rem;
      line-height: 1.375rem;
      margin-right: 0.3125rem;

    }
    .nowPlayingFilm-name .grade {
      color: white;
      font-size: 14px;
      background-color: #659d0e;
    }
    .nowPlayingFilm-grade {
      height: 0.875rem;
      line-height: 0.875rem;
      padding: 0 0.125rem;
      margin-top: 0.575rem;
      .label {
        font-size: 1rem;
        margin-top: 0.25rem;
        color: #659d0e;
      }
    }
    .nowPlayingFilm-type {
      display: flex;
      margin-top: 0.5625rem;
      .type1 {
        height: 1.0625rem;
        border: 0.0625rem solid #659d0e;
        font-size: 0.2125rem;
        padding: 0.025rem 0.25rem;
        color: #659d0e;
        box-sizing: border-box;
        line-height: 1.0625rem;
      }
      .type2 {
        height: 1.0625rem;
        border: 0.0625rem solid #659d0e;
        font-size: 0.2125rem;
        padding: 0.025rem 0.25rem;
        color: #659d0e;
        box-sizing: border-box;
        line-height: 1.0625rem;
        margin-left: 0.1875rem;
      }
    }
    .nowPlayingFilm-detail {
      margin-top: 0.925rem;
      .play-num {
        color: #999999;
        font-size: 0.5rem;
      }
      .van-btn {
        margin-left: 6.425rem;
      }
    }
  }
}
</style>
