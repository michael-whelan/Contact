var canvas, ctx;
var imgBack = new Image();
imgBack.src = "images/Back.png"

function Game (){
	var player;
	var enemy;
	var collisionManager;
	var backgroundOffset;
}

Game.prototype.initWorld = function(){
	player = new Player();
	enemy = [];
	collisionManager = new CollisionManager();
	backgroundOffset = player.x;
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
	var enemySingle = new Enemy();
	enemySingle.spawnEnemy(this.xDirect,this.yDirect,this.x,this.y);
	enemy.push(enemySingle);
}


Game.prototype.update = function(){
	player.update();

	for(var i = 0;i< bullets.length;++i){
		if(bullets[i].alive){
			for (var j = 0; j < enemy.length; ++j) {
				if(collisionManager.boxOnBox(bullets[i],enemy[j])){
					enemy[j].kill();
				}
				if(!enemy[j].alive){
    				var index = enemy.indexOf(j);
    				enemy.splice(j, 1);
    				j--;
    				bullets[i].kill();
   				}
			}
		}
	}
	calculateFps(Date.now());
}

var lastAnimationFrameTime = 0,
    lastFpsUpdateTime = 0;
    //fpsElement = document.getElementById('fps');
var fps = 0;
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
	var camX = clamp(-player.x + canvas.width/2, 0, 1000 - canvas.width);
    var camY = clamp(-player.y + canvas.height/2, 0, 600 - canvas.height);
    ctx.translate( camX, camY ); 
    ctx.drawImage(imgBack, 0,0,imgBack.width*2, imgBack.height*2);
	player.draw();
	for (var i = 0; i < enemy.length; ++i) {
		enemy[i].draw();
	}
}

function clamp(value, min, max){
    if(value < min) return min;
    else if(value > max) return max;
    return value;
}
