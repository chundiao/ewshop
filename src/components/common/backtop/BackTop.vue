<template>
  <div class="back-top" @click="backTop">
    <i class="iconfont icon-back_top"></i>
  </div>
</template>

<script>
  export default {
    name: "BackTop",
    setup(props, {emit}) {
      return {
        backTop: () => {
          emit('backTop');
        }
      }
    }
  }
</script>

<style scoped lang="scss">

  .back-top {
    position: fixed;
    bottom: 70px;
    right: 15px;
    z-index: 9999;

    i.iconfont{
      font-size: 40px;
    }
  }
</style>