vec4 world_pos = vec4(transformed, 1.0);
world_pos = modelMatrix * world_pos;
vec3 normal_pos = normalize(modelMatrix * vec4(normal, 0.0)).xyz;
vec3 modelToCameraDir = normalize(cameraPosition - world_pos.xyz);
v_stroke = clamp(dot(modelToCameraDir, normal_pos), 0.0, 1.0);