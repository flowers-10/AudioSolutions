import * as _ from "three";



type ModifyColorSpaceOptions = {
    type: "colorSpace";
    value: _.ColorSpace;
  };
  
  type ModifyEmissiveOptions = {
    type: "emissive";
  };
  
  type ModifyPointSizeOptions = {
    type: "pointSize";
  };
  
  type ModifyMaterialOptions = (
    | ModifyColorSpaceOptions
    | ModifyEmissiveOptions
    | ModifyPointSizeOptions
  )[];

  
const pointSizeMod = (material: _.PointsMaterial) => {
  material.sizeAttenuation = true;
  material.size = 0.05;
  material.transparent = true;
};
const colorSpaceMod = (material: _.Material, colorSpace: _.ColorSpace) => {
  for (const key in material) {
    const property = material[key as keyof typeof material];
    if (property && (property as _.Texture).isTexture) {
      (property as _.Texture).colorSpace = colorSpace;
    }
  }
};
const emissiveColorMod = (material: _.Material) => {
  const m = material as any;
  if (m.color) {
    m.emissive = m.color;
  }
  if (m.map) {
    m.emissiveMap = m.map;
  }
};

const modifyMaterial = (
  object3D: _.Object3D,
  options: ModifyMaterialOptions
) => {
  const map = new Map<string, _.Material>();
  object3D.traverse((child) => {
    if ((child as _.Mesh).isMesh) {
      const mesh = child as _.Mesh;
      if ((mesh.material as _.Material).isMaterial) {
        const material = mesh.material as _.Material;
        map.set(material.uuid, material);
      }
    } else if ((child as _.Points).isPoints) {
      const point = child as _.Points;
      const material = point.material as _.Material;
      map.set(material.uuid, material);
    }
  });
  map.forEach((material) => {
    options.forEach((option) => {
      switch (option.type) {
        case "colorSpace":
          colorSpaceMod(material, option.value);
          break;
        case "emissive":
          emissiveColorMod(material);
          break;
        case "pointSize":
          pointSizeMod(material as _.PointsMaterial);
          break;
      }
    });
  });

  // map.clear();
};

interface MaterialMap {
  basic: _.MeshBasicMaterial;
}
interface MaterialOptionsMap {
  basic: _.MeshBasicMaterialParameters;
}

const changeMaterial = <K extends keyof MaterialMap>(
  object3D: _.Object3D,
  Material: new (options?: MaterialOptionsMap[K]) => MaterialMap[K],
  options?: MaterialOptionsMap[K]
) => {
  const map = new Map<string, _.Material>();
  object3D.traverse((child) => {
    if ((child as _.Mesh).isMesh) {
      const mesh = child as _.Mesh;
      if ((mesh.material as _.Material).isMaterial) {
        const material = mesh.material as _.Material;
        // map.set(material.uuid, material);
        if (!map.has(material.uuid)) {
          const newMaterial = new Material();
          newMaterial.copy(material);
          options && newMaterial.setValues(options);
          map.set(material.uuid, newMaterial);
        }

        mesh.material = map.get(material.uuid)!;
      }
    }
  });
};

export { modifyMaterial, changeMaterial };
