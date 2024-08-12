<template>
  <div>
    <canvas class="webgl"></canvas>
    <button style="z-index: 100; position: absolute" @click="play">Play</button>
    <button style="z-index: 100; position: absolute; left: 60px" @click="pause">
      Pause
    </button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import WeBurnMusic from "@assets/audio/Avicii-WeBurn.mp3";
import CustomShaderMaterial from "three-custom-shader-material/vanilla";

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

let mesh: THREE.Mesh;

const init = () => {
  const canvas = document.querySelector("canvas.webgl");
  // Scene
  scene = new THREE.Scene();
  uniform.value = {
    uTime: { value: 0 },
    tAudioData: { value: 0 },
    uStrength: { value: 0 },
  };
  const material = new CustomShaderMaterial({
    baseMaterial: THREE.MeshStandardMaterial,
    uniforms: uniform.value,
    roughness: 0.7,
    vertexShader: visualVertex,
    fragmentShader: visualFragment,
  });
  const depthMaterial = new CustomShaderMaterial({
    baseMaterial: THREE.MeshDepthMaterial,
    uniforms: uniform.value,
    depthPacking: THREE.RGBADepthPacking,
    vertexShader: visualVertex,
    fragmentShader: visualFragment,
  });

  const geometry = new THREE.IcosahedronGeometry(2.5, 50);
  mesh = new THREE.Mesh(geometry, material);
  mesh.customDepthMaterial = depthMaterial;
  mesh.castShadow = true;
  scene.add(mesh);

  const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(25, 25),
    new THREE.MeshStandardMaterial()
  );
  plane.rotation.x = -Math.PI * 0.5;
  plane.position.y = -5;
  plane.receiveShadow = true;

  scene.add(plane);

  /**
   * Lights
   */
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight("#ffffff", 0.3);
  directionalLight.castShadow = true;
  directionalLight.shadow.mapSize.set(1024, 1024);
  directionalLight.shadow.camera.far = 40;
  directionalLight.castShadow = true;
  directionalLight.position.set(2, 2, -2);
  scene.add(directionalLight);
  const directionalLightCameraHelper = new THREE.CameraHelper(
    directionalLight.shadow.camera
  );
  scene.add(directionalLightCameraHelper);
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
  camera.position.set(4, 4, 6);
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
  renderer.shadowMap.enabled = true;

  // Controls
  controls = new OrbitControls(camera, canvas as HTMLElement);
};

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  controls?.update();
  // Update material
  updateOffsetData(elapsedTime);
  renderer.render(scene, camera);
  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

const updateOffsetData = (elapsedTime: number) => {
  if (uniform.value?.uTime) {
    uniform.value.uTime.value = elapsedTime;
  }
  if (analyser.value?.getFrequencyData) {
    analyser.value.getFrequencyData();
    const analyserData = analyser.value?.data;
    let sum = 0;
    for (let i = 0; i < analyserData.length; i++) {
      sum += analyserData[i];
    }
    sum /= analyserData.length * 25.5;
    uniform.value.uStrength.value = sum;
  }
};

const play = () => {
  const listener = new THREE.AudioListener();
  const audio = new THREE.Audio(listener);
  mediaElement.value = new Audio(WeBurnMusic);
  mediaElement.value.play();
  audio.setMediaElementSource(mediaElement.value);
  analyser.value = new THREE.AudioAnalyser(audio, fftSize);
};

const pause = () => {
  mediaElement.value.pause();
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
