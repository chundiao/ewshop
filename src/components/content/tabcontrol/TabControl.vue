<template>
  <div id="tab-control">
    <div v-for="(item, index) in tabControlList"
         :key="index"
         class="tab-control-item"
         :class="{'tab-control-item-active': index === currentIndex}"
         @click="clickItem(index)">
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
  import {ref} from 'vue';
  export default {
    name: "TabControl",
    props: {
      tabControlList: {
        type: Array,
        default() {
          return [];
        }
      }
    },
    setup(props,{emit}) {

      let currentIndex = ref(0);

      let clickItem = index => {
        currentIndex.value = index;
        emit('tabClick', index)
      }

      return {
        currentIndex,
        clickItem
      }

    }
  }
</script>

<style scoped lang="scss">
  #tab-control {
    display: flex;
    padding: 15px 0;
    font-size: var(--font-size);
    position: sticky;
    left: 0;
    right: 0;
    top: 44px;
    background-color: #ffffff;
    z-index: 9;

    .tab-control-item {
      flex: 1;
    }

    .tab-control-item-active {
      color: var(--color-tint);
      span{
        border-bottom: 3px solid var(--color-tint);
        padding: 5px;
      }
    }
  }
</style>