var imgBoss1 = new Image();



var Boss=function (rank){
	this.name = rank;
	this.x=0;
	this.y=-200;
	this.width = 200;
	this.height=120;
	this.state = "attack";
	this.targetPosX=0;
	this.targetPosY=0;
	this.xDirect = 0;
	this.yDirect = 0;
	this.shake = false;
	this.health = 200;
	this.alive=true;
	this.angle=2.87;
	this.bullets = [];
	this.reloadTimer = 80;
	this.startReload = false; 
};


Boss.prototype.hearTarget = function(x,y){
	this.state = fsm.boss1(this.state,"hearTarget");
	this.targetPosX = x;
	this.targetPosY = y;
}

Boss.prototype.reload = function(){
	this.reloadTimer--;

	if(this.reloadTimer<=0){
		this.reloadTimer = 80;
		this.numBullets = 4;
		this.startReload = false;
	}
}

Boss.prototype.update = function(){
	this.xDirect = Math.cos(this.angle);
	this.yDirect = Math.sin(this.angle);

console.log(this.angle);
	if(this.angle<0){
		this.angle = 6;
		}

		if(this.angle>6.3){
			this.angle = 0;
		}
	if(this.state==="dig"){

	}
	else if(this.state === "comeUp"){
		this.comeUp();
		this.comeTimer++;//foolish name
		if(comeTimer>20){
			this.state = fsm.boss1(this.state,"risen");
		}
	}
	else if(this.state === "attack"){
		this.turnTowardPlayer();
	}
	if(this.health<=0){
		this.alive = false;
	}
}

Boss.prototype.shoot = function(){
	if(this.numBullets>0){
			this.shot = true;
			var bullet = new Bullet();
			bullet.spawnBullet(this.xDirect,this.yDirect,this.x,this.y,this.angle);
			this.shot = true;
			this.bullets.push(bullet);
			this.numBullets--;
		}
		else{
			//console.log(this.numBullets);
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


Boss.prototype.rotateToDirection = function(targX,targY,speed,leeWay){
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

Boss.prototype.turnTowardPlayer = function(){
	if (this.alive == true){
		if(this.rotateToDirection(this.targetPosX,this.targetPosY,0.03,0.04)){
			this.shoot();
			if(this.startReload){
				this.reload();
			}
		}
	}
}

Boss.prototype.comeUp = function(){
	this.x = this.targetPosX;
	this.y = this.targetPosY;
	this.shake = true;
}

Boss.prototype.draw = function(){
	//console.log(this.angle);
	ctx.save();//save the state of canvas before rotation wrecks the place.
	for(var i = 0; i <this.bullets.length; i++){
			this.bullets[i].draw();
	}
		ctx.translate(this.x, this.y); //let's translate
		ctx.rotate(this.angle); //increment the angle and rotate the image 
if(this.state!== "dig"){
		ctx.drawImage(imgBoss1,-this.width/2,-this.height/2,this.width,this.height);
	}
		ctx.restore(); //restore the state of canvas




	
}