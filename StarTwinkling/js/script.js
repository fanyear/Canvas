var CANVASWIDTH = 440;
var CANVASHEIGHT = 750;


var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

canvas.width = CANVASWIDTH;
canvas.height = CANVASHEIGHT;

var img = new Image();
img.src = "img.JPG";
var starImg = new Image();
starImg.src = "img/star.png";

var num = 60;
var stars = [];

function star(){
  this.x = Math.random()*(CANVASWIDTH -100) + 50 ;
  this.y = Math.random()*(CANVASHEIGHT -100) + 50;
  this.num = parseInt(Math.random()*6);
  this.vx =Math.random()*4 - 2;
  this.vy = Math.random()*4 - 2;
}
star.prototype.update = function(){
  this.num +=1;
  this.num %=7;
  this.x += this.vx;
  this.y += this.vy;
  if(this.x <0 || this.x >CANVASWIDTH -7){
    this.vx = -this.vx;
  }
  if(this.y < 0 || this.y >CANVASHEIGHT -7){
    this.vy = -this.vy;
  }
}
star.prototype.draw = function(){
  context.drawImage(starImg,this.num*7,0,7,7,this.x,this.y,7,7);
}


window.onload = init;
function init(){

  setStar();
  setInterval(function(){
    loop()
  },50)
}

function loop(){
  drawBackground();
  drawStar();
}

function drawBackground(){

  context.save();
  context.drawImage(img,0,0,CANVASWIDTH,CANVASHEIGHT)
  context.restore();

}
function setStar(){
  for(var i=0;i<num;i++){
    var s = new star();
    stars.push(s);
  }
}
function drawStar(){
  for(var i=0;i<stars.length;i++){
    stars[i].update();
    stars[i].draw();
  }
}
