<template>
  <div class="searchContainer">
    <div class="search-head">
      <van-icon name="arrow-left" size="40" color="#ffffff" @click="goback" />
      <van-search
        v-model="value"
        shape="round"
        background="#1c2653"
        @clear="onclear"
        placeholder="影片/影院/影人，任你搜"
        @input.native="onInput"
      />
    </div>
    <div class="main">
      <article class="search_key onlykey">
        <p>
          <b>42,560</b><span>部影视剧集</span><b>12,462</b><span>位影人</span>
        </p>
      </article>
      <h4 class="search_title"><b>热门搜索</b></h4>
      <article class="search_hot">
        <ul class="hotlist">
          <li v-for="(item, index) in keywords" :key="index">{{ item }}</li>
        </ul>
      </article>
    </div>
    <div class="search-list" v-show="searchIsshow">
      <div class="searchsho" @click="goshop">
        <van-icon name="point-gift" size="2rem" />
        <div class="i_shopbox">在商城中搜索“{{ value }}”</div>
        <van-icon
          name="arrow"
          size="1.5rem"
          style="margin-left:55px;margin-top:5px;"
        />
      </div>
      <ul>
        <li v-for="item in suggestionsList" :key="item.id">
          <div class="search_pic">
            <img :src="item.cover" class="m_img img_box" />
          </div>
          <dl class="td">
            <dt>
              <strong>{{ item.titlecn }} ({{ item.year }})</strong>
              <span>[{{ item.contentType }}]</span>
            </dt>
            <dd class="m_f_tip">
              <span>{{ item.titleen }}</span>
            </dd>
            <dd>
              <span
                >{{ item.contentType }}, {{ item.movieType }},
                {{ item.rLocation }}</span
              >
            </dd>
          </dl>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import Vue from 'vue'
import { Icon, Search, Toast } from 'vant'
import http from '@/utils/http'
Vue.use(Search)
  .use(Icon)
  .use(Toast)

export default {
  data () {
    return {
      value: '',
      keywords: [],
      searchIsshow: false
    }
  },
  mounted () {
    this.hide()
    this.getkeywords()
  },
  destroyed () {
    this.show()
  },
  methods: {
    ...mapMutations('tabbar', ['hide', 'show']),
    ...mapMutations('Market', ['suggestions']),
    goshop(){
       this.$router.push('/ShopListShow')
    },
    onInput () {
      this.searchIsshow = true
      this.$store.dispatch('Market/searchInp', this.value).then(res => {
        Toast.clear()
      })
    },

    onclear () {
      this.searchIsshow = false
    },
    goback () {
      this.$router.back()
    },
    async getkeywords () {
      const { data: res } = await http.request({
        url: '/Service/callback.mi/Search/HotKeyWords.api?t=2020361954411137'
      })
      this.keywords = res.keywords
    }
  },
  computed: {
    ...mapState('Market', ['suggestionsList'])
  }
}
</script>

<style lang="scss" scoped>
.searchContainer {
  position: relative;
  height: 100%;
  .search-head {
    background-color: #1c2653;
    height: 3.1875rem;
    display: flex;
    padding-left: 0.9375rem;
    .van-icon {
      line-height: 3.1875rem;
    }
    .van-search {
      width: 17.5rem;
    }
  }

  .main {
    height: calc(100% - #{10.625rem});
    .onlykey {
      padding: 0.625rem 0 0.75rem 0.5rem;
      height: auto;
      min-height: 4.3625rem;
      p b {
        margin-left: 0.75rem;
        font-size: 1.8125rem;
        font-weight: bold;
        line-height: 4.0625rem;
        color: #e3e3e3;
      }
      p span {
        color: #e3e3e3;
        padding: 0.6875rem 0.25rem;
      }
    }
    .search_title {
      background: #f6f6f6;
      border-bottom: 1px solid #dfdfdf;
      border-top: 1px solid #dfdfdf;
      color: #999;
      padding: 0.625rem 0.625rem;
    }
    .search_hot {
      padding: 0.625rem 0 0.75rem 0.5rem;
      height: auto;
      min-height: 4.3625rem;
      .hotlist {
        width: 96%;
        height: 4.3625rem;

        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        li {
          width: 26%;
          height: 1.8rem;
          border: 1px solid #1e7dd7;
          border-radius: 0.9875rem;
          line-height: 2rem;
          text-align: center;
          color: #1e7dd7;
        }
      }
    }
  }
  .search-list {
    width: 100%;
    height: 110%;
    background-color: white;
    position: absolute;
    top: 3.1875rem;
    z-index: 999;
    .searchsho {
      position: relative;
      border-bottom: 1px solid #d8d8d8;
      margin-left: 1.5rem;
      display: flex;
      .i_shopbox {
        font-size: 1.4rem;
        padding-left: 1.5rem;
        height: 2rem;
        background-size: 2rem auto;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 100%;
      }
    }
    ul {
      li {
        display: flex;
        border-bottom: 1px solid #d8d8d8;
        padding: 0.625rem 1.55rem;
        box-sizing: border-box;
        .search_pic {
          img {
            height: 4.75rem;
          }
        }
        .td {
          margin-left: 0.625rem;
        }
      }
    }
  }
}
</style>
