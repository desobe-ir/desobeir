attribute float sRandom;
uniform float time;

varying vec2 vUv;
varying float tm;

void main()
{
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  modelPosition.z += sin((sRandom) * 30.0* time) * 0.03;
  modelPosition.y += sin((modelPosition.x * time) * 10.0) / 500.0;
  modelPosition.x += sin((modelPosition.y + time) * 10.0) / 500.0;
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;
  gl_Position = projectedPosition;
  vUv = uv;
  tm = time;
}