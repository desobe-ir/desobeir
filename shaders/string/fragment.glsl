varying vec2 vUv;
varying float tm;

void main()
{
    vec2 wavedUv = vec2(vUv.x, vUv.y + cos((vUv.x) * cos(tm)*50.0) * 0.01);
    
    float strength = 1.0 - step(0.01, abs(distance(wavedUv*0.5, vec2(0.25)) - 0.25));
    vec3 color = vec3(strength)*vec3(1.0, 1.0, 0.0);
    if (color.rgb == vec3(0.0)) {
        discard;
    } else {
    gl_FragColor = vec4(color, 0.5);
    }
}