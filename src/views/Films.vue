<template>
  <div>
    <header class="header">

        <div class="table_v_c">
          <van-icon
            name="arrow-left"
            color="#ffffff"
            size="40"
            style="margin-top:5px;"
            @click="goback"
          />
          <div class="s_nav td">
            <ul class="table">
              <router-link tag="li" to="/Film/hot">
                <span>正在热映</span>
              </router-link>
              <router-link tag="li" to="/Film/coming">
                <span>即将上映</span>
              </router-link>
            </ul>
          </div>

        </div>

    </header>
    <my-search></my-search>
    <!-- 路由占位符 -->
     <router-view></router-view>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import Vue from 'vue'
import { Icon } from 'vant'
Vue.use(Icon)
export default {
  mounted () {
    this.hide()
  },
  destroyed () {
    this.show()
  },
  methods: {
    ...mapMutations('tabbar', ['hide', 'show']),
    goback () {
      this.$router.back()
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  height: 3.1875rem;
  position: relative;
  z-index: 2;
  background: #1e2837;

  .table_v_c {
    display: flex;

    .table {
      display: flex;
      width: 15.75rem;
      height: 1.9375rem;
      margin-left: 1.25rem;
      background-color: black;
      border-radius: 0.9875rem;
      margin-top: 0.6375rem;
      li {
        width: 7.875rem;
        text-align: center;

        span {
          color: wheat;
          line-height: 1.9375rem;
        }
      }
    }
  }
}
</style>
