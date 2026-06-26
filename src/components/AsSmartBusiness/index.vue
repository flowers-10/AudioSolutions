<template>
  <canvas class="webgl"></canvas>
  <div class="controls">
    <button class="control-button" @click="onSwitchModels">切换场景</button>
    <button class="control-button" @click="onToggleDayNight">{{ isNight ? '切换白天' : '切换夜间' }}</button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { SMAAPass } from "three/examples/jsm/postprocessing/SMAAPass.js";
import * as dat from "lil-gui";
import CustomShaderMaterial from "three-custom-shader-material/vanilla";
import gsap from "gsap";
import buildingOtherVertex from "@shaders/buildingOther/vertex.glsl";
import buildingOtherFragment from "@shaders/buildingOther/fragment.glsl";

const isNight = ref(false);
let unrealBloomPass: UnrealBloomPass;
let dayEnvironment: THREE.Texture | null = null;
let ambientLight: THREE.AmbientLight;

const onToggleDayNight = () => {
  isNight.value = !isNight.value;
  
  if (isNight.value) {
    // 切换到夜间
    scene.background = new THREE.Color("#00050a");
    // 保留环境贴图光照，但降低强度（如果需要可以动态遍历材质修改 envMapIntensity）
    scene.environment = dayEnvironment; 
    if (ambientLight) ambientLight.intensity = 0.2; // 调暗环境光
    unrealBloomPass.enabled = true; // 开启辉光
  } else {
    // 切换到白天
    scene.background = dayEnvironment;
    scene.environment = dayEnvironment;
    unrealBloomPass.enabled = false; // 关闭辉光
  }
};

const onSwitchModels = () => {
  smartBusiness.children.forEach((item) => {
    if (item.name.includes("building-main")) {
      smartBusiness.remove(item);
      smartBusiness.add(lift);
      smartBusiness.add(buildingTransparent);
      createGsapAnimation(camera.position, new THREE.Vector3(-20, 80, 200));
    } else {
      smartBusiness.remove(lift);
      smartBusiness.remove(buildingTransparent);
      smartBusiness.add(buildingMain);
      createGsapAnimation(camera.position, new THREE.Vector3(-40, 60, 166));
    }
  });
};

let camera: THREE.PerspectiveCamera;
let scene: THREE.Scene;

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

const smartBusiness = new THREE.Group();
/* Loaders */
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("static/draco/");

const gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(dracoLoader);

const rgbeLoader = new RGBELoader();

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
  lift = model;
});



onMounted(async () => {
  /* Debug */
  const gui = new dat.GUI();
  /* Base */
  // Canvas
  const canvas = document.querySelector("canvas.webgl");
  // Scene
  scene = new THREE.Scene();

  // HDR Environment Map
  rgbeLoader.load("static/hdr/skyline.hdr", (texture) => {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    dayEnvironment = texture;
    if (!isNight.value) {
      scene.background = texture;
      scene.environment = texture;
    }
  });

  /* CubeCamera for Reflections */
  const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(256, {
    type: THREE.HalfFloatType,
    format: THREE.RGBAFormat,
    generateMipmaps: true,
    minFilter: THREE.LinearMipmapLinearFilter,
  });
  const cubeCamera = new THREE.CubeCamera(1, 1000, cubeRenderTarget);
  smartBusiness.add(cubeCamera);

  /* Object */
  gltfLoader.load("static/models/smartBusiness/plane.glb", (gltf) => {
    const model = gltf.scene;
    model.name = "plane";
    smartBusiness.add(model);
  });

  let buildingOtherMaterial: THREE.ShaderMaterial;
  const buildingOtherUniforms = {
    iTime: { value: 0 },
    height: { value: 0 },
    maxHeight: { value: 50 },
    uFlowColor: {
      value: new THREE.Color("#5588aa"),
    },
    uCityColor: {
      value: new THREE.Color("#1B3045"),
    },
  };
  gltfLoader.load("static/models/smartBusiness/building-other.glb", (gltf) => {
    const model = gltf.scene;
    model.name = "building-other";
    // model.children[0].children.forEach((item: any) => {
    //   const oldMaterial: THREE.Material = item.material;
    //   buildingOtherMaterial = new THREE.ShaderMaterial({
    //     uniforms: buildingOtherUniforms,
    //     vertexShader: buildingOtherVertex,
    //     fragmentShader: buildingOtherFragment,
    //     // side: THREE.DoubleSide,
    //     transparent: true,
    //   });
    //   item.material = buildingOtherMaterial;
    // });
    smartBusiness.add(model.children[0]);
  });
  gltfLoader.load("static/models/smartBusiness/tree.glb", (gltf) => {
    // 使用 Map 按几何体分组，以支持文件中可能存在的多种物体（如树木和路灯）
    const groups = new Map<THREE.BufferGeometry, { material: any; matrices: THREE.Matrix4[] }>();
    
    gltf.scene.traverse((child: any) => {
      if (child.isMesh) {
        if (!groups.has(child.geometry)) {
          groups.set(child.geometry, { material: child.material, matrices: [] });
        }
        child.updateMatrixWorld();
        groups.get(child.geometry)!.matrices.push(child.matrixWorld);
      }
    });

    // 为每一组几何体创建独立的实例化网格
    groups.forEach((data, geometry) => {
      const instancedMesh = new THREE.InstancedMesh(geometry, data.material, data.matrices.length);
      data.matrices.forEach((matrix, i) => {
        instancedMesh.setMatrixAt(i, matrix);
      });
      instancedMesh.instanceMatrix.needsUpdate = true;
      // 保持名称前缀以方便调试
      instancedMesh.name = `tree-group-${instancedMesh.id}`;
      smartBusiness.add(instancedMesh);
    });
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
  // 使用 Promise 等待关键模型加载完成，替代 setTimeout
  const loadModels = () => {
    const promises = [
      new Promise(resolve => gltfLoader.load("static/models/smartBusiness/building-main.glb", (gltf) => {
        buildingMain = gltf.scene;
        buildingMain.name = "building-main";
        resolve(true);
      })),
      // 可以继续添加其他必须先加载的模型
    ];

    // 关键模型：主建筑加载完后再执行动画
    gltfLoader.load("static/models/smartBusiness/building-main.glb", (gltf) => {
      buildingMain = gltf.scene;
      buildingMain.name = "building-main";

      // Apply CubeCamera reflection to main building
      buildingMain.traverse((child: any) => {
        if (child.isMesh && child.material) {
          child.material.envMap = cubeRenderTarget.texture;
          child.material.envMapIntensity = 1.5;
        }
      });

      smartBusiness.add(buildingMain);
      createGsapAnimation(camera.position, new THREE.Vector3(-40, 60, 166));
    });
  };

  loadModels();
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
  ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
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
  /* Controls */
  const controls = new OrbitControls(camera, canvas as HTMLElement);
  controls.enableDamping = true;
  camera.position.set(-200, 200, -200);
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
  unrealBloomPass = new UnrealBloomPass(
    new THREE.Vector2(sizes.width, sizes.height),
     0.2,
    0.1,
    0.05
  );
  unrealBloomPass.enabled = isNight.value;
  effectComposer.addPass(unrealBloomPass);

  /* Animate */
  const clock = new THREE.Clock();

  const tick = () => {
    const elapsedTime = clock.getElapsedTime();
    material.uniforms.iTime.value = elapsedTime;

    buildingOtherUniforms.iTime.value = elapsedTime;

    // Update CubeCamera
    cubeCamera.update(renderer, scene);

    if (
      buildingOtherUniforms.height.value > buildingOtherUniforms.maxHeight.value
    ) {
      buildingOtherUniforms.height.value = 0;
    } else {
      buildingOtherUniforms.height.value += 0.3;
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

.controls {
  position: absolute;
  top: 10px;
  left: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.control-button {
  padding: 8px 16px;
  background: rgba(0, 0, 0, 0.6); /* 使用深色背景确保白天可见 */
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.4);
  cursor: pointer;
  backdrop-filter: blur(8px);
  border-radius: 4px;
  font-weight: bold;
  transition: all 0.3s;
  z-index: 100;
}

.control-button:hover {
  background: rgba(0, 0, 0, 0.8);
  border-color: #00f2ff;
  color: #00f2ff;
}
</style>
