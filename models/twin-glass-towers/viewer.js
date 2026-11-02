import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { HDRLoader } from 'three/addons/loaders/HDRLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { cameraDistance } from './framing.js';

const canvas = document.querySelector('canvas');
const status = document.querySelector('#status');
const buttons = [...document.querySelectorAll('button')];
let renderer, controls, environment, pmrem, model, sourceHDR;
let disposed = false;
const scene = new THREE.Scene();
scene.background = new THREE.Color('#dfe7ec');
// Keep enough depth precision for the retained source facade surfaces.
const camera = new THREE.PerspectiveCamera(40,1,2,3000);
const center = new THREE.Vector3();
let radius = 1;
let wireframe = false;
const geometries = new WeakSet(), materials = new WeakSet(), textures = new WeakSet(), images = new WeakSet();

function disposeTexture(texture) {
  if(!texture || textures.has(texture)) return;
  textures.add(texture);
  texture.dispose();
  const source=texture.source?.data;
  for(const image of (Array.isArray(source)?source:[source])) {
    if(image?.close && !images.has(image)) {
      images.add(image);
      image.close();
    }
  }
}

function disposeObject(root) {
  root?.traverse(o=>{
    if(o.geometry && !geometries.has(o.geometry)) {
      geometries.add(o.geometry);
      o.geometry.dispose();
    }
    for(const material of (Array.isArray(o.material)?o.material:o.material?[o.material]:[])) {
      if(materials.has(material)) continue;
      materials.add(material);
      for(const value of Object.values(material)) if(value?.isTexture) disposeTexture(value);
      material.dispose();
    }
    o.shadow?.dispose();
  });
}

function updateCameraLimits() {
  const distance=cameraDistance(radius,camera.fov,camera.aspect);
  controls.maxDistance=Math.max(radius*12,distance*2);
  camera.far=Math.max(3000,controls.maxDistance+radius*2);
}

function showError(error) {
  status.textContent = `加载失败：${error.message || error}。请通过 HTTP 服务打开本页。`;
  status.classList.add('error');
}

function resize() {
  if(disposed || !renderer) return;
  const previousAspect=camera.aspect;
  camera.aspect = canvas.clientWidth / Math.max(1,canvas.clientHeight);
  if(model && controls) {
    const ratio=cameraDistance(radius,camera.fov,camera.aspect)/cameraDistance(radius,camera.fov,previousAspect);
    camera.position.sub(controls.target).multiplyScalar(ratio).add(controls.target);
    updateCameraLimits();
  }
  camera.updateProjectionMatrix();
  renderer.setSize(canvas.clientWidth,canvas.clientHeight,false);
}

function resetView() {
  if(disposed || !controls || !model) return;
  updateCameraLimits();
  const direction = new THREE.Vector3(1,.62,1.55).normalize();
  camera.position.copy(center).addScaledVector(direction,cameraDistance(radius,camera.fov,camera.aspect));
  controls.target.copy(center);
  controls.autoRotate = false;
  document.querySelector('#rotate').setAttribute('aria-pressed','false');
  controls.update();
}

function dispose() {
  if(disposed) return;
  disposed=true;
  observer.disconnect();
  renderer?.setAnimationLoop(null);
  controls?.dispose();
  disposeTexture(sourceHDR);
  environment?.dispose();
  pmrem?.dispose();
  disposeObject(scene);
  // A loader may have completed before its sibling failed, before scene.add().
  disposeObject(model);
  scene.clear();
  scene.environment=null;
  model=sourceHDR=environment=pmrem=undefined;
  buttons.forEach(b=>b.disabled=true);
  renderer?.dispose();
}
const observer = new ResizeObserver(resize);
window.addEventListener('pagehide',event=>{ if(!event.persisted) dispose(); });
document.querySelector('#reset').addEventListener('click',resetView);
document.querySelector('#rotate').addEventListener('click',event=>{
  if(disposed || !model) return;
  controls.autoRotate=!controls.autoRotate;
  event.currentTarget.setAttribute('aria-pressed',String(controls.autoRotate));
});
document.querySelector('#wireframe').addEventListener('click',event=>{
  if(disposed || !model) return;
  wireframe=!wireframe;
  model.traverse(o=>{
    if(o.isMesh) for(const m of (Array.isArray(o.material)?o.material:[o.material])) m.wireframe=wireframe;
  });
  event.currentTarget.setAttribute('aria-pressed',String(wireframe));
});
try {
  renderer=new THREE.WebGLRenderer({canvas,antialias:true});
  renderer.setPixelRatio(Math.min(devicePixelRatio,2));
  renderer.outputColorSpace=THREE.SRGBColorSpace;
  renderer.toneMapping=THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure=1;
  renderer.shadowMap.enabled=true;
  renderer.shadowMap.type=THREE.PCFSoftShadowMap;
  controls=new OrbitControls(camera,canvas);
  controls.enableDamping=true;
  controls.dampingFactor=.065;
  controls.maxPolarAngle=Math.PI*.49;
  controls.autoRotateSpeed=.55;
  observer.observe(canvas);
  resize();
  // Neutral illumination keeps the original base colour, roughness and normal maps visible.
  scene.add(new THREE.HemisphereLight('#ffffff','#808080',.6));
  const sun=new THREE.DirectionalLight('#ffffff',1.5);
  sun.position.set(-100,210,140);
  sun.castShadow=true;
  Object.assign(sun.shadow.camera,{left:-180,right:180,top:180,bottom:-180,near:1,far:700});
  sun.shadow.mapSize.set(2048,2048);
  sun.shadow.normalBias=.12;
  sun.shadow.bias=-.0001;
  scene.add(sun);
  const floor=new THREE.Mesh(new THREE.PlaneGeometry(3000,3000),new THREE.MeshStandardMaterial({color:'#dfe7ec',roughness:1}));
  floor.rotation.x=-Math.PI/2;
  floor.position.y=-.04;
  floor.receiveShadow=true;
  scene.add(floor);
  const [gltf,hdr]=await Promise.all([
    new GLTFLoader().loadAsync('./twin-glass-towers.glb',e=>{
      if(disposed) return;
      status.textContent=e.total?`正在加载模型 ${Math.round(e.loaded/e.total*100)}%`:'正在加载模型…';
    }).then(gltf=>{
      if(disposed) {disposeObject(gltf.scene);return null;}
      model=gltf.scene;
      return gltf;
    }),
    new HDRLoader().loadAsync('./studio.hdr').then(hdr=>{
      if(disposed) {disposeTexture(hdr);return null;}
      sourceHDR=hdr;
      return hdr;
    }),
  ]);
  if(!disposed) {
    pmrem=new THREE.PMREMGenerator(renderer);
    environment=pmrem.fromEquirectangular(hdr);
    disposeTexture(hdr);
    sourceHDR=undefined;
    pmrem.dispose();
    pmrem=undefined;
    scene.environment=environment.texture;
    scene.environmentIntensity=1;
    model=gltf.scene;
    // Preserve imported materials, maps and normals; avoid source surface self-shadow acne.
    model.traverse(o=>{if(o.isMesh){o.castShadow=true;o.receiveShadow=false;}});
    scene.add(model);
    const bounds=new THREE.Box3().setFromObject(model);
    const sphere=bounds.getBoundingSphere(new THREE.Sphere());
    center.copy(sphere.center); radius=sphere.radius;
    controls.minDistance=Math.max(camera.near*3,radius*.2);
    floor.position.y=bounds.min.y-.04;
    resetView();
    const size=bounds.getSize(new THREE.Vector3());
    document.querySelector('#dimensions').textContent=`${size.x.toFixed(1)} × ${size.y.toFixed(1)} × ${size.z.toFixed(1)} m`;
    buttons.forEach(b=>b.disabled=false);
    status.textContent='拖动旋转 · 滚轮缩放 · 右键平移';
    document.body.dataset.loaded='true';
    renderer.setAnimationLoop(()=>{
      controls.update();
      renderer.render(scene,camera);
    });
  }
} catch(error) {showError(error);dispose();}
