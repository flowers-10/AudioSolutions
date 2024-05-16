import { IUniform, Color } from 'three';
import vertex from "./height_fog_vert.glsl";
import vertex_pars from "./height_fog_pars_vert.glsl";
import fragment from "./height_fog_frag.glsl";
import fragment_pars from "./height_fog_pars_frag.glsl"

const HeightFog = {
    vertex,
    vertex_pars,
    fragment,
    fragment_pars
}

export default HeightFog;


export interface IHeightFogUniform {
    u_HeightFogColor: IUniform<Color>,
    u_HeightFogTopY: IUniform<number>,
    u_HeightFogBottomY: IUniform<number>,
}