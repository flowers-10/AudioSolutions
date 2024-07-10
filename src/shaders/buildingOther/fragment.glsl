float distanceTo(vec2 src,vec2 dst){
    float dx=src.x-dst.x;
    float dy=src.y-dst.y;
    float dv=dx*dx+dy*dy;
    return sqrt(dv);
}

uniform float iTime;
varying vec3 vPosition;
uniform float height;
uniform vec3 uFlowColor;
uniform vec3 uCityColor;

void main(){   
    vec3 distColor = uCityColor;
    // float topY = vPosition.y +350.;
    // if(height>vPosition.y && height<topY){
    //     // 颜色渐变
    //     float dIndex = sin((height - vPosition.y) / 10.0 * 3.14);
    //     distColor = mix(uFlowColor, distColor, 1. - dIndex);
    // }
    //定位当前点位位置
    vec2 position2D =vec2(vPosition.x,vPosition.z);
    //求点到原点的距离
    float Len= distanceTo(position2D,vec2(0,0));
    // 30 *30.0+130
      if(Len>height*30.0&&Len<(height*30.0+130.0)){
        // 颜色渐变
        float dIndex = sin((Len - height * 30.0) / 130.0 * 3.14);

        // 随便选一种都行
        distColor= mix(uFlowColor, distColor, 1.0 - dIndex);
        // distColor= mix(uFlowColor, distColor, 1. - height / 50.);
    }
    gl_FragColor = vec4(distColor,0.7);
}  