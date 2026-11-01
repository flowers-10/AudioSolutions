import { build } from 'esbuild';
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { zipSync, strToU8 } from 'three/addons/libs/fflate.module.js';

const out=new URL('../../public/models/twin-glass-towers/',import.meta.url);
const glb=await readFile(new URL('twin-glass-towers.glb',out));
const info=JSON.parse(await readFile(new URL('model-info.json',out),'utf8'));
await writeFile(new URL('THREE-LICENSE.txt',out),await readFile(new URL('node_modules/three/LICENSE',import.meta.url)));
// Small original RGBE daylight panorama, shared by the demo and Creator project.
// The non-RLE RGBE payload is supported by Three.js HDRLoader.
const width=512,height=256;
const hdr=new Uint8Array(width*height*4);
for(let y=0;y<height;y++) for(let x=0;x<width;x++){
  const v=y/(height-1),u=x/width;
  const horizon=Math.exp(-(((v-.50)/.10)**2));
  const sky=Math.max(0,1-v*2);
  const ground=Math.max(0,(v-.5)*2);
  const cloud=Math.exp(-(((v-.29)/.06)**2))*Math.max(0,Math.sin(u*37)+Math.cos(u*19))*.5;
  const skyline=v>.50&&v<.50+.045*(.5+.5*Math.sin(Math.floor(u*36)*7.13)) ? .42 : 1;
  const rgb=[(.34+.58*horizon+.15*sky+.35*cloud-.15*ground)*skyline,
    (.44+.58*horizon+.29*sky+.35*cloud-.23*ground)*skyline,
    (.55+.58*horizon+.56*sky+.35*cloud-.33*ground)*skyline];
  const e=Math.ceil(Math.log2(Math.max(...rgb)));
  const f=256/2**e;
  const i=(y*width+x)*4;
  hdr[i]=Math.min(255,Math.round(rgb[0]*f));hdr[i+1]=Math.min(255,Math.round(rgb[1]*f));hdr[i+2]=Math.min(255,Math.round(rgb[2]*f));hdr[i+3]=e+128;
}
const header=strToU8(`#?RADIANCE\nFORMAT=32-bit_rle_rgbe\n\n-Y ${height} +X ${width}\n`);
const environment=new Uint8Array(header.length+hdr.length);
environment.set(header);environment.set(hdr,header.length);
await writeFile(new URL('studio.hdr',out),environment);

const date='2026-11-01T14:00:00.000Z';
const project={format:'three-auto-creator',version:1,
  project:{id:'twin-glass-towers-rebuilt',name:'双塔幕墙建筑 · Blender 重建',createdAt:date,updatedAt:date},
  editor:{
    config:{id:'_scene',name:'双塔幕墙建筑 · Blender 重建',
      camera:{type:'PerspectiveCamera',fov:40,near:2,far:3000,position:{x:240,y:190,z:365},target:{x:0,y:63,z:0},lookAt:true,controls:{enable:true,enableDamping:true,enablePan:true,design:true}},
      size:{type:'parent',id:'_scene',width:1920,height:1080},
      renderer:{antialias:true,alpha:false,clearAlpha:1,clearColor:'#dfe7ec',exposure:1.15},
      shadow:{show:false,width:1000,height:1000,color:'#000000',opacity:.1,rotation:{x:0,y:0,z:0}},
      fog:{show:false,color:'#dfe7ec',alpha:1,near:750,far:1600},
      lighting:{hemisphere:{sky:'#d9ebff',ground:'#8b9397',intensity:2},sun:{color:'#fff5e7',intensity:3.2,position:{x:-100,y:210,z:140},castShadow:false}},
      environment:{src:'assets/environment/studio.hdr',intensity:1.3,background:false},
      series:[{id:'twin-glass-towers',name:'双塔 · 幕墙 / 折面屋顶 / 阶梯裙房',type:'model',src:'assets/models/twin-glass-towers.glb',show:true,position:{x:0,y:0,z:0},scale:{x:1,y:1,z:1},rotation:{x:0,y:0,z:0},castShadow:true,receiveShadow:true}]
    },effectsEnabled:false,activeEffect:'moebius',effectIntensity:1,ambientIntensity:1,ambientEnabled:true,lightColor:'#d9ebff',lightAlpha:1,shadowType:'low-faster',expandedSections:{light:true,effects:false,fog:false,shadow:false}},
  assets:{materials:[],colors:[],images:[],medias:[],audios:[]}};
const archive=zipSync({'project.json':strToU8(JSON.stringify(project,null,2)),
  'assets/models/twin-glass-towers.glb':new Uint8Array(glb),
  'assets/environment/studio.hdr':environment},{level:6});
await writeFile(new URL('twin-glass-towers.threeauto',out),archive);
await build({entryPoints:[fileURLToPath(new URL('viewer.js',import.meta.url))],outfile:fileURLToPath(new URL('viewer.js',out)),bundle:true,format:'esm',minify:true,target:'es2022',legalComments:'linked'});
let html=await readFile(new URL('index.html',import.meta.url),'utf8');
html=html.replace('id="triangles">—',`id="triangles">${info.triangles.toLocaleString('en-US')}`)
  .replace('id="size">—',`id="size">${(info.glbBytes/1e6).toFixed(2)} MB`);
await writeFile(new URL('index.html',out),html);
console.log(`Built standalone Three.js viewer and Creator project (${archive.length} bytes).`);
