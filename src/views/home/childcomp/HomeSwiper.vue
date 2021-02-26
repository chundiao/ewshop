<template>
  <div class="siper">
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(item, index) in banners" :key="index">
        <img v-lazy="item.img_url" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
  export default {
    name: "HomeSwiper",
    props: {
      banners: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  div.siper{
    margin-bottom: 15px;
  }
  img{
    width: 100%;
  }
</style>