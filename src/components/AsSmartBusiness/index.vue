<template>
  <canvas class="webgl"></canvas>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { SMAAPass } from "three/examples/jsm/postprocessing/SMAAPass.js";
import * as dat from "lil-gui";

onMounted(async () => {
  /* Debug */
  const gui = new dat.GUI();
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
  // plane
  gltfLoader.load("static/models/smartBusiness/plane.glb", (gltf) => {
    const model = gltf.scene;
    model.position.set(10, -130, -50);
    scene.add(model);
  });
  //   building-main
  gltfLoader.load("static/models/smartBusiness/building-main.glb", (gltf) => {
    const model = gltf.scene;
    model.position.set(10, -130, -50);
    scene.add(model);
  });
  gltfLoader.load("static/models/smartBusiness/building-other.glb", (gltf) => {
    const model = gltf.scene;
    model.position.set(10, -130, -50);
    scene.add(model);
  });
  // tree
  gltfLoader.load("static/models/smartBusiness/tree.glb", (gltf) => {
    const model = gltf.scene;
    model.position.set(10, -130, -50);
    scene.add(model);
  });
  //   road
  gltfLoader.load("static/models/smartBusiness/road-old.glb", (gltf) => {
    const model = gltf.scene;
    model.position.set(10, -130, -50);
    scene.add(model);
  });
  gltfLoader.load("static/models/smartBusiness/road.glb", (gltf) => {
    const model = gltf.scene;
    model.position.set(10, -130.1, -50);
    scene.add(model);
  });

  /* Lights */
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
  scene.add(ambientLight);
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
    120,
    2000
  );
  camera.position.set(-65, 45, 116);
  gui.add(camera.position, "x").min(-200).max(200).step(1).name("cameraX");
  gui.add(camera.position, "y").min(-200).max(300).step(1).name("cameraY");
  gui.add(camera.position, "z").min(-200).max(200).step(1).name("cameraZ");
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

  /* RenderPass */
  const effectComposer = new EffectComposer(renderer);
  effectComposer.setSize(sizes.width, sizes.height);
  effectComposer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  const renderPass = new RenderPass(scene, camera);
  effectComposer.addPass(renderPass);
  if (renderer.getPixelRatio() === 1 && !renderer.capabilities.isWebGL2) {
    const smaaPass = new SMAAPass(sizes.width, sizes.height);
    effectComposer.addPass(smaaPass);

    console.log("Using SMAA");
  }
  // bloom
  const unrealBloomPass = new UnrealBloomPass(
    new THREE.Vector2(sizes.width, sizes.height),
    0.2,
    0.1,
    0.05
  );
  effectComposer.addPass(unrealBloomPass);

  /* Animate */
  const clock = new THREE.Clock();

  const tick = () => {
    const elapsedTime = clock.getElapsedTime();
    controls.update();
    // renderer.render(scene, camera);
    // processing
    effectComposer.render();
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
