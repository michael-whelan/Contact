var imgPlayer= new Image();

var spawnSnd = new Audio();

var reloadSnd = new Audio();

var emptySnd = new Audio();

var loseHealthSnd = new Audio();

var Player=function (){
	this.bullets =[];
	this.rotSpeed = 0.01;
	this.width = 128;
	this.height = 101;//135

	this.speed = 2;
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

	this.reset();


	//pickup Bools
	this.radar = false;

};

Player.prototype.reload = function(){
	this.reloadTimer--;

	if(this.reloadTimer<=0){
		this.reloadTimer = this.reloadDelay;
		this.numBullets = 30;
		this.startReload = false;
	}
}

Player.prototype.reset = function(){
	this.numBullets = 30;
	this.health=100;
	this.x = 100;
	this.y = 100;
	this.xVel = 0;
	this.yVel = 0;
	this.xDirect = 0;
	this.yDirect = 0;
	this.lastHitTime = 0;

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

Player.prototype.shoot = function(){	
	//if(KeyController.isKeyDown(Key.SPACE)){
		if(this.numBullets>0 && this.bulletTimer>18){
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
		//console.log("Reloading...");
		this.startReload = true;
		reloadSnd.play();
		console.log("reload");
	}
	if(b1){
		this.move("forward");
	}
	//console.log(mapWidth,this.y);
	if(KeyController.isKeyDown(Key.UP)){
			this.move("forward");
	}
	else if(KeyController.isKeyDown(Key.DOWN)){
			this.move("backward");
	}	
}

Player.prototype.respawn = function(){
	this.lives--;
	console.log("lives: "+this.lives);
	this.health = 100;
	this.x = 100;
	this.y = 100;
	this.flash = true;
	spawnSnd.play();
}

Player.prototype.getAngle = function(x,y){
	return Math.atan2(y,x);//*180/Math.PI;
}

Player.prototype.setPickup = function(id){
	if(id === "radar"){
		this.radar = true;
	}
}

Player.prototype.update = function(x1,y1,x2,y2,b1,b2){
	this.controller(b1,b2);

	if(this.startReload){
		this.reload();
	}
	
	if(this.health<100 && Date.now() - this.lastHitTime > 5000){
		this.rechargeHealth();
	}
	this.xDirect= this.xFacing = Math.cos(this.angle);
	this.yDirect=this.yFacing = Math.sin(this.angle);
	if(b1){
		this.xDirect = x1;
		this.yDirect = y1;
	}
	if(b2){
		this.xFacing = x2;
		this.yFacing = y2;
		this.angle = this.getAngle(this.xFacing,this.yFacing);
		if(this.xFacing!=0 ||this.yFacing!=0)
		this.shoot();
	}
	else if(KeyController.isKeyDown(Key.SPACE)){
		this.shoot();
	}

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

	this.xVel = 0;
	this.yVel = 0;

	this.centreX = this.x+this.width/2;
	this.centreY = this.y+this.height/2;
}

Player.prototype.draw = function(){
	ctx.save();//save the state of canvas before rotation wrecks the place.

	for(var i = 0; i <this.bullets.length; i++){
		this.bullets[i].draw();
	}
	
	//ctx.drawImage(imgViewRad,this.enemyPointX,this.enemyPointY,30,10);
	ctx.translate(this.x, this.y); //let's translate
	ctx.rotate(this.angle); //increment the angle and rotate the image 
	if(this.alive){
		ctx.drawImage(imgPlayer,-this.width/2, -this.height/2, this.width, this.height);
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


