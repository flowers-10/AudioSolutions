import { IUniform, Color, Vector2 } from 'three';
import vertex from "./wave_fog_vert.glsl";
import vertex_pars from "./wave_fog_vert_pars.glsl";
import fragment from "./wave_fog_frag.glsl";
import fragment_pars from "./wave_fog_frag_pars.glsl";

const WaveFog = {
    vertex,
    vertex_pars,
    fragment,
    fragment_pars
}

export default WaveFog;

export interface IWaveFogUniform {
    u_WaveFogColor: IUniform<Color>,
    u_WaveFogTop: IUniform<number>,
    u_WaveFogBottom: IUniform<number>,
    u_WaveFogDeep: IUniform<number>,
    u_WaveFogTime: IUniform<number>,
    u_WaveFogFrequency: IUniform<Vector2>
}