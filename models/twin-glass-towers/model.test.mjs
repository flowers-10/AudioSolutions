import assert from 'node:assert/strict';
import test from 'node:test';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { unzipSync, strFromU8 } from 'three/addons/libs/fflate.module.js';
const out=new URL('../../public/models/twin-glass-towers/',import.meta.url);
const bytes=await readFile(new URL('twin-glass-towers.glb',out));
const info=JSON.parse(await readFile(new URL('model-info.json',out),'utf8'));
const n=bytes.readUInt32LE(12),json=JSON.parse(bytes.toString('utf8',20,20+n));
const bin=bytes.subarray(28+n);
const digest=b=>createHash('sha256').update(b).digest('hex');

test('three original 2K PBR images survive byte-for-byte instead of invented colors',()=>{
  assert.equal(json.images?.length,3);
  const hashes=json.images.map(i=>{const v=json.bufferViews[i.bufferView];return digest(bin.subarray(v.byteOffset,v.byteOffset+v.byteLength));}).sort();
  assert.deepEqual(hashes,[
    'e229f456deea1e8e53e4246dbdf823beccf44340c29e04c3da7cca8f09697be3',
    '8af8616fdeb0c4337a4309da660469fb0ea8cb9eee1ed78e5dacd7de99b9a1dc',
    '67394093a7c0b1f34034c7914b9b509e304746879308d10acb73fe3a61b68077'].sort());
  for(const m of json.materials){assert.ok(m.normalTexture);assert.ok(m.pbrMetallicRoughness.baseColorTexture);assert.ok(m.pbrMetallicRoughness.metallicRoughnessTexture);}
  assert.ok(json.buffers.every(b=>!b.uri));
});

test('real GLTFLoader retains source dimensions, PBR maps and high fidelity geometry',async()=>{
  globalThis.self=globalThis;
  globalThis.createImageBitmap=async()=>({width:2048,height:2048,close(){}});
  const gltf=await new GLTFLoader().parseAsync(bytes.buffer.slice(bytes.byteOffset,bytes.byteOffset+bytes.byteLength),'');
  const box=new THREE.Box3().setFromObject(gltf.scene),size=box.getSize(new THREE.Vector3());
  for(const [actual,expected] of [[size.x,190.0206],[size.y,126.5305],[size.z,104.2189]])assert.ok(Math.abs(actual-expected)<.08,`bounds ${actual} vs ${expected}`);
  assert.ok(Math.abs(box.min.y)<.03);
  let triangles=0,parts=0;
  gltf.scene.traverse(o=>{if(!o.isMesh)return;parts++;const g=o.geometry;triangles+=(g.index?.count??g.attributes.position.count)/3;
    for(const key of ['position','normal','uv']){
      const a=g.attributes[key];
      // Quantized glTF interleaves integer and float attributes in one buffer.
      // Validate semantic components, not float reinterpretations of unrelated packed bytes.
      for(let i=0;i<a.count;i++)assert.ok(Number.isFinite(a.getX(i))&&Number.isFinite(a.getY(i))&&(a.itemSize<3||Number.isFinite(a.getZ(i))),`${key} ${i}`);
    }
    const mats=Array.isArray(o.material)?o.material:[o.material];for(const m of mats)assert.ok(m.map&&m.normalMap&&m.metalnessMap&&m.roughnessMap);
  });
  assert.ok(parts>=6,'editable architecture zones');assert.ok(triangles>900000&&triangles<1500000);
  assert.equal(triangles,info.triangles);assert.equal(info.reconstruction.method,'source-constrained-retopology');
  assert.ok(bytes.length<95*1024*1024);
});

test('Creator archive carries the exact final model and HDR at native scale',async()=>{
  const zip=unzipSync(await readFile(new URL('twin-glass-towers.threeauto',out)));
  const p=JSON.parse(strFromU8(zip['project.json']));
  assert.equal(p.format,'three-auto-creator');assert.equal(p.version,1);
  const item=p.editor.config.series[0];assert.equal(item.type,'model');assert.equal(digest(zip[item.src]),digest(bytes));
  assert.ok(zip[p.editor.config.environment.src]);assert.deepEqual(item.scale,{x:1,y:1,z:1});assert.ok(p.editor.config.camera.near>=1);
});

test('static viewer, bundled license and both portrait/landscape fit remain valid',async()=>{
  assert.match(await readFile(new URL('index.html',out),'utf8'),/\.\/viewer\.js/);
  assert.ok((await readFile(new URL('viewer.js',out))).length>10000);
  assert.match(await readFile(new URL('THREE-LICENSE.txt',out),'utf8'),/Permission is hereby granted/);
  const {cameraDistance}=await import('./framing.js');
  for(const aspect of [.45,1,1.7,3]){const half=Math.min(THREE.MathUtils.degToRad(20),Math.atan(Math.tan(THREE.MathUtils.degToRad(20))*aspect));assert.ok(cameraDistance(125,40,aspect)*Math.sin(half)>125);}
});
