<template>
  <div>
    <ul class="nav">
      <li>
        <div>
          <img src="http://static1.mtime.cn/html5/20200116143308/images/2014/logo_mtime.png" alt="">
        </div>
      </li>
      <router-link to="/Home" tag="li" active-class="active" @click.native="overly">首页</router-link>
      <router-link to="/theater/id/cinema"  tag="li" active-class="active" @click.native="overly">购票</router-link>
      <router-link to="/ShopMarket"  tag="li" active-class="active" @click.native="overly">商城</router-link>
      <router-link to="/FindNews"  tag="li" active-class="active" @click.native="overly">发现</router-link>
      <router-link to="/Center"  tag="li" active-class="active" @click.native="overly"><i class="iconfont icon-account" style="font-size:1.3rem"></i></router-link>
    </ul>
  </div>
</template>

<script>
import Vue from "vue"
import { Toast } from 'vant'
import {mapState} from 'vuex'
Vue.use(Toast)
export default {
  computed:{
   ...mapState('city',"cityId")
  },
  methods:{
    overly(){
      Toast.loading({
        message: '加载中...',
        forbidClick: true,
        overlay:true, //是否显示背景遮罩层
        duration:1500 //不会消失
      });
    }
  }
}
</script>

<style scoped lang="scss">
  .nav{
    height: 3.125rem;
    width: 100%;
    display: flex;
    list-style: none;
    background: #1c2635;
    position: fixed;
    top:0;
    left: 0;
    z-index: 2;
    li{
      flex: 1;
      overflow: hidden;
      font-family: "helvetica neue","微软雅黑";
      color: #bbb;
      text-align: center;
      line-height: 3.125rem;
      box-sizing: border-box;
      div{
        width: 100%;
        height: 100%;
        overflow: hidden;
        img{
          width: 100%;
        }
      }
    }
    .active{
      color: #fff;
      border-bottom: .1875rem solid #fff;
    }
  }
</style>
