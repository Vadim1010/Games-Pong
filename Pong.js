var canvas = document.getElementById('canvas');
var stopGame = document.getElementById('stop');
var numberGoal = document.getElementById('numberGoal');
var ctx = canvas.getContext('2d');
var w = canvas.width;
var h = canvas.height;
var border = 10;
var radiusBall =6;
var gameSpeed= 2;
var xPosBall =300;
var yPosBall =200;
var xSpeedBall= 0;
var ySpeedBall= 0;
var xDirBall= -1;
var yDirBall= 1;
var xPosPad = w-20;
var yPosPad = h/2;
var padW = 12;
var padH = 60;
var padDir = 0;
var padSpeed = 3;
var goal = 0;

function draw(){
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "Lime";
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "red";
    ctx.fillRect(0, 0, w, border);
    ctx.fillRect(0, h - border, w, border);
    ctx.fillRect(0, 0, border, h);
    ctx.fillStyle= "Black";
    ctx.beginPath();
    ctx.arc(xPosBall, yPosBall, radiusBall, 0, Math.PI*2, false);
    ctx.fill();
    ctx.closePath();

    xPosBall = xPosBall + xSpeedBall * xDirBall;
    yPosBall = yPosBall + ySpeedBall * yDirBall;

    if(xPosBall <= border + radiusBall){
        xDirBall = 1;
    }

    if(yPosBall <= border + radiusBall){
        yDirBall = 1;
    }

    if(yPosBall>=h - radiusBall - border){
        yDirBall = -1;
    }

    if(yPosBall >= yPosPad && yPosBall <= yPosPad + padH && xPosBall >= xPosPad && xPosBall <= xPosPad + padW){
        xDirBall = -1;
    }

    ctx.fillStyle="blue";
    ctx.fillRect(xPosPad, yPosPad, padW, padH);

    yPosPad = yPosPad + padSpeed * padDir;

    if(xPosBall > 610){
        goal++;
        xPosBall =200;
        yPosBall =300;
        numberGoal.innerHTML = goal;
    }

 }
/// почемуто не хочет срадатывать стопор на ракетку постонно значение у разное !!!!
document.onkeydown = function(e){
    if(e.keyCode ==38) {
        padDir =-1;
        //console.log(yPosPad);
        //if(20 > yPosPad){ /// yPosPad постоянно разное
        //    padDir = 0;
        //}
    }
    if(e.keyCode == 40){
        padDir = 1;
        //console.log(yPosPad);
        //if(280 < yPosPad){  /// yPosPad постоянно разное
        //    padDir =0;
        //}
    }
};

document.onkeyup = function(e){
    if (e.keyCode == 38 || e.keyCode == 40){
        padDir = 0;
    }
};

setInterval(draw, gameSpeed);

function reset(){
    goal =0;
    xPosBall =300;
    yPosBall =200;
    numberGoal.innerHTML = goal;
}

function stop(){
    if(xSpeedBall === 1){
    xSpeedBall= 0;
    ySpeedBall= 0;
        stopGame.value="Старт";
    }else if(xSpeedBall === 0){
        xSpeedBall= 1;
        ySpeedBall= 1;
        stopGame.value="Пауза";

    }
}
