uniform float uTime;
uniform float tAudioData;
varying vec2 vUv;
varying vec3 vNormal;
uniform float uStrength;

void main() {
     float a = smoothstep(0.,uStrength,1.);
     gl_FragColor = vec4(vNormal, a);
}        