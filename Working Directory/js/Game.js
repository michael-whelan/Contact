var imgBack = new Image();
//imgBack.src = "images/Back.png"

var backTrack = new Audio();
//backTrack.src = "sounds/music/Gameplay_Theme_Idea.mp3";

var fsm;
var innerX1,innerY1,innerX2,innerY2;
var intersect = false;
var player;
var enemy;
var collisionManager;
var textManager;
var enemyManager;
var mapWidth;
var mapHeight;
//stick stuff
var sticks;
var limitSize = 36;
var inputSize = 20;
var threshold=4;
var WIDTH =1152;
var HEIGHT =648;
var point = {
	radius: 20,
	speed: 10,
	x: (1152 / 2),
	y: (648 / 2)
};

function Game (){
	//assetManager = new AssetManager();
	player = new Player();
	sticks = [new Stick(inputSize), new Stick(inputSize)];
	fsm = new FSM();
	enemyManager = new EnemyManager();
	collisionManager = new CollisionManager();
	textManager = new TextManager();
	mapWidth = 2000;
	mapHeight = 1300;
}


Game.prototype.reset = function(){
	player.reset();
	enemyManager.reset(1);
		//player.init();
	textManager.init();
	this.playBackgroundLoop();
	for (var i = 0; i < sticks.length; ++i) {
		sticks[i].active = false;
	}
}

Game.prototype.touchMove= function(e){
	e.preventDefault();
	for (var i = 0; i < e.touches.length; ++i) {
		var touch = e.touches[i];
		if(touch.pageX<canvas.width/2){
			sticks[0].setInputXY(touch.pageX, touch.pageY);
		}
		else{
			sticks[1].setInputXY(touch.pageX, touch.pageY);
		}
	}
}


Game.prototype.touchStart = function(e){ 
	e.preventDefault();
	for (var i = 0; i < e.touches.length; ++i) {
			var touch = e.touches[i];
			if(touch.pageX<canvas.width/2){
				sticks[0].setLimitXY(touch.pageX, touch.pageY);
				sticks[0].setInputXY(touch.pageX, touch.pageY);
				sticks[0].active = true;
			}
			else{
				sticks[1].setLimitXY(touch.pageX, touch.pageY);
				sticks[1].setInputXY(touch.pageX, touch.pageY);
				sticks[1].active = true;	
			}
		//	console.log(e.touches[0].pageX,e.touches[0].pageY);
		}
}

Game.prototype.touchEnd = function(e){ 
	var touches = e.changedTouches;
	for (var i = 0; i < touches.length; ++i) {
		sticks[0].active=false;
		sticks[1].active=false;
	}
}

Game.prototype.playBackgroundLoop = function(){
	//an alternative method 
	backTrack.addEventListener('ended', function() {
	    this.currentTime = 0;
	    this.play();
	}, false);
	backTrack.play();
};

function getDistance(x1,y1,x2,y2){
	console.log(x1,y1,x2,y2);
	var xs = 0;
  	var ys = 0;
 
  	xs = x2 - x1;
  	xs = xs * xs;
 
  	ys = y2 - y1;
 	 ys = ys * ys;
 
  	return sqrt( xs + ys );
}

function sqrt(x) {
    var i;
    var s;
    s=((x/2)+x/(x/2)) / 2; /*first guess*/
    for(i=1;i<=4;i++) { /*average of guesses*/
        s=(s+x/s)/2;
    }
    return s;
}


Game.prototype.update = function(){
	for (var i = 0; i < sticks.length; ++i) {
		sticks[i].update();
	}

	var stick = sticks[0];
	var stick2 = sticks[1];
	player.update(stick.normal.x,stick.normal.y,stick2.normal.x,stick2.normal.y,stick.active,stick2.active);
	for (var j = 0; j < enemyManager.enemy.length; ++j) {
	player.pointToEnemy(enemyManager.enemy[j].x,enemyManager.enemy[j].y);
	}
	enemyManager.update();
	this.collisionCall();
	


	calculateFps(Date.now());

	if (stick.active && (stick.length > threshold)) {
		point.x += (
			(stick.length * stick.normal.x)
			* point.speed
			
		);
		point.y += (
			(stick.length * stick.normal.y)
			* point.speed
			
		);

		if (point.x < point.radius) {
			point.x = point.radius;
		} else if (point.x > (WIDTH - point.radius)) {
			point.x = (WIDTH - point.radius);
		}
		if (point.y < point.radius) {
			point.y = point.radius;
		} else if (point.y > (HEIGHT - point.radius)) {
			point.y = (HEIGHT - point.radius);
		}
	}

	if(KeyController.isKeyDown(Key.ESC)){
		backTrack.pause();
		backTrack.currentTime=0;
		return "menu";
	}


	return "gameplay";
}

Game.prototype.collisionCall = function(){
	for (var j = 0; j < enemyManager.enemy.length; ++j) {
		enemyManager.moveControl(j,collisionManager.circleOnCircle(player.radius,player.x,player.y,enemyManager.enemy[j].viewRadius,enemyManager.enemy[j].x,enemyManager.enemy[j].y),
			player.x,player.y);
		
		enemyManager.moveControl(j,collisionManager.circleOnTriangle(player.x,player.y,enemyManager.enemy[j].aX,enemyManager.enemy[j].aY,
			enemyManager.enemy[j].bX,enemyManager.enemy[j].bY,
			enemyManager.enemy[j].cX,enemyManager.enemy[j].cY),
			player.x,player.y);

		if(player.shot){
			enemyManager.hearShot(player.x,player.y);
			player.shot = false;
		}
	}
	
	for (var j = 0; j < enemyManager.enemy.length; ++j) {
		for(var i = 0; i < enemyManager.enemy[j].bullets.length; ++i){
			if(collisionManager.circleOnCircle(enemyManager.enemy[j].bullets[i].radius,enemyManager.enemy[j].bullets[i].x,
				enemyManager.enemy[j].bullets[i].y,player.radius,player.x,player.y) && player.flash === false){
				
				player.health-=2;
				loseHealthSnd.play();
				player.lastHitTime = Date.now();
				enemyManager.enemy[j].bullets[i].kill();
			}
		}
	}

	for(var i = 0;i< player.bullets.length;++i){
		if(player.bullets[i].alive){
			for (var j = 0; j < enemyManager.enemy.length; ++j) {//enemy.length
				if(collisionManager.circleOnCircle(player.bullets[i].radius,player.bullets[i].x,player.bullets[i].y,enemyManager.enemy[j].hitRadius,enemyManager.enemy[j].x,enemyManager.enemy[j].y)){
					enemyManager.enemy[j].kill();
				}
				if(!enemyManager.enemy[j].alive){
    				var index = enemyManager.enemy.indexOf(j);
    				enemyManager.enemy.splice(j, 1);
    				j--;
    				player.bullets[i].kill();
   				}
			}
		}
	}
}


	var fps = 0,
    lastFpsUpdateTime = 0,
    lastAnimationFrameTime = 0;

function calculateFps(now) {
    fps = 1000 / (now - lastAnimationFrameTime);
   lastAnimationFrameTime = now;
  // console.log(now - lastAnimationFrameTime);

   if (now - lastFpsUpdateTime > 1000) {
      lastFpsUpdateTime = now;
      //fpsElement.innerHTML = fps.toFixed(0) + ' fps';
   }
   //console.log(fps);
   return fps; 
}


Game.prototype.enemyToPlayerLine = function(){
	for (var j = 0; j < enemyManager.enemy.length; ++j) {
		ctx.beginPath();
		ctx.moveTo(player.x,player.y);
		ctx.lineTo(enemyManager.enemy[j].x,enemyManager.enemy[j].y);
		console.log(player.x,player.y,enemyManager.enemy[j].x,enemyManager.enemy[j].y);
		ctx.stroke();
	

		if((lineIntersect(player.x,player.y,enemyManager.enemy[j].x,enemyManager.enemy[j].y,
			innerX1,innerY1,innerX2,innerY1))||
			(lineIntersect(player.x,player.y,enemyManager.enemy[j].x,enemyManager.enemy[j].y,
			innerX2,innerY1,innerX2,innerY2))||
			(lineIntersect(player.x,player.y,enemyManager.enemy[j].x,enemyManager.enemy[j].y,
			innerX2,innerY2,innerX1,innerY2))||
			(lineIntersect(player.x,player.y,enemyManager.enemy[j].x,enemyManager.enemy[j].y,
			innerX1,innerY2,innerX1,innerY1))){
			return true;
		}
		//else{
			return false;
	//	}
	}
}

Game.prototype.draw =function (){
	ctx.setTransform(1,0,0,1,0,0);//reset the transform matrix as it is cumulative 

	//wipes the screen at the start of each draw frame;
	ctx.clearRect(0,0,canvas.width,canvas.height);

	//this clamp sets the limits to the world size.
	var camX = clamp(-player.x + canvas.width/2, 0, mapWidth - canvas.width);
    var camY = clamp(-player.y + canvas.height/2, 0, mapHeight - canvas.height);

    //temp
    innerX1 = (clamp(player.x, -800+canvas.width/2 -40, mapWidth - (canvas.width)-270)-WIDTH/2)+20;
    innerY1 =(clamp(player.y, -620+290, mapHeight - (canvas.height)-330) - HEIGHT/2)+20;
    innerX2 =(clamp(player.x, -800+canvas.width/2 -40, mapWidth - (canvas.width)-270)+WIDTH/2)-20;
    innerY2= (clamp(player.y, -620+290, mapHeight - (canvas.height)-330)+ HEIGHT/2)-20;
    //end temp



    player.bigX = clamp(player.x, -800+canvas.width/2 -40, mapWidth - (canvas.width)-270);
    player.bigY = clamp(player.y, -620+290, mapHeight - (canvas.height)-330);
    ctx.translate( camX, camY ); 
    //the numbers offset the background so that it centres with the map
    ctx.drawImage(imgBack, -(300 + (mapWidth-1450)),-(200+mapHeight-845),mapWidth, mapHeight);
    if(this.enemyToPlayerLine()){
    	ctx.drawImage(imgViewRad,this.x- this.viewRadius, this.y - this.viewRadius, this.viewRadius*2, this.viewRadius*2);
    }
	player.draw();
	enemyManager.draw();
	for (var i = 0; i < enemyManager.enemy.length; ++i) {
		
		enemyManager.enemy[i].draw();
	}
	ctx.setTransform(1,0,0,1,0,0);//reset the transform matrix as it is cumulative
	for (var i = 0; i < sticks.length; ++i) {
		sticks[i].draw();
	}
	textManager.controller();
}

function clamp(value, min, max){//used to clamp the cam if the player gets near the edge of the world
    if(value < min){
    	return min;
    }
    else if(value > max){
    	return max;
	}
    return value;
}

function lineIntersect(x1,y1,x2,y2, x3,y3,x4,y4) {
    var x=((x1*y2-y1*x2)*(x3-x4)-(x1-x2)*(x3*y4-y3*x4))/((x1-x2)*(y3-y4)-(y1-y2)*(x3-x4));
    var y=((x1*y2-y1*x2)*(y3-y4)-(y1-y2)*(x3*y4-y3*x4))/((x1-x2)*(y3-y4)-(y1-y2)*(x3-x4));
    if (isNaN(x)||isNaN(y)) {
        return false;
    } else {
        if (x1>=x2) {
            if (!(x2<=x&&x<=x1)) {return false;}
        } else {
            if (!(x1<=x&&x<=x2)) {return false;}
        }
        if (y1>=y2) {
            if (!(y2<=y&&y<=y1)) {return false;}
        } else {
            if (!(y1<=y&&y<=y2)) {return false;}
        }
        if (x3>=x4) {
            if (!(x4<=x&&x<=x3)) {return false;}
        } else {
            if (!(x3<=x&&x<=x4)) {return false;}
        }
        if (y3>=y4) {
            if (!(y4<=y&&y<=y3)) {return false;}
        } else {
            if (!(y3<=y&&y<=y4)) {return false;}
        }
    }
    return true;
}