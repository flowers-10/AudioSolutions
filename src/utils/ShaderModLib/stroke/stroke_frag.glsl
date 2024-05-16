if (v_stroke < u_stroke_thickness) {
    // gl_FragColor = vec4(u_stroke_color, gl_FragColor.a);
gl_FragColor = mix (gl_FragColor, vec4 (u_stroke_color, 1.), clamp ((u_stroke_thickness - v_stroke) * 2. / u_stroke_thickness, 0., 1.));
}
