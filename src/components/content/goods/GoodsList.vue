<template>
  <div class="goods-list">
    <goods-list-item v-for="item in showGoods" :product="item" :key="item.id"></goods-list-item>
  </div>
</template>

<script>
  import GoodsListItem from "@/components/content/goods/GoodsListItem";
  export default {
    name: "GoodsList",
    props: {
      showGoods: {
        type: Array,
        default() {
          return []
        }
      }
    },
    components: {
      GoodsListItem
    }
  }
</script>

<style scoped lang="scss">
  .goods-list{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
</style>