

var EnemyManager=function (){
	this.currentLvl = 1;
	this.totalEnemies = 0;
	this.enemySwarms = 0;
	this.totalSwarms=0;
	this.enemy = [];
	this.spawnTimer= 0;
	this.setUp();
	this.playerPosX = 0;
	this.playerPosY = 0;
};



EnemyManager.prototype.init = function(lvl){
	this.currentLvl = lvl;
}


EnemyManager.prototype.allEnemies = function(){
	for (var j = 0; j < enemyManager.enemy.length; ++j) {//enemy.length
		return enemy[j];
	}

}

EnemyManager.prototype.draw = function()
{
};

EnemyManager.prototype.setUp = function(){
	if(this.currentLvl == 1){
		this.totalEnemies = 10;
		this.totalSwarms = 2;
	}
	this.enemySwarms = this.totalSwarms;
}


EnemyManager.prototype.update = function(){
	this.spawnTimer++;
	if(this.spawnTimer> 150 && this.enemySwarms>0&&this.enemy.length == 0){
		this.spawnSwarm();
		this.enemySwarms--;
		this.spawnTimer=0;
	}

	for (var j = 0; j < this.enemy.length; ++j) {
		this.enemy[j].update();
	}
 	
}

EnemyManager.prototype.moveControl = function(j,b,px,py){

		if(b){
			this.enemy[j].moveTowardPlayer(px,py);
		}
		else{
			this.enemy[j].moveBasic("forward");	
		}
}


EnemyManager.prototype.spawnSwarm = function(){
	for(var i = 0; i< this.totalEnemies/this.totalSwarms; i++){
		var enemySingle = new Enemy();
		enemySingle.spawnEnemy(this.xDirect,this.yDirect,this.x,this.y);
		this.enemy.push(enemySingle);
	}
}



EnemyManager.prototype.collision = function(e)
{
 
};


