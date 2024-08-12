#include './perlin3DNosie.glsl

uniform float uTime;
uniform float uStrength;
varying vec3 vN;
varying vec2 vUv;
varying float vElevation;

void main() {
    float uBigWavesElevation = 0.2;
    vec2 uBigWavesFrequency = vec2(4., 1.5);
    float uSmallWavesElevation = 0.15;
    float uSmallWavesFrequency = 3.;
    float uSmallWavesSpeed = 0.2;
    float uSmallIterations = 4.;
    float uBigWavesSpeed = 0.75;

    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    // Elevation
    float elevation = sin(modelPosition.x * uBigWavesFrequency.x * uStrength * 0.5  + uTime * uBigWavesSpeed ) *
        sin(modelPosition.z * uBigWavesFrequency.y  + uTime * uBigWavesSpeed * uStrength  * 0.5) *
        uBigWavesElevation ;
    for(float i = 1.0; i <= uSmallIterations; i++) {
        elevation -= abs(cnoise(vec3(modelPosition.xz * uSmallWavesFrequency * i, uTime * uSmallWavesSpeed)) * uSmallWavesElevation / i);
    }
    modelPosition.xy += elevation;
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    csm_PositionRaw = projectedPosition;

    // Varyings
    vElevation = elevation;
    vN = normalize(normal);
    vUv = uv;
}