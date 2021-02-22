<template>
  <nav-bar>
    <template v-slot:default>
      <div>购物车</div>
    </template>
  </nav-bar>
</template>

<script>

  import NavBar from "@/components/common/navbar/NavBar";
  export default {
    name: "ShopCart",
    components: {
      NavBar
    }
  }
</script>

<style scoped>

</style>