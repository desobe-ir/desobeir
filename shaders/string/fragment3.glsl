varying vec2 shaderUV;
varying float tm;
varying float rnd;

mat2 rotate2d(float angle){
    return mat2(cos(angle),-sin(angle),
                sin(angle),cos(angle));
}

float variation(vec2 v1, vec2 v2, float strength, float speed) {
	return sin(
        dot(normalize(v1), normalize(v2)) * strength + tm * speed
    ) / 50.0;
}

vec3 paintCircle (vec2 uv, vec2 center, float rad, float width) {
    
    vec2 diff = center-uv;
    float len = length(diff);

    len += variation(diff, vec2(0.0, 1.0), 5.0, 10.0);
    len -= variation(diff, vec2(1.0, 0.0), 5.0, 10.0);
    
    float circle = smoothstep(rad-width, rad, len) - smoothstep(rad, rad+width, len);
    return vec3(circle);
}

void main()
{
	vec2 uv = shaderUV;
    uv.x *= 1.5;
    uv.x -= 0.7;
    
    vec3 color;
    float radius = 0.20;
    vec2 center = vec2(0.5);
    
    color = paintCircle(uv, center, radius, 0.1);
    
    vec2 v = rotate2d(tm) * uv;
    
    color = paintCircle(uv, center, radius, 0.01);
    color *= vec3(0.0, 0.0, 0.6);
    if (color == vec3(0.0)) {
        discard;
    } else {
    gl_FragColor = vec4(color, 0.5);
    }    
}