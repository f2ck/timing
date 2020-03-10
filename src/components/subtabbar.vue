<template>
  <div>
    <footer class="footer">
      <nav class="link">
        <ul class=" table_v_c">
          <router-link to="/Home" tag="li">首页</router-link>
          <router-link to="/BuyTicket" tag="li">购票</router-link>
          <router-link to="/ShopMarket" tag="li">商城</router-link>
          <router-link to="/FindNews" tag="li">发现</router-link>
          <router-link to="/Center" tag="li">我的</router-link>
        </ul>
      </nav>
      <div class="footlink">
        <ul class=" table_vh_c">
          <li class="">
            <span>PC版</span>
          </li>

          <li class="">
            <span>客户端下载</span>
          </li>

          <li class="">
            <span>意见反馈</span>
          </li>

          <li class="">
            <span>帮助中心</span>
          </li>
        </ul>
      </div>
      <div class="copy">
        <p>
          <span>Copyright </span><span class="copytime">2006-2020</span>
          <span> Mtime.com Inc. All rights reserved.</span>
        </p>
      </div>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
.footer {
 width: 100%;
  background: #f6f6f6;
  border-top: 1px solid #f6f6f6;
  .link {
    background: #fff;

    .table_v_c {
      display: flex;
      padding-left: 1.9375rem;

      li {
        height: 3.0625rem;
        color: blue;
        flex: 1;
        list-style: none;
        font-size: 1.3rem;
        line-height: 3.0625rem;
      }
    }
  }
  .footlink {
    .table_vh_c {
      display: flex;
      // padding-left: 1.9375rem;
      li {
        height: 3.0625rem;
        color: black;
        flex: 1;
        list-style: none;
        font-size: 0.75rem;
        line-height: 3.0625rem;
        text-align: center;
      }
    }
  }
  .copy {
    padding-left: 1.45rem;
    span {
      font-size: 0.2rem;
      color: #cdcdcd;
    }
  }
}
</style>
