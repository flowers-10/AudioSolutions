import { Howl, Howler } from "howler"; // esm

export const AUDIO_LIST: string[] = ["../../static/audio/Avicii-WeBurn.mp3"];

export const useAudio = () => {
  const sound = new Howl({
    src: AUDIO_LIST,
    // autoplay: true,
    // loop: true,
    volume: 0.5,
  });
  sound.on("load", function () {
    console.log("音频已加载");
  });

  sound.on("play", function () {
    console.log("音频开始播放");
  });

  sound.on("end", function () {
    console.log("音频播放结束");
  });
};
