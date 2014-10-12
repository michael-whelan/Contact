var imgPlayer= new Image();
imgPlayer.src = "images/character_01.png"



var bullets;
var numBullets;

var Player=function (){
	this.x = 100;
	this.y = 100;
	this.width = 128;
	this.height = 101;
	this.angle = 2.87;
	this.xVel = 0;
	this.yVel = 0;
	this.xDirect = 0;
	this.yDirect = 0;
	this.speed = 2;
	bullets = [];
	//bullet = new Bullet();
	numBullets = 30;
	this.bulletsAlive = 0;
	this.lastShotTime = 0;
	this.reloadTimer = 50;
	this.startReload = false; 

	this.centreX =0;
	this.centreY =0;
};


Player.prototype.reload = function(){
	this.reloadTimer--;

	if(this.reloadTimer<=0){
		this.reloadTimer = 50;
		numBullets = 30;
		this.startReload = false;
	}
}


Player.prototype.shoot = function(){
	if(KeyController.isKeyDown(Key.SPACE)){
		if(numBullets>0){
			var bullet = new Bullet();
			bullet.spawnBullet(this.xDirect,this.yDirect,this.x,this.y,this.angle);
			bullets.push(bullet);
			numBullets--;
		}
	}//end Space
		/*if(this.numBullets<=0){
			console.log("Press R To Reload");
		}*/
	for (var i = 0; i < bullets.length; ++i) {
    	if (!bullets[i].alive) {
    		var index = bullets.indexOf(i);
    		bullets.splice(i, 1);
    		i--;
   		}
	}
}

Player.prototype.update = function(){
	if(KeyController.isKeyDown(Key.RIGHT)){
		this.angle += 0.1;
	}
	if(this.angle<0){
		this.angle = 6.3;
	}
	if(this.angle>6.3){
		this.angle = 0;
	}
	if(KeyController.isKeyDown(Key.R)){
		//console.log("Reloading...");
		this.startReload = true;
	}

	if(this.startReload){
		this.reload();
	}
	if(KeyController.isKeyDown(Key.LEFT)){
		this.angle -= 0.1;
	}

	this.xDirect = Math.cos(this.angle);
	this.yDirect = Math.sin(this.angle);

	this.shoot();
	for(var i = 0; i <bullets.length; i++){
		if(bullets[i].alive){
			bullets[i].update();
		}
	}

	if(KeyController.isKeyDown(Key.UP)){
		this.move("forward");
	}
	else if(KeyController.isKeyDown(Key.DOWN)){
		this.move("backward");
	}

	this.x += this.xVel;
	this.y += this.yVel;

	this.xVel = 0;
	this.yVel = 0;
}

Player.prototype.draw = function(){
	//canvas.width = canvas.width;
	//ctx.clearRect(this.x-this.width/2, this.y-this.height/2, this.width, this.height);
	ctx.save();//save the state of canvas before rotation wrecks the place.

	for(var i = 0; i <bullets.length; i++){
		bullets[i].draw();
	}
	ctx.translate(this.x, this.y); //let's translate
	ctx.rotate(this.angle); //increment the angle and rotate the image 
	ctx.drawImage(imgPlayer,-this.width/2, -this.height/2, this.width, this.height);
	ctx.drawImage(imgBullet,-this.width/2+80, -this.height/2+65, 10, 10);
	ctx.restore(); //restore the state of canvas
	//ctx.drawImage(imgBullet,Math.cos(this.angle) + (this.x-40) - Math.sin(this.angle) * (this.y+50-this.y) +(this.x - this.width/2), 
	//	Math.sin(this.angle) + (this.x-40) + Math.cos(this.angle) * (this.y+30-this.y) + (this.y+50 - this.height/2), 10, 10);
};



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


