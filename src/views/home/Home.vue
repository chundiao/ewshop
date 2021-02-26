<template>
  <div class="home">

    <nav-bar>
      <template v-slot:default>
        <div>图书兄弟</div>
      </template>
    </nav-bar>

    <tab-control v-show="isTabFixed" :tabControlList="['畅销','新书','精选']" @tabClick="tabClick"></tab-control>

    <div class="wrapper">
      <div class="content">
        <div ref="banref">

          <home-swiper :banners="banners"></home-swiper>

          <recommend-view :goods="recommends"></recommend-view>

        </div>

        <tab-control :tabControlList="['畅销','新书','精选']" @tabClick="tabClick"></tab-control>

        <goods-list :showGoods="showGoods"></goods-list>

      </div>
    </div>

    <back-top v-show="isShowBackTop" @backTop="bTop"></back-top>

  </div>
</template>

<script>
  import NavBar from "@/components/common/navbar/NavBar"
  import {getHomeAllData, getHomeGoods} from "@/network/home"
  import {nextTick, watchEffect, onMounted, onBeforeMount, ref, reactive, computed} from 'vue'
  import RecommendView from "@/views/home/childcomp/RecommendView";
  import TabControl from "@/components/content/tabcontrol/TabControl";
  import GoodsList from "@/components/content/goods/GoodsList";
  import BetterScroll  from 'better-scroll';
  import BackTop from "@/components/common/backtop/BackTop";
  import HomeSwiper from "@/views/home/childcomp/HomeSwiper";

  export default {
    name: 'Home',
    setup() {

      let isTabFixed = ref(false);

      let isShowBackTop = ref(false);

      let banref = ref(null);

      // 商品列表数据模型
      const goods = reactive({
        sales: {page: 1, list: []},
        new: {page: 1, list: []},
        recommend: {page: 1, list: []}
      })

      const banners = ref([])

      let recommends = ref([]);

      let currentType = ref('sales');

      let tabClick = (index) => {
        let types = ['sales','new','recommend'];
        currentType.value = types[index];

        nextTick(() => {
          bScroll && bScroll.refresh();
        })
      }

      let showGoods = computed(() => {
        return goods[currentType.value].list;
      })

      onBeforeMount(() => {
        getHomeAllData().then((res) => {
          console.log(res);
          recommends.value = res.data.goods.data;
          banners.value = res.data.slides;
        });

        getHomeGoods('sales').then((res) => {
          goods.sales.list = res.data.goods.data;
        });

        getHomeGoods('recommend').then((res) => {
          goods.recommend.list = res.data.goods.data;
        });

        getHomeGoods('new').then((res) => {
          goods.new.list = res.data.goods.data;
        });

      });

      let bScroll = reactive({});

      onMounted(() => {

        // 创建BetterScroll对象
        bScroll = new BetterScroll(document.querySelector('.wrapper'), {
          probeType: 3, // 0, 1, 2, 3   3: 只要在运动就触发scroll事件
          click: true,  // 是否允许点击
          pullUpLoad: true // 上拉加载更多，默认是false
        })

        bScroll.on('scroll',(position) => {

          isShowBackTop.value = isTabFixed.value = -position.y >= banref.value.offsetHeight;

        })

        //上拉加载数据，触发pullingUp
        bScroll.on('pullingUp', () => {

          const page = goods[currentType.value].page + 1;

          getHomeGoods(currentType.value, page).then(res => {
              goods[currentType.value].list.push(...res.data.goods.data);
              goods[currentType.value].page += 1;

          });

          // 完成上拉，等数据请求完成，要将新数据展示出来
          bScroll.finishPullUp();

          // 重新计算高度
          bScroll.refresh();

        })

      })

      watchEffect(() => {
        nextTick(() => {
          bScroll && bScroll.refresh();
        })
      })

      let bTop = () => {
          bScroll && bScroll.scrollTo(0, 0, 500);
      }

      return {
        recommends,
        showGoods,
        tabClick,
        isTabFixed,
        banref,
        isShowBackTop,
        bTop,
        HomeSwiper,
        banners
      };
    },
    components: {
      NavBar,
      RecommendView,
      TabControl,
      GoodsList,
      BackTop,
      HomeSwiper
    }
  }
</script>

<style scoped lang="scss">
  .home {
    position: relative;
    height: 100vh;
    .wrapper{
      position: absolute;
      top: 45px;
      bottom: 49px;
      left: 0;
      right: 0;
      overflow: hidden;

      .content {

        .banner{
          margin-bottom: 15px;
          img {
            width: 100%;
          }
        }

      }
    }
  }


</style>
