attribute float sRandom;
uniform float time;
varying vec2 shaderUV;
varying float tm;
varying float rnd;

void main()
{
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  modelPosition.x += modelPosition.x*0.5;
  modelPosition.y += modelPosition.y*0.5;
  modelPosition.z += modelPosition.z*0.5;
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;
  gl_Position = projectedPosition;
  shaderUV = uv;
  tm = time;
  rnd = sRandom;
}