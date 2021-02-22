<template>
  <div class="profile">
    <nav-bar>
      <template v-slot:default>
        <div>个人中心</div>
      </template>
    </nav-bar>
  </div>
</template>

<script>

  import NavBar from "@/components/common/navbar/NavBar";
  export default {
    name: "Profile",
    components: {
      NavBar
    }
  }
</script>

<style scoped>

</style>