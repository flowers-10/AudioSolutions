<template>
  <div
    @mousedown="goState = true"
    @mouseup="goState = false"
    @touchstart="goState = true"
    @touchend="goState = false"
  >
    <canvas class="webgl"></canvas>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "lil-gui";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import gsap from "gsap";
import * as SkeletonUtils from "three/examples/jsm/utils/SkeletonUtils.js";

import { changeMaterial } from "@utils/MaterialUtils/MaterialUtils";
import { modifyShader } from "@utils/ShaderUtils/ShaderUtils";
import AmmoUtil from "@utils/AmmoUtils/AmmoUtil";

const goState = ref(false);
const inOutro = ref(false);
const goSpeed = ref(0);
const { lerp, clamp, randFloat } = THREE.MathUtils;

// Loader
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("static/draco/");

const gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(dracoLoader);

const textureLoader = new THREE.TextureLoader();

onMounted(() => {
  /**
   * Base
   */
  // 物理引擎
  const GRAVITY = -9.8;
  AmmoUtil.Init().then(() => {
    const { Ammo } = AmmoUtil;

    const collisionConfiguration =
      new Ammo.btSoftBodyRigidBodyCollisionConfiguration();
    const dispatcher = new Ammo.btCollisionDispatcher(collisionConfiguration);
    const broadphase = new Ammo.btDbvtBroadphase();
    const solver = new Ammo.btSequentialImpulseConstraintSolver();
    const softBodySolver = new Ammo.btDefaultSoftBodySolver();

    const physicsWorld = new Ammo.btSoftRigidDynamicsWorld(
      dispatcher,
      broadphase,
      solver,
      collisionConfiguration,
      softBodySolver
    );
    physicsWorld.setGravity(new Ammo.btVector3(0, GRAVITY, 0));
    physicsWorld
      .getWorldInfo()
      .set_m_gravity(new Ammo.btVector3(0, GRAVITY, 0));

    // Debug
    // const gui = new dat.GUI();

    // Canvas
    const canvas = document.querySelector("canvas.webgl");

    // Scene
    const scene = new THREE.Scene();

    // fog

    const fogPar = {
      fogColor: { type: <"color">"color", value: "#ffffff" },
      bottomY: {
        type: <"number">"number",
        value: -5,
        min: -5,
        max: 30,
        step: 0.01,
      },
      topY: {
        type: <"number">"number",
        value: 40,
        min: 0,
        max: 80,
        step: 0.01,
      },
    };

    scene.fog = new THREE.Fog(fogPar.fogColor.value, 50, 150);
    // 描边参数
    const strokePar = {
      strokeColor: { type: <"color">"color", value: "#666666" },
      strokeThickness: {
        type: <"number">"number",
        value: 0.5,
        min: 0,
        max: 2,
        step: 0.01,
      },
    };
    const uniforms = {
      u_fogColor: { value: new THREE.Color(fogPar.fogColor.value) },
      u_bottomY: { value: fogPar.bottomY.value },
      u_topY: { value: fogPar.topY.value },
      u_stroke_color: { value: new THREE.Color(strokePar.strokeColor.value) },
      u_stroke_thickness: { value: strokePar.strokeThickness.value },
    };

    const tweakFog = (par: {
      top: number;
      bottom: number;
      duration: number;
      ease?: gsap.EaseString;
    }): void => {
      const { top, bottom, duration, ease } = par;
      gsap.killTweensOf(uniforms.u_topY);
      gsap.killTweensOf(uniforms.u_bottomY);
      gsap.to(uniforms.u_topY, {
        value: top,
        duration: duration,
        ease: ease || "power2.out",
      });
      gsap.to(uniforms.u_bottomY, {
        value: bottom,
        duration,
        ease: ease || "power2.out",
      });
    };

    const doReplay = () => {
      cameraMixer.setTime(0);
      cameraMixer.time = 0;
      inOutro.value = false;
      goState.value = false;
      tweakFog({ top: 0.22, bottom: 0, duration: 3 });
    };

    /**
     * Models
     */

    // mountains
    gltfLoader.load("static/models/mountain/mountains.glb", (gltf) => {
      const model = gltf.scene;
      changeMaterial(model, THREE.MeshBasicMaterial);
      const { u_fogColor, u_bottomY, u_topY } = uniforms;
      modifyShader(model, [
        {
          type: "heightFog",
          uniforms: {
            u_HeightFogColor: u_fogColor,
            u_HeightFogBottomY: u_bottomY,
            u_HeightFogTopY: u_topY,
          },
        },
      ]);
      scene.add(model);
    });

    // poem
    gltfLoader.load("static/models/mountain/poem.glb", (gltf) => {
      const model = gltf.scene;
      changeMaterial(model, THREE.MeshBasicMaterial);
      const { u_fogColor, u_bottomY, u_topY } = uniforms;
      modifyShader(model, [
        {
          type: "heightFog",
          uniforms: {
            u_HeightFogColor: u_fogColor,
            u_HeightFogBottomY: u_bottomY,
            u_HeightFogTopY: u_topY,
          },
        },
      ]);
      scene.add(model);
    });

    // crane
    let craneMixer: THREE.AnimationMixer;
    let craneGroupMixerList: THREE.AnimationMixer[] = [];
    gltfLoader.load("static/models/mountain/crane_ori.glb", (gltf) => {
      const model = gltf.scene;
      changeMaterial(model, THREE.MeshBasicMaterial);

      // craneGroup
      gltfLoader.load("static/models/mountain/crane_group.glb", (gltfGroup) => {
        const craneGroupModel = gltfGroup.scene;
        // model.forEach
        craneGroupModel.children.forEach((group) => {
          const cranes: any[] = [];
          group.children.forEach((child) => {
            // 克隆所有的crane单体（骨架动画）
            const item = SkeletonUtils.clone(model);
            cranes.push(item);
            item.name = child.name;
            item.position.copy(child.position);
            item.scale.copy(child.scale);
            item.quaternion.copy(child.quaternion);
            const craneGroupMixer = new THREE.AnimationMixer(item);

            gltf.animations.forEach((clip) => {
              const action = craneGroupMixer.clipAction(clip);
              action.play();
            });
            craneGroupMixerList.push(craneGroupMixer);
          });
          group.clear();
          group.add(...cranes);
        });
        craneMixer = new THREE.AnimationMixer(craneGroupModel);

        gltfGroup.animations.forEach((clip) => {
          const action = craneMixer.clipAction(clip);
          action.play();
        });
        changeMaterial(craneGroupModel, THREE.MeshBasicMaterial);
        const { u_fogColor, u_bottomY, u_topY } = uniforms;
        modifyShader(craneGroupModel, [
          {
            type: "heightFog",
            uniforms: {
              u_HeightFogColor: u_fogColor,
              u_HeightFogBottomY: u_bottomY,
              u_HeightFogTopY: u_topY,
            },
          },
        ]);
        scene.add(craneGroupModel);
      });
    });

    // Mist
    const mists: THREE.Group = new THREE.Group();
    const X_RANGE = [-5, 5];
    const Y_RANGE = [-3, 3];
    const Z_RANGE = [-1, 1];
    const SP_RANGE = [0.1, 0.3];
    const AS_RANGE = [-0.3, 0.3];

    const mistTexture = textureLoader.load("static/textures/mist.png");

    gltfLoader.load("static/models/mountain/mist_pos.glb", (gltf) => {
      const model = gltf.scene;

      const geometry = new THREE.PlaneGeometry(5, 5);
      const meshes = new THREE.Group();
      for (let i = 0; i < 5; i++) {
        const material = new THREE.MeshBasicMaterial({
          transparent: true,
          map: mistTexture,
          side: THREE.DoubleSide,
          depthWrite: false,
        });
        const mesh = new THREE.Mesh(geometry, material);

        mesh.rotation.z = Math.random() * Math.PI * 2;
        mesh.position.set(
          randFloat(X_RANGE[0], X_RANGE[1]),
          randFloat(Y_RANGE[0], Y_RANGE[1]),
          randFloat(Z_RANGE[0], Z_RANGE[1])
        );
        mesh.userData.speed = randFloat(SP_RANGE[0], SP_RANGE[1]);
        mesh.userData.angularSpeed = randFloat(AS_RANGE[0], AS_RANGE[1]);
        meshes.add(mesh);
      }

      for (let i = 0; i < model.children.length; i++) {
        const posMesh = model.children[i];
        const mist = meshes.clone();
        mist.scale.set(8, 1.5, 1);
        mist.position.copy(posMesh.position);
        mist.rotation.copy(posMesh.rotation);
        mists.add(mist);
      }
      const { u_fogColor, u_bottomY, u_topY } = uniforms;
      modifyShader(mists, [
        {
          type: "heightFog",
          uniforms: {
            u_HeightFogColor: u_fogColor,
            u_HeightFogBottomY: u_bottomY,
            u_HeightFogTopY: u_topY,
          },
        },
      ]);
      scene.add(mists);
    });

    // tree
    gltfLoader.load("static/models/mountain/tree.glb", (gltf) => {
      const model = gltf.scene;
      changeMaterial(model, THREE.MeshBasicMaterial);
      const { u_fogColor, u_bottomY, u_topY } = uniforms;
      modifyShader(model, [
        {
          type: "heightFog",
          uniforms: {
            u_HeightFogColor: u_fogColor,
            u_HeightFogBottomY: u_bottomY,
            u_HeightFogTopY: u_topY,
          },
        },
      ]);
      scene.add(model);
    });

    // paints
    const cloths = new THREE.Group();
    const headers = new THREE.Group();
    const clothsMap = new Map();
    const MARGIN = 0.05;
    const PAINT_START_POS = [0, 0, 0, 14, 15, 20, 23, 26, 33];

    const PAINT_END_POS = [6.5, 12, 15.5, 23, 26, 31, 33, 41, 46];
    clothsMap.set("paint_0", textureLoader.load("static/textures/p0.jpg"));
    clothsMap.set("paint_1", textureLoader.load("static/textures/p1.jpg"));
    clothsMap.set("paint_2", textureLoader.load("static/textures/p2.jpg"));
    clothsMap.set("paint_3", textureLoader.load("static/textures/p3.jpg"));
    clothsMap.set("paint_4", textureLoader.load("static/textures/p4.jpg"));
    clothsMap.set("paint_5", textureLoader.load("static/textures/p5.jpg"));
    clothsMap.set("paint_6", textureLoader.load("static/textures/p6.jpg"));
    clothsMap.set("paint_7", textureLoader.load("static/textures/p7.jpg"));
    clothsMap.set("paint_8", textureLoader.load("static/textures/p8.jpg"));

    gltfLoader.load("static/models/mountain/paints.glb", (gltf) => {
      const model = gltf.scene;
      const width = 750 * 0.005;
      const height = 1500 * 0.005;

      const segmentsX = Math.round(width * 2);
      const segmentsY = Math.round(height * 2);
      const top_geometry = new THREE.BoxGeometry(width, 0.1, 0.1);
      const top_material = new THREE.MeshBasicMaterial({ color: "gold" });

      const softBodyHelpers = new Ammo.btSoftBodyHelpers();
      for (let i = 0; i < 9; i++) {
        // 原图
        const mesh = model.getObjectByName(`hua_${i + 1}`) as THREE.Mesh<
          THREE.BufferGeometry,
          THREE.MeshStandardMaterial
        >;
        mesh.material.side = THREE.DoubleSide;
        const paint_material = new THREE.MeshBasicMaterial({
          side: THREE.DoubleSide,
        });
        const map = clothsMap.get(`paint_${i}`);
        map.colorSpace = THREE.SRGBColorSpace;
        paint_material.map = map;
        paint_material.needsUpdate = true;
        const paint_geometry = new THREE.PlaneGeometry(
          width,
          height,
          segmentsX,
          segmentsY
        );
        // 创建的图
        const cloth = new THREE.Mesh(paint_geometry, paint_material);
        cloth.position.copy(mesh.position);
        cloth.scale.copy(mesh.scale).multiplyScalar(2);
        cloth.quaternion.copy(mesh.quaternion);
        cloths.add(cloth);

        // /**
        //  * 00┎──────┒01
        //  *   ┃      ┃
        //  *   ┃      ┃
        //  * 10┖──────┚11
        //  */

        // 创建布匹软刚体
        const corner00 = new Ammo.btVector3(-width * 0.5, height * 0.5, 0);
        const corner01 = new Ammo.btVector3(width * 0.5, height * 0.5, 0);
        const corner10 = new Ammo.btVector3(-width * 0.5, -height * 0.5, 0);
        const corner11 = new Ammo.btVector3(width * 0.5, -height * 0.5, 0);

        const clothSoftBody = softBodyHelpers.CreatePatch(
          physicsWorld.getWorldInfo(),
          corner00,
          corner01,
          corner10,
          corner11,
          segmentsX + 1,
          segmentsY + 1,
          0,
          true
        );
        const softBodyConfig = clothSoftBody.get_m_cfg();
        softBodyConfig.set_viterations(10);
        softBodyConfig.set_piterations(10);
        softBodyConfig.set_kLF(0.05);
        softBodyConfig.set_kDG(0.01);

        clothSoftBody.setTotalMass(1, false);
        Ammo.castObject(clothSoftBody, Ammo.btCollisionObject)
          .getCollisionShape()
          .setMargin(MARGIN * 3);
        physicsWorld.addSoftBody(clothSoftBody, 1, -1);

        cloth.userData.physicsBody = clothSoftBody;

        clothSoftBody.setActivationState(4);
        // 创建顶部支架
        const header = new THREE.Mesh(top_geometry, top_material);
        header.position.setY(height * 0.5 * cloth.scale.y).add(cloth.position);
        header.scale.copy(cloth.scale);
        header.quaternion.copy(cloth.quaternion);
        headers.add(header);

        // 创建支架硬刚体
        const headerMass = 0;
        const headerShape = new Ammo.btBoxShape(
          new Ammo.btVector3(width, 0.1, 0.1)
        );
        const transform = new Ammo.btTransform();
        transform.setIdentity();
        {
          const { x, y, z } = header.position;
          transform.setOrigin(new Ammo.btVector3(x, y, z));
        }
        {
          const { x, y, z, w } = header.quaternion;
          transform.setRotation(new Ammo.btQuaternion(x, y, z, w));
        }

        const motionState = new Ammo.btDefaultMotionState(transform);
        const localInertia = new Ammo.btVector3(0, 0, 0);
        headerShape.calculateLocalInertia(headerMass, localInertia);
        const rigidBodyInfo = new Ammo.btRigidBodyConstructionInfo(
          headerMass,
          motionState,
          headerShape,
          localInertia
        );
        const body = new Ammo.btRigidBody(rigidBodyInfo);

        header.userData.physicsBody = body;
        body.setActivationState(4);
        physicsWorld.addRigidBody(body);

        // 连接
        const influence = 0.5;
        for (let i = 0; i < segmentsX + 1; i++) {
          clothSoftBody.appendAnchor(
            i,
            header.userData.physicsBody,
            false,
            influence
          );
        }
      }
      scene.add(cloths);
      scene.add(headers);
      const { u_fogColor, u_bottomY, u_topY } = uniforms;
      modifyShader(cloths, [
        {
          type: "heightFog",
          uniforms: {
            u_HeightFogColor: u_fogColor,
            u_HeightFogBottomY: u_bottomY,
            u_HeightFogTopY: u_topY,
          },
        },
      ]);

      modifyShader(headers, [
        {
          type: "heightFog",
          uniforms: {
            u_HeightFogColor: u_fogColor,
            u_HeightFogBottomY: u_bottomY,
            u_HeightFogTopY: u_topY,
          },
        },
      ]);
    });

    // camera
    let cameraMixer: THREE.AnimationMixer;
    gltfLoader.load("static/models/mountain/camera.glb", (gltf) => {
      if (gltf.cameras.length) {
        const camera0 = gltf.cameras[0] as THREE.PerspectiveCamera;
        camera.position.copy(camera0.position);
        camera.rotation.copy(camera0.rotation);

        camera.name = camera0.name;
        cameraMixer = new THREE.AnimationMixer(camera);
        camera.userData.mixer = cameraMixer;
        camera.userData.duration = 0;
        gltf.animations.forEach((clip) => {
          // this.totalJourneyDuration = clip.duration;
          camera.userData.duration = Math.max(
            camera.userData.duration,
            clip.duration
          );
          const action = cameraMixer.clipAction(clip);
          action.play();
        });
        cameraMixer.update(0);
      }
    });

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);

    /**
     * Sizes
     */
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    window.addEventListener("resize", () => {
      // Update sizes
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;

      // Update camera
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();

      // Update renderer
      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });

    /**
     * Camera
     */
    // Base camera

    const camera = new THREE.PerspectiveCamera(
      72,
      sizes.width / sizes.height,
      0.1,
      1500
    );
    camera.position.set(0, 500, -500);
    camera.lookAt(0, 0, 0);
    scene.add(camera);

    // 相机运动参数
    const cameraPar = {
      seek: {
        type: <"number">"number",
        value: 0,
        min: 0,
        max: camera.userData.duration,
      },
    };

    // Controls
    const controls = new OrbitControls(camera, canvas as HTMLElement);
    controls.target.set(0, 0.75, 0);
    controls.enableDamping = true;

    /**
     * Renderer
     */
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas as HTMLElement,
    });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(uniforms.u_fogColor.value);

    /**
     * Animate
     */
    const clock = new THREE.Clock();
    tweakFog({
      top: 0.22,
      bottom: 0,
      duration: 4.5,
    });
    let elapsedTime = 0;
    const tick = () => {
      let dt = clock.getDelta();
      elapsedTime += dt;
      if (dt > 0.1) {
        dt = 0.1;
      }
      // Update controls
      // controls.update();

      if (cameraMixer) {
        const duration = camera.userData.duration as number;

        // 丹顶鹤飞行动画
        craneMixer && craneMixer.setTime(cameraMixer.time);
        craneGroupMixerList &&
          craneGroupMixerList.forEach((item, indx) => {
            item.update(dt);
          });

        // 云朵漂浮动画
        mists &&
          mists.children.forEach((itemX) => {
            itemX.children.forEach((mesh) => {
              const { speed, angularSpeed } = mesh.userData;
              mesh.position.x -= speed * dt;
              mesh.rotation.z += angularSpeed * dt;

              const { material } = mesh as THREE.Mesh<
                THREE.PlaneGeometry,
                THREE.MeshBasicMaterial
              >;
              if (mesh.position.x < X_RANGE[0]) {
                material.opacity -= dt;

                if (material.opacity <= 0) {
                  mesh.position.set(
                    X_RANGE[1],
                    randFloat(Y_RANGE[0], Y_RANGE[1]),
                    randFloat(Z_RANGE[0], Z_RANGE[1])
                  );
                  mesh.userData.speed = randFloat(SP_RANGE[0], SP_RANGE[1]);
                  mesh.userData.angularSpeed = randFloat(
                    AS_RANGE[0],
                    AS_RANGE[1]
                  );
                }
              } else {
                if (material.opacity < 1) {
                  material.opacity += dt;
                }
              }
            });
          });

        // 画布软体动画
        physicsWorld.stepSimulation(dt, 10);
        const angle = (Math.random() - 0.5) * Math.PI;
        var windForce = new THREE.Vector3(Math.sin(angle), 0, Math.cos(angle));
        // 例如：沿着 X 轴吹的风
        windForce.normalize(); // 标准化为单位向量
        windForce.multiplyScalar(Math.cos(elapsedTime * 1.5) * 0.01); // 调整风的强度

        cloths.children.forEach((child, idx) => {
          const startTm = PAINT_START_POS[idx];
          const endTm = PAINT_END_POS[idx];
          if (cameraMixer.time < startTm || cameraMixer.time > endTm) return;

          const cloth = child as THREE.Mesh<
            THREE.PlaneGeometry,
            THREE.MeshBasicMaterial
          >;

          const softBody = cloth.userData.physicsBody;
          if (!softBody) return;
          const clothPositions = cloth.geometry.attributes.position.array;
          const numVerts = clothPositions.length / 3;
          const nodes = softBody.get_m_nodes();
          let indexFloat = 0;
          // 风力
          const absForce = new THREE.Vector3();
          absForce.copy(windForce);
          absForce.applyEuler(cloth.rotation);
          const force = new Ammo.btVector3(absForce.x, absForce.y, absForce.z);
          softBody.addForce(force);
          for (let i = 0; i < numVerts; i++) {
            const node = nodes.at(i);
            const nodePos = node.get_m_x();
            clothPositions[indexFloat++] = nodePos.x();
            clothPositions[indexFloat++] = nodePos.y();
            clothPositions[indexFloat++] = nodePos.z();
          }
          cloth.geometry.computeVertexNormals();
          cloth.geometry.attributes.position.needsUpdate = true;
          cloth.geometry.attributes.normal.needsUpdate = true;
        });

        //   // console.log(
        //   //   "cameraMixer:",
        //   //   cameraMixer.time,
        //   //   "inOutro:",
        //   //   inOutro.value,
        //   //   "duration:",
        //   //   duration,
        //   //   "goState:",
        //   //   goState.value,
        //   //   "goSpeed:",
        //   //   goSpeed.value
        //   // );

        // 点击按钮动画
        // 计算goSpeed，使用lerp插值模拟惯性
        if (inOutro.value) {
          goSpeed.value = lerp(goSpeed.value, 2, clamp(dt, 0, 1));

          if (cameraMixer.time > duration) {
            doReplay();
          }
        } else {
          if (goState.value) {
            goSpeed.value = lerp(goSpeed.value, 1, clamp(dt * 5, 0, 1));
          } else {
            goSpeed.value = lerp(goSpeed.value, 0, clamp(dt * 3, 0, 1));
            if (goSpeed.value <= 0.0001) {
              goSpeed.value = 0;
            }
            if (cameraMixer.time < 0.75) {
              goSpeed.value = Math.max(goSpeed.value, 0.05);
            }
          }

          if (cameraMixer.time >= 46.0) {
            inOutro.value = true;
            tweakFog({
              top: 200,
              bottom: 10,
              duration: 5,
              ease: "power1.in",
            });
          }
        }
        if (goSpeed.value > 0) {
          cameraMixer.update(dt * goSpeed.value * 0.8);
          // todo 画布
          const folder = camera.userData.gui_folder;
        }
      }
      // Render
      renderer.render(scene, camera);

      // Call tick again on the next frame
      window.requestAnimationFrame(tick);
    };

    tick();
  });
});
</script>

<style scoped>
.webgl {
  position: fixed;
  top: 0;
  left: 0;
  outline: none;
}
</style>
