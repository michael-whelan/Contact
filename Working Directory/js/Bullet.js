var imgBullet= new Image();
//imgBullet.src = "images/Bullet.png"


var gunshot = null;
//gunshot.src = "sounds/sfx/Gun_Pew.mp3";

var Bullet=function ()
{
	this.x = 0;
	this.y = 0;
	this.width = 5;
	this.height = 5;
	this.xVel = 0;
	this.yVel = 0;
	this.alive = false;
	this.timeOfBirth = 0;
	this.xDirect = 0;
	this.yDirect = 0;
	this.speed = 5;
	this.radius = 2;
	//this.gunshot = new Audio();
	//Bullet.bulletTimer = 0;
};


Bullet.prototype.draw = function(){
	if(this.alive){
 	   ctx.drawImage(imgBullet,this.x, this.y, this.width, this.height);
	}
};

Bullet.prototype.spawnBullet = function(playXDirect,playYDirect,xPos,yPos,angle){
	//Bullet.bulletTimer++;
 	this.xDirect= this.xFacing = Math.cos(angle);
	this.yDirect=this.yFacing = Math.sin(angle);
 	this.alive = true;
 	this.x = xPos;
 	this.y = yPos;
 	this.timeOfBirth = Date.now();
 	//gunshot.play();
 	if(allowSound){
 		soundManager.playSound(gunshot);
	}
}


Bullet.prototype.update = function(){

 	if(this.alive){
 		this.moveForward();
 	}
 	if(Date.now() - this.timeOfBirth > 2000){
 		this.alive = false;
 	}
 	this.x += this.xVel;
	this.y += this.yVel;

	this.xVel = 0;
	this.yVel = 0;
}

Bullet.prototype.moveForward = function(){
	this.xVel = this.xDirect*this.speed;
	this.yVel = this.yDirect*this.speed;
}


Bullet.prototype.kill = function(){
	this.alive = false;
}



