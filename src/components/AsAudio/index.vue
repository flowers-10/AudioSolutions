<template>
  <div>
    <canvas class="webgl"></canvas>
    <button style="z-index: 100; position: absolute" @click="play">Play</button>
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
const fftSize = 128;
const clock = new THREE.Clock();

const init = () => {
  const canvas = document.querySelector("canvas.webgl");
  // Scene
  scene = new THREE.Scene();

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
  camera.position.set(0, 0, 2);
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
  analyser.value?.getFrequencyData && analyser.value.getFrequencyData();
  // console.log(analyser.value?.data);
  // console.log(uniform.value?.tAudioData);

  if (uniform.value?.tAudioData) {
    uniform.value.tAudioData.value = analyser.value.data[0] 
    // uniform.value.tAudioData.value.needsUpdate = true;
  }
  if (uniform.value?.uTime) {
    
    uniform.value.uTime.value = elapsedTime;
  }

  // Render
  renderer.render(scene, camera);
  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

const play = () => {
  const listener = new THREE.AudioListener();
  const audio = new THREE.Audio(listener);
  const file = "../../static/audio/Avicii-WeBurn.mp3";
  mediaElement.value = new Audio(file);
  mediaElement.value.play();
  audio.setMediaElementSource(mediaElement.value);
  analyser.value = new THREE.AudioAnalyser(audio, fftSize);
  
  uniform.value = {
    uTime: { value: 0 },
    tAudioData: {
      value:
        analyser.value.data      // value: new THREE.DataTexture(
      //   analyser.value.data,
      //   fftSize / 2,
      //   1,
      //   THREE.RedFormat
      // ),
    },
  };

  const material = new THREE.ShaderMaterial({
    uniforms: uniform.value,
    vertexShader: visualVertex,
    fragmentShader: visualFragment,
    // wireframe: true,
  });

  const geometry = new THREE.SphereGeometry(0.5, 256, 256);
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
};
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
