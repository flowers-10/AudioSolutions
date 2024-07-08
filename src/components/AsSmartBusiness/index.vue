<template>
  <canvas class="webgl"></canvas>
  <button class="lift-button" @click="onSwitchModels">切换场景</button>
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
import gsap from 'gsap'


const onSwitchModels = () => {
  smartBusiness.children.forEach((item) => {
    if (item.name.includes("building-main")) {
      smartBusiness.remove(item);
      smartBusiness.add(lift)
      smartBusiness.add(buildingTransparent)
    } else {
      smartBusiness.remove(lift)
      smartBusiness.remove(buildingTransparent)
      smartBusiness.add(buildingMain)
    }
  });
};
const smartBusiness = new THREE.Group();
/* Loaders */
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("static/draco/");

const gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(dracoLoader);

let buildingTransparent: any = null;
let lift: any = null;
let buildingMain: any = null;

gltfLoader.load(
  "static/models/smartBusiness/building-transparent.glb",
  (gltf) => {
    const model = gltf.scene;
    model.name = "building-transparent";
    buildingTransparent = model;
  }
);
gltfLoader.load("static/models/smartBusiness/lift.glb", (gltf) => {
  const model = gltf.scene;
  model.name = "lift";
  
  model.children[0].children.forEach(item => {
      console.log(item);
      // todo
     gsap.to(item.position,{y:200,direction:1000})
    })
  lift = model;
});

gltfLoader.load("static/models/smartBusiness/building-main.glb", (gltf) => {
  const model = gltf.scene;
  model.name = "building-main";
  buildingMain = model;
});

onMounted(async () => {
  /* Debug */
  const gui = new dat.GUI();
  /* Base */
  // Canvas
  const canvas = document.querySelector("canvas.webgl");
  // Scene
  const scene = new THREE.Scene();

  /* Object */
  gltfLoader.load("static/models/smartBusiness/plane.glb", (gltf) => {
    const model = gltf.scene;
    model.name = "plane";
    smartBusiness.add(model);
  });

  gltfLoader.load("static/models/smartBusiness/building-other.glb", (gltf) => {
    const model = gltf.scene;
    model.name = "building-other";
    model.children[0].children.forEach((item: any) => {
      const old: THREE.Material = item.material
      const material = new CustomShaderMaterial({
        baseMaterial: old,
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
        csm_FragColor.a = 0.6;
      }  
    `,
        side: THREE.DoubleSide,
        transparent: true,
      });
      item.material = material
    })
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
  // gltfLoader.load("static/models/smartBusiness/road.glb", (gltf) => {
  //   const model = gltf.scene;
  //   model.name = "road";
  //   smartBusiness.add(model);
  // });
  // all models
  setTimeout(() => {
    smartBusiness.add(buildingMain)
  }, 2000);
  smartBusiness.position.set(10, -130, -50);
  scene.add(smartBusiness);
  const geometry = new THREE.BufferGeometry(); //声明一个空几何体对象

  // wall Vertex
  const posArr = [
    -125, -20, 0, 210, -40, 0, 210, -40, 40, -125, -20, 0, 210, -40, 40, -125,
    -20, 40, 210, -40, 0, 210, 60, 0, 210, 60, 40, 210, -40, 0, 210, 60, 40,
    210, -40, 40, 210, 60, 0, 180, 165, 0, 180, 165, 40, 210, 60, 0, 180, 165,
    40, 210, 60, 40, 180, 165, 0, -130, 134, 0, -130, 134, 40, 180, 165, 0,
    -130, 134, 40, 180, 165, 40, -130, 134, 0, -125, -20, 0, -125, -20, 40,
    -130, 134, 0, -125, -20, 40, -130, 134, 40,
  ];

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
  mesh.name = "wall";
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
    material.uniforms.iTime.value = elapsedTime;
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
