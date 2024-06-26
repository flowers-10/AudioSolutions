#include './simplexNosie.glsl

attribute float aOffset;
varying vec2 vUv;
uniform float uTime;
uniform float tAudioData;
uniform float uStrength;
varying vec3 vNormal;

void main() {
    vec3 newPos = position;
    float strength = uStrength;
    newPos += normal * simplexNoise4d(vec4(position, uTime)) * strength;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
    vUv = uv;
    vNormal = normal;
}