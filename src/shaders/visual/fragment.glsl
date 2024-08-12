uniform float uStrength;
varying vec3 vN;

void main() {
     float a = smoothstep(0.,uStrength,1.);
     csm_FragColor = vec4(    normalize(vN) + 0.3, a);
}        