<template>
  <div class="recommends">
    <div v-for="item in goods.slice(0, 4)" :key="item.id" class="recommend-item" @click="itemDetail(item.id)" >
      <div class="icon"><img v-lazy="item.cover_url" alt=""></div>
      <div class="title">{{ item.title }}</div>
    </div>
  </div>
</template>

<script>
  import {useRouter} from 'vue-router'
  export default {
    name: "RecommendView",
    props: {
      goods: {
        type: Array,
        default() {
          return []
        }
      }
    },
    setup(props) {

      const router = useRouter();

      let itemDetail = (id) => {
        router.push(`/detail/${id}`)
      }

      return {
        itemDetail
      }
    }
  }
</script>

<style scoped lang="scss">
  .recommends {
    display: flex;
    padding-bottom: 25px;
    border-bottom: 12px solid rgba(100, 100, 100, .1);
    .recommend-item {
      flex: 1;
      .icon {
        margin-bottom: 8px;
        img {
          width: 90px;
        }
      }

      .title {
        font-size: 12px;
      }
    }
  }
</style>