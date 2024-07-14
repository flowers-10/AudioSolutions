uniform float iTime;
uniform sampler2D iTexture;  // 地板纹理
uniform sampler2D maskTexture;  // 扫光遮罩纹理
varying vec2 vUv;
varying vec3 vPosition;

void main() {
    vec2 repeatedUV = fract(vUv * 10.0);
    vec4 floorColor = texture2D(iTexture, repeatedUV);

    gl_FragColor = vec4(floorColor.r * 0.55, floorColor.g * 0.55, floorColor.b, floorColor.a * 0.2);
}