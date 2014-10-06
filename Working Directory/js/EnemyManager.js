

var EnemyManager=function (){
	this.currentLvl = 0;
	this.totalEnemies = 0;
	this.enemySwarms = 0;
};



EnemyManager.prototype.init = function(lvl){
	this.currentLvl = lvl;
}


EnemyManager.prototype.draw = function()
{
};

EnemyManager.prototype.setUp = function(){
	if(this.currentLvl == 1){
		this.totalEnemies = 10;
		this.enemySwarms = 0;
	}
}


EnemyManager.prototype.update = function(){

 	
}


EnemyManager.prototype.collision = function(e)
{
 
};


