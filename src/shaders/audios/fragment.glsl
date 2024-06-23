uniform float uTime;
uniform sampler2D tAudioData;
varying vec2 vUv;

void main() {
    gl_FragColor = vec4(vUv, 1., 1.0);
}        