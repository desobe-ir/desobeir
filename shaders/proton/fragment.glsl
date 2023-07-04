uniform vec3 uColor;
uniform sampler2D uTexture;

varying vec2 vUv;
varying float time;
varying vec3 vPosition;

vec2 cartesianToSpherical(vec3 v) {
    return vec2(atan(v.z, v.x), acos(v.y / length(v)));
}

void main() {
    // Calculate the spherical coordinates of the current fragment
    vec2 sphericalCoords = cartesianToSpherical(vPosition);
    
    // Calculate the vertical displacement of the texture based on time
    float yOffset = time * 0.2; // Change the amplitude and frequency as desired

    // Calculate the new UV coordinates for the fragment
    vec2 uv = vec2(
        sphericalCoords.x / (2.0 * 3.14159) + 0.5,
        mod(sphericalCoords.y / 3.14159 + 0.5 + yOffset, 1.0)
    );

    // Sample the texture at the new UV coordinates
    vec4 texel = texture2D(uTexture, uv);

    // Output the textured color
    gl_FragColor = texel;
}