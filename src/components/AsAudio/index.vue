<template>
  <div>
    <canvas class="webgl"></canvas>
    <button style="z-index: 100; position: absolute" @click="play">Play</button>
    <button style="z-index: 100; position: absolute; left: 50px" @click="pause">
      Pause
    </button>
    <button style="z-index: 100; position: absolute; left: 100px" @click="stop">
      Stop
    </button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const mediaElement = ref()
// const play = () => {
//   mediaElement.value.play();
// };
// const pause = () => {
//   mediaElement.value.pause();
// };
const stop = () => {
  // mediaElement.value.stop();
};
onMounted(async () => {
  const fftSize = 128;
  const listener = new THREE.AudioListener();
  const audio = new THREE.Audio(listener);
  const file = '../../static/audio/Avicii-WeBurn.mp3';
  mediaElement.value = new Audio(file);
  const analyser = new THREE.AudioAnalyser(audio, fftSize);
  mediaElement.value.play();
  const uniforms = {
    tAudioData: { value: new THREE.DataTexture(analyser.data, fftSize / 2, 1, THREE.RedFormat) }
  };

  const canvas = document.querySelector("canvas.webgl");
  // Scene
  const scene = new THREE.Scene();

  const material = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: `
			varying vec2 vUv;

			void main() {

				vUv = uv;

				gl_Position = vec4( position, 1.0 );

			}`,
    fragmentShader: `uniform sampler2D tAudioData;
			varying vec2 vUv;

			void main() {

				vec3 backgroundColor = vec3( 0.125, 0.125, 0.125 );
				vec3 color = vec3( 1.0, 1.0, 0.0 );

				float f = texture2D( tAudioData, vec2( vUv.x, 0.0 ) ).r;

				float i = step( vUv.y, f ) * step( f - 0.0125, vUv.y );

				gl_FragColor = vec4( mix( backgroundColor, color, i ), 1.0 );

			}`,

  });
  const geometry = new THREE.PlaneGeometry(1, 1);
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

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
       * Renderer
       */
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas as HTMLElement,
  });
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor("#111");
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
  // controls.enableDamping = true;
  /**
     * Animate
     */
  const clock = new THREE.Clock();

  const tick = () => {
    const elapsedTime = clock.getElapsedTime();
    // Update controls
    controls.update();
    // Update material
    uniforms.tAudioData.value.needsUpdate = true;

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
