

var EnemyManager=function ()
{
	this.x = 100;
	this.y = 100;
	this.width = 50;
	this.height = 50;
	this.angle = -2.87;
	this.xVel = 0;
	this.yVel = 0;
	this.alive = false;
	this.xDirect = 0;
	this.yDirect = 0;
	this.speed = 5;
	//this.timeOfBirth = 0;
};


EnemyManager.prototype.draw = function()
{
	if(this.alive){
 	   ctx.drawImage(imgPlayer,this.x, this.y, this.width, this.height);
	}
};

EnemyManager.prototype.spawnEnemy = function(){
	
}


EnemyManager.prototype.update = function(){

 	
}

EnemyManager.prototype.move = function(x,y)
{

	
};

EnemyManager.prototype.collision = function(e)
{
 
};


