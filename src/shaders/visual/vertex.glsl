#include './simplexNosie.glsl

attribute float aOffset;
uniform float uTime;
uniform float tAudioData;
uniform float uStrength;
varying vec3 vN;

void main() {
    vec3 newPos = position;
    float strength = uStrength;
    newPos += csm_Normal * simplexNoise4d(vec4(position, uTime)) * strength;
    csm_PositionRaw = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
    vN = csm_Normal;
}