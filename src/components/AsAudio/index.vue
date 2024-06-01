<template>
  <div>
    <audio ref="audio" crossorigin="anonymous">
      <source src="../../../static/audio/Avicii-WeBurn.mp3" type="audio/mpeg" />
    </audio>
    <button style="z-index: 100; position: absolute" @click="sSource.start()">
      Play
    </button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import * as THREE from "three";
const sSource = ref();
onMounted(async () => {
  // 获取音频
  const response = await fetch("../../../static/audio/Avicii-WeBurn.mp3");
  const arrayBuffer = await response.arrayBuffer();

  const audioContext = new window.AudioContext();
  const buffer = await audioContext.decodeAudioData(arrayBuffer);

  const source = audioContext.createBufferSource();
  source.buffer = buffer;

  const analyser = audioContext.createAnalyser();
  analyser.fftSize = 2048;
  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);

  source.connect(analyser);
  analyser.connect(audioContext.destination);
  sSource.value = source;
});
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

.webgl {
  position: fixed;
  top: 0;
  left: 0;
  outline: none;
}
</style>
