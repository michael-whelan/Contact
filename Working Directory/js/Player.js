var imgPlayer= new Image();

var imgPlayerDead = new Image();

var spawnSnd = new Audio();

var reloadSnd = new Audio();

var emptySnd = new Audio();

var loseHealthSnd = new Audio();

var Player=function (x,y,name){
	this.bullets =[];
	this.rotSpeed = 0.01;
	this.width = 128;
	this.height = 101;//135
	this.startX = x;
	this.startY = y;
	this.speed = 2;
	this.name = name;
	//bullet = new Bullet();
	this.centreX =0;
	this.centreY =0;
	this.bulletsAlive = 0;
	this.lastShotTime = 0;
	this.reloadTimer = 100;
	this.reloadDelay =100;
	this.enemyPointX=0;
	this.enemyPointY=0;
	this.healDelay =15;
	this.bigX=0;
	this.bigY = 0;
	this.aimAssistRadius = 400;
	this.allowAimAssist = false;
	this.assistPositions = [];
	this.reset(x,y);

	this.shootBool = false;this.dead = false;//multiplayer

	//pickup Bools
	this.radar = false;

//triangle variables
	this.aX=0,this.aY=0,this.bX=0,this.bY=0,this.cX=0,this.cY=0;

};

Player.prototype.reload = function(){
	this.reloadTimer--;

	if(this.reloadTimer<=0){
		this.reloadTimer = this.reloadDelay;
		this.numBullets = 30;
		this.startReload = false;
	}
}

Player.prototype.reset = function(x,y){
	this.numBullets = 30;
	this.health=100;
	this.x = x;
	this.y = y;
	this.xVel = 0;
	this.yVel = 0;
	this.xDirect = 0;
	this.yDirect = 0;
	this.lastHitTime = 0;
	this.shootBool = false;

	this.alive = true;
	this.angle = 2.87;
	
	//temp
	this.lives=3;

	this.xFacing = 0;
	this.yFacing = 0;
	this.startReload = false; 
	this.radius= 50;//used for collision
	this.centreX =0;
	this.centreY =0;
	this.shot = false;//the sound of the gun shot for the enemies to hear
	this.bulletTimer=0;//stops the bullets from spawning all at once.
	this.respawn();
	this.bulletX = 0,this.bulletY = 0;//this is the initial position of all bullets fired from the player
	this.flash = false; this.flashTimer=0;//makes the player flash on respawn;
	this.healthTimer = 0;
}

Player.prototype.setPos = function(x,y,o,_int){//used for multiplayer for second player
	this.x = x;
	this.y = y;
	this.angle =o;
	//console.log(x,y,o,_int);
	
	if(_int ===1){
		this.shootBool = true;
		//shoot();
	}
	else {this.shootBool = false;}
	
}

Player.prototype.setAssistPostitions = function(){
	for (var i = 0; i<this.assistPositions.length; ++i){
		//console.log(this.assistPositions[i]);
	}
}

Player.prototype.aimAssist = function(){
	for (var i = 0; i<this.assistPositions.length; ++i){
		
		/*if(this.angle > this.getAngle(this.assistPositions[i][0],this.x,this.assistPositions[i][1],this.y)-0.6 && 
			this.angle < this.getAngle(this.assistPositions[i][0],this.x,this.assistPositions[i][1],this.y)+0.6){
			console.log("assist: "+ this.angle+" "+this.getAngle(this.assistPositions[i][0],this.x,this.assistPositions[i][1],this.y));
			return this.getAngle(this.assistPositions[i][0],this.x,this.assistPositions[i][1],this.y);
		}*/
	var posDifferenceX = this.assistPositions[i][0] - this.x; // finds the vector for the difference in positions
	var posDifferenceY = this.assistPositions[i][1] - this.y;
	var rotation = Math.atan2(posDifferenceY, posDifferenceX);
	//console.log("attempt: "+ this.angle+" "+rotation);
	if(this.angle > rotation-0.5 &&this.angle < rotation+0.5){
		//console.log("assisted");
		return rotation;
		}
	}
	return this.angle;
}


Player.prototype.shoot = function(){	
	//if(KeyController.isKeyDown(Key.SPACE)){
		this.angle = this.aimAssist();
		if(this.numBullets>0 && this.bulletTimer>18){
			if(this.name === "player2"){
				console.log("player 2 shoot" +this.numBullets+this.bulletTimer);
			}
			var bullet = new Bullet();
			bullet.spawnBullet(this.xFacing,this.yFacing,this.bulletX,this.bulletY,this.angle);
			this.shot = true;
			this.bullets.push(bullet);
			this.numBullets--;
			this.bulletTimer=0;
			}
		else if(this.numBullets<=0){
			//emptySnd.play();
			emptySnd.play();
			this.reload();
		//	this.reload();
		}
	//}//end Space
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

Player.prototype.rechargeHealth = function(){
	this.healthTimer++;
	if(this.healthTimer>this.healDelay){
		this.health++;
		this.healthTimer =0;
	}
}

Player.prototype.pointToEnemy = function(targX,targY){
	var posDifferenceX = targX - this.x; // finds the vector for the difference in positions
	var posDifferenceY = targY - this.y;
	var rotation = Math.atan2(posDifferenceY, posDifferenceX);
	//this.enemyPointX = this.x *rotation;
	//this.enemyPointY = this.y *rotation;
}

Player.prototype.controller = function(b1,b2){
	/*if(b){
		this.angle+=x*0.2;
	}*/
	if(KeyController.isKeyDown(Key.RIGHT)){
		if(this.rotSpeed< 0.09){
			this.rotSpeed+=0.001;
		}
		this.angle += this.rotSpeed;
	}
	else if(KeyController.isKeyDown(Key.LEFT)){
		if(this.rotSpeed< 0.09){
			this.rotSpeed+=0.001;
		}
		this.angle -=this.rotSpeed;
	}
	else {
		this.rotSpeed = 0.01;
	}
	if(this.angle<0){
		this.angle = 6.3;
	}
	if(this.angle>6.3){
		this.angle = 0;
	}
	
	if(KeyController.isKeyDown(Key.R) &&this.numBullets<30){
		this.setAssistPostitions();
		//console.log("Reloading...");
		this.startReload = true;
		reloadSnd.play();
		//console.log("reload");
	}
	if(b1){
		this.move("forward");
	}
	//console.log(mapWidth,this.y);
	else if(KeyController.isKeyDown(Key.UP)){
			this.move("forward");
	}
	else if(KeyController.isKeyDown(Key.DOWN)){
			this.move("backward");
	}
	else{

		this.xVel = 0;
		this.yVel = 0;
	}
}

Player.prototype.respawn = function(){
	this.lives--;
//	console.log("multiplayer: "+this.multiplayer);
	this.health = 100;
	this.x = this.startX;
	this.y = this.startY;
	this.flash = true;
	spawnSnd.play();
}


Player.prototype.getAngle = function(x,x2,y,y2){
	return Math.atan2(y2-y,x2-x);//*180/Math.PI;
}

Player.prototype.setPickup = function(id){
	if(id === "radar"){
		this.radar = true;
	}
}

Player.prototype.update = function(x1,y1,x2,y2,b1,b2){
	if(this.startReload){
		this.reload();
	}
	
	if(this.health<100 && Date.now() - this.lastHitTime > 5000){
		this.rechargeHealth();
	}
	if(this.name==="player1"){this.controller(b1,b2);}
		
		this.xDirect= this.xFacing = Math.cos(this.angle);
		this.yDirect=this.yFacing = Math.sin(this.angle);

	if(this.name ==="player1"){//this is only done for player one.
		
		if(b1){
			this.xDirect = x1;
			this.yDirect = y1;
		}
		if(b2){
			this.xFacing = x2;
			this.yFacing = y2;
			this.angle = this.getAngle(0,this.xFacing,0,this.yFacing);
			//this.angle = this.aimAssist();
			if(this.xFacing!=0 ||this.yFacing!=0)
			this.shoot();
		}
		else if(KeyController.isKeyDown(Key.SPACE)){
			this.angle = this.aimAssist();
			this.shoot();
		}
	}
	else if(b2){this.shoot();}

	this.bulletTimer++;
	
	for(var i = 0; i <this.bullets.length; i++){
		if(this.bullets[i].alive){
			this.bullets[i].update();
			//console.log(this.bullets[i].bulletTimer);
		}
	}

	if(this.health<=0){
		this.respawn();
	}	

	 this.aX=rotate_point(this.x,this.y,this.x,this.y,this.angle).x,this.aY = rotate_point(this.x,this.y,this.x,this.y,this.angle).y;
    	this.bX=rotate_point(this.x+350,this.y+100,this.x,this.y,this.angle).x, this.bY =rotate_point(this.x+350,this.y+100,this.x,this.y,this.angle).y;
    	this.cX=rotate_point(this.x+350,this.y-90,this.x,this.y,this.angle).x,this.cY=rotate_point(this.x+350,this.y-90,this.x,this.y,this.angle).y;



	if(this.flash){
		this.flashTimer++;
		if(this.flashTimer<150){
			if(this.flashTimer%5 ===0){
				this.alive = false;
			}
			else{
				this.alive = true;
				}
			}
		else {
			this.alive = true;
			this.flash = false;
			this.flashTimer=0;
		}
	}
	this.x += this.xVel;
	this.y += this.yVel;

	this.centreX = this.x+this.width/2;
	this.centreY = this.y+this.height/2;
}

Player.prototype.debugDraw = function(){
		ctx.beginPath();
    	ctx.moveTo(this.aX,this.aY);//a
    	ctx.lineTo(this.bX,this.bY);//b
    	ctx.lineTo(this.cX,this.cY);//c
    	ctx.lineTo(this.aX,this.aY);
    	ctx.stroke();
}

Player.prototype.draw = function(){
	ctx.save();//save the state of canvas before rotation wrecks the place.

	for(var i = 0; i <this.bullets.length; i++){
		this.bullets[i].draw();
	}
	//ctx.drawImage(imgViewRad ,this.x-this.aimAssistRadius, this.y-this.aimAssistRadius,this.aimAssistRadius*2,this.aimAssistRadius*2); 
	
	//ctx.drawImage(imgViewRad,this.enemyPointX,this.enemyPointY,30,10);
	ctx.translate(this.x, this.y); //let's translate
	ctx.rotate(this.angle); //increment the angle and rotate the image 
	if(this.alive){
		ctx.drawImage(imgPlayer,-this.width/2, -this.height/2, this.width, this.height);
	}
	else if (this.dead){
		ctx.drawImage(imgPlayerDead,-this.width/2, -this.height/2, this.width, this.height);
	}
	ctx.restore(); //restore the state of canvas
	//ctx.drawImage(imgBullet,rotate_point(this.x+30,this.y+20,this.x,this.y,this.angle).x, rotate_point(this.x+30,this.y+20,this.x,this.y,this.angle).y, 10, 10);//80 65

	this.bulletX = rotate_point(this.x+30,this.y+20,this.x,this.y,this.angle).x;
	this.bulletY = rotate_point(this.x+30,this.y+20,this.x,this.y,this.angle).y;
	//ctx.drawImage(imgViewRad,this.x- this.radius, this.y - this.radius, this.radius*2, this.radius*2);
	//ctx.drawImage(imgBullet,Math.cos(this.angle) + (this.x-40) - Math.sin(this.angle) * (this.y+50-this.y) +(this.x - this.width/2), 
	//Math.sin(this.angle) + (this.x-40) + Math.cos(this.angle) * (this.y+30-this.y) + (this.y+50 - this.height/2), 10, 10);
};

function rotate_point(pointX, pointY, originX, originY, angle) {
	//angle = angle * Math.PI / 180.0;
	return {
		x: Math.cos(angle) * (pointX-originX) - Math.sin(angle) * (pointY-originY) + originX,
		y: Math.sin(angle) * (pointX-originX) + Math.cos(angle) * (pointY-originY) + originY
	};
}

Player.prototype.move= function(dir){
	this.centreX = this.x+this.width/2
	this.centreY = this.y+this.height/2;
	if(this.x>1060){
		this.x = 1060;
	}
	else if(this.x<-764){
		this.x = -764;
	}
	else if(this.y<-604){
		this.y = -604;
	}
	else if(this.y>590){
		this.y = 590;
	}
	else if(dir == "forward"){
		this.xVel = this.xDirect*this.speed;
		this.yVel = this.yDirect*this.speed;
	}
	else{
		this.xVel = -this.xDirect*this.speed;
		this.yVel = -this.yDirect*this.speed;
	}
}


Player.prototype.collision = function(e)
{
 
};


