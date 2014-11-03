
//var fsm = new FSM();



var EnemyManager=function (){
	this.enemy = [];
	this.setUp();
};



EnemyManager.prototype.reset = function(lvl){
	while(this.enemy.length>0) {
		this.enemy.pop();
	};
	this.currentLvl = lvl;
	this.totalEnemies = 0;
	this.enemySwarms = 0;
	this.totalSwarms=0;
	this.playerPosX = 0;
	this.playerPosY = 0;
	this.spawnTimer= 0;
	this.setUp();
}


EnemyManager.prototype.allEnemies = function(){
	for (var j = 0; j < enemyManager.enemy.length; ++j) {//enemy.length
		return enemy[j];
	}
}

EnemyManager.prototype.hearShot = function(px,py){
	for (var j = 0; j < this.enemy.length; ++j){
		this.enemy[j].state = fsm.stateControl(this.enemy[j].state,"hearShot");
		this.enemy[j].targetPos(px,py);
	}
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
	//controls the number of swarms and the size of each and when they are spawned.
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
		//b = checks if the collision with the vision radius is true and decides which movement is appropriate.
		if(b){
			this.enemy[j].state = fsm.stateControl(this.enemy[j].state,"seeTarget");
			this.enemy[j].targetPos(px,py);
		}
		else{
			this.enemy[j].state = fsm.stateControl(this.enemy[j].state,0);
		}
}


EnemyManager.prototype.spawnSwarm = function(){
	//spawns a group of enemies.
	for(var i = 0; i< this.totalEnemies/this.totalSwarms; i++){
		var enemySingle = new Enemy();
		enemySingle.spawnEnemy(this.xDirect,this.yDirect,this.x,this.y);
		this.enemy.push(enemySingle);
	}
}


EnemyManager.prototype.collision = function(e)
{
 
};


