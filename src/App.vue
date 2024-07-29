<template>
  <div>
    <!-- 音乐可视化 -->
    <AsAudio />
    <!-- 着色器案例 -->
    <!-- <AsArtful/> -->
  </div>
</template>

<script setup lang="ts">
import AsAudio from "@components/AsAudio/index.vue";
import AsArtful from "@components/AsArtful/index.vue";
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
