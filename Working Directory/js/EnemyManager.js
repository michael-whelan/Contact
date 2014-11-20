//var fsm = new FSM();



var EnemyManager=function (){
	this.enemy = [];
	this.setUp();
	this.spawnRad = 60;
	this.spawnPos1 = [];
	this.spawnPos2 = [];
	this.spawnPos3 = [];
	this.spawnPos4 = [];
	this.spawnPos5 = [];
	this.swarmsSurvived = 0;
};


EnemyManager.prototype.setSpawn = function(lvl){
	if(lvl ===1){
		this.spawnPos1[0] = 100;
		this.spawnPos1[1] = 500;

		this.spawnPos2[0] = 600;
		this.spawnPos2[1] = 500;

		this.spawnPos3[0] = -300;
		this.spawnPos3[1] = 100;

		this.spawnPos4[0] = 200;
		this.spawnPos4[1] = -300;
	}
}



EnemyManager.prototype.reset = function(lvl){
	while(this.enemy.length>0) {
		this.enemy.pop();
	};
	this.setSpawn(lvl);

	this.currentLvl = lvl;
	this.totalEnemies = 0;
	this.enemySwarms = 0;
	this.totalSwarms=0;
	this.playerPosX = 0;
	this.playerPosY = 0;
	this.spawnTimer= 0;
	this.setUp();
	//temp
	this.swarmsSurvived = 0;
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
		this.totalEnemies = 150;
		this.totalSwarms = 30;
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
		this.swarmsSurvived++;
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
	var rand = Math.floor(Math.random()*(5-0) +0);
	console.log(rand);
	for(var i = 0; i< this.totalEnemies/this.totalSwarms; i++){
		var enemySingle = new Enemy();
		if(rand===0){
			enemySingle.spawnEnemy(this.spawnPos1[0],this.spawnPos1[1]);
		}
		else if(rand ===1){
			enemySingle.spawnEnemy(this.spawnPos2[0],this.spawnPos2[1]);
		}
		else if(rand ===2){
			enemySingle.spawnEnemy(this.spawnPos3[0],this.spawnPos3[1]);
		}
		else{
			enemySingle.spawnEnemy(this.spawnPos4[0],this.spawnPos4[1]);
		}
		this.enemy.push(enemySingle);
	}
}


EnemyManager.prototype.collision = function(e)
{
 
};

EnemyManager.prototype.draw =function(){
	ctx.drawImage(imgViewRad, this.spawnPos1[0]-this.spawnRad,this.spawnPos1[1]-this.spawnRad, this.spawnRad*2, this.spawnRad*2);
	ctx.drawImage(imgViewRad, this.spawnPos2[0]-this.spawnRad,this.spawnPos2[1]-this.spawnRad, this.spawnRad*2, this.spawnRad*2);
	ctx.drawImage(imgViewRad, this.spawnPos3[0]-this.spawnRad,this.spawnPos3[1]-this.spawnRad, this.spawnRad*2, this.spawnRad*2);
	ctx.drawImage(imgViewRad, this.spawnPos4[0]-this.spawnRad,this.spawnPos4[1]-this.spawnRad, this.spawnRad*2, this.spawnRad*2);
}


