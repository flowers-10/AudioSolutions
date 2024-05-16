<template>
  <div>
    <canvas class="webgl"></canvas>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "lil-gui";
import testVertexShader from "./shaders/test/vertex.glsl";
import testFragmentShader from "./shaders/test/fragment.glsl";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { changeMaterial, modifyMaterial } from './utils/MaterialUtils/MaterialUtils';
import { modifyShader } from './utils/ShaderUtils/ShaderUtils';
onMounted(() => {
  /**
   * Base
   */
  // Debug
  const gui = new dat.GUI();

  // Canvas
  const canvas = document.querySelector("canvas.webgl");

  // Scene
  const scene = new THREE.Scene();

  // fog

  const fogPar = {
    fogColor: { type: <"color">"color", value: "#ffffff" },
    bottomY: { type: <"number">"number", value: -5, min: -5, max: 30, step: 0.01 },
    topY: { type: <"number">"number", value: 40, min: 0, max: 80, step: 0.01 },
  }

  // 描边参数
  const strokePar = {
    strokeColor: { type: <"color">"color", value: "#666666" },
    strokeThickness: { type: <"number">"number", value: 0.5, min: 0, max: 2, step: 0.01 },
  }
  const uniforms = {
    u_fogColor: { value: new THREE.Color(fogPar.fogColor.value) },
    u_bottomY: { value: fogPar.bottomY.value },
    u_topY: { value: fogPar.topY.value },
    u_stroke_color: { value: new THREE.Color(strokePar.strokeColor.value) },
    u_stroke_thickness: { value: strokePar.strokeThickness.value },
  }

  /**
   * Models
   */
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("./static/draco/");

  const gltfLoader = new GLTFLoader();
  gltfLoader.setDRACOLoader(dracoLoader);

  let mixer = null
  gltfLoader.load("./static/models/mountain/mountains.glb", (gltf) => {
    console.log(gltf, 123213);
    const model = gltf.scene;
    changeMaterial(model, THREE.MeshBasicMaterial);
    const { u_fogColor, u_bottomY, u_topY } = uniforms;
    modifyShader(model, [
            {
                type: "heightFog",
                uniforms: { u_HeightFogColor: u_fogColor, u_HeightFogBottomY: u_bottomY, u_HeightFogTopY: u_topY, }
            },
        ])
    scene.add(model)
  });


  // Lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);

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
  const camera = new THREE.PerspectiveCamera(
    75,
    sizes.width / sizes.height,
    0.1,
    1000
  );
  camera.position.set(20, 20, 152);
  scene.add(camera);

  // Controls
  const controls = new OrbitControls(camera, canvas as HTMLElement);
  controls.target.set(0, 0.75, 0);
  controls.enableDamping = true;

  /**
   * Renderer
   */
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas as HTMLElement,
  });
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  /**
   * Animate
   */
  const tick = () => {
    // Update controls
    controls.update();

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

html,
body {
  overflow: hidden;
}

.webgl {
  position: fixed;
  top: 0;
  left: 0;
  outline: none;
}
</style>
