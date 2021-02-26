<template>
  <div class="category">

    <nav-bar>
      <template v-slot:default>
        <div>商品分类</div>
      </template>
    </nav-bar>

    <div class="main-box">

      <div class="order-tab">
        <van-tabs @click="getOrderId" v-model="active">
          <van-tab title="销量排序"></van-tab>
          <van-tab title="评论排序"></van-tab>
          <van-tab title="价格排序"></van-tab>
        </van-tabs>
      </div>

      <van-sidebar v-model="activeKey" class="left-menu">

        <van-collapse v-model="activeName" accordion>
          <van-collapse-item v-for="(category, index) in categories"
                             :title="category.name"
                             :name="index"
                             :key="category.id">

            <van-sidebar-item v-for="sub in category.children"
                              :key="sub.id"
                              :title="sub.name"
                              @click="getCategoryId(sub.id)"/>
          </van-collapse-item>

        </van-collapse>
      </van-sidebar>

      <div class="goods-list">
        <div class="content">
          <van-card
              v-for="item in showGoods"
              :key="item.id"
              :price="item.price"
              :title="item.title"
              :thumb="item.cover_url"
          />
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import {getCategory, getGoods} from "@/network/category";
import {computed, nextTick, onMounted, reactive, ref, watchEffect} from "vue";
import BetterScroll from 'better-scroll';
import {getHomeGoods} from "@/network/home";

export default {
  name: "Category",
  setup() {

    let activeKey = ref(0);

    let activeName = ref(0)

    let categories = ref([])

    let active = ref(2);

    let curOrderType = ref('sales')
    let categoryId = ref(2);

    let bScroll = reactive({});

    // 获取排序类型
    let getOrderId = (index) => {
      let orderType = ['sales', 'comments_count', 'price']

      curOrderType.value = orderType[index];
      getGoods(curOrderType.value, categoryId.value).then(res => {
        goods[curOrderType.value].list = res.data.goods.data;
      })


      console.log('当前排序：' + curOrderType.value);
      console.log('当前类别：', categoryId.value);
    }
    // 获取分类id
    let getCategoryId = (cid) => {
      categoryId.value = cid;
      getGoods(curOrderType.value, categoryId.value).then(res => {
        goods[curOrderType.value].list = res.data.goods.data;
      })

      nextTick(() => {
        bScroll && bScroll.refresh();
      })

      console.log('当前排序：' + curOrderType.value);
      console.log('当前类别：', categoryId.value);
    }
    // 数据模型
    let goods = reactive({
      sales: {page: 1, list: []},
      comments_count: {page: 1, list: []},
      price: {page: 1, list: []}
    })
    // 展示的数据
    let showGoods = computed(() => goods[curOrderType.value].list)

    onMounted(() => {
      getCategory().then(res => {
        categories.value = res.data.categories
      })

      getGoods(curOrderType.value, categoryId.value).then(res => {
        goods[curOrderType.value].list = res.data.goods.data;
      })

      // 创建BetterScroll对象
      bScroll = new BetterScroll(document.querySelector('.goods-list'), {
        probeType: 3, // 0, 1, 2, 3   3: 只要在运动就触发scroll事件
        click: true,  // 是否允许点击
        pullUpLoad: true // 上拉加载更多，默认是false
      })

      //上拉加载数据，触发pullingUp
      bScroll.on('pullingUp', () => {

        const page = goods[curOrderType.value].page + 1;

        getHomeGoods(curOrderType.value, page).then(res => {
          res && goods[curOrderType.value].list.push(...res.data.goods.data);
          goods[curOrderType.value].page += 1;
        });

        // 完成上拉，等数据请求完成，要将新数据展示出来
        bScroll.finishPullUp();

        // 重新计算高度
        nextTick(() => {
          bScroll && bScroll.refresh();
        })

      })

      watchEffect(() => {
        nextTick(() => {
          bScroll && bScroll.refresh();
        })
      })

    })

    return {
      categories,
      active,
      getOrderId,
      getCategoryId,
      showGoods,
      activeName,
      activeKey
    }

  },
  components: {
    NavBar
  }
}
</script>

<style lang="scss" scoped>
.category {
  .main-box {
    position: relative;
    .order-tab {
      flex: 1;
      float: right;
      height: 50px;
      position: fixed;
      top: 45px;
      left: 130px;
      right: 0;
      z-index: 99;
    }

    .left-menu {
      width: 130px;
      position: fixed;
      top: 95px;
      left: 0;
    }

    .goods-list {
      flex: 1;
      position: absolute;
      top: 100px;
      left: 130px;
      right: 0;
      height: 100vh;
      padding: 10px;
      margin-top: 100px;

    }
  }
}
</style>