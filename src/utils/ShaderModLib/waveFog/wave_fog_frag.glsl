gl_FragColor = vec4 (mix (gl_FragColor.rgb, u_WaveFogColor, v_WaveFogStrength), gl_FragColor.a);
