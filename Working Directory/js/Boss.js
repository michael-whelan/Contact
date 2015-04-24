var imgBoss1 = new Image();
var imgHole = new Image();
var shakeSnd = null;
var flurrySnd = null;

var Boss=function (rank){
	this.name = rank;
	this.x=0;
	this.y=-200;
	this.width = 290;
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
	this.numBullets = 12;
	this.lastHealth = 200;
	this.comeTimer=0;
	this.canRise =false;
	this.digTimer=0;
	this.attackTimer=0;
	this.counter=0;
	this.flurryTimer=0;
	this.doOnce = true;
	this.hitAreas=[];
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
	this.alive = false;
	this.health = 200;
	this.digTimer=0;
	this.attackTimer=0;
	this.counter=0;
	this.flurryTimer=0;
	this.hitAreas=[];
	this.state = "dig";
}

Boss.prototype.reload = function(){
	this.reloadTimer--;
	if(this.reloadTimer<=0){
		this.reloadTimer = 450;
		this.numBullets = 12;
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
		if(this.health>100||this.counter>=7){
			if(this.digTimer>500){
				this.canRise = true;
			}
		}
		else{
			this.state = fsm.boss1(this.state,"stage2");
		}
		this.lastHealth = this.health;
	}
	else if(this.state === "flurry"){
		if(this.doOnce){
			soundManager.playSound(flurrySnd);
			this.doOnce = false;
		}
		this.shake=true;

		this.flurryTimer++;
		if(this.flurryTimer>=150){
			this.attackRandom();
			this.flurryTimer=0;
		}
		if(this.counter>=7){
			this.state = fsm.boss1(this.state,"stage1");
		}
	}
	else if(this.state === "comeUp"){
		this.comeUp();
		if(this.comeTimer ===0)
		{
			soundManager.playSound(shakeSnd);
		}
		this.comeTimer++;//foolish name
		if(this.comeTimer>380){
			this.comeTimer = 0;
			this.state = fsm.boss1(this.state,"rise");
		}
	}
	else if(this.state === "attack"){
		this.counter = 0;
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
		for(var i = 0; i < 15; ++i){
			var num = Math.floor(Math.random()*40) + 1; // this will get a number between 1 and 99;
			num *= Math.floor(Math.random()*2) == 1 ? 1 : -1; 
			var pickUp = new Pickup();
			pickUp.spawn("coin",this.x+num,this.y+num);
			pickUps.push(pickUp);
		}
	}
	else if(this.health<= this.lastHealth-20){
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
	var rand1= Math.floor(Math.random()*(13-0) +0);
	var rand2= Math.floor(Math.random()*(20-0) +0);
	this.hearTarget((rand2*100)-845,(rand1*100)-652);
	var arr = [(rand2*100)-845,(rand1*100)-652];
	this.hitAreas.push(arr);
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
	if(!this.shake)
		{
			soundManager.playSound(shakeSnd);
		}
	this.shake = true;
}

Boss.prototype.draw = function(){
	/*if(this.state=== "attack"){
		ctx.drawImage(imgHealthBar,this.x-(this.health/2),this.y-60,this.health,10);
	}*/
	ctx.save();//save the state of canvas before rotation wrecks the place.
	for(var i = 0; i <this.bullets.length; i++){
		this.bullets[i].draw();
	}
	for(var i=0;i<this.hitAreas.length; ++i){
		ctx.drawImage(imgHole,this.hitAreas[i][0],this.hitAreas[i][1],100,100);
	}

	if(this.state=== "attack"){
		ctx.translate(this.x, this.y); //let's translate
		ctx.rotate(this.angle); //increment the angle and rotate the image 
		ctx.drawImage(imgBoss1,-this.width/2,-this.height/2,this.width,this.height);
	}
	ctx.restore(); //restore the state of canvas	
}