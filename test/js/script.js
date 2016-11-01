var CANVASWIDTH = 600;
var CANVASHEIGHT = 300;

var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d")

canvas.width = CANVASWIDTH;
canvas.height = CANVASHEIGHT;

window.onload = function(){
  draw();
}

function draw() {
    context.beginPath();
    context.lineTo(100,100);
    context.lineTo(200,200);
    context.stroke();
}
