vec4 model_pos = modelMatrix * vec4(transformed, 1.0);
v_HeightFogStrength = clamp((u_HeightFogTopY - model_pos.y) / (u_HeightFogTopY - u_HeightFogBottomY), 0.0, 1.0);