float dis = distance (gl_PointCoord, vec2 (0.5)); // 0 - 0.5
if (dis > 0.5) {
discard;
}

//float strengh = dis > 0.5 ? 0.0 : 1.0;

// gl_FragColor.a = strengh;