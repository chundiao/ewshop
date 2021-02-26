<template>
  <div class="profile">

    <nav-bar>
      <template v-slot:default>
        <div>个人中心</div>
      </template>
    </nav-bar>

    <back-top></back-top>

  </div>
</template>

<script>

  import NavBar from "@/components/common/navbar/NavBar";
  import BackTop from "@/components/common/backtop/BackTop";
  export default {
    name: "Profile",
    components: {
      NavBar,
      BackTop
    }
  }
</script>

<style scoped>

</style>