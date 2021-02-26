<template>
  <div id="goods-list-item">
    <div class="icon"><img v-lazy="product.cover_url" alt=""></div>
    <div class="title">{{ product.title }}</div>
    <div class="price">
      <small>￥</small>{{ product.price }}
    </div>
    <div class="collect">
      <i @click="toCollect" class="iconfont icon-collect"
         :class="{'active': isCollect}"></i>{{ product.collects_count }}
    </div>
  </div>
</template>

<script>
  import {ref} from "vue";

  export default {
    name: "GoodsListItem",
    setup() {
      let isCollect = ref(false);

      let toCollect = () => {
        console.log('--');
        isCollect.value = !(isCollect.value);
      }

      return {
        isCollect,
        toCollect
      }
    },
    props: {
      product: {
        type: Object,
        default() {
          return {}
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  #goods-list-item{
    padding: 8px 0;
    position: relative;
    .icon{

      img{
        width: 180px;
      }
    }

    .title {
      font-size: var(--font-size);
      margin-bottom: 8px;
    }

    .price{
      color: red;
      margin-right: 34px;
      font-size: 14px;
    }

    .collect{
      position: absolute;
      bottom: 9px;
      right: 50px;
      font-size: 14px;
      i.iconfont{
        color: #d6d6d6;
        margin-right: 2px;
        font-size: 14px;
      }
      i.active{
        color: red;
      }
    }

  }
</style>