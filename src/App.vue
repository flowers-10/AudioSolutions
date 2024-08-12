<template>
  <div>
    <!-- 音乐可视化 -->
    <AsAudio />
  </div>
</template>

<script setup lang="ts">
import AsAudio from "@components/AsAudio/index.vue";
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
