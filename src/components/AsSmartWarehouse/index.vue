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
import CustomShaderMaterial from "three-custom-shader-material/vanilla";
import gsap from "gsap";
import planeVertex from "@shaders/plane/vertex.glsl";
import planeFragment from "@shaders/plane/fragment.glsl";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";

let camera: THREE.PerspectiveCamera;

const createGsapAnimation = (
  position: THREE.Vector3,
  position_: THREE.Vector3
) => {
  return gsap.to(position, {
    ...position_,
    duration: 1.5,
    ease: "none",
    repeat: 0,
    yoyo: false,
    yoyoEase: true,
  });
};

/* Loaders */
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("static/draco/");

const gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(dracoLoader);
const rgbeLoader = new RGBELoader();

onMounted(async () => {
  /* Debug */
  const gui = new dat.GUI();
  /* Base */
  // Canvas
  const canvas = document.querySelector("canvas.webgl");
  // Scene
  const scene = new THREE.Scene();

  // hdr

  rgbeLoader.load("static/hdr/skyline.hdr", (environmentMap) => {
    // console.log(environmentMap, 111111);
    // scene.background = environmentMap
    // scene.environment = environmentMap
  });
  /* Object */
  gltfLoader.load("static/models/smartWarehouse/shelves.glb", (gltf) => {
    const model = gltf.scene;
    scene.add(model);
  });

  gltfLoader.load("static/models/smartWarehouse/house.glb", (gltf) => {
    const model = gltf.scene;
    scene.add(model);
  });
  gltfLoader.load("static/models/smartWarehouse/3.glb", (gltf) => {
    const model = gltf.scene;
    scene.add(model);
  });
  /* Lights */
  const ambientLight = new THREE.AmbientLight(0xffffff, 1);
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
  camera = new THREE.PerspectiveCamera(
    75,
    sizes.width / sizes.height,
    0.1,
    1000
  );

  scene.add(camera);
  camera.position.set(100, 100, 100);
  createGsapAnimation(camera.position, new THREE.Vector3(30, 10, 20));

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
    // processing
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

.lift-button {
  position: absolute;
  top: 10px;
  left: 10px;
}
</style>
