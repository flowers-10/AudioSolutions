import * as _ from "three"
import vertex_pars from './stroke_pars_vert.glsl';
import vertex from "./stroke_vert.glsl";
import fragment_pars from "./stroke_pars_frag.glsl";
import fragment from "./stroke_frag.glsl";


const Stroke = {
    vertex_pars,
    vertex,
    fragment_pars,
    fragment,
}
export default Stroke;

export interface IStrokeUniform {
    u_stroke_color: _.IUniform<_.Color>,
    u_stroke_thickness: _.IUniform<number>
}