var WINDOW_WIDTH ;
var WINDOW_HEIGHT ;
var RADIUS = 9;
var MARGIN_LEFT = 100;
var MARGIN_TOP = 300;
var MARGIN_TOP_LEFT = 100;
var MARGIN_TOP_TOP = 50;
var endTime = new Date(2016, 2, 11, 0, 0, 0);
var showTimeSecond = 0;

var balls = [];
var colors = ["#FF6666", "#FFFF00", "#666699", "#FF9933", "#CCCC33", "#CC99CC", "#CCFFFF", "#FFCCCC", "#abc", "#CCFF99"];

window.onload = function() {
    var canvas = document.getElementById("canvas");

    WINDOW_WIDTH = document.body.clientWidth;
    WINDOW_HEIGHT = document.body.clientHeight;

    console.log(WINDOW_HEIGHT);


    canvas.width = WINDOW_WIDTH;
    canvas.height = WINDOW_HEIGHT;


    if (canvas.getContext("2d")) {
        var context = canvas.getContext("2d");

        showTimeSecond = getShowTimeSecond();

        setInterval(
            function() {
                render(context);
                update();
            }, 50
        );


    } else {
        alert("当前浏览器不支持Canvas，赶紧将浏览器更新换代吧~");
    }

}

function getShowTimeSecond() {
    var currentTime = new Date();
    var ret = currentTime.getTime() - endTime.getTime();
    ret = Math.round(ret / 1000);

    return ret >= 0 ? ret : 0;
}

function update() {
    var nextShowTimeSecond = getShowTimeSecond();

    var nextDay = parseInt(nextShowTimeSecond / 3600 / 24);
    var nextHour = parseInt((nextShowTimeSecond - nextDay * 3600 * 24) / 3600);
    var nextMinute = parseInt((nextShowTimeSecond - nextDay * 3600 * 24 - nextHour * 3600) / 60);
    var nextSecond = nextShowTimeSecond % 60;

    var curDay = parseInt(showTimeSecond / 3600 / 24);
    var curHour = parseInt((showTimeSecond - curDay * 3600 * 24) / 3600);
    var curMinute = parseInt((showTimeSecond - curDay * 3600 * 24 - curHour * 3600) / 60);
    var curSecond = showTimeSecond % 60;

    if (nextSecond != curSecond) {
        if (parseInt(nextDay / 100) != parseInt(curDay / 100)) {
            addBalls(MARGIN_TOP_LEFT, MARGIN_TOP, parseInt(curDay / 100));
        }
        if (parseInt(nextDay / 10 % 10) != parseInt(curDay / 10 % 10)) {
            addBalls(MARGIN_TOP_LEFT, MARGIN_TOP, parseInt(curDay / 10 % 10));
        }
        if (parseInt(nextDay / 10) != parseInt(curDay / 10)) {
            addBalls(MARGIN_TOP_LEFT, MARGIN_TOP, parseInt(curDay / 10));
        }
        if (parseInt(nextHour / 10) != parseInt(curHour / 10)) {
            addBalls(MARGIN_LEFT, MARGIN_TOP, parseInt(curHour / 10));
        }
        if (parseInt(nextHour % 10) != parseInt(curHour % 10)) {
            addBalls(MARGIN_LEFT + 9 * 2 * (RADIUS + 1), MARGIN_TOP, parseInt(curHour / 10));
        }

        if (parseInt(nextMinute / 10) != parseInt(curMinute / 10)) {
            addBalls(MARGIN_LEFT + 22 * 2 * (RADIUS + 1), MARGIN_TOP, parseInt(curMinute / 10));
        }
        if (parseInt(nextMinute % 10) != parseInt(curMinute % 10)) {
            addBalls(MARGIN_LEFT + 31 * 2 * (RADIUS + 1), MARGIN_TOP, parseInt(curMinute / 10));
        }

        if (parseInt(nextSecond / 10) != parseInt(curSecond / 10)) {
            addBalls(MARGIN_LEFT + 44 * 2 * (RADIUS + 1), MARGIN_TOP, parseInt(curSecond / 10));
        }
        if (parseInt(nextSecond % 10) != parseInt(curSecond % 10)) {
            addBalls(MARGIN_LEFT + 53 * 2 * (RADIUS + 1), MARGIN_TOP, parseInt(curSecond / 10));
        }
        showTimeSecond = nextShowTimeSecond;
    }
    updateBalls();
}

function updateBalls() {
    for (var i = 0; i < balls.length; i++) {
        balls[i].x += balls[i].vx;
        balls[i].y += balls[i].vy;
        balls[i].vy += balls[i].g;

        if (balls[i].y >= WINDOW_HEIGHT - RADIUS) {
            balls[i].y = WINDOW_HEIGHT - RADIUS;
            balls[i].vy = -balls[i].vy * Math.random()*0.7;
        }

        var cnt =0;
        for(var j=0;j<balls.length;j++){
          if(balls[j].x + RADIUS >0 && balls[j].x-RADIUS <WINDOW_WIDTH ){
            balls[cnt++] = balls[j];
          }
        }

        while (balls.length > Math.min(400,cnt)) {
            balls.pop();
        }
    }
}

function addBalls(x, y, num) {

    for (var i = 0; i < digit[num].length; i++) {
        for (var j = 0; j < digit[num][i].length; j++) {
            if (digit[num][i][j] == 1) {
                var Ball = {
                    x: x + j * (2 * RADIUS + 2) + RADIUS + 1 ,
                    y: y + i * 2 * (RADIUS + 1) + RADIUS + 1,
                    g: 1.5 + Math.random(),
                    vx: Math.pow(-1, Math.ceil(Math.random() * 1000)) * 4,
                    vy: - Math.random() * 10 - 5,
                    color: colors[Math.floor(Math.random() * colors.length)]
                }
                Ball.x -=Ball.vx;
                Ball.y -=Ball.vy;

                balls.push(Ball);

            }

        }

    }
}

function render(ctx) {

    ctx.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);


    var day = parseInt(showTimeSecond / 3600 / 24);
    var hour = parseInt((showTimeSecond - day * 3600 * 24) / 3600);
    var minute = parseInt((showTimeSecond - day * 3600 * 24 - hour * 3600) / 60);
    var second = showTimeSecond % 60;


    renderDigit(MARGIN_TOP_LEFT, MARGIN_TOP_TOP, parseInt(parseInt(day / 100)), ctx);
    renderDigit(MARGIN_TOP_LEFT + 9 * 2 * (RADIUS + 1), MARGIN_TOP_TOP, parseInt(parseInt(day / 10 % 10)), ctx);
    renderDigit(MARGIN_TOP_LEFT + 18 * 2 * (RADIUS + 1), MARGIN_TOP_TOP, parseInt(parseInt(day % 10)), ctx);
    renderDigit(MARGIN_TOP_LEFT + 29 * 2 * (RADIUS + 1), MARGIN_TOP_TOP, parseInt(parseInt(11)), ctx, "#FF6666");
    renderDigit(MARGIN_TOP_LEFT + 37 * 2 * (RADIUS + 1), MARGIN_TOP_TOP, parseInt(parseInt(12)), ctx, "#FF6666");
    renderDigit(MARGIN_TOP_LEFT + 45 * 2 * (RADIUS + 1), MARGIN_TOP_TOP, parseInt(parseInt(13)), ctx, "#FF6666");
    renderDigit(MARGIN_TOP_LEFT + 53 * 2 * (RADIUS + 1), MARGIN_TOP_TOP, parseInt(parseInt(14)), ctx, "#FF6666");

    renderDigit(MARGIN_LEFT, MARGIN_TOP, parseInt(hour / 10 % 10), ctx);
    renderDigit(MARGIN_LEFT + 9 * 2 * (RADIUS + 1), MARGIN_TOP, parseInt(hour % 10), ctx);
    renderDigit(MARGIN_LEFT + 17 * 2 * (RADIUS + 1), MARGIN_TOP, parseInt(10), ctx);
    renderDigit(MARGIN_LEFT + 22 * 2 * (RADIUS + 1), MARGIN_TOP, parseInt(minute / 10), ctx);
    renderDigit(MARGIN_LEFT + 31 * 2 * (RADIUS + 1), MARGIN_TOP, parseInt(minute % 10), ctx);
    renderDigit(MARGIN_LEFT + 39 * 2 * (RADIUS + 1), MARGIN_TOP, parseInt(10), ctx);
    renderDigit(MARGIN_LEFT + 44 * 2 * (RADIUS + 1), MARGIN_TOP, parseInt(second / 10), ctx);
    renderDigit(MARGIN_LEFT + 53 * 2 * (RADIUS + 1), MARGIN_TOP, parseInt(second % 10), ctx);

    for (var i = 0; i < balls.length; i++) {
        ctx.fillStyle = balls[i].color;

        ctx.beginPath();
        ctx.arc(balls[i].x, balls[i].y, RADIUS, 0, 2 * Math.PI);
        ctx.closePath();

        ctx.fill()
    }

}

function renderDigit(x, y, time, ctx) {

    if (arguments[4]) {
        ctx.fillStyle = arguments[4];
    } else {
        ctx.fillStyle = "#1874CD";
    }


    for (var i = 0; i < digit[time].length; i++) {
        for (var j = 0; j < digit[time][i].length; j++) {
            if (digit[time][i][j] == 1) {
                ctx.beginPath();
                ctx.arc(x + j * (2 * RADIUS + 2) + RADIUS + 1, y + i * 2 * (RADIUS + 1) + RADIUS + 1, RADIUS, 0, 2 * Math.PI)
                ctx.closePath();

                ctx.fill();

            }

        }

    }


}
