varying vec2 vUv;
varying float tm;

void main()
{
vec2 wavedUv = vec2(vUv.x, vUv.y + cos((vUv.x) * sin(tm*0.5)*10.0) * 0.1);
    
    float strength = 1.0 - step(0.01, abs(distance(wavedUv*1.1, vec2(0.5)) - 0.25));
    vec3 color = vec3(strength)*vec3(1.0, 0.0, 0.0).rgb;
    if ( color == vec3(0.0)) {
        discard;
    } else {
    gl_FragColor = vec4(color, 0.5);
    }
}