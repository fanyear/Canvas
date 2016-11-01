var CANVASWIDTH = 1000;
var CANVASHEIGHT = 600;
var CANVASTEXTWIDTH = 220;
var CANVASTEXTHEIGHT = 60;

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var slider = document.getElementById("slider")

var canvasText = document.getElementById("canvasText")
var ctxText = canvasText.getContext("2d")

canvas.width = CANVASWIDTH;
canvasText.width = CANVASTEXTWIDTH;
canvasText.height = CANVASTEXTHEIGHT;
canvas.height = CANVASHEIGHT;

scale = slider.value;
var img = new Image();
img.src = "img/img.jpg";

img.onload = function() {

    //set text

    ctxText.lineWidth = 2;
    ctxText.globalAlpha = 0.7;
    ctxText.fillStyle = "#fff"

    ctxText.font = "35px Arial";
    ctxText.textBaseLine = "middle";

    ctxText.fillText("made by Paul", 10, 40)

    //draw
    drawImageByScale(scale);
    ctx.drawImage(canvasText, CANVASWIDTH - CANVASTEXTWIDTH, CANVASHEIGHT - CANVASTEXTHEIGHT)
}

slider.onmousemove = function() {
    ctx.clearRect(0, 0, CANVASWIDTH, CANVASHEIGHT)
    scale = slider.value;
    drawImageByScale(scale)
    ctx.drawImage(canvasText, CANVASWIDTH - CANVASTEXTWIDTH, CANVASHEIGHT - CANVASTEXTHEIGHT)
}

function drawImageByScale(scale) {
    var scaleWidth = img.width * scale;
    var scaleHeight = img.height * scale;

    var sx = CANVASWIDTH / 2 - scaleWidth / 2;
    var sy = CANVASHEIGHT / 2 - scaleHeight / 2;

    ctx.drawImage(img, sx, sy, scaleWidth, scaleHeight)
}
