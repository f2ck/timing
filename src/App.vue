<template>
  <div id="app">
    <tabbar v-if="isTabbar"></tabbar>
    <v-touch @swipeleft="onSwipeLeft" @swiperight="onSwipeLeft">
      <transition name="animate" mode="out-in">
        <router-view></router-view>
      </transition>
    </v-touch>
    <subtabbar class="sub"> </subtabbar>
  </div>
</template>

<script>
import tabbar from '@/components/tabbar'
import subtabbar from '@/components/subtabbar'
import { mapState } from 'vuex'
import Vue from "vue"
var VueTouch = require('vue-touch')
Vue.use(VueTouch, {name: 'v-touch'})
export default {
  components: {
    tabbar,
    subtabbar
  },
  computed: {
    ...mapState('tabbar', ['isTabbar'])
  },
  methods:{
    onSwipeLeft(){
      this.$router.back()
    }
  }
}
</script>

<style lang="scss">

  .animate-enter-active{
    animation: switch .5s;
  }
  .animate-leave-active{
    animation: switch .5s reverse;
  }
  @keyframes switch {
    0%{
      opacity: 0;
    }
    100%{
      opacity: 1;
    }
  }

html,body,#app{
  height: calc(100% - #{2.525rem});
}
*{
  margin: 0;
  padding: 0;
}
#app{
  position: relative;
}
</style>
