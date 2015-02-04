var imgBoss1 = new Image();



var Boss=function (rank){
	this.name = rank;
	this.x=0;
	this.y=-200;
	this.width = 200;
	this.height=120;
	this.state = "dig";
	this.targetPosX=0;
	this.targetPosY=0;
	this.xDirect = 0;
	this.yDirect = 0;
	this.shake = false;
	this.health = 200;
	this.alive=false;
	this.angle=2.87;
	this.bullets = [];
	this.reloadTimer = 200;
	this.startReload = false; 
	this.numBullets = 4;
	this.lastHealth = 200;
	this.comeTimer=0;
	this.canRise =false;
	this.digTimer=0;
	this.attackTimer=0;
	this.randPosArray = [];
	this.counter=0;
};
//Boss.inherits(Enemy);

Boss.prototype.hearTarget = function(x,y){
	this.state = fsm.boss1(this.state,"hearTarget");
	this.targetPosX = x;
	this.targetPosY = y;
}

Boss.prototype.reset = function(){
	this.x=0;
	this.y=-200;
	this.reloadTimer = 200;
	this.startReload = false; 
	this.comeTimer=0;
	this.canRise =false;
	this.digTimer=0;
	this.attackTimer=0;
	this.alive = false;
	this.health = 200;
}

Boss.prototype.reload = function(){
	this.reloadTimer--;
	if(this.reloadTimer<=0){
		this.reloadTimer = 350;
		this.numBullets = 4;
		this.startReload = false;
	}
}

Boss.prototype.update = function(){
	this.xDirect = Math.cos(this.angle);
	this.yDirect = Math.sin(this.angle);

	if(this.angle<0){
		this.angle = 6;
		}

		if(this.angle>6.3){
			this.angle = 0;
		}
	if(this.state==="dig"){
		this.digTimer++;
		//if(this.health>100){
			if(this.digTimer>500){
				this.canRise = true;
			}
		//}
		/*else if(this.digTimer>100 && this.counter<10){
			this.attackRandom();
			this.digTimer = 0;
		}*/
		this.lastHealth = this.health;
	}
	else if(this.state === "comeUp"){
		this.comeUp();
		this.comeTimer++;//foolish name
		if(this.comeTimer>240){
			
			this.comeTimer = 0;
			this.state = fsm.boss1(this.state,"rise");
		}
	}
	else if(this.state === "attack"){
		if(this.attackTimer>3000){
			this.attackTimer = 0;
			if(getDistance(this.targetPosX,this.targetPosY,this.x,this.y)>300){
				this.state = fsm.boss1(this.state,"hurt");
			}
		}
		this.attackTimer++;
		this.turnTowardPlayer();
	}

	for(var i = 0; i <this.bullets.length; i++){
			if(this.bullets[i].alive){
				this.bullets[i].update();
			}
		}
	if(this.health<=0){
		this.alive = false;
	}
	else if(this.health<= this.lastHealth-30){
		this.state = fsm.boss1(this.state,"hurt");
	}
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

Boss.prototype.attackRandom = function(){
	var rand1= Math.floor(Math.random()*(13-1) +1);
	var rand2= Math.floor(Math.random()*(20-1) +1);
	var temp = [rand1,rand2];
	this.randPosArray.push(temp);
	this.counter++;
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
			this.startReload = true;
		}

	for (var i = 0; i < this.bullets.length; ++i) {
    	if (!this.bullets[i].alive){
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
	ctx.save();//save the state of canvas before rotation wrecks the place.
	for(var i = 0; i <this.bullets.length; i++){
			this.bullets[i].draw();
	}
		ctx.translate(this.x, this.y); //let's translate
		ctx.rotate(this.angle); //increment the angle and rotate the image 
if(this.state=== "attack"){
		ctx.drawImage(imgBoss1,-this.width/2,-this.height/2,this.width,this.height);
	}
		ctx.restore(); //restore the state of canvas




	
}