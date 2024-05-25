<template>
  <div>
    <audio ref="audio" crossorigin="anonymous">
      <source src="../../../static/audio/Avicii-WeBurn.mp3" type="audio/mpeg" />
    </audio>
    <button style="z-index: 100; position: absolute" @click="sSource.start()">
      Play
    </button>
    <canvas class="webgl"></canvas>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "lil-gui";
import testVertexShader from "@shaders/test/vertex.glsl";
import testFragmentShader from "@shaders/test/fragment.glsl";

import vaporwaveVertexShader from "@shaders/vaporwave/vertex.glsl";
import vaporwaveFragmentShader from "@shaders/vaporwave/fragment.glsl";

import octagramsVertexShader from "@shaders/octagrams/vertex.glsl";
import octagramsFragmentShader from "@shaders/octagrams/fragment.glsl";

const sSource = ref();
onMounted(async () => {
  /**
   * Base
   */
  // Debug
  // const gui = new dat.GUI()
  // Canvas
  const canvas = document.querySelector("canvas.webgl");
  // Scene
  const scene = new THREE.Scene();
  // Loaders
  const textureLoader = new THREE.TextureLoader();
  const iChannel0 = textureLoader.load("static/textures/Channel/iChannel0.png");
  const iChannel1 = textureLoader.load("static/textures/Channel/iChannel1.jpg");
  /**
   * Test mesh
   */
  // Geometry
  const geometry = new THREE.PlaneGeometry(5, 5, 32, 32);
  // Material
  const material = new THREE.ShaderMaterial({
    vertexShader: octagramsVertexShader,
    fragmentShader: octagramsFragmentShader,
    side: THREE.DoubleSide,
    transparent: true,
    uniforms: {
      iResolution: { value: new THREE.Vector2() },
      iMouse: { value: new THREE.Vector2() },
      r: { value: 0 },
      g: { value: 0 },
      b: { value: 0 },
      iChannel0: new THREE.Uniform(iChannel0),
      iChannel1: new THREE.Uniform(iChannel1),
      iTime: { value: 0 },
    },
  });

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
  // Mesh
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
  /**
   * Sizes
   */
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  };
  material.uniforms.iResolution.value.set(sizes.width, sizes.height);
  window.addEventListener("resize", () => {
    // Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    // Update camera
    camera.aspect = sizes.width / sizes.height;
    material.uniforms.iResolution.value.set(sizes.width, sizes.height);
    camera.updateProjectionMatrix();
    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });
  /**
   * Camera
   */
  // Base camera
  const camera = new THREE.PerspectiveCamera(
    75,
    sizes.width / sizes.height,
    0.1,
    100
  );
  camera.position.set(0, 0, 1);
  scene.add(camera);
  // Controls
  const controls = new OrbitControls(camera, canvas as HTMLElement);
  controls.enableDamping = true;
  /**
   * Renderer
   */
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas as HTMLElement,
  });
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor("#111");
  /**
   * Animate
   */
  const clock = new THREE.Clock();

  const tick = () => {
    const elapsedTime = clock.getElapsedTime();
    // Update controls
    controls.update();
    // Update material
    analyser.getByteFrequencyData(dataArray);
    // dataArray 现在包含音频数据的频率信息，可以对其进行进一步处理
    // 数值归一化处理，将数值映射到 0~1 范围
    material.uniforms.r.value = dataArray[0] / 255;
    material.uniforms.g.value = dataArray[1] / 255;
    material.uniforms.b.value = dataArray[2] / 255;
    material.uniforms.iTime.value = elapsedTime;
    // Render
    renderer.render(scene, camera);
    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
  };
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
