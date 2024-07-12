<template>
  <div>
    <!-- <AsEthereal/> -->
    <!-- <AsAudio /> -->
    <!-- <AsArtful/> -->
    <!-- <AsSmartBusiness /> -->
     <AsSmartCommunity />
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
})

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
