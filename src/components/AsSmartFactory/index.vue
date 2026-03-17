<template>
  <canvas class="webgl"></canvas>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { SMAAPass } from "three/examples/jsm/postprocessing/SMAAPass.js";
import * as dat from "lil-gui";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";

let camera: THREE.PerspectiveCamera;
const smartFactory = new THREE.Group();
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

  // rgbeLoader.load("static/hdr/skyline.hdr", (environmentMap) => {
    // console.log(environmentMap, 111111);
    // scene.background = environmentMap
    // scene.environment = environmentMap
  // });
  /* Object */

  gltfLoader.load("static/models/smartFactory/1.glb", (gltf) => {
    const model = gltf.scene;
    scene.add(model);
  });
  gltfLoader.load("static/models/smartFactory/2.glb", (gltf) => {
    const model = gltf.scene;
    scene.add(model);
  });
  gltfLoader.load("static/models/smartFactory/3.glb", (gltf) => {
    const model = gltf.scene;
    scene.add(model);
  });
  gltfLoader.load("static/models/smartFactory/4.glb", (gltf) => {
    const model = gltf.scene;
    scene.add(model);
  });
  gltfLoader.load("static/models/smartFactory/5.glb", (gltf) => {
    const model = gltf.scene;
    scene.add(model);
  });
  gltfLoader.load("static/models/smartFactory/6.glb", (gltf) => {
    const model = gltf.scene;
    scene.add(model);
  });
  gltfLoader.load("static/models/smartFactory/7.glb", (gltf) => {
    const model = gltf.scene;
    scene.add(model);
  });
  gltfLoader.load("static/models/smartFactory/8.glb", (gltf) => {
    const model = gltf.scene;
    scene.add(model);
  });
  gltfLoader.load("static/models/smartFactory/9.glb", (gltf) => {
    const model = gltf.scene;
    scene.add(model);
  });
  // gltfLoader.load("static/models/smartFactory/2.glb", (gltf) => {
  //   const model = gltf.scene;
  //   let a: any = null;
  //   model.children.forEach((child: any, index) => {
  //     console.log(child, 1111);
  //     if (child.name === "氛围建筑") {
  //       // a = child;
  //       child.material = buildingOtherMaterial;
  //     }
  //   });
  //   scene.add(model);
  // });
  scene.position.set(-40, 20, 20);

  /* Lights */
  const ambientLight = new THREE.AmbientLight(0xffffff, 10);
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
    20,
    10000
  );

  scene.add(camera);
  camera.position.set(-100, 100, -100);

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
  // const effectComposer = new EffectComposer(renderer);
  // effectComposer.setSize(sizes.width, sizes.height);
  // effectComposer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // const renderPass = new RenderPass(scene, camera);
  // effectComposer.addPass(renderPass);
  // if (renderer.getPixelRatio() === 1 && !renderer.capabilities.isWebGL2) {
    // const smaaPass = new SMAAPass(sizes.width, sizes.height);
    // effectComposer.addPass(smaaPass);
  // }

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
