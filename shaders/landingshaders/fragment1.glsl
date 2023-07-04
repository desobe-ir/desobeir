uniform float time;

uniform vec2 resolution;

void main( void ) {

	vec2 uv = (gl_FragCoord.xy - resolution * .95) / max(resolution.x, resolution.y) * 3.0;

	uv *= 1.0;

	float e = .0;float a;

	for (float i=2.0;i<=104.0;i+=2.0) {

		float A= (i/5.);

		float A2= (i/2.9);

		float A3= (i*0.15);

		float T = (time/10.0);

		float T2 = (time/30.0);

		e += .005/abs(A+sin(T+A3*uv.x*cos(A2+T2+uv.x*2.2))+3.5*uv.y);

	gl_FragColor = vec4( vec3(e/10.8, e/5.6, e/1.0), 6.0);	

 

	}

}

