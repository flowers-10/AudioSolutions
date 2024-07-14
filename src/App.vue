<template>
  <div>
    <!-- 大美中国 -->
    <!-- <AsEthereal/> -->
    <!-- 音乐可视化 -->
    <!-- <AsAudio /> -->
    <!-- 着色器案例 -->
    <!-- <AsArtful/> -->
    <!-- 智慧商圈 -->
    <AsSmartBusiness />
    <!-- 智慧物业 -->
    <!-- <AsSmartCommunity /> -->
    <!-- 智慧工厂 -->
    <!-- <AsSmartFactory/> -->
    <!-- 智慧仓库 -->
    <AsSmartWarehouse />
  </div>
</template>

<script setup lang="ts">
import AsEthereal from "@components/AsEthereal/index.vue";
import AsAudio from "@components/AsAudio/index.vue";
import AsArtful from "@components/AsArtful/index.vue";
// import AsSmartBusiness from '@components/AsSmartBusiness/index.vue'
import { defineAsyncComponent } from "vue";

const AsSmartBusiness = defineAsyncComponent({
  loader: () => import("@components/AsSmartBusiness/index.vue"),
});

const AsSmartCommunity = defineAsyncComponent({
  loader: () => import("@components/AsSmartCommunity/index.vue"),
});

const AsSmartWarehouse = defineAsyncComponent({
  loader: () => import("@components/AsSmartWarehouse/index.vue"),
});

// const AsSmartFactory = defineAsyncComponent({
//   loader: () => import("@components/AsSmartFactory/index.vue"),
// });
// console.log(AsyncChild,1111);
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

html,
body {
  overflow: hidden;
}
</style>
