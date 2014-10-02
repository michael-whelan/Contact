var canvas, ctx;


function Game (){
	var player;
	var enemy;
	var collisionManager;
}

Game.prototype.initWorld = function(){
	player = new Player();
	enemy = [];
	collisionManager = new CollisionManager();
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
   				}
				//bullets[i].kill();
			}
		}
	}
}



Game.prototype.gameLoop = function (){
   var GAME_RUNNING=0;
 	  game.update();
	  game.draw();
	  
	  window.requestAnimFrame(game.gameLoop);
}

Game.prototype.draw =function (){
	ctx.clearRect(0,0,canvas.width,canvas.height);
	player.draw();
	for (var i = 0; i < enemy.length; ++i) {
		enemy[i].draw();
	}



}

