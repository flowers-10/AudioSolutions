vec4 wave_fog_model_pos = modelMatrix * vec4 (transformed, 1.0);

float wf_ele = (u_WaveFogTop - u_WaveFogBottom) * 0.5; // 程度
float wf_mid = (u_WaveFogTop + u_WaveFogBottom) * 0.5; // 中点
float wf_pos = wf_ele * sin (wave_fog_model_pos.x * u_WaveFogFrequency.x + u_WaveFogTime) + wf_mid; //
// * sin (u_WaveFogFrequency.y * wave_fog_model_pos.z + u_WaveFogTime);
float wf_bottom = wf_pos - u_WaveFogDeep;
v_WaveFogStrength = clamp ((wf_pos - wave_fog_model_pos.y) / (wf_pos - wf_bottom), 0.0, 1.0);
