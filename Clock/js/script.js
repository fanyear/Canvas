window.onload = function() {

    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");

    canvas.height = 500;
    canvas.width = 500;

    var height = canvas.height;
    var width = canvas.width;
    var r = width / 2;

    draw();
    function draw(){
      var now = new Date();
      var hour = now.getHours();
      var minute = now.getMinutes();
      var second =  now.getSeconds();

      context.clearRect(0,0,width,height);
      drawBackground(context, r);
      drawHour(context,hour,minute ,r);
      drawMin(context,minute,r);
      drawSec(context,second,r);
      drawDot(context);
      context.restore();
    }

    setInterval(draw,1000)

}

function drawHour(ctx,h,min,r){
  var rad = 2 * Math.PI/12 * h;
  var radMin = 2 * Math.PI/12/60 * min;
  ctx.save()
  ctx.lineWidth = 5* ctx.canvas.width/200 ;
  ctx.lineCap = "round";
  ctx.rotate(rad + radMin);
  ctx.beginPath();
  ctx.moveTo(0,r/10);
  ctx.lineTo(0,-r/2);
  ctx.closePath();
  ctx.stroke();
  ctx.restore();
}

function drawMin(ctx,m,r){
  var rad = 2 * Math.PI/60 * m;
  ctx.save()
  ctx.lineWidth = 3* ctx.canvas.width/200 ;
  ctx.lineCap = "round";
  ctx.rotate(rad);
  ctx.beginPath();
  ctx.moveTo(0,r/10);
  ctx.lineTo(0,-r *2/3);
  ctx.closePath();
  ctx.stroke();
  ctx.restore();
}

function drawSec(ctx,s,r) {
  var rad = 2 * Math.PI/60 * s;
  ctx.save()
  ctx.lineWidth = 2* ctx.canvas.width/200 ;
  ctx.lineCap = "round";
  ctx.strokeStyle = "#c14543";
  ctx.rotate(rad);
  ctx.beginPath();
  ctx.moveTo(0,r/10);
  ctx.lineTo(0,-r *6/7);
  ctx.closePath();
  ctx.stroke();
  ctx.restore();
}
function drawDot(ctx){
  ctx.beginPath();
  ctx.fillStyle = "#fff";
  ctx.arc(0,0,3* ctx.canvas.width/200 ,0,2 * Math.PI);
  ctx.closePath();
  ctx.fill();
}
function drawBackground(ctx, r) {
    ctx.save();
    ctx.translate(r, r)
    ctx.beginPath();
    ctx.lineWidth = 10 * ctx.canvas.width/200 ;
    ctx.arc(0, 0, r - ctx.lineWidth / 2, 0, Math.PI * 2);
    ctx.closePath();

    ctx.stroke();

    ctx.font =  12 *ctx.canvas.width/200+"px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    var num = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2];
    for (var i = 0; i < num.length; i++) {
        var rad = 2 * Math.PI / 12 * i;
        var x = (r - ctx.lineWidth / 2 - r / 4) * Math.cos(rad);
        var y = (r - ctx.lineWidth / 2 - r / 4) * Math.sin(rad);
        ctx.fillText(num[i], x, y);
    }

    for(var j = 0; j < 60; j++){
        var rad = 2 * Math.PI / 60 * j;
        var x = (r - ctx.lineWidth / 2 - r / 8) * Math.cos(rad);
        var y = (r - ctx.lineWidth / 2 - r / 8) * Math.sin(rad);

        ctx.beginPath();
        if(j % 5){
          ctx.fillStyle = "#ccc";
          ctx.arc(x,y,2*ctx.canvas.width/200,0,Math.PI * 2);
        }else{
          ctx.fillStyle = "#000";
          ctx.arc(x,y,3*ctx.canvas.width/200,0,Math.PI * 2);
        }

        ctx.closePath();

        ctx.fill();
    }
}
