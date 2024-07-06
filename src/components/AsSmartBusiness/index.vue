<template>
  <canvas class="webgl"></canvas>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

onMounted(async () => {
  /* Base */
  // Canvas
  const canvas = document.querySelector("canvas.webgl");
  // Scene
  const scene = new THREE.Scene();
  /* Loaders */
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("static/draco/");

  const gltfLoader = new GLTFLoader();
  gltfLoader.setDRACOLoader(dracoLoader);
  /* Object */
//   scene.add(
//     new THREE.Mesh(new THREE.BoxGeometry(), new THREE.MeshBasicMaterial())
//   );
  // mountains
  gltfLoader.load("static/models/smartBusiness/plane.glb", (gltf) => {
    const model = gltf.scene;
    scene.add(model);
  });
  /* Lights */ 
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
  scene.add(ambientLight)
  /* Sizes */
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  };
  window.addEventListener("resize", () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });
  /*Camera */
  const camera = new THREE.PerspectiveCamera(
    75,
    sizes.width / sizes.height,
    0.1,
    10000
  );
  camera.position.set(60, 600, 120);
  scene.add(camera);
  /* Controls */
  const controls = new OrbitControls(camera, canvas as HTMLElement);
  controls.enableDamping = true;
  /* Renderer */
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas as HTMLElement,
  });
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor("#111");
  /* Animate */
  const clock = new THREE.Clock();

  const tick = () => {
    const elapsedTime = clock.getElapsedTime();
    controls.update();
    renderer.render(scene, camera);
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
