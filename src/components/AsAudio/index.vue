<template>
  <div>
    <canvas class="webgl"></canvas>
    <button style="z-index: 100; position: absolute" @click="play">Play</button>
    <button style="z-index: 100; position: absolute;left:60px" @click="pause">Pause</button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import visualVertex from "@shaders/visual/vertex.glsl";
import visualFragment from "@shaders/visual/fragment.glsl";

const mediaElement = ref();
const analyser = ref();
const uniform = ref();
let scene: any;
let camera: any;
let renderer: any;
let controls: any;
const fftSize = 4096;
const clock = new THREE.Clock();

let mesh: THREE.Mesh

const init = () => {
  const canvas = document.querySelector("canvas.webgl");
  // Scene
  scene = new THREE.Scene();

  uniform.value = {
    uTime: { value: 0 },
    tAudioData: { value: 0 },
    uStrength: { value: 0 },
  };

  const material = new THREE.ShaderMaterial({
    uniforms: uniform.value,
    vertexShader: visualVertex,
    fragmentShader: visualFragment,
    // wireframe: true,
  });

  // const geometry = new THREE.SphereGeometry(0.5, 256, 256);
  const geometry = new THREE.IcosahedronGeometry(2.5, 50)
  mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
  /**
   * Sizes
   */
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  };
  window.addEventListener("resize", () => {
    // Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });

  /**
   * Camera
   */
  // Base camera
  camera = new THREE.PerspectiveCamera(
    75,
    sizes.width / sizes.height,
    0.1,
    100
  );
  camera.position.set(0, 0, 5);
  scene.add(camera);

  /**
   * Renderer
   */
  renderer = new THREE.WebGLRenderer({
    canvas: canvas as HTMLElement,
  });
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor("#111");

  // Controls
  controls = new OrbitControls(camera, canvas as HTMLElement);
  // controls.enableDamping = true;
};

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  controls?.update();

  // Update material

  // console.log(analyser.value?.data);
  // console.log(uniform.value?.tAudioData);
  updateOffsetData()

  if (uniform.value?.uTime) {

    uniform.value.uTime.value = elapsedTime;
  }

  // Render
  renderer.render(scene, camera);
  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

const updateOffsetData = () => {
  // if (analyser.value?.getFrequencyData) {
  //   analyser.value.getFrequencyData();
  //   const analyserData = analyser.value?.data;
  //   const length = mesh.geometry.attributes.aOffset.count;
  //   for (let i = 0; i < length; i++) {
  //     const offset = analyserData[i % analyserData.length] / 255;
  //     mesh.geometry.attributes.aOffset.array[i] = offset;
  //   }
  //   mesh.geometry.attributes.aOffset.needsUpdate = true;
  // }
  if (analyser.value?.getFrequencyData) {
    analyser.value.getFrequencyData();
    const analyserData = analyser.value?.data;
    let sum = 0;
    for (let i = 0; i < analyserData.length; i++) {
      sum += analyserData[i];
    }
    sum /= analyserData.length * 255;
    uniform.value.uStrength.value = sum;

  }
}

const play = () => {
  const listener = new THREE.AudioListener();
  const audio = new THREE.Audio(listener);
  const file = "../../static/audio/Avicii-WeBurn.mp3";
  mediaElement.value = new Audio(file);
  mediaElement.value.play();
  audio.setMediaElementSource(mediaElement.value);
  analyser.value = new THREE.AudioAnalyser(audio, fftSize)
};

const pause = () => {
  mediaElement.value.pause();
}
onMounted(async () => {
  init();
  tick();
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
