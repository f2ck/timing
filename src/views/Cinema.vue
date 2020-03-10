<template>
  <div class="theater">
    <div class="cityshow">
      <p class="cityname" @click="gocity">
        {{cityName}}
        <van-icon name="arrow-down" />
      </p>
      <van-search
        v-model="mytext"
        show-action
        placeholder="搜索影院"
        
        style="margin-left:.625rem"
      >
        <div slot="action"  style="margin-left:.925rem">
          搜索
        </div>
      </van-search>
    </div>
    <ul >
      <li class="cinemalist" v-for="item in Cinemalist" :key="item.cinemaId">
          <p class="cinemaName">{{item.cinameName}}</p>
          <p class="address">{{item.address}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import Vue from "vue";
import { Search } from "vant";
Vue.use(Search);
export default {
  data() {
    return {
        mytext:""
    };
  },
  mounted() {
    this.getCinemalist();
  },
  methods: {
    getCinemalist() {
    //   if (this.cinemaList.length === 0) {
        this.$store
          .dispatch("cinema/getCinemaAction", this.cityId)
          .then(res => {
            console.log("异步结束，已经存到vuex");
            
          });
    //   } else {
    //     console.log("cinema", "使用缓存");
    //     Toast.clear();
    //   }
    },
    gocity(){
        this.$router.push('/Citylist')
    }

  },
  computed:{
      ...mapState("cinema",["Cinemalist"]),
      ...mapState("city",["cityName","cityId"])

  }
};
</script>

<style lang="scss" scoped>
.theater {
  margin-top: 3.125rem;
  height: 100%;
  .cityshow {
    display: flex;
    .cityname {
      padding-top: 1.1125rem;
      margin-left: 0.625rem;
    }
  }
  ul{
      padding-left: .2875rem;
      .cinemalist{
          min-height:3.0875rem ;
          padding:.9375rem .9375rem .9375rem 0;
          border-bottom: .0625rem solid #7777;
          .cinemaName{
              margin-top: .3125rem;
          }
          .address{
              margin-top: .3125rem;
              color: #7777;
          }

      }
  }
}
</style>
