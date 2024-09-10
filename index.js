const createContext = require('gl-context');
const createShader = require('gl-shader'); 
const createGeometry = require('gl-geometry');
const mat4 = require('gl-matrix/mat4');
const canvasFit = require('canvas-fit');
const glslify = require('glslify');

const canvas = document.getElementById('canvas');
const gl = createContext(canvas);
window.addEventListener('resize', canvasFit(canvas), false);

// Load the GLSL shaders with glslify
const fragShader = glslify(__dirname + '/sdf.glsl');

const shader = createShader(gl, null, fragShader);

let startTime = Date.now();
function render() {
    const time = (Date.now() - startTime) / 1000;

    // Resize the canvas to the window size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    gl.viewport(0, 0, canvas.width, canvas.height);

    shader.bind();
    shader.uniforms.resolution = [canvas.width, canvas.height];
    shader.uniforms.time = time;

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.drawArrays(gl.TRIANGLES, 0, 3);
    requestAnimationFrame(render);
}

render();
