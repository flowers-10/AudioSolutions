import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { HDRLoader } from 'three/addons/loaders/HDRLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { cameraDistance } from './framing.js';

const canvas = document.querySelector('canvas');
const status = document.querySelector('#status');
const buttons = [...document.querySelectorAll('button')];
let renderer, controls, environment, pmrem, model;
let disposed = false;
const scene = new THREE.Scene();
scene.background = new THREE.Color('#dfe7ec');
scene.fog = new THREE.Fog('#dfe7ec',750,1600);
// Architecture is ~126 units tall: a 2 m near plane preserves facade depth precision.
const camera = new THREE.PerspectiveCamera(40,1,2,3000);
const center = new THREE.Vector3(0,60,0);
let radius = 125;
let wireframe = false;
const geometries = new Set(), materials = new Set();

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
  }
  camera.updateProjectionMatrix();
  renderer.setSize(canvas.clientWidth,canvas.clientHeight,false);
}

function resetView() {
  if(!controls) return;
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
  environment?.dispose();
  pmrem?.dispose();
  scene.traverse(o=>{
    if(o.geometry) geometries.add(o.geometry);
    if(o.material) for(const m of (Array.isArray(o.material)?o.material:[o.material])) materials.add(m);
  });
  geometries.forEach(g=>g.dispose());
  materials.forEach(m=>m.dispose());
  renderer?.dispose();
}
const observer = new ResizeObserver(resize);
window.addEventListener('pagehide',event=>{ if(!event.persisted) dispose(); });
document.querySelector('#reset').addEventListener('click',resetView);
document.querySelector('#rotate').addEventListener('click',event=>{
  controls.autoRotate=!controls.autoRotate;
  event.currentTarget.setAttribute('aria-pressed',String(controls.autoRotate));
});
document.querySelector('#wireframe').addEventListener('click',event=>{
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
  renderer.toneMappingExposure=1.15;
  renderer.shadowMap.enabled=true;
  renderer.shadowMap.type=THREE.PCFSoftShadowMap;
  controls=new OrbitControls(camera,canvas);
  controls.enableDamping=true;
  controls.dampingFactor=.065;
  controls.minDistance=35;
  controls.maxDistance=1400;
  controls.maxPolarAngle=Math.PI*.49;
  controls.autoRotateSpeed=.55;
  observer.observe(canvas);
  resize();
  scene.add(new THREE.HemisphereLight('#d9ebff','#8b9397',2));
  const sun=new THREE.DirectionalLight('#fff5e7',3.2);
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
      status.textContent=e.total?`正在加载模型 ${Math.round(e.loaded/e.total*100)}%`:'正在加载模型…';
    }),
    new HDRLoader().loadAsync('./studio.hdr'),
  ]);
  if(disposed) {
    hdr.dispose();
    gltf.scene.traverse(o=>{o.geometry?.dispose();for(const m of (Array.isArray(o.material)?o.material:o.material?[o.material]:[]))m.dispose();});
  } else {
    pmrem=new THREE.PMREMGenerator(renderer);
    environment=pmrem.fromEquirectangular(hdr);
    hdr.dispose();
    scene.environment=environment.texture;
    scene.environmentIntensity=1.3;
    model=gltf.scene;
    // Thin curtain-wall fins cast onto the ground; avoid subpixel self-shadow acne.
    model.traverse(o=>{if(o.isMesh){o.castShadow=true;o.receiveShadow=false;}});
    scene.add(model);
    const bounds=new THREE.Box3().setFromObject(model);
    const sphere=bounds.getBoundingSphere(new THREE.Sphere());
    center.copy(sphere.center); radius=sphere.radius;
    resetView();
    document.querySelector('#dimensions').textContent=`${bounds.getSize(new THREE.Vector3()).x.toFixed(1)} × 126.1 × ${bounds.getSize(new THREE.Vector3()).z.toFixed(1)} m`;
    buttons.forEach(b=>b.disabled=false);
    status.textContent='拖动旋转 · 滚轮缩放 · 右键平移';
    document.body.dataset.loaded='true';
    renderer.setAnimationLoop(()=>{
      controls.update();
      renderer.render(scene,camera);
    });
  }
} catch(error) {showError(error);dispose();}
