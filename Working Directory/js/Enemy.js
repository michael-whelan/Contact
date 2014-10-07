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
	this.moveDirection;
	//AI States
	this.state = 0;
};


Enemy.prototype.draw = function()
{
	if(this.alive){
		ctx.save();//save the state of canvas before rotation wrecks the place.
		ctx.translate(this.x, this.y); //let's translate
		ctx.rotate(this.angle); //increment the angle and rotate the image 
		ctx.drawImage(imgEnemy,-this.width/2, -this.height/2, this.width, this.height);
		ctx.restore(); //restore the state of canvas
	
 	  // ctx.drawImage(imgEnemy,this.x, this.y, this.width, this.height);
	}
};

Enemy.prototype.spawnEnemy = function(){
	this.alive = true;
}


Enemy.prototype.update = function(){
 	if(this.alive){
 		this.moveDirection = "forward";
 		this.xDirect = Math.cos(this.angle);
		this.yDirect = Math.sin(this.angle);

		this.move("forward");

		this.x+= this.xVel;
		this.y+= this.yVel;
		this.xVel = 0;
		this.yVel = 0;
	}
}


Enemy.prototype.kill = function(){
	this.alive = false;
}




Enemy.prototype.move = function(dir)
{
	if(dir == "forward"){
		this.xVel = this.xDirect*this.speed;
		this.yVel = this.yDirect*this.speed;
	}
	
};

Enemy.prototype.collision = function(e)
{
 
};


