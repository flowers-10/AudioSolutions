float distanceTo(vec2 src, vec2 dst) {
    float dx = src.x - dst.x;
    float dy = src.y - dst.y;
    float dv = dx * dx + dy * dy;
    return sqrt(dv);
}

uniform float iTime;
varying vec3 vPosition;
uniform float height;
uniform float maxHeight;
uniform vec3 uFlowColor;
uniform vec3 uCityColor;

void main() {
    vec3 distColor = uCityColor;
    // Special effect of rising light band
    float dIndex = sin((iTime * 20. - vPosition.y) / maxHeight * 2.);
    // distColor = mix(uFlowColor, distColor, dIndex);

    // Locate the current point position
    vec2 position2D = vec2(vPosition.x, vPosition.z);
    // Find the distance from the point to the origin
    float Len = distanceTo(position2D, vec2(0, 0));
    float frequency = 30.;
    // The 'float maxHeight' control the radius of special effects
    if(Len > height * frequency && Len < (height * frequency + maxHeight)) {
        // choose any type of effect
        // 1.color gradient
        float dIndex = sin((Len - height * frequency) / maxHeight * 3.14);
        distColor = mix(uFlowColor, distColor, .7 - dIndex);

        // 2.fade effect
        // distColor= mix(uFlowColor, distColor, 1. - height / maxHeight);
    }
    gl_FragColor = vec4(distColor, 0.8);
}