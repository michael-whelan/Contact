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
	this.speed = 1.5;
	this.timeSinceDirectChange = 0;
	this.moveDirection;
	this.targetPosX= 0;
	this.targetPosY =0;

	this.viewRadius = 200;
	//AI States
	this.state = "wander";
	this.drawLast = false;


	//bullets and crap
	this.bullets = [];
	this.numBullets = 4;
	this.reloadTimer = 80;
	this.startReload = false; 

};




Enemy.prototype.spawnEnemy = function(){
	this.alive = true;
	this.angle = Math.random()*(8-1) +1;
	//Math.floor(Math.random()*(this.max-this.min) +this.min);
}

Enemy.prototype.targetPos = function(px,py){
	this.targetPosX = px;
	this.targetPosY = py;
}

Enemy.prototype.update = function(){
 	if(this.alive){
 		
 		this.xDirect = Math.cos(this.angle);
		this.yDirect = Math.sin(this.angle);
		if(this.angle<0){
		this.angle = 6;
		}
		if(this.angle>6.3){
			this.angle = 0;
		}
		//State Control
		if(this.state === "wander"){
			this.moveBasic();
		}
		else if(this.state === "attack"){
			this.drawLast = true;//shows the dot which represents the enemies view of the player.
			this.turnTowardPlayer();

		}
		else if(this.state === "moveToPos"){
			this.goToPos(this.targetPosX,this.targetPosY);
		}
		//end state control

		for(var i = 0; i <this.bullets.length; i++){
			if(this.bullets[i].alive){
				this.bullets[i].update();
			}
		}
		this.x+= this.xVel;
		this.y+= this.yVel;
		this.xVel = 0;
		this.yVel = 0;
	}
}

Enemy.prototype.draw = function(){
	if(this.alive){
		ctx.drawImage(imgViewRad,this.x- this.viewRadius/2, this.y - this.viewRadius/2, this.viewRadius, this.viewRadius);
		if(this.drawLast){
			ctx.drawImage(imgBullet,this.targetPosX, this.targetPosY, 8, 8);
		}
		ctx.save();//save the state of canvas before rotation wrecks the place.
		for(var i = 0; i <this.bullets.length; i++){
		this.bullets[i].draw();
	}
		ctx.translate(this.x, this.y); //let's translate
		ctx.rotate(this.angle); //increment the angle and rotate the image 
		ctx.drawImage(imgEnemy,-this.width/2, -this.height/2, this.width, this.height);
		ctx.restore(); //restore the state of canvas
 	  // ctx.drawImage(imgEnemy,this.x, this.y, this.width, this.height);
	}
};


Enemy.prototype.turnTowardPlayer = function(){
	if (this.alive == true){
		if(this.rotateToDirection(this.targetPosX,this.targetPosY,0.03,0.08)){
			this.shoot();
			if(this.startReload){
				this.reload();
			}
		}
	}
}

Enemy.prototype.reload = function(){
	this.reloadTimer--;

	if(this.reloadTimer<=0){
		this.reloadTimer = 80;
		this.numBullets = 4;
		this.startReload = false;
	}
}

Enemy.prototype.shoot = function(){
	if(this.numBullets>0){
			var bullet = new Bullet();
			bullet.spawnBullet(this.xDirect,this.yDirect,this.x,this.y,this.angle);
			this.shot = true;
			this.bullets.push(bullet);
			this.numBullets--;
		}
		else{
			console.log(this.numBullets);
			this.startReload = true;
		}

	//end Space
		/*if(this.numBullets<=0){
			console.log("Press R To Reload");
		}*/
	for (var i = 0; i < this.bullets.length; ++i) {
    	if (!this.bullets[i].alive) {
    		var index = this.bullets.indexOf(i);
    		this.bullets.splice(i, 1);
    		i--;
   		}
	}
}

Enemy.prototype.rotateToDirection = function(targX,targY,speed,leeWay){
	var posDifferenceX = targX - this.x; // finds the vector for the difference in positions
	var posDifferenceY = targY - this.y;
	var rotation = Math.atan2(posDifferenceY, posDifferenceX);
	//checks which direction of rotation is the correct one
	if(((this.angle* (180/Math.PI))-(rotation* (180/Math.PI))+360)%360>180){
		this.angle += speed;//0.08
	}
	else{
		this.angle -= speed;
	}
	//stop the arrow vibrating when its close to perfect.
	if(((this.angle* (180/Math.PI))-(rotation* (180/Math.PI))+360)%360>180 >-leeWay&&
		((this.angle* (180/Math.PI))-(rotation* (180/Math.PI))+360)%360>180 <leeWay){
		this.angle = rotation;
		return true;
	}
	return false;
}


Enemy.prototype.goToPos = function(xPos,yPos){
	this.rotateToDirection(xPos,yPos,0.08,0.01);
	
	//turn to face a specific point
	this.xDirect = Math.cos(this.angle);
	this.yDirect = Math.sin(this.angle);
	this.xVel = this.xDirect*this.speed;
	this.yVel = this.yDirect*this.speed;
	if(this.closeToPos(xPos,yPos)){
		this.state = fsm.stateControl(this.state,"complete");
		this.drawLast = false;
	}
}

Enemy.prototype.closeToPos = function(xPos,yPos){

	var marginGap = 8;
	if(this.x > xPos -marginGap &&this.x < xPos +marginGap){
		if(this.y > yPos -marginGap &&this.y < yPos +marginGap){
			return true;
		}
	}
	return false;
}


Enemy.prototype.kill = function(){
	this.alive = false;
}


Enemy.prototype.moveBasic = function(){
	this.moveDirection = "forward";
	//causes regular changes in direction
	if(this.timeSinceDirectChange>40){
		this.angle = Math.random()*(8-1) +1;
		this.timeSinceDirectChange = 0;
	}
	if(this.moveDirection == "forward"){
		this.xVel = this.xDirect*this.speed;
		this.yVel = this.yDirect*this.speed;
	}
	this.timeSinceDirectChange++;
};

Enemy.prototype.collision = function(e)
{

};


