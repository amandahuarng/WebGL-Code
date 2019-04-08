var gl;
var points;
var boundary = true;
var interior = true;
var flatBoundary = false;
var flatInterior = false;
var baseColor = vec4(1, 0, 0, 1);
var interiorColors = [baseColor, baseColor, baseColor];
var boundaryColors = [baseColor, baseColor, baseColor];

window.onload = function init()
{
    var canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }
    
    var vertices = [
        vec2(-1.0, -1.0),
        vec2(0.0, 1.0),
        vec2(1.0, -1.0)
    ];

    //  Configure WebGL

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );
    
    //  Load shaders and initialize attribute buffers
    
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    
    // Load the data into the GPU
    
    var vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices.concat(vertices)), gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer
    
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    var bufferColor = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferColor );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(interiorColors.concat(boundaryColors)), gl.DYNAMIC_DRAW );

    var vColor = gl.getAttribLocation( program, "vColor" );
    gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor );

    document.getElementById("setBColors").onclick = function() {
        v1 = vec4(parseInt(document.getElementById("BoundV1Red").value)/255.0, parseInt(document.getElementById("BoundV1Green").value)/255.0, parseInt(document.getElementById("BoundV1Blue").value)/255.0, 1);
        v2 = vec4(parseInt(document.getElementById("BoundV2Red").value)/255.0, parseInt(document.getElementById("BoundV2Green").value)/255.0, parseInt(document.getElementById("BoundV2Blue").value)/255.0, 1);
        v3 = vec4(parseInt(document.getElementById("BoundV3Red").value)/255.0, parseInt(document.getElementById("BoundV3Green").value)/255.0, parseInt(document.getElementById("BoundV3Blue").value)/255.0, 1);
        boundaryColors = [v1, v2, v3];
        console.log(boundaryColors);
        gl.bindBuffer( gl.ARRAY_BUFFER, bufferColor );
        gl.bufferSubData( gl.ARRAY_BUFFER, 0, flatten(interiorColors.concat(boundaryColors)));
        render(boundary, interior);
    }

    document.getElementById("setIColors").onclick = function() {
        v1 = vec4(parseInt(document.getElementById("IntV1Red").value)/255.0, parseInt(document.getElementById("IntV1Green").value)/255.0, parseInt(document.getElementById("IntV1Blue").value)/255.0, 1);
        v2 = vec4(parseInt(document.getElementById("IntV2Red").value)/255.0, parseInt(document.getElementById("IntV2Green").value)/255.0, parseInt(document.getElementById("IntV2Blue").value)/255.0, 1);
        v3 = vec4(parseInt(document.getElementById("IntV3Red").value)/255.0, parseInt(document.getElementById("IntV3Green").value)/255.0, parseInt(document.getElementById("IntV3Blue").value)/255.0, 1);
        interiorColors = [v1, v2, v3];
        gl.bindBuffer( gl.ARRAY_BUFFER, bufferColor );
        gl.bufferData( gl.ARRAY_BUFFER, flatten(interiorColors.concat(boundaryColors)), gl.DYNAMIC_DRAW );
        render(boundary, interior);
    }

    document.getElementById("flatBoundaryButton").onclick = function() {
        flatBoundary = !flatBoundary;
        if(flatBoundary) {
            document.getElementById('flatBoundaryButton').innerText = "Interpolated";
            gl.bindBuffer( gl.ARRAY_BUFFER, bufferColor );
            gl.bufferData( gl.ARRAY_BUFFER, flatten(interiorColors.concat([boundaryColors[0], boundaryColors[0],boundaryColors[0]])), gl.DYNAMIC_DRAW );
        }
        else {
            document.getElementById('flatBoundaryButton').innerText = "Flat";
            gl.bindBuffer( gl.ARRAY_BUFFER, bufferColor );
            gl.bufferData( gl.ARRAY_BUFFER, flatten(interiorColors.concat(boundaryColors)), gl.DYNAMIC_DRAW );
        }
        render(boundary, interior);
    }

    document.getElementById("flatInteriorButton").onclick = function() {
        flatInterior = !flatInterior;
        if(flatInterior) {
            document.getElementById('flatInteriorButton').innerText = "Interpolated";
            gl.bindBuffer( gl.ARRAY_BUFFER, bufferColor );
            gl.bufferData( gl.ARRAY_BUFFER, flatten([interiorColors[0],interiorColors[0], interiorColors[0]].concat(boundaryColors)), gl.DYNAMIC_DRAW );
        }
        else {
            document.getElementById('flatInteriorButton').innerText = "Flat";
            gl.bindBuffer( gl.ARRAY_BUFFER, bufferColor );
            gl.bufferData( gl.ARRAY_BUFFER, flatten(interiorColors.concat(boundaryColors)), gl.DYNAMIC_DRAW );
        }
        render(boundary, interior);
    }
    render(boundary, interior);
};

function showBoundary() {
    boundary = !boundary;
    if(boundary) {
        document.getElementById('boundary').innerText = "Hide";
    }
    else {
        document.getElementById('boundary').innerText = "Show";
    }
    render(boundary, interior);
}

function showInterior() {
    interior = !interior;
    if(interior) {
        document.getElementById('interior').innerText = "Hide";
    }
    else {
        document.getElementById('interior').innerText = "Show";
    }
    render(boundary, interior);
}

function flattenInterior() {
    flatInterior = !flatInterior;
    if(flatInterior) {
        document.getElementById('flatInteriorButton').innerText = "Interpolated";
        interiorColors[1] = interiorColors[0];
        interiorColors[2] = interiorColors[0];
    }
    else {
        document.getElementById('flatInteriorButton').innerText = "Flat";
        setInteriorColor();
    }
}

function render(boundary, interior) {
    gl.clear( gl.COLOR_BUFFER_BIT );
    if(interior){
        gl.drawArrays( gl.TRIANGLES, 0, 3 );
    }
    if(boundary){
        gl.drawArrays( gl.LINE_LOOP, 3, 3);
    }
}

