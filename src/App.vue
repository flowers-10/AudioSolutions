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
import {
  changeMaterial,
  modifyMaterial,
} from "./utils/MaterialUtils/MaterialUtils";
import { modifyShader } from "./utils/ShaderUtils/ShaderUtils";
onMounted(() => {
  /**
   * Base
   */
  // Debug
  const gui = new dat.GUI();

  // Loader
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("./static/draco/");

  const gltfLoader = new GLTFLoader();
  gltfLoader.setDRACOLoader(dracoLoader);

  // Canvas
  const canvas = document.querySelector("canvas.webgl");

  // Scene
  const scene = new THREE.Scene();

  // fog

  const fogPar = {
    fogColor: { type: <"color">"color", value: "#ffffff" },
    bottomY: {
      type: <"number">"number",
      value: -5,
      min: -5,
      max: 30,
      step: 0.01,
    },
    topY: { type: <"number">"number", value: 40, min: 0, max: 80, step: 0.01 },
  };

  // 描边参数
  const strokePar = {
    strokeColor: { type: <"color">"color", value: "#666666" },
    strokeThickness: {
      type: <"number">"number",
      value: 0.5,
      min: 0,
      max: 2,
      step: 0.01,
    },
  };
  const uniforms = {
    u_fogColor: { value: new THREE.Color(fogPar.fogColor.value) },
    u_bottomY: { value: fogPar.bottomY.value },
    u_topY: { value: fogPar.topY.value },
    u_stroke_color: { value: new THREE.Color(strokePar.strokeColor.value) },
    u_stroke_thickness: { value: strokePar.strokeThickness.value },
  };

  /**
   * Models
   */

  // mountains
  gltfLoader.load("./static/models/mountain/mountains.glb", (gltf) => {
    const model = gltf.scene;
    changeMaterial(model, THREE.MeshBasicMaterial);
    const { u_fogColor, u_bottomY, u_topY } = uniforms;
    modifyShader(model, [
      {
        type: "heightFog",
        uniforms: {
          u_HeightFogColor: u_fogColor,
          u_HeightFogBottomY: u_bottomY,
          u_HeightFogTopY: u_topY,
        },
      },
    ]);
    scene.add(model);
  });

  // poem
  gltfLoader.load("./static/models/mountain/poem.glb", (gltf) => {
    const model = gltf.scene;
    changeMaterial(model, THREE.MeshBasicMaterial);
    const { u_fogColor, u_bottomY, u_topY } = uniforms;
    modifyShader(model, [
      {
        type: "heightFog",
        uniforms: {
          u_HeightFogColor: u_fogColor,
          u_HeightFogBottomY: u_bottomY,
          u_HeightFogTopY: u_topY,
        },
      },
    ]);
    scene.add(model);
  });

  // crane
  // tree
  gltfLoader.load("./static/models/mountain/tree.glb", (gltf) => {
    const model = gltf.scene;
    changeMaterial(model, THREE.MeshBasicMaterial);
    const { u_fogColor, u_bottomY, u_topY } = uniforms;
    modifyShader(model, [
      {
        type: "heightFog",
        uniforms: {
          u_HeightFogColor: u_fogColor,
          u_HeightFogBottomY: u_bottomY,
          u_HeightFogTopY: u_topY,
        },
      },
    ]);
    scene.add(model);
  });

  // paints

  // camera
  let cameraMixer: any = null;
  gltfLoader.load("./static/models/mountain/camera.glb", (gltf) => {
    console.log(gltf, 123213);
    if (gltf.cameras.length) {
      const camera0 = gltf.cameras[0] as THREE.PerspectiveCamera;
      camera.position.copy(camera0.position);
      camera.rotation.copy(camera0.rotation);

      camera.name = camera0.name;
      cameraMixer = new THREE.AnimationMixer(camera);
      camera.userData.mixer = cameraMixer;
      camera.userData.duration = 0;
      gltf.animations.forEach((clip) => {
        // this.totalJourneyDuration = clip.duration;
        camera.userData.duration = Math.max(
          camera.userData.duration,
          clip.duration
        );
        const action = cameraMixer.clipAction(clip);
        action.play();
      });
      cameraMixer.update(0);
    }
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
    72,
    sizes.width / sizes.height,
    0.1,
    1500
  );
  camera.position.set(0, 500, -500);
  camera.lookAt(0, 0, 0);
  scene.add(camera);

  // 相机运动参数
  const cameraPar = {
    seek: {
      type: <"number">"number",
      value: 0,
      min: 0,
      max: camera.userData.duration,
    },
  };

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
  const clock = new THREE.Clock();
  let previousTime = 0;

  const tick = () => {
    const elapsedTime = clock.getElapsedTime();
    const deltaTime = elapsedTime - previousTime;
    previousTime = elapsedTime;
    // Update controls
    controls.update();
    if (cameraMixer) {
      // cameraMixer.update(deltaTime);
    }
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
