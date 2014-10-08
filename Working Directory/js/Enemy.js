var imgEnemy= new Image();
imgEnemy.src = "images/Enemy.png"

var imgViewRad= new Image();
imgViewRad.src = "images/ViewRange.png"

var Enemy=function ()
{
	this.x = 200;
	this.y = 100;
	this.width = 50;
	this.height = 50;
	this.angle = 2.87;
	this.xVel = 0;
	this.yVel = 0;
	this.alive = false;
	this.xDirect = 0;
	this.yDirect = 0;
	this.speed = 2;
	this.timeSinceDirectChange = 0;
	this.moveDirection;

	this.viewRadius = 200;
	//AI States
	this.state = 0;
};


Enemy.prototype.draw = function(){
	if(this.alive){
		ctx.drawImage(imgViewRad,this.x- this.viewRadius/2, this.y - this.viewRadius/2, this.viewRadius, this.viewRadius);
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
	this.angle = Math.random()*(8-1) +1;
	//Math.floor(Math.random()*(this.max-this.min) +this.min);
}


Enemy.prototype.update = function(){
 	if(this.alive){
 		
 		this.moveDirection = "forward";
 		this.xDirect = Math.cos(this.angle);
		this.yDirect = Math.sin(this.angle);

		//this.moveBasic("forward");

		this.x+= this.xVel;
		this.y+= this.yVel;
		this.xVel = 0;
		this.yVel = 0;
		this.timeSinceDirectChange++;
	}
	
}


Enemy.prototype.moveTowardPlayer = function(playerPosX, playerPosY){
	if (this.alive == true){
		var posDifferenceX = playerPosX - this.x; // finds the vector for the difference in positions
		var posDifferenceY = playerPosY - this.y;
		var rotation = Math.atan2(posDifferenceY, posDifferenceX);

		//
		if(((this.angle* (180/Math.PI))-(rotation* (180/Math.PI))+360)%360>180){
			this.angle += 0.03;
		}
		else{
			this.angle -= 0.03;
		}
		//stop the arrow vibrating when its close to perfect.
		if(this.angle- rotation >-0.08&&this.angle- rotation <0.08){
			this.angle = rotation;
		}
	}
}


Enemy.prototype.kill = function(){
	this.alive = false;
}




Enemy.prototype.moveBasic = function(dir){
	if(this.timeSinceDirectChange>40){
		this.angle = Math.random()*(8-1) +1;
		this.timeSinceDirectChange = 0;
	}
	if(dir == "forward"){
		this.xVel = this.xDirect*this.speed;
		this.yVel = this.yDirect*this.speed;
	}
	
};

Enemy.prototype.collision = function(e)
{
 
};


