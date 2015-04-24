//var fsm = new FSM();



var EnemyManager=function (){
	this.boss1 = new Boss("boss1");
	this.enemy = [];
	this.boss;
	this.setUp();
	this.spawnRad = 60;
	this.spawnPos = []
	this.spawnPos1 = [];
	this.spawnPos2 = [];
	this.spawnPos3 = [];
	this.spawnPos4 = [];
	this.spawnPos5 = [];
	this.swarmsSurvived = 0;
	this.bossComing = false;
	this.doonce=false;
};


EnemyManager.prototype.setSpawn = function(lvl){
	if(lvl ==="level1"){
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
	this.bossComing = false;
	this.boss1.reset();
	this.doonce = false;
	//this.setSpawn(lvl);
	this.currentLvl = lvl;
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

EnemyManager.prototype.setEnemyPos = function(arr){
/*this.enemy=[];
for(var i = 0; i< arr.length; i++){

	var enemySingle = new Enemy("grunt",5);
		//enemySingle.spawnEnemy(this.spawnPos[rand][0],this.spawnPos[rand][1]);
		enemySingle.alive = true;
		this.enemy.push(enemySingle);
	}*/
	for(var i = 0; i< arr.length; ++i){
		try{
			this.enemy[i].x = arr[i][0];
			this.enemy[i].y = arr[i][1];
			this.enemy[i].rank = arr[i][2];
			this.enemy[i].angle = arr[i][3];
			this.enemy[i].state = arr[i][4];
			this.enemy[i].targetPosX= arr[i][5];
			this.enemy[i].targetPosY= arr[i][6];
		}
		catch(err){

		}
	}
}

EnemyManager.prototype.hearShot = function(px,py){
	for (var j = 0; j < this.enemy.length; ++j){
		this.enemy[j].state = fsm.stateControl(this.enemy[j].state,"hearShot");
		this.enemy[j].targetPos(px,py);
	}
};

EnemyManager.prototype.setUp = function(){
	if(this.currentLvl === "level1"){
		this.totalSwarms = 9;//9
	}
	else if(this.currentLvl === "level2"){
		this.totalSwarms = 20;
	}
	this.enemySwarms = this.totalSwarms;
}


EnemyManager.prototype.update = function(lvlMan){
	this.spawnTimer++;
	//controls the number of swarms and the size of each and when they are spawned.
	
	if(this.spawnTimer> 150 && this.enemy.length === 0){
		this.enemySwarms--;
		this.swarmsSurvived++;
		if( this.enemySwarms>0){
			if(multiplayer && _name ==="player1"){
				this.spawnSwarm(5,9,lvlMan);//min,max
			}else{	
				this.spawnSwarm(3,6,lvlMan);//min,max
			}
			this.spawnTimer=0;
		}
	}
	if(this.boss1.alive){
		this.boss1.update();
	}
	if(this.enemySwarms<0 &&this.currentLvl !== "tutorial"){
		//levelWin = true;
		if(!this.doonce){
			this.boss1.alive = true;
			this.doonce = true;
		}
		else if(!this.boss1.alive && pickUps.length<1){
			levelWin=true;
		}
		this.bossComing = true;

	}
	
	for (var j = 0; j < this.enemy.length; ++j){
		this.enemy[j].update();

		/*if(this.enemy[j].currentGridR != this.gridToSearchR || this.enemy[j].currentGridC != this.gridToSearchC){
			this.enemy[j].state = fsm.stateControl(this.enemy[j].state,"positionOrder");
			this.enemy[j].targetPos((this.gridToSearchC*1000)+(1000/2),(this.gridToSearchR*650)+(650/2));
		}*/
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
/*
EnemyManager.prototype.setGrid = function(){
	for (var j = 0; j < this.enemy.length; ++j){
		if(this.enemy[j].rank ==="cmdr"){
			this.gridToSearchC = lvlMan.getGridPos(this.enemy[j].x,this.enemy[j].y)[0];
			this.gridToSearchR = lvlMan.getGridPos(this.enemy[j].x,this.enemy[j].y)[1];
		}
	}
	for (var j = 0; j < this.enemy.length; ++j){
		this.enemy[j].currentGridC =  lvlMan.getGridPos(this.enemy[j].x,this.enemy[j].y)[0];
		this.enemy[j].gridToSearchR = lvlMan.getGridPos(this.enemy[j].x,this.enemy[j].y)[1];
	}
}*/

EnemyManager.prototype.kill = function(j){
	this.enemy[j].alive = false;
	var tempRank = this.enemy[j].rank;
	if (j > -1) {
    	this.enemy.splice(j, 1);
	}
	if(tempRank === "cmdr"){
		this.possibleFear();
	}

	var rand= Math.floor(Math.random()*(20-1) +1);
	if(rand < 3){
		return 1;
	}
	else if(rand < 6){
		return 2;
	}
	else if(rand > 18){
		return 3;
	}
	return 0;
}

EnemyManager.prototype.possibleFear = function(){
	var rand= Math.floor(Math.random()*(5-1) +1);
	if(rand === 1){
		for (var i = 0; i < this.enemy.length; i++) {
			this.enemy[i].state = fsm.stateControl(this.enemy[i].state,"getScared");
		};
	}
}

EnemyManager.spawnSwarmSlave = function(num){
	this.enemy=[];
	for(var i = 0; i< numEnemiesNeeded; i++){
		if(i===0){
			var enemySingle = new Enemy("cmdr",5);
		}else{
			var enemySingle = new Enemy("grunt",1);
		}
		enemySingle.spawnEnemy(this.spawnPos[rand][0],this.spawnPos[rand][1]);
		this.enemy.push(enemySingle);
	}
}

EnemyManager.prototype.spawnSwarm = function(min,max,lvlMan){
	//spawns a group of enemies.
	var rand = Math.floor(Math.random()*(this.spawnPos.length-0) +0);
	var numEnemiesNeeded = Math.floor(Math.random()*(max-min) +min);
	for(var i = 0; i< numEnemiesNeeded; i++){
		if(i===0){
			var enemySingle = new Enemy("cmdr",5);
		}else{
			var enemySingle = new Enemy("grunt",1);
		}
		enemySingle.spawnEnemy(this.spawnPos[rand][0],this.spawnPos[rand][1]);
		this.enemy.push(enemySingle);
	}
	client.spawnSlave(numEnemiesNeeded);
//	this.setGrid(lvlMan);
}


EnemyManager.prototype.collision = function(e)
{
 
};
EnemyManager.prototype.draw =function(){

	for (var i = 0; i < this.enemy.length; ++i) {
		this.enemy[i].draw();
	}
	if(this.boss1.alive){
		this.boss1.draw();
	}
}
EnemyManager.prototype.debugDraw =function(){
	ctx.drawImage(imgViewRad, this.spawnPos[0][0]-this.spawnRad,this.spawnPos[0][1]-this.spawnRad, this.spawnRad*2, this.spawnRad*2);
	ctx.drawImage(imgViewRad, this.spawnPos[1][0]-this.spawnRad,this.spawnPos[1][1]-this.spawnRad, this.spawnRad*2, this.spawnRad*2);
	ctx.drawImage(imgViewRad, this.spawnPos[2][0]-this.spawnRad,this.spawnPos[2][1]-this.spawnRad, this.spawnRad*2, this.spawnRad*2);
	ctx.drawImage(imgViewRad, this.spawnPos[3][0]-this.spawnRad,this.spawnPos[3][1]-this.spawnRad, this.spawnRad*2, this.spawnRad*2);

	for(var i = 0; i< this.enemy.length; ++i){
		this.enemy[i].debugDraw();
	}
}


