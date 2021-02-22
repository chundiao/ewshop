<template>
  <div id="goods-list-item">
    <div class="icon"><img :src="product.cover_url" alt=""></div>
    <div class="title">{{ product.title }}</div>
    <div class="price"><small>￥</small>{{ product.price }}</div>
  </div>
</template>

<script>
  export default {
    name: "GoodsListItem",
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
    padding: 8px;
    .icon{

      img{
        width: 110px;
        height: 130px;
      }
    }

    .title {
      font-size: var(--font-size);
      margin-bottom: 8px;
    }

    .price{
      color: red;
    }
  }
</style>