<template>
  <div
    @mousedown="goState = true"
    @mouseup="goState = false"
    @touchstart="goState = true"
    @touchend="goState = false"
  >
    <canvas class="webgl"></canvas>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "lil-gui";
import testVertexShader from "./shaders/test/vertex.glsl";
import testFragmentShader from "./shaders/test/fragment.glsl";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import gsap from "gsap";

import {
  changeMaterial,
  modifyMaterial,
} from "./utils/MaterialUtils/MaterialUtils";
import { modifyShader } from "./utils/ShaderUtils/ShaderUtils";

const goState = ref(false);
const inOutro = ref(false);
const inEnd = ref(false);
const goSpeed = ref(0);
const { lerp, clamp, inverseLerp } = THREE.MathUtils;
const doReplay = (
  cameraMixer: THREE.AnimationMixer,
  tweakFog: (par: {
    top: number;
    bottom: number;
    duration: number;
    ease?: gsap.EaseString;
  }) => void
) => {
  cameraMixer.setTime(0);
  inOutro.value = false;
  inEnd.value = false;
  goState.value = false;
  tweakFog({ top: 0.22, bottom: 0, duration: 3 });
};

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

  const tweakFog = (par: {
    top: number;
    bottom: number;
    duration: number;
    ease?: gsap.EaseString;
  }): void => {
    const { top, bottom, duration, ease } = par;
    gsap.killTweensOf(uniforms.u_topY);
    gsap.killTweensOf(uniforms.u_bottomY);
    gsap.to(uniforms.u_topY, {
      value: top,
      duration: duration,
      ease: ease || "power2.out",
    });
    gsap.to(uniforms.u_bottomY, {
      value: bottom,
      duration,
      ease: ease || "power2.out",
    });
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
  let cameraMixer: THREE.AnimationMixer;
  gltfLoader.load("./static/models/mountain/camera.glb", (gltf) => {
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

  const tick = () => {
    let dt = clock.getDelta();
    if (dt > 0.1) {
      dt = 0.1;
    }
    // Update controls
    // controls.update();

    if (cameraMixer) {
      const duration = camera.userData.duration as number;
      if (inOutro.value) {
        goSpeed.value = lerp(goSpeed.value, 2, clamp(dt, 0, 1));
      } else {
        if (goState.value) {
          goSpeed.value = lerp(goSpeed.value, 1, clamp(dt * 5, 0, 1));
        } else {
          goSpeed.value = lerp(goSpeed.value, 0, clamp(dt * 3, 0, 1));
          if (goSpeed.value <= 0.0001) {
            goSpeed.value = 0;
          }
          if (cameraMixer.time < 0.75) {
            goSpeed.value = Math.max(goSpeed.value, 0.05);
          }
        }

        if (cameraMixer.time > duration) {
          doReplay(cameraMixer, tweakFog);
        }

        if (!inOutro.value && cameraMixer.time >= 46.0) {
          inOutro.value = true;

          tweakFog({
            top: 200,
            bottom: 10,
            duration: 5,
            ease: "power1.in",
          });
        }

        if (goSpeed.value > 0) {
          cameraMixer.update(dt * goSpeed.value * 0.8);
          // todo 画布
          const folder = camera.userData.gui_folder;
        }
      }
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
