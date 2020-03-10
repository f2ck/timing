<template>
  <div class="searchContainer"
    <section class="m_bg_white ">
      <div class="movie_search">
        <div class="hea_search">
          <div class="table_v_c">
            <router-link  to="/Citylist" style="color:black">
            <div class="cityshow">
              <p class="H4">{{cityName}}</p>
              <van-icon name="arrow-down" />
            </div>
              </router-link>
            <p class="input_td">
              <van-field
                v-model="value"
                autosize
                left-icon="search"
                input-align="left"
                placeholder="影片/影院/影人,任你搜"
                @click="goSearch"
              />
            </p>

          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import Vue from 'vue'
import {mapState} from 'vuex'
import { Icon, Field } from 'vant'
Vue.use(Icon).use(Field)
export default {
  data () {
    return {
      value: ''
    }
  },
  computed:{
   ...mapState("city",["cityName"])
  },
  methods: {
    goSearch () {
      this.$router.push({ name: 'Search' })
    }
  }
}
</script>
<style lang="scss" scoped>

.m_bg_white {
  background-color: #ffffff;

  .movie_search {
    width: 100%;
    height: 3.75rem;
    padding-left: 0.63rem;
    box-sizing: border-box;
    background-color: #f6f6f6;
    .table_v_c {
      width: 21.1875rem;
      height: 2.7625rem;
      // border: 1px solid black;
      display: flex;
      .cityshow {
        width: 4.4125rem;
        height: 100%;
        text-align: center;
        line-height: 2.7625rem;
        display: flex;
        margin-top: 0.625rem;
        .H4{
         font-size: 1.25rem;
        }
        .van-icon {
          font-size: 1rem;
          margin-top: 0.6125rem;
        }
      }
      .input_td {
        width: 15.625rem;
        .van-field {
          border-radius: 0.3875rem;
          margin-top: 0.625rem;
        }
      }
    }
  }
}

</style>
