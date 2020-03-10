<template>
  <div class="cityContainer">
    <div class="search-head">
      <van-icon name="arrow-left" size="40" color="#ffffff" @click="goback" />
      <p class="chooose">选择城市</p>
    </div>

    <van-search v-model="value" placeholder="请输入搜索关键词" />

    <p class="hotcity">热门城市:</p>

    <ul class="hotcityList">
      <li v-for="item in hotcity" :key="item.id" @click="handlechangeCity(item)">{{ item.n }}</li>
    </ul>
    <div class="Acontainer" v-for="i in IndexList" v-if="i != ''">
      <p class="hotcity">
        {{ i[0] }}
      </p>
      <ul class="hotcityList">
        <li
          v-for="item in citylist"
          v-if="i[0] === item.pinyinFull.slice(0, 1).toUpperCase()"
          @click="handlechangeCity(item)"
        >
          {{ item.n }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import http from "@/utils/http";
import { mapState, mapMutations, mapGetters } from "vuex";
import { IndexBar, IndexAnchor, Cell, Search } from "vant";
Vue.use(IndexBar);
Vue.use(IndexAnchor);
Vue.use(Cell);
Vue.use(Search);

export default {
  data() {
    return {
      value: "",
      letterArr: [],
      citylist: [],
      hotcity: []
    };
  },
  mounted() {
    this.hide(), this.getCitylist();
    this.dataFilter();
  },
  destroyed() {
    this.show();
  },
  methods: {
    ...mapMutations("tabbar", ["hide", "show"]),
    ...mapMutations("city", ["setCityName", "setCityId"]),
    dataFilter() {
      for (var i = 65; i < 91; i++) {
        this.letterArr.push(String.fromCharCode(i));
      }
    },

    async getCitylist() {
      const { data: res } = await http.request({
        url:
          "/position/api/proxy/ticket/Showtime/HotCitiesByCinema.api?_=1583750661144"
      });
      this.citylist = res.p;
      this.hotcity = res.p.slice(0, 9);
      console.log(
        this.citylist.map(item => item.pinyinFull.slice(0, 1).toUpperCase())
      );

      console.log(this.hotcity);
    },
    goback() {
      this.$router.back();
    },
    handlechangeCity(data) {
      this.$router.push("/");
      this.setCityName(data.n);
      this.setCityId(data.id);
    }
  },
  computed: {
    IndexList() {
      const newarr = this.citylist.map(item => {
        return item.pinyinFull.slice(0, 1).toUpperCase();
      });

      const shortOne = [...Array.from(new Set(newarr))];
      var shortArr = [];
      for (let j = 0; j < this.letterArr.length; j++) {
        shortArr.push(shortOne.filter(item => item === this.letterArr[j]));
      }
      return shortArr;
    }
  }
};
</script>
<style lang="scss" scoped>
.cityContainer {
  z-index: 9999;
  height: 100%;
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  .search-head {
    background-color: #1c2653;
    height: 3.1875rem;
    display: flex;
    padding-left: 0.9375rem;
    .van-icon {
      line-height: 3.1875rem;
    }
    .chooose {
      width: 12.5rem;
      line-height: 3.1875rem;
      color: white;
      text-align: center;
      margin-left: 2.375rem;
      font-size: 1.3625rem;
    }
  }
  .hotcity {
    padding-left: 0.625rem;
    height: 2.25rem;
    background-color: #ebebeb;
    line-height: 1.75rem;
    color: #777777;
  }
  .hotcityList {
    min-height: 7.5625rem;
    // background-color: violet;
    padding: 0 1.0625rem 1.0625rem;
    display: flex;
    flex-wrap: wrap;
    // justify-content: space-between;
    align-content: space-between;
    li {
      box-sizing: border-box;
      width: 25%;
      height: 1.825rem;
      // border: 1px solid black;

      color: #333;
    }
  }
  .Acontainer {
  }
}
</style>
