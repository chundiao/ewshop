<template>
  <div id="detail">

    <nav-bar>
      <template v-slot:default>
        <div>图书详情</div>
      </template>
    </nav-bar>

    <div>{{temid}}</div>

  </div>

</template>

<script>
  import NavBar from "@/components/common/navbar/NavBar"
  import {useRoute} from "vue-router"
  import {ref} from "vue";
  export default {
    name: "Detail",
    setup() {
      const route = useRoute();
      let temid = ref(0);
      temid = route.params.id;

      return {
        temid
      }

    },
    components: {
      NavBar
    }
  }
</script>

<style scoped lang="scss">
  #detail {
    margin-top: 45px;
  }
</style>