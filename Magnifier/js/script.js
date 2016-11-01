var CANVASWIDTH = 850;
var CANVASHEIGHT = 510;


var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

var canvasBack = document.getElementById("canvasBack");
var contextBack = canvasBack.getContext("2d");

canvas.width = CANVASWIDTH;
canvas.height = CANVASHEIGHT;


var img = new Image();
img.src = "img/img.jpg"

var isMouseDown = false;

img.onload = function() {

    context.drawImage(img, 0, 0, CANVASWIDTH, CANVASHEIGHT)


    canvasBack.width = img.width;
    canvasBack.height = img.height;
    contextBack.drawImage(img, 0, 0)
}

function windowToCanvas(x, y) {
    var box = canvas.getBoundingClientRect();
    return {
        x: x - box.left,
        y: y - box.top
    }
}



function imgScale(flag, point) {
    context.clearRect(0, 0, CANVASWIDTH, CANVASHEIGHT);
    context.drawImage(img, 0, 0, CANVASWIDTH, CANVASHEIGHT);
    if (flag == true) {
        drawMagnifier(point);
    }
}

function drawMagnifier(point) {
    var ratioX = img.width / CANVASWIDTH;
    var ratioY = img.height / CANVASHEIGHT;

    var r = 50;


    var sx = ratioX * point.x - r;
    var sy = ratioY * point.y - r;

    var ax = point.x - r;
    var ay = point.y - r;

    context.save()

    context.lineWidth=10
    context.strokeStyle="#111"

    context.beginPath()
    context.arc(point.x,point.y,r,0,2*Math.PI)
    context.stroke()

    context.clip()

    context.drawImage(canvasBack, sx, sy, 2 * r, 2 * r, ax, ay, 2 * r, 2 * r)
    context.restore()

}

canvas.onmousedown = function(e) {
    e.preventDefault();
    var point = windowToCanvas(e.clientX, e.clientY)

    imgScale(true, point);

    isMouseDown = true;
}
canvas.onmousemove = function(e) {
    e.preventDefault();
    if (isMouseDown == true) {
        var point = windowToCanvas(e.clientX, e.clientY)
        imgScale(true, point);
    }
}

canvas.onmouseup = function(e) {
    e.preventDefault();
    isMouseDown = false;
    imgScale(false);
}

canvas.onmouseout = function(e) {
    e.preventDefault();
    isMouseDown = false;
    imgScale(false);
}
