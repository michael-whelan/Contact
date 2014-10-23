var canvas, ctx;
var imgBack = new Image();
imgBack.src = "images/Back.png"

var backTrack = new Audio();
backTrack.src = "sounds/music/Gameplay_Theme_Idea.mp3";

var fsm;

var player;
var enemy;
var collisionManager;
var textManager;
var enemyManager;

function Game (){
	player = new Player();
	fsm = new FSM();
	enemyManager = new EnemyManager();
	collisionManager = new CollisionManager();
	textManager = new TextManager();
	this.mapWidth = 1600;
	this.mapHeight = 900;
}

Game.prototype.initWorld = function(){
	//player.init();
	textManager.init();
	enemyManager.init();
	this.playBackgroundLoop();
}

Game.prototype.initCanvas=function () { 
	canvas = document.createElement('canvas'); 
	ctx = canvas.getContext('2d'); 

	document.body.appendChild(canvas);
	//set canvas to size of the screen.
	canvas.width = 800;//window.innerWidth -200; 
	canvas.height = 600;//window.innerHeight - 200;
	canvas.addEventListener("mousedown",mouseDown,false);
}

function mouseDown(e){ 
	/*var enemySingle = new Enemy();
	enemySingle.spawnEnemy(this.xDirect,this.yDirect,this.x,this.y);
	enemy.push(enemySingle);
	console.log(enemySingle.x,enemySingle.y);*/
	//var rect = canvas.getBoundingClientRect();
	//console.log(getDistance(player.x,player.y,e.clientX-rect.left,e.clientY - rect.top));
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
	player.update();
	enemyManager.update();
	this.collisionCall();
	
	calculateFps(Date.now());
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
				
				player.health-=10;
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

Game.prototype.gameLoop = function (){
   	var GAME_RUNNING=0;
 	game.update();
	game.draw();
	  
	window.requestAnimFrame(game.gameLoop);
}

Game.prototype.draw =function (){
	ctx.setTransform(1,0,0,1,0,0);//reset the transform matrix as it is cumulative 


	//wipes the screen at the start of each draw frame;
	ctx.clearRect(0,0,canvas.width,canvas.height);

	//this clamp sets the limits to the world size.
	var camX = clamp(-player.x + canvas.width/2, 0, this.mapWidth - canvas.width);
    var camY = clamp(-player.y + canvas.height/2, 0, this.mapHeight - canvas.height);
    ctx.translate( camX, camY ); 
    //the numbers offset the background so that it centres with the map
    ctx.drawImage(imgBack, -(300 + (this.mapWidth-1100)),-(200+this.mapHeight-800),this.mapWidth, this.mapHeight);
	player.draw();
	for (var i = 0; i < enemyManager.enemy.length; ++i) {
		enemyManager.enemy[i].draw();
	}
	ctx.setTransform(1,0,0,1,0,0);//reset the transform matrix as it is cumulative
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