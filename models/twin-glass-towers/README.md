# 双塔幕墙建筑

根据用户提供的 `Meshy_AI_Twin_Glass_Towers_1101141931_texture.glb` 重新建模。保留双塔位置、间距、镜像折面屋顶和阶梯裙房，以干净的建筑几何重建幕墙窗格、横向遮阳线、金属竖框、设备百叶、入口柱廊及屋面分缝。

原 Meshy 文件只用于本机参考，未修改、未打包、未上传。新增尺寸和细部依据模型推断，不代表测绘结果或原建筑施工图；这是外观模型，未制作可进入的室内空间。

![Blender 重建预览](./preview.png)

## 文件

| 文件 | 用途 |
| --- | --- |
| [`../../public/models/twin-glass-towers/twin-glass-towers.glb`](../../public/models/twin-glass-towers/twin-glass-towers.glb) | Three.js 可直接加载的轻量模型，所有材质内嵌 |
| [`twin-glass-towers.blend`](./twin-glass-towers.blend) | Blender 4.5 LTS 可编辑源文件，按双塔、幕墙、屋顶和裙房分组 |
| [`../../public/models/twin-glass-towers/twin-glass-towers.threeauto`](../../public/models/twin-glass-towers/twin-glass-towers.threeauto) | ThreeAuto Creator 项目包，包含模型、相机、灯光和环境贴图 |
| [`../../public/models/twin-glass-towers/index.html`](../../public/models/twin-glass-towers/index.html) | 已构建的独立 Three.js 演示，支持旋转、缩放、平移和线框 |
| [`rebuild.py`](./rebuild.py) | 可重复执行的 Blender 建模脚本，无第三方 Python 依赖 |
| [`build.mjs`](./build.mjs) | 构建 Three.js 演示、原创小型 HDR 和 Creator 项目包 |

GLB 为 **38,312 个三角面、18 个命名建筑部件、16 种 PBR 材质、约 2.02 MB**。原模型为 4,351,840 个三角面、172.08 MB，文件体积减少约 98.8%。GLB 无外部贴图，无 Draco/Meshopt 解码依赖，可由常规 `GLTFLoader` 加载。默认不透明的反射玻璃避免多层透明排序成本；可按项目需要另行调整玻璃透射率。

## 直接预览

在仓库根目录执行：

```powershell
python -m http.server 9713 --directory public
```

打开 <http://localhost:9713/models/twin-glass-towers/>。演示脚本已包含 Three.js，不依赖 CDN。也可通过现有 Vite 服务访问 `/models/twin-glass-towers/`。不能直接双击 HTML，以免浏览器拦截模型请求。

## 导入 Three.js

模型已导出为 **Y 向上、底面 Y=0**；1 单位按 1 米解释。包围尺寸约 **188.0 × 126.1 × 105.5**（X/Y/Z）。Blender 内保持 Z 向上，glTF 导出时已正确转换，无需再旋转模型。

```js
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { HDRLoader } from 'three/addons/loaders/HDRLoader.js';

const base = `${import.meta.env.BASE_URL}models/twin-glass-towers/`;
const gltf = await new GLTFLoader().loadAsync(`${base}twin-glass-towers.glb`);
scene.add(gltf.scene);

const hdr = await new HDRLoader().loadAsync(`${base}studio.hdr`);
const pmrem = new THREE.PMREMGenerator(renderer);
const environment = pmrem.fromEquirectangular(hdr);
scene.environment = environment.texture;
hdr.dispose();
pmrem.dispose();
// 页面卸载时释放 environment、模型几何体、材质及 renderer。
```

示例使用当前 Three.js 的 `HDRLoader`；Three.js 0.164 的项目可改用 `RGBELoader`。只有模型加载时两版均可直接使用 `GLTFLoader`，不需要更改现有音频应用。适配任意尺寸窗口的完整示例见 [`viewer.js`](./viewer.js) 和 [`framing.js`](./framing.js)。

## 导入 ThreeAuto Creator

打开编辑器，选择「项目 → 打开项目包」，选择 `public/models/twin-glass-towers/twin-glass-towers.threeauto`。模型、HDR 环境、相机和灯光会一起导入，可继续变换模型、保存到本机，或导出独立网页。也可仅用「导入 GLB 模型」加载 GLB，再自行配置场景灯光和反射环境。

## 重新生成

安装 [Blender 4.5 LTS](https://www.blender.org/download/lts/4-5/)，将 `blender` 加入 PATH；也可使用 Blender 可执行文件的绝对路径。

```powershell
# 在仓库根目录执行；脚本按自身位置定位输出，不依赖 Blender 的工作目录。
blender --background --factory-startup --python models/twin-glass-towers/rebuild.py -- --render
npm ci --prefix models/twin-glass-towers
npm run build --prefix models/twin-glass-towers
npm test --prefix models/twin-glass-towers
```

独立子项目锁定 Three.js 0.185.1 和 esbuild 0.25.12，不改变根目录音频应用的依赖或锁文件。修改建模参数后，先重建 GLB，再构建演示和项目包，使三者一致。`public/models/twin-glass-towers/viewer.js` 为可直接静态托管的已生成文件，源代码保存在本目录。

验证覆盖真实 `GLTFLoader` 加载、尺寸与轴向、法线、材质、面数/体积预算、项目包资源一致性及横竖屏取景。另已人工检查 Blender 渲染和浏览器画面，并验证 Creator 实际导入与独立网页导出。
