var canvasHeight = document.body.clientHeight;
var canvasWidth = document.body.clientWidth;
var radius = 50;

var canvas = document.getElementById("blur-canvas");
var context = canvas.getContext("2d")
var resetButton = document.getElementById("reset");
var showButton = document.getElementById("show");


var div = document.getElementById("blur-div");
div.style.width =canvasWidth +"px";
div.style.height = canvasHeight+"px";

var img = document.getElementById("blur-image");
img.style.width = img.width+"px";
img.style.height = img.height+"px";

var leftMargin = parseInt((img.width - canvasWidth)/2);
var topMargin = parseInt((img.height - canvasHeight)/2);
img.style.left = String(-leftMargin)+"px";
console.log(leftMargin);
img.style.top = String(-topMargin)+"px";

canvas.height = canvasHeight;
canvas.width = canvasWidth;
var clippingRegion = {
    x: 200,
    y: 300,
    r: 50
};

var image = new Image();
image.src = "js/img.jpg";
image.onload = function() {


    initCancas();
}

function initCancas() {
    draw(image, clippingRegion);
}

function setclippingRegion(clippingRegion) {
    context.beginPath();
    context.arc(clippingRegion.x, clippingRegion.y, clippingRegion.r, 0, 2 * Math.PI);
    context.clip();
}

function draw(image, clippingRegion) {

    context.clearRect(0, 0, canvas.width, canvas.height)
    context.save();
    setclippingRegion(clippingRegion);
    context.drawImage(image, Math.max(leftMargin,0),Math.max(topMargin,0),
    Math.min(canvas.width,image.width),Math.min(canvas.height,image.height),
    Math.max(-leftMargin,0), Math.max(-topMargin,0), Math.min(canvas.width,image.width),
    Math.min(canvas.height,image.height));
    context.restore();
}

resetButton.onclick = function() {

    clippingRegion.x = Math.floor((canvas.width - 2 * radius - 2*Math.max(-leftMargin,0)) * Math.random()) + Math.max(-leftMargin,0)+radius;
    clippingRegion.y = Math.floor((canvas.height - 2 * radius- 2*Math.max(-topMargin,0)) * Math.random()) + radius +Math.max(-topMargin,0);
    clippingRegion.r = 50;
    draw(image, clippingRegion);
}
showButton.onclick = function() {

    var theAnimation = setInterval(function() {
        clippingRegion.r += 40;
        draw(image, clippingRegion);
        if (clippingRegion.r >= Math.max(canvas.width, canvas.height)) {
            clearInterval(theAnimation);
        }
    }, 30)
}
