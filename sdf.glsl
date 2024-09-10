#pragma glslify: calcRayIntersection = require('glsl-raytrace')
#pragma glslify: sdSphere = require('glsl-sdf-primitives/sdSphere')

precision mediump float;
uniform vec2 resolution;
uniform float time;

// Define a simple sphere SDF
float sceneSDF(vec3 p) {
    return sdSphere(p, 1.0);  // A sphere with radius 1.0
}

void main() {
    vec2 uv = (gl_FragCoord.xy / resolution.xy) * 2.0 - 1.0;
    uv.x *= resolution.x / resolution.y;
    
    vec3 ro = vec3(0.0, 0.0, -5.0);  // Ray origin
    vec3 rd = normalize(vec3(uv, 1.0));  // Ray direction

    float t = calcRayIntersection(ro, rd, sceneSDF);
    
    vec3 color = vec3(0.0);
    if (t > 0.0) {
        color = vec3(1.0) - vec3(t * 0.1); // Shade based on distance
    }
    
    gl_FragColor = vec4(color, 1.0);
}
