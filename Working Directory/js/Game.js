var canvas, ctx;
var imgBack = new Image();
imgBack.src = "images/Back.png"
var fsm;

function Game (){
	var player;
	var enemy;
	var collisionManager;
	var textManager;
	var enemyManager;
}

Game.prototype.initWorld = function(){
	player = new Player();
	fsm = new FSM();
	enemyManager = new EnemyManager();
	collisionManager = new CollisionManager();
	textManager = new TextManager();
	textManager.init();
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
}


Game.prototype.update = function(){
	player.update();
	/*for (var j = 0; j < enemy.length; ++j) {
		enemy[j].update();
	}*/
	enemyManager.update();
	for (var j = 0; j < enemyManager.enemy.length; ++j) {
			enemyManager.moveControl(j,collisionManager.circleOnCircle(player,enemyManager.enemy[j]),
				player.x,player.y);
	}

	for(var i = 0;i< bullets.length;++i){
		if(bullets[i].alive){
			for (var j = 0; j < enemyManager.enemy.length; ++j) {//enemy.length

				if(collisionManager.boxOnBox(bullets[i], enemyManager.enemy[j])){
					enemyManager.enemy[j].kill();
				}
				if(!enemyManager.enemy[j].alive){
    				var index = enemyManager.enemy.indexOf(j);
    				enemyManager.enemy.splice(j, 1);
    				j--;
    				bullets[i].kill();
   				}
			}
		}
	}
	calculateFps(Date.now());
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

	ctx.clearRect(0,0,canvas.width,canvas.height);
	//setBackgroundOffset();
	//ctx.translate(player.x,player.y);
	//drawBackground();
	var camX = clamp(-player.x + canvas.width/2, 0, 1100 - canvas.width);
    var camY = clamp(-player.y + canvas.height/2, 0, 800 - canvas.height);
    ctx.translate( camX, camY ); 
    ctx.drawImage(imgBack, -300,-200,1000, 600);
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