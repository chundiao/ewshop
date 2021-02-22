<template>
  <div class="home">

    <nav-bar>
      <template v-slot:default>
        <div>图书兄弟</div>
      </template>
    </nav-bar>

    <div class="banner">
      <img src="@/assets/images/banner.png" alt="">
    </div>

    <recommend-view :goods="recommends"></recommend-view>

    <tab-control class="" :tabControlList="['畅销','新书','精选']" @tabClick="tabClick"></tab-control>

    <goods-list :showGoods="showGoods"></goods-list>

  </div>
</template>

<script>
  import NavBar from "@/components/common/navbar/NavBar"
  import {getHomeAllData, getHomeGoods} from "@/network/home"
  import {onBeforeMount, ref, reactive, computed} from 'vue'
  import RecommendView from "@/views/home/childcomp/RecommendView";
  import TabControl from "@/components/content/tabcontrol/TabControl";
  import GoodsList from "@/components/content/goods/GoodsList";

  export default {
    name: 'Home',
    setup() {

      // 商品列表数据模型
      const goods = reactive({
        sales: {page: 0, list: []},
        new: {page: 0, list: []},
        recommend: {page: 0, list: []}
      })

      let recommends = ref([]);

      let currentType = ref('sales')

      let tabClick = (index) => {
        let types = ['sales','new','recommend'];
        currentType.value = types[index];
      }

      let showGoods = computed(() => {
        return goods[currentType.value].list;
      })

      onBeforeMount(() => {
        getHomeAllData().then((res) => {
          recommends.value = res.data.goods.data;
        }).catch(err => {
        });

        getHomeGoods('sales').then((res) => {
          goods.sales.list = res.data.goods.data;
        }).catch(err => {
        });

        getHomeGoods('recommend').then((res) => {
          goods.recommend.list = res.data.goods.data;
        }).catch(err => {
        });

        getHomeGoods('new').then((res) => {
          goods.new.list = res.data.goods.data;
        }).catch(err => {
        });

      });

      return {
        recommends,
        showGoods,
        tabClick
      };
    },
    components: {
      NavBar,
      RecommendView,
      TabControl,
      GoodsList
    }
  }
</script>

<style scoped lang="scss">
  .banner{
    margin: 45px 0 15px;
    img {
      width: 100%;
    }
  }

</style>
