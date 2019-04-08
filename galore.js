var gl;
var points = [];
var index = 0;
var quad_mode = false;
var quadPoints = [];
var triPoints = [];
var numTriangles = 0;
var numQuads = 0;

window.onload = function init() {
    var canvas = document.getElementById("gl-canvas");

    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) { alert("WebGL isn't available"); }

    //  Configure WebGL
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    //  Load shaders and initialize attribute buffers
    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    // Compute data.

    // Load the coordinates into the GPU
    var vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, triPoints.concat(quadPoints), gl.STATIC_DRAW);
    
    // Associate out shader variables with our data buffer
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.enableVertexAttribArray(vPosition); 
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);

    canvas.addEventListener("mousedown", function (event) {
        x = 2 * event.clientX / canvas.width - 1;
        y = 2 * (canvas.height - event.clientY) / canvas.height - 1;
        var pts = vec2(x, y);
        points.push(pts);

        gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, flatten(triPoints.concat(quadPoints).concat(points)), gl.STATIC_DRAW);
        index++
    });

    window.addEventListener("keypress", function (event) {
        if (event.keyCode == 82 | event.keyCode == 114) {
            points = [];
            triPoints = [];
            quadPoints = [];
            numTriangles = 0;
            numQuads = 0;
            index = 0;
            gl.clear(gl.COLOR_BUFFER_BIT);
        }
    });

    window.addEventListener("keypress", function (event) {
        if (event.keyCode == 84 | event.keyCode == 116) {
            quad_mode = !quad_mode;
        }
    });

    render();

};


function render() {
    gl.clear(gl.COLOR_BUFFER_BIT);
    if (quad_mode == false) { //triangles
        if (index == 3) {
            numTriangles += 1;
            for(var i = 0; i < 3; ++i){
                triPoints.push(points.pop());
            }
            index = 0;
        }
    }
    else { //quads
        if(index == 4) {
            numQuads += 1;
            for(var i = 0; i < 4; ++i){
                quadPoints.push(points.pop());
            }
            index = 0;
        }
    }
    gl.bufferData(gl.ARRAY_BUFFER, flatten(triPoints.concat(quadPoints).concat(points)), gl.STATIC_DRAW);
    gl.drawArrays(gl.TRIANGLES, 0, numTriangles*3);
    for(var i = 0; i < numQuads; i += 1) {
        gl.drawArrays(gl.TRIANGLE_STRIP, 3*numTriangles + 4*i, 4);
    }
    gl.drawArrays(gl.POINTS, (numQuads*4 + 3*numTriangles), points.length);

    window.requestAnimationFrame(render);
    };