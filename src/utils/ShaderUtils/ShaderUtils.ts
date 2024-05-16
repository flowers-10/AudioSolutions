import * as _ from 'three';

import HeightFog, { IHeightFogUniform } from '../ShaderModLib/heightFog/HeightFog';
import Stroke, { IStrokeUniform } from '../ShaderModLib/stroke/Stroke';
import WaveFog, { IWaveFogUniform } from '../ShaderModLib/waveFog/WaveFog';
import CirclePoint from '../ShaderModLib/circlePoints/CirclePoint';



type ModifyStroke = {
    type: "stroke", uniforms: IStrokeUniform
}
type ModifyHeightFog = {
    type: "heightFog", uniforms: IHeightFogUniform
}

type ModifyWaveFog = {
    type: "waveFog", uniforms: IWaveFogUniform;
}

type ModifyPointSize = {
    type: "pointSize", uniforms: {}
}

type ModifyShaderOption = (ModifyStroke | ModifyHeightFog | ModifyWaveFog | ModifyPointSize);


interface ShaderModifyMap {
    stroke: ModifyStroke,
    heightFog: ModifyHeightFog,
    waveFog: ModifyWaveFog,
    pointSize: ModifyPointSize,
}

const modifyShader = (object3D: _.Object3D, options: ModifyShaderOption[]) => {
    const uniforms = <any>{};
    options.forEach(option => {
        for (let key in option.uniforms) {
            uniforms[key] = option.uniforms[key as keyof typeof option.uniforms]
        }
    });
    const optMap = new Map<keyof ShaderModifyMap, ModifyShaderOption>();
    for (const opt of options) {
        optMap.set(opt.type, opt);
    }
    const map = new Map<string, _.Material>();
    object3D.traverse(child => {
        if ((child as _.Mesh).isMesh || (child as _.Points).isPoints) {
            const mesh = child as _.Mesh;
            if ((mesh.material as _.Material).isMaterial) {
                const material = mesh.material as _.Material;
                map.set(material.uuid, material);
            }
        }
    })

    map.forEach(material => {
        material.onBeforeCompile = shader => {
            optMap.forEach((opt) => {
                const { uniforms } = opt;
                for (const key in uniforms) {
                    shader.uniforms[key] = uniforms[key as keyof typeof uniforms];
                }
            })

            let { vertexShader, fragmentShader } = shader;

            // 顶点着色器
            vertexShader = vertexShader.replace(
                `#include <common>`,
                `#include <common>
                ${optMap.has("stroke") ? Stroke.vertex_pars : ""}
                ${optMap.has("waveFog") ? WaveFog.vertex_pars : ""}
                ${optMap.has("heightFog") ? HeightFog.vertex_pars : ""}
                `,
            ).replace(
                `#include <worldpos_vertex>`,
                `#include <worldpos_vertex>
                ${optMap.has("stroke") ? Stroke.vertex : ""}
                `,
            ).replace(
                `#include <project_vertex>`,
                `#include <project_vertex>
                ${optMap.has("waveFog") ? WaveFog.vertex : ""}
                ${optMap.has("heightFog") ? HeightFog.vertex : ""}
                `,
            );


            // 片元着色器
            fragmentShader = fragmentShader.replace(
                `#include <common>`,
                `#include <common>
                ${optMap.has("stroke") ? Stroke.fragment_pars : ""}
                ${optMap.has("waveFog") ? WaveFog.fragment_pars : ""}
                ${optMap.has("heightFog") ? HeightFog.fragment_pars : ""}
                `,
            ).replace(
                `#include <opaque_fragment>`,
                `#include <opaque_fragment>
                ${optMap.has("stroke") ? Stroke.fragment : ""}
                ${optMap.has("waveFog") ? WaveFog.fragment : ""}
                ${optMap.has("heightFog") ? HeightFog.fragment : ""}
                ${optMap.has("pointSize") ? CirclePoint.frag : ""}
                `,
            );


            shader.vertexShader = vertexShader;
            shader.fragmentShader = fragmentShader;
        }


    });

    object3D.userData.uniforms = uniforms;
}

export { modifyShader }