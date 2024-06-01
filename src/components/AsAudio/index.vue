<template>
  <div>
    <audio ref="audio" crossorigin="anonymous">
      <source src="../../../static/audio/Avicii-WeBurn.mp3" type="audio/mpeg" />
    </audio>
    <button style="z-index: 100; position: absolute" @click="play">Play</button>
    <button style="z-index: 100; position: absolute; left: 50px" @click="pause">
      Pause
    </button>
    <button style="z-index: 100; position: absolute; left: 100px" @click="stop">
      Stop
    </button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { Howl, Howler } from "howler";

type Props = {
  audioList: string[] | string;
};
const { audioList = ["../../static/audio/Avicii-WeBurn.mp3"] } =
  defineProps<Props>();

const sound = new Howl({
  src: audioList,
  // autoplay: true,
  // loop: true,
  volume: 0.5,
});
const play = () => {
  sound.play();
};
const pause = () => {
  sound.pause();
};
const stop = () => {
  sound.stop();

};

sound.on("load", function () {
  console.log("音频已加载");
  sound.stereo();
});

sound.on("play", function () {
  console.log("音频开始播放");
});

sound.on("end", function () {
  console.log("音频播放结束");
});

onMounted(async () => {
  // // 获取音频
  // const response = await fetch("../../../static/audio/Avicii-WeBurn.mp3");
  // const arrayBuffer = await response.arrayBuffer();
  // const audioContext = new window.AudioContext();
  // const buffer = await audioContext.decodeAudioData(arrayBuffer);
  // const source = audioContext.createBufferSource();
  // source.buffer = buffer;
  // const analyser = audioContext.createAnalyser();
  // analyser.fftSize = 2048;
  // const bufferLength = analyser.frequencyBinCount;
  // const dataArray = new Uint8Array(bufferLength);
  // source.connect(analyser);
  // analyser.connect(audioContext.destination);
  // sSource.value = source;
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
