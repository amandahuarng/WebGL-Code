var canvas;
var gl;

var width = .25;
var vertices = [vec2(0, 0), vec2(0, width), vec2(width, width), vec2(width, 0)];

var score = 0;
var noClick = 0;

var x = 0;
var y = 0;

var t;
var timeout;

window.onload = function init() {
    canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.0, 0.0, 0.0, 0.5 );
    gl.clear( gl.COLOR_BUFFER_BIT );


    //
    //  Load shaders and initialize attribute buffers
    //
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    
    var vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );
    
    var vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    render();
    if(score>=0){
        playGame(vBuffer);
    }
    canvas.addEventListener("mousedown", function(event){
        noClick = 0;
        clearTimeout(timeout);
        var t = vec2(2*event.clientX/canvas.width-1, 
        2*(canvas.height-event.clientY)/canvas.height-1);
        if(t[0] > x && t[0] < (x+width) && t[1] > y && t[1] < (y+width)) {
            //if within bounds of square
            ++score;
            document.getElementById("score").innerHTML = score;
        }
        else if(score >=0) {
            --score;
            document.getElementById("score").innerHTML = score;
        }
        showPolygon(vBuffer);
    } );
}

function showPolygon(vBuffer) {
    if(noClick == 3) {
        --score;
        noClick = 0;
    }
    ++noClick;
    document.getElementById("score").innerHTML = score;
    x = 1 - (Math.random()*2);
    y = 1 - (Math.random()*2);
    if(x > 1-width) {
        x = 1-width;
    }
    if(y > 1-width) {
        y = 1-width;
    }
    vertices = [vec2(x, y), vec2(x, (y+width)), vec2((x+width), (y+width)), vec2((x+width), y)];
    playGame(vBuffer);
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.DYNAMIC_DRAW );
    render();
}

function playGame(vBuffer) {
    if(score>=0){
        timeout = setTimeout(function() { showPolygon(vBuffer) }, 1000);
    }
    if(score < 0) {
        document.getElementById("score").innerHTML = "GAME OVER";
    }
}

function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.drawArrays( gl.TRIANGLE_FAN, 0, 4 );
}