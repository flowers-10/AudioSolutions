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
import buildingOtherVertex from "@shaders/buildingOther/vertex.glsl";
import planeVertex from "@shaders/plane/vertex.glsl";
import buildingOtherFragment from "@shaders/buildingOther/fragment.glsl";
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

const smartCommunity = new THREE.Group();
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
  const buildingOtherUniforms = {
    iTime: { value: 0 },
    height: { value: 0 },
    maxHeight: { value: 10 },
    uFlowColor: {
      value: new THREE.Color("#5588aa"),
    },
    uCityColor: {
      value: new THREE.Color("#1B3045"),
    },
  };
  let buildingOtherMaterial = new THREE.ShaderMaterial({
    uniforms: buildingOtherUniforms,
    vertexShader: buildingOtherVertex,
    fragmentShader: buildingOtherFragment,
    side: THREE.DoubleSide,
    transparent: true,
  });
  gltfLoader.load("static/models/smartCommunity/preview2.glb", (gltf) => {
    const model = gltf.scene;
    scene.add(model);
  });

  gltfLoader.load("static/models/smartCommunity/preview.glb", (gltf) => {
    const model = gltf.scene;
    let a: any = null;
    model.children.forEach((child: any, index) => {
      console.log(child, 1111);
      if (child.name === "氛围建筑") {
        // a = child;
        child.material = buildingOtherMaterial;
      }
    });
    scene.add(model);
  });
  const texture = new THREE.TextureLoader().load("static/textures/plane.png");
  const maskTexture = new THREE.TextureLoader().load(
    "static/textures/mask.png"
  );

  const uniforms = {
    iTexture: { value: texture },
    iTime: { value: 0 },
    maxTime: { value: 0 },
  };
  const geometry = new THREE.PlaneGeometry(350, 350, 32, 32);
  const material = new THREE.ShaderMaterial({
    uniforms: uniforms,
    transparent: true,
    opacity: 0,
    vertexShader: planeVertex,
    fragmentShader: planeFragment,
  });
  const material2 = new THREE.MeshBasicMaterial({
    transparent: true,
    opacity: 1,
    map: maskTexture,
  });
  const plane = new THREE.Mesh(geometry, material);
  const plane2 = new THREE.Mesh(geometry, material2);
  plane.rotation.x = -Math.PI * 0.5;
  plane2.rotation.x = -Math.PI * 0.5;
  plane.position.y = -10;
  plane2.position.y = -11;
  scene.add(plane);
  scene.add(plane2);
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
  createGsapAnimation(camera.position, new THREE.Vector3(-20, 50, 30));

  // gui.add(camera.position, "x").min(-200).max(200).step(1).name("cameraX");
  // gui.add(camera.position, "y").min(-200).max(300).step(1).name("cameraY");
  // gui.add(camera.position, "z").min(-200).max(200).step(1).name("cameraZ");

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
    buildingOtherUniforms.iTime.value = elapsedTime;
    let x = buildingOtherUniforms.height.value / 2;
    if (x > 2) {
      x = 0;
    }
    plane2.scale.set(x, x, 1);
    if (
      buildingOtherUniforms.height.value > buildingOtherUniforms.maxHeight.value
    ) {
      buildingOtherUniforms.height.value = 0;
    } else {
      buildingOtherUniforms.height.value += 0.05;
    }
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

.lift-button {
  position: absolute;
  top: 10px;
  left: 10px;
}
</style>
