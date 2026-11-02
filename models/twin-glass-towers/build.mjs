import { build } from 'esbuild';
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { zipSync, strToU8 } from 'three/addons/libs/fflate.module.js';
import { NodeIO } from '@gltf-transform/core';
import { ALL_EXTENSIONS } from '@gltf-transform/extensions';
import { getBounds } from '@gltf-transform/functions';
import { cameraDistance } from './framing.js';

const out=new URL('../../public/models/twin-glass-towers/',import.meta.url);
const glb=await readFile(new URL('twin-glass-towers.glb',out));
const info=JSON.parse(await readFile(new URL('model-info.json',out),'utf8'));
const document=await new NodeIO().registerExtensions(ALL_EXTENSIONS).readBinary(new Uint8Array(glb));
const root=document.getRoot();
const modelScene=root.getDefaultScene()??root.listScenes()[0];
if(!modelScene) throw new Error('GLB has no scene to frame.');
const bounds=getBounds(modelScene);
const dimensions=bounds.max.map((v,i)=>v-bounds.min[i]);
if(!dimensions.every(v=>Number.isFinite(v)&&v>0)) throw new Error('GLB has invalid model bounds.');
const center=bounds.max.map((v,i)=>(v+bounds.min[i])/2);
const radius=Math.hypot(...dimensions)/2;
const distance=cameraDistance(radius,40,1920/1080);
const direction=[1,.62,1.55];
const directionLength=Math.hypot(...direction);
const position=center.map((v,i)=>v+direction[i]/directionLength*distance);
const point=([x,y,z])=>({x,y,z});
await writeFile(new URL('THREE-LICENSE.txt',out),await readFile(new URL('node_modules/three/LICENSE',import.meta.url)));
// Achromatic RGBE studio reflections, shared by the demo and Creator project.
// The non-RLE RGBE payload is supported by Three.js HDRLoader.
const width=512,height=256;
const hdr=new Uint8Array(width*height*4);
for(let y=0;y<height;y++) for(let x=0;x<width;x++){
  const v=y/(height-1),u=x/width;
  const horizon=Math.exp(-(((v-.50)/.10)**2));
  const sky=Math.max(0,1-v*2);
  const ground=Math.max(0,(v-.5)*2);
  const key=2.5*Math.exp(-(((u-.19)/.06)**2)-(((v-.28)/.12)**2));
  const fill=1.1*Math.exp(-(((u-.73)/.11)**2)-(((v-.35)/.16)**2));
  const value=.18+.35*sky+.17*horizon-.08*ground+key+fill;
  const rgb=[value,value,value];
  const e=Math.ceil(Math.log2(Math.max(...rgb)));
  const f=256/2**e;
  const i=(y*width+x)*4;
  hdr[i]=Math.min(255,Math.round(rgb[0]*f));hdr[i+1]=Math.min(255,Math.round(rgb[1]*f));hdr[i+2]=Math.min(255,Math.round(rgb[2]*f));hdr[i+3]=e+128;
}
const header=strToU8(`#?RADIANCE\nFORMAT=32-bit_rle_rgbe\n\n-Y ${height} +X ${width}\n`);
const environment=new Uint8Array(header.length+hdr.length);
environment.set(header);environment.set(hdr,header.length);
await writeFile(new URL('studio.hdr',out),environment);

const date='2026-11-02T00:00:00.000Z';
const project={format:'three-auto-creator',version:1,
  project:{id:'twin-glass-towers-source-retopology',name:'双塔幕墙建筑 · 源网格约束重拓扑',createdAt:date,updatedAt:date},
  editor:{
    config:{id:'_scene',name:'双塔幕墙建筑 · 源网格约束重拓扑',
      camera:{type:'PerspectiveCamera',fov:40,near:2,far:Math.max(3000,distance+radius*4),position:point(position),target:point(center),lookAt:true,controls:{enable:true,enableDamping:true,enablePan:true,design:true}},
      size:{type:'parent',id:'_scene',width:1920,height:1080},
      renderer:{antialias:true,alpha:false,clearAlpha:1,clearColor:'#dfe7ec',exposure:1},
      shadow:{show:false,width:1000,height:1000,color:'#000000',opacity:.1,rotation:{x:0,y:0,z:0}},
      fog:{show:false,color:'#dfe7ec',alpha:1,near:750,far:1600},
      lighting:{hemisphere:{sky:'#ffffff',ground:'#808080',intensity:.6},sun:{color:'#ffffff',intensity:1.5,position:{x:-100,y:210,z:140},castShadow:false}},
      environment:{src:'assets/environment/studio.hdr',intensity:1,background:false},
      series:[{id:'twin-glass-towers',name:'双塔 · 源网格重拓扑 / 原始 PBR 贴图',type:'model',src:'assets/models/twin-glass-towers.glb',show:true,position:{x:0,y:0,z:0},scale:{x:1,y:1,z:1},rotation:{x:0,y:0,z:0},castShadow:true,receiveShadow:false}]
    },effectsEnabled:false,activeEffect:'moebius',effectIntensity:1,ambientIntensity:1,ambientEnabled:true,lightColor:'#ffffff',lightAlpha:1,shadowType:'low-faster',expandedSections:{light:true,effects:false,fog:false,shadow:false}},
  assets:{materials:[],colors:[],images:[],medias:[],audios:[]}};
const archive=zipSync({'project.json':strToU8(JSON.stringify(project,null,2)),
  'assets/models/twin-glass-towers.glb':new Uint8Array(glb),
  'assets/environment/studio.hdr':environment},{level:6});
await writeFile(new URL('twin-glass-towers.threeauto',out),archive);
await build({entryPoints:[fileURLToPath(new URL('viewer.js',import.meta.url))],outfile:fileURLToPath(new URL('viewer.js',out)),bundle:true,format:'esm',minify:true,target:'es2022',legalComments:'linked'});
let html=await readFile(new URL('index.html',import.meta.url),'utf8');
html=html.replace('id="triangles">—',`id="triangles">${info.triangles.toLocaleString('en-US')}`)
  .replace('id="size">—',`id="size">${(glb.length/1e6).toFixed(2)} MB`)
  .replace('id="dimensions">—',`id="dimensions">${dimensions.map(v=>v.toFixed(1)).join(' × ')} m`);
await writeFile(new URL('index.html',out),html);
console.log(`Built standalone Three.js viewer and Creator project (${archive.length} bytes).`);
