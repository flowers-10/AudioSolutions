import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { unzipSync, strFromU8 } from 'three/addons/libs/fflate.module.js';

const assetRoot = new URL('../../public/models/twin-glass-towers/', import.meta.url);
const glbBytes = await readFile(new URL('twin-glass-towers.glb', assetRoot));
const model = await new GLTFLoader().parseAsync(glbBytes.buffer.slice(glbBytes.byteOffset, glbBytes.byteOffset+glbBytes.byteLength), '');

test('self-contained glTF loads with correct orientation, ground and dimensions', () => {
  const bounds = new THREE.Box3().setFromObject(model.scene);
  const size = bounds.getSize(new THREE.Vector3());
  assert.ok(Math.abs(bounds.min.y) < .001, 'model sits on the ground');
  assert.ok(Math.abs(size.y-126.07)<.1, 'Y is the vertical axis');
  assert.ok(size.x>185 && size.x<195 && size.z>100 && size.z<108);
  assert.ok(glbBytes.length<3*1024*1024, 'uncompressed GLB budget');
  const jsonLength = glbBytes.readUInt32LE(12);
  const json = JSON.parse(glbBytes.toString('utf8',20,20+jsonLength));
  assert.equal((json.images??[]).length,0);
  assert.ok(json.buffers.every(b=>!b.uri));
  assert.ok(!json.extensionsRequired?.includes('KHR_draco_mesh_compression'));
});

test('geometry is finite, panels face outward, authored parts and PBR materials survive export', () => {
  let triangles=0,parts=0,panels=0;
  model.scene.traverse(o=>{
    if(!o.isMesh) return;
    parts++;
    const g=o.geometry;
    triangles+=(g.index?.count??g.attributes.position.count)/3;
    for(const attr of [g.attributes.position,g.attributes.normal]) assert.ok([...attr.array].every(Number.isFinite));
    const mats=Array.isArray(o.material)?o.material:[o.material];
    for(const m of mats) assert.ok(m.isMeshStandardMaterial && Number.isFinite(m.roughness));
    if(o.parent?.name.includes('individual_vision_panels') || o.name.includes('individual_vision_panels')) {
      panels++;
      const position=g.attributes.position, normal=g.attributes.normal;
      for(let i=0;i<normal.count;i++) {
        const z=position.getZ(i),x=position.getX(i);
        if(normal.getZ(i)>.9) assert.ok(Math.abs(z-13)<.01,'front facade faces Three +Z');
        if(normal.getZ(i)<-.9) assert.ok(Math.abs(z+42)<.01,'rear facade faces Three -Z');
        if(Math.abs(normal.getX(i))>.9) assert.ok(Math.abs(x)>12,'side facade');
      }
    }
  });
  assert.ok(parts>=18 && panels>=2);
  assert.ok(triangles>30000 && triangles<60000);
});

test('portable Creator project bundles the GLB and finite camera without external resources', async()=>{
  const zip=unzipSync(await readFile(new URL('twin-glass-towers.threeauto',assetRoot)));
  const p=JSON.parse(strFromU8(zip['project.json']));
  assert.equal(p.format,'three-auto-creator');
  assert.equal(p.version,1);
  assert.equal(p.editor.config.series.length,1);
  const item=p.editor.config.series[0];
  assert.equal(item.type,'model');
  assert.deepEqual(Buffer.from(zip[item.src]),glbBytes);
  assert.ok(Object.values(p.editor.config.camera.position).every(Number.isFinite));
  assert.deepEqual(item.scale,{x:1,y:1,z:1});
});

test('viewer and camera fit module are built alongside relative model resources', async()=>{
  const html=await readFile(new URL('index.html',assetRoot),'utf8');
  assert.match(html,/\.\/viewer\.js/);
  assert.ok((await readFile(new URL('viewer.js',assetRoot))).length>10000);
  assert.match(await readFile(new URL('THREE-LICENSE.txt',assetRoot),'utf8'),/Permission is hereby granted/);
  const toolchain=JSON.parse(await readFile(new URL('package.json',import.meta.url),'utf8'));
  assert.deepEqual(Object.keys(toolchain.dependencies),['three'],'toolchain must not depend on the host repository');
  const { cameraDistance }=await import('./framing.js');
  const sphere=new THREE.Box3(new THREE.Vector3(-94,0,-52),new THREE.Vector3(94,127,52)).getBoundingSphere(new THREE.Sphere());
  for(const aspect of [0.45,1,1.7,3]) {
    const distance=cameraDistance(sphere.radius,40,aspect);
    const half=Math.min(THREE.MathUtils.degToRad(20),Math.atan(Math.tan(THREE.MathUtils.degToRad(20))*aspect));
    assert.ok(distance*Math.sin(half)>sphere.radius,'whole bounding sphere fits every aspect ratio');
  }
});
