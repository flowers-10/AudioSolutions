varying vec2 vUv;
uniform sampler2D tAudioData;

void main(){
    vec4 audioSample = texture2D(tAudioData, uv); 
    // float pulseFactor = sin(audioSample + length(position) * 0.1);
    // pulseFactor = pulseFactor * 0.6 + 0.4;
    
    // vec3 newPosition = position * pulseFactor;
    // float x = mix(audioSample.r,position.x,.1);
    // float y = mix(audioSample.g,position.y,.1);
    // float z = mix(audioSample.b,position.z,.1);
    // vec3 newPosition = vec3(x,y,z);

    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    vUv=uv;
}