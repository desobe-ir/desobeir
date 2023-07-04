// Uniforms
// uniform vec3 cameraPosition;
uniform vec3 lightDirection;
uniform float time;

// Varyings
varying vec3 vPosition;
varying vec3 vNormal;

void main() {
  // Calculate distance from camera to fragment
  float distance = length(vPosition - cameraPosition);
  
  // Calculate dot product of surface normal and light direction
  float diffuse = dot(vNormal, -lightDirection);
  
  // Apply time-based distortion to texture coordinates
  vec3 distortedPosition = vPosition + vec3(0.1 * sin(time * 2.0), 0.1 * cos(time * 3.0), 0.1 * sin(time * 5.0));
  
  // Calculate distance from center of sphere
  float radius = length(distortedPosition);
  
  // Apply bubble effect to fragment
  float bubble = 1.0 - pow(radius, 2.0);
  bubble = mix(bubble, 1.0, 0.8);
  
  // Apply final color to fragment
  vec3 color = vec3(0.0, 0.5, 1.0);
  color = mix(color, vec3(1.0), bubble);
  color *= diffuse;
  color = mix(color, vec3(1.0), pow(distance * 0.1, 2.0));
  
  gl_FragColor = vec4(color, 0.65);
}