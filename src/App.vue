<template>
  <router-view/>

  <div id="tab-bar">
    <div class="tab-bar-item">
      <router-link to="/home">
        <div class="icon"><i class="iconfont icon-shouye"></i></div>
        <div class="text">首页</div>
      </router-link>
    </div>
    <div class="tab-bar-item">
      <router-link to="/category">
        <div class="icon"><i class="iconfont icon-category"></i></div>
        <div class="text">分类</div>
      </router-link>
    </div>
    <div class="tab-bar-item">
      <router-link to="/shopcart">
        <div class="icon"><i class="iconfont icon-cart"></i></div>
        <div class="text">购物车</div>
      </router-link>
    </div>
    <div class="tab-bar-item">
      <router-link to="/profile">
        <div class="icon"><i class="iconfont icon-ziliao"></i></div>
        <div class="text">我的</div>
      </router-link>
    </div>
  </div>

</template>

<style lang="scss">
@import "~assets/css/base.css";
@import "~assets/css/iconfont/iconfont.css";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#tab-bar {
  background-color: #f6f6f6;
  height: 49px;
  display: flex;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  box-shadow: 0 -2px 1px rgba(100, 100, 100, .2);
  z-index: 999;

  .tab-bar-item {
    flex: 1;
    padding: 5px 0;

    .icon {
      padding-bottom: 3px;

      i.iconfont{
        font-size: 18px;
      }
    }
    .text {
      font-size: var(--font-size);
    }
  }

  a {
    color: var(--color-text);

    &.router-link-exact-active {
      color: var(--color-hight-text);
    }
  }

}

</style>
