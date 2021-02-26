<template>
  <div id="nav-bar">
    <div class="left" @click="goBack()">
      <slot name="left">
        <i class="iconfont icon-left"></i>
      </slot>
    </div>
    <div class="center"><slot></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
  import {useRouter} from 'vue-router';
  export default {
    name: "NavBar",
    setup() {
      const router = useRouter();
      const goBack = () => {
        router.go(-1);
      }
      return {
        goBack
      }
    }
  }
</script>

<style scoped lang="scss">
  #nav-bar{
    width: 100%;
    height: 45px;
    line-height: 45px;
    color: #ffffff;
    text-align: center;
    background-color: var(--color-tint);
    display: flex;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    box-shadow: 0 2px 0 rgba(100, 100, 100, .2);
    z-index: 999;

    .left, .right{
      width: 50px;
    }

    .left i.iconfont{
      font-size: 20px;
    }

    .center {
      flex: 1;
      font-size: var(--font-size);
    }
  }
</style>