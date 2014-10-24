var imgPlayer= new Image();
//imgPlayer.src = "images/character_01.png"


var spawnSnd = new Audio();
spawnSnd.src = "sounds/sfx/Player_Spawn.mp3";

var reloadSnd = new Audio();
reloadSnd.src = "sounds/sfx/Gun_Recharge.mp3";

var Player=function (){
	this.bullets =[];
	this.numBullets = 30;
	this.health=100;
	this.x = 100;
	this.y = 100;
	this.width = 128;
	this.height = 101;//135
	this.alive = true;
	this.angle = 2.87;
	this.xVel = 0;
	this.yVel = 0;
	this.xDirect = 0;
	this.yDirect = 0;
	this.speed = 2;
	//bullet = new Bullet();
	this.centreX =0;
	this.centreY =0;
	this.bulletsAlive = 0;
	this.lastShotTime = 0;
	this.reloadTimer = 50;
	this.reloadDelay =50;

	this.startReload = false; 
	this.radius= 50;//used for collision
	this.centreX =0;
	this.centreY =0;
	this.shot = false;//the sound of the gun shot for the enemies to hear
	this.bulletTimer=0;//stops the bullets from spawning all at once.

	this.bulletX = 0,this.bulletY = 0;//this is the initial position of all bullets fired from the player
	this.flash = false; this.flashTimer=0;//makes the player flash on respawn;
	this.healthTimer = 0;
	this.healDelay =15;
	this.lastHitTime = 0;
};

Player.prototype.reload = function(){
	this.reloadTimer--;

	if(this.reloadTimer<=0){
		this.reloadTimer = this.reloadDelay;
		this.numBullets = 30;
		this.startReload = false;
	}
}

Player.prototype.shoot = function(){	
	if(KeyController.isKeyDown(Key.SPACE)){
		if(this.numBullets>0 && this.bulletTimer>18){
			var bullet = new Bullet();
			bullet.spawnBullet(this.xDirect,this.yDirect,this.bulletX,this.bulletY,this.angle);
			this.shot = true;
			this.bullets.push(bullet);
			this.numBullets--;
			this.bulletTimer=0;
		}
	}//end Space
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

Player.prototype.controller = function(){
	if(KeyController.isKeyDown(Key.RIGHT)){
		this.angle += 0.1;
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
	}
	if(KeyController.isKeyDown(Key.LEFT)){
		this.angle -= 0.1;
	}

	if(KeyController.isKeyDown(Key.UP)){
		this.move("forward");
	}
	else if(KeyController.isKeyDown(Key.DOWN)){
		this.move("backward");
	}
}

Player.prototype.respawn = function(){
	this.health = 100;
	this.x = 100;
	this.y = 100;
	this.flash = true;
	spawnSnd.play();
}

Player.prototype.update = function(){
	this.controller();

	if(this.startReload){
		this.reload();
	}
	
	if(this.health<100 && Date.now() - this.lastHitTime > 5000){
		this.rechargeHealth();
	}
	this.xDirect = Math.cos(this.angle);
	this.yDirect = Math.sin(this.angle);
	this.bulletTimer++;
	this.shoot();
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
	ctx.translate(this.x, this.y); //let's translate
	ctx.rotate(this.angle); //increment the angle and rotate the image 
	if(this.alive){
		ctx.drawImage(imgPlayer,-this.width/2, -this.height/2, this.width, this.height);
	}
	ctx.restore(); //restore the state of canvas
	//ctx.drawImage(imgBullet,rotate_point(this.x+30,this.y+20,this.x,this.y,this.angle).x, rotate_point(this.x+30,this.y+20,this.x,this.y,this.angle).y, 10, 10);//80 65

	this.bulletX = rotate_point(this.x+30,this.y+20,this.x,this.y,this.angle).x;
	this.bulletY = rotate_point(this.x+30,this.y+20,this.x,this.y,this.angle).y;
//	ctx.drawImage(imgViewRad,this.x- this.radius, this.y - this.radius, this.radius*2, this.radius*2);
	//ctx.drawImage(imgBullet,Math.cos(this.angle) + (this.x-40) - Math.sin(this.angle) * (this.y+50-this.y) +(this.x - this.width/2), 
	//	Math.sin(this.angle) + (this.x-40) + Math.cos(this.angle) * (this.y+30-this.y) + (this.y+50 - this.height/2), 10, 10);
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
	if(dir == "forward"){
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


