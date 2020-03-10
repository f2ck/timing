<template>
  <div class="news">
    <ul class="nav">
      <router-link to="/FindNews/news" tag="li" active-class="active">新闻</router-link>
      <router-link to="/FindNews/trailer" tag="li" active-class="active">预告片</router-link>
      <router-link to="/FindNews/topList" tag="li" active-class="active">排行榜</router-link>
      <router-link to="/FindNews/viewingGuide" tag="li" active-class="active">影评</router-link>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>

</script>

<style scoped lang="scss">
  .news{
    position: relative;
    top: 3.125rem;
    left: 0;
    .nav{
      display: flex;
      width: 100%;
      list-style: none;
      background: fff;
      li{
        flex: 1;
        line-height: 2.9375rem;
        text-align: center;
      }
      .active{
        color: coral;
      }
    }
  }
</style>
