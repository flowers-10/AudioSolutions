uniform float uStrength;
varying vec3 vN;
varying float vElevation;

void main() {
     vec3 uDepthColor = vec3(0.27, 0.31, 0.4);
     vec3 uSurfaceColor = vec3(1., 1.,1.);
     float uColorOffset = 0.08;
     float uColorMultiplier = 5.;
     vec3 fogColor = vec3(0., 0.,0.);
     float fogNear = 4.;
     float fogFar = 0.75;

     float mixStrength = (vElevation + uColorOffset) * uColorMultiplier;
     vec3 color = mix(uDepthColor, uSurfaceColor, mixStrength);
     gl_FragColor = vec4(color, 1.0);
    //#ifdef USE_FOG 是一个预处理指令，在着色器代码中用于检查是否定义了 USE_FOG 这个宏，可以在material中的fog开启或关闭
     // #ifdef USE_FOG
    //  gl_FragCoord.z / gl_FragCoord.w就表示当前片元和camera之间的距离即深度
     float depth = gl_FragCoord.z / gl_FragCoord.w;
     float fogFactor = smoothstep(fogNear, fogFar, depth);

     csm_FragColor.rgb = mix(gl_FragColor.rgb, fogColor, fogFactor);
     //  #endif
}