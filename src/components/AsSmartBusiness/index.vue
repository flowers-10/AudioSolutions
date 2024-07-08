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
  const smartBusiness = new THREE.Group();
  gltfLoader.load("static/models/smartBusiness/plane.glb", (gltf) => {
    const model = gltf.scene;
    model.name = "plane";
    smartBusiness.add(model);
  });
  gltfLoader.load("static/models/smartBusiness/building-main.glb", (gltf) => {
    const model = gltf.scene;
    model.name = "building-main";
    smartBusiness.add(model);
  });
  gltfLoader.load("static/models/smartBusiness/building-other.glb", (gltf) => {
    const model = gltf.scene;
    model.name = "building-other";
    smartBusiness.add(model);
  });
  gltfLoader.load("static/models/smartBusiness/tree.glb", (gltf) => {
    const model = gltf.scene;
    model.name = "tree";
    smartBusiness.add(model);
  });
  gltfLoader.load("static/models/smartBusiness/road-old.glb", (gltf) => {
    const model = gltf.scene;
    model.name = "road-old";
    smartBusiness.add(model);
  });
  gltfLoader.load("static/models/smartBusiness/road.glb", (gltf) => {
    const model = gltf.scene;
    model.name = "road";
    smartBusiness.add(model);
  });
  // all models
  smartBusiness.position.set(10, -130, -50);
  scene.add(smartBusiness);

  // 围栏
  const c = [
    -125,
    -20, //顶点1坐标
    210,
    -40, //顶点2坐标
    210,
    60, //顶点3坐标
    180,
    165, //顶点4坐标
    -130,
    134, //顶点5坐标
    -125,
    -20, //顶点6坐标  和顶点1重合
  ];

  const geometry = new THREE.BufferGeometry(); //声明一个空几何体对象
  const posArr = [];
  const h = 40;
  for (var i = 0; i < c.length - 2; i += 2) {
    // 三角形1  三个顶点坐标
    posArr.push(
      c[i],
      c[i + 1],
      0,
      c[i + 2],
      c[i + 3],
      0,
      c[i + 2],
      c[i + 3],
      h
    );
    // 三角形2  三个顶点坐标
    posArr.push(c[i], c[i + 1], 0, c[i + 2], c[i + 3], h, c[i], c[i + 1], h);
  }
  // 设置几何体attributes属性的位置position属性
  geometry.attributes.position = new THREE.BufferAttribute(
    new Float32Array(posArr),
    3
  );
  geometry.computeVertexNormals();
  const material = new CustomShaderMaterial({
    baseMaterial: THREE.ShaderMaterial,
    uniforms: {
      iTime: { value: 0 },
    },
    vertexShader: `
      varying vec3 vPosition;
      void main(){   
        csm_PositionRaw = projectionMatrix * modelViewMatrix * vec4(csm_Position, 1.0);
        vPosition = csm_Position;
    }`,
    fragmentShader: `
      uniform float iTime;
      varying vec3 vPosition;

      void main(){   
       float alpha = 1.;
       alpha =  sin(vPosition.z + iTime * 10.);
        
        csm_FragColor = vec4( .2,1.,1.,alpha  );
      }  
    `,
    side: THREE.DoubleSide,
    transparent: true,
  });
  const mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
  mesh.rotateX(-Math.PI / 2);
  smartBusiness.add(mesh);

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
    20,
    2000
  );
  camera.position.set(-65, 45, 116);
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
    material.uniforms.iTime.value = elapsedTime
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
