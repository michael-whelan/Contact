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
	this.targetPosX= 0;
	this.targetPosY =0;

	this.viewRadius = 200;
	//AI States
	this.state = "wander";
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

Enemy.prototype.targetPos = function(px,py){
	this.targetPosX = px;
	this.targetPosY = py;
}



Enemy.prototype.update = function(){
 	if(this.alive){
 		
 		this.xDirect = Math.cos(this.angle);
		this.yDirect = Math.sin(this.angle);

		//this.moveBasic("forward");
		if(this.state === "wander"){
			this.moveBasic();
		}
		else if(this.state === "attack"){
			this.turnTowardPlayer();
		}
		else if(this.state === "moveToPos"){
			this.goToPos();
		}
		this.x+= this.xVel;
		this.y+= this.yVel;
		this.xVel = 0;
		this.yVel = 0;
	}
}


Enemy.prototype.turnTowardPlayer = function(){
	if (this.alive == true){
		this.rotateToDirection(this.targetPosX,this.targetPosY,0.03,0.08);
	
		if(getDistance(this.targetPosX,this.targetPosY,this.x,this.y) > 100){
			this.goToPos(midPoint(this.targetPosX,this.x),midPoint(this.targetPosY,this.y));
		}
	}
	//console.log(getDistance(5,1,1,-2));
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
		if(this.angle- rotation >-leeWay&&this.angle- rotation <leeWay){
			this.angle = rotation;
		}
}


Enemy.prototype.goToPos = function(xPos,yPos){
	this.rotateToDirection(xPos,yPos,0.08,0.1);
	

	this.xDirect = Math.cos(this.angle);
	this.yDirect = Math.sin(this.angle);
}



function midPoint(v1,v2){
    return (v1+v2)/2;
}

function getDistance(x1,y1,x2,y2){
	var xs = 0;
  	var ys = 0;
 
  	xs = x2 - x1;
  	xs = xs * xs;
 
  	ys = y2 - y1;
 	 ys = ys * ys;
 
  	return sqrt( xs + ys );
}

function sqrt(x) {
    var i;
    var s;
    s=((x/2)+x/(x/2)) / 2; /*first guess*/
    for(i=1;i<=4;i++) { /*average of guesses*/
        s=(s+x/s)/2;
    }
    return s;
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


