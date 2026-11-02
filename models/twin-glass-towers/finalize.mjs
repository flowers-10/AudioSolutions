import { NodeIO } from '@gltf-transform/core';
import { ALL_EXTENSIONS } from '@gltf-transform/extensions';
import { dedup, quantize, getBounds } from '@gltf-transform/functions';
import { createHash } from 'node:crypto';
import { readFile,writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const input=new URL('retopology.intermediate.glb',import.meta.url);
const output=new URL('../../public/models/twin-glass-towers/twin-glass-towers.glb',import.meta.url);
const io=new NodeIO().registerExtensions(ALL_EXTENSIONS);
const doc=await io.read(fileURLToPath(input));
const hash=b=>createHash('sha256').update(b).digest('hex');
const textures=()=>doc.getRoot().listTextures().map(t=>({mimeType:t.getMimeType(),sha256:hash(t.getImage()),bytes:t.getImage().length}));
const before=textures();
// Keep every UV as floating point: this atlas has extremely small UV islands.
// 16-bit positions/normals reduce storage while limiting added position error to millimetres.
await doc.transform(dedup(),quantize({pattern:/^(POSITION|NORMAL|TANGENT)$/,
  quantizePosition:16,quantizeNormal:16,quantizationVolume:'scene'}));
if(JSON.stringify(before.map(t=>t.sha256).sort())!==JSON.stringify(textures().map(t=>t.sha256).sort()))throw Error('Source image bytes changed');
const glb=await io.writeBinary(doc);await writeFile(output,glb);
const report=JSON.parse(await readFile(new URL('retopology-info.json',import.meta.url),'utf8'));
report.glbBytes=glb.length;report.glbSHA256=hash(glb);report.textures=textures();
report.bounds=getBounds(doc.getRoot().listScenes()[0]);
report.reconstruction.storage='16-bit geometry, floating-point UV, source images copied without recompression';
await writeFile(new URL('model-info.json',output),JSON.stringify(report,null,2)+'\n');
console.log('Finalized',glb.length,'bytes;',report.triangles,'triangles; original PBR images verified.');
