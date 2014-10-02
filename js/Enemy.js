var imgEnemy= new Image();
imgEnemy.src = "images/Enemy.png"

var Enemy=function ()
{
	this.x = 200;
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


Enemy.prototype.draw = function()
{

	if(this.alive){
 	   ctx.drawImage(imgEnemy,this.x, this.y, this.width, this.height);
	}
};

Enemy.prototype.spawnEnemy = function(){
	this.alive = true;
}


Enemy.prototype.update = function(){

 	
}


Enemy.prototype.kill = function(){
	this.alive = false;
}


Enemy.prototype.moveForward = function(){

	
}


Enemy.prototype.move = function(x,y)
{

	
};

Enemy.prototype.collision = function(e)
{
 
};


