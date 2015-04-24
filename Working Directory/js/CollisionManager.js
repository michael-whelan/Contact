

var CollisionManager=function ()
{
	this.bossColTimer=0;
	this.currPickup=0;
};


CollisionManager.prototype.update = function(){

 	
}

CollisionManager.prototype.enemy = function(enemyManager,player,lvlManager){
	for (var j = 0; j < enemyManager.enemy.length; ++j){
		enemyManager.moveControl(j,this.circleOnCircle(player.radius,player.x,player.y,enemyManager.enemy[j].viewRadius,enemyManager.enemy[j].x,enemyManager.enemy[j].y),
			player.x,player.y);
		//if(enemyManager.enemy[j].shot){//hear each others shots
			//enemyManager.hearShot(enemyManager.enemy[j].x,enemyManager.enemy[j].y);
			//enemyManager.enemy[j].shot = false;
		//}
		

		if(this.circleOnTriangle(player.x,player.y,enemyManager.enemy[j].aX,enemyManager.enemy[j].aY,
			enemyManager.enemy[j].bX,enemyManager.enemy[j].bY,
			enemyManager.enemy[j].cX,enemyManager.enemy[j].cY)){
			for(var i =0; i<lvlManager.objects.length;++i){//crap and messy, needs to be made cleaner
				if(lineIntersect(player.x,player.y,enemyManager.enemy[j].x,enemyManager.enemy[j].y,
					lvlManager.objects[i].x1,lvlManager.objects[i].y1,lvlManager.objects[i].x1,lvlManager.objects[i].y2,i,false)){
					
				}
				else if(lineIntersect(player.x,player.y,enemyManager.enemy[j].x,enemyManager.enemy[j].y,
					lvlManager.objects[i].x1,lvlManager.objects[i].y1,lvlManager.objects[i].x2,lvlManager.objects[i].y1,i,false)){			
				}
				else if(lineIntersect(player.x,player.y,enemyManager.enemy[j].x,enemyManager.enemy[j].y,
					lvlManager.objects[i].x2,lvlManager.objects[i].y1,lvlManager.objects[i].x2,lvlManager.objects[i].y2,i,false)){	
				}
				else if(lineIntersect(player.x,player.y,enemyManager.enemy[j].x,enemyManager.enemy[j].y,
					lvlManager.objects[i].x2,lvlManager.objects[i].y2,lvlManager.objects[i].x1,lvlManager.objects[i].y2,i,false)){
				}
				else{
					enemyManager.moveControl(j,true,player.x,player.y);
				}
			}
		}
		else if(this.circleOnTriangle(player2.x,player2.y,enemyManager.enemy[j].aX,enemyManager.enemy[j].aY,
		enemyManager.enemy[j].bX,enemyManager.enemy[j].bY,
		enemyManager.enemy[j].cX,enemyManager.enemy[j].cY)){
			if(multiplayer){
				enemyManager.moveControl(j,true,player2.x,player2.y);
			}
		}

		if(player.shot){
			enemyManager.hearShot(player.x,player.y);
			player.shot = false;
		}

		if(multiplayer){
			/*enemyManager.moveControl(j,this.circleOnTriangle(player2.x,player2.y,enemyManager.enemy[j].aX,enemyManager.enemy[j].aY,
				enemyManager.enemy[j].bX,enemyManager.enemy[j].bY,
				enemyManager.enemy[j].cX,enemyManager.enemy[j].cY),
				player2.x,player2.y);*/
			if(player2.shot){
				enemyManager.hearShot(player2.x,player2.y);
				player2.shot = false;
			}
		}	

		for(var i =0; i<lvlManager.objects.length;++i){//crap and messy, needs to be made cleaner//temp
			if(this.circleOnTriangle(lvlManager.objects[i].x1,lvlManager.objects[i].y1,enemyManager.enemy[j].aX,enemyManager.enemy[j].aY,
			enemyManager.enemy[j].bX,enemyManager.enemy[j].bY,
			enemyManager.enemy[j].cX,enemyManager.enemy[j].cY)){
				enemyManager.enemy[j].angle+=1;
			}
			else if(this.circleOnTriangle(lvlManager.objects[i].x2,lvlManager.objects[i].y1,enemyManager.enemy[j].aX,enemyManager.enemy[j].aY,
			enemyManager.enemy[j].bX,enemyManager.enemy[j].bY,
			enemyManager.enemy[j].cX,enemyManager.enemy[j].cY)){
				enemyManager.enemy[j].angle+=1;	
			}
			else if(this.circleOnTriangle(lvlManager.objects[i].x2,lvlManager.objects[i].y2,enemyManager.enemy[j].aX,enemyManager.enemy[j].aY,
			enemyManager.enemy[j].bX,enemyManager.enemy[j].bY,
			enemyManager.enemy[j].cX,enemyManager.enemy[j].cY)){
				enemyManager.enemy[j].angle+=1;
			}
			else if(this.circleOnTriangle(lvlManager.objects[i].x1,lvlManager.objects[i].y2,enemyManager.enemy[j].aX,enemyManager.enemy[j].aY,
			enemyManager.enemy[j].bX,enemyManager.enemy[j].bY,
			enemyManager.enemy[j].cX,enemyManager.enemy[j].cY)){
				enemyManager.enemy[j].angle+=1;
			}
		}	
	}
	if(player.bomb.release){
		for (var j = 0; j < enemyManager.enemy.length; ++j){
			if(this.circleOnCircle(player.bomb.radius,player.x-player.width/2,player.y-player.height/2,enemyManager.enemy[j].hitRadius,enemyManager.enemy[j].x-enemyManager.enemy[j].width/2,enemyManager.enemy[j].y-enemyManager.enemy[j].height/2)){
				enemyManager.enemy[j].health-=player.bomb.damage;
				if(enemyManager.enemy[j].health <1){
					this.killEnemy(j,true);
					j--;
				}
			}
		}
		player.bomb.reset();
	}
	
	for (var j = 0; j < enemyManager.enemy.length; ++j) {
		for(var i = 0; i < enemyManager.enemy[j].bullets.length; ++i){
			if(this.circleOnCircle(enemyManager.enemy[j].bullets[i].radius,enemyManager.enemy[j].bullets[i].x,
				enemyManager.enemy[j].bullets[i].y,player.radius,player.x,player.y) && enemyManager.enemy[j].bullets[i].alive&& player.flash === false){
				//player.health-=1;
				player.takeDmg(1);
				enemyManager.enemy[j].bullets[i].kill();
			}
			if(multiplayer){
				if(this.circleOnCircle(enemyManager.enemy[j].bullets[i].radius,enemyManager.enemy[j].bullets[i].x,
					enemyManager.enemy[j].bullets[i].y,player2.radius,player2.x,player2.y) && player2.flash === false){
					//player2.health-=1;
					//loseHealthSnd.play();
					player2.lastHitTime = Date.now();
					enemyManager.enemy[j].bullets[i].kill();
				}
			}
		}
		if(this.circleOnTriangle(enemyManager.enemy[j].x ,enemyManager.enemy[j].y, 
			player.aX,player.aY,
			player.bX,player.bY,
			player.cX,player.cY)){
			player.allowAimAssist = true;
			var tempArray = [enemyManager.enemy[j].x,enemyManager.enemy[j].y];
			player.assistPositions.splice(0,5);
			player.assistPositions.push(tempArray);
			if(player.assistPositions.length>enemyManager.enemy.length){
				player.assistPositions.splice(0,1);
			}
		}
	}
}

CollisionManager.prototype.obstacleCol = function(enemyManager,player,lvlManager){
	var tempbool = false;
	for(var i = 0;i< lvlManager.objects.length;++i){
		for(var j = 0;j< enemyManager.enemy.length;++j){
			if(this.circleOnCircle(enemyManager.enemy[j].viewRadius,enemyManager.enemy[j].x,enemyManager.enemy[j].y,
				lvlManager.objects[i].width/2,lvlManager.objects[i].x+lvlManager.objects[i].width/2,lvlManager.objects[i].y+lvlManager.objects[i].width/2)){
				enemyManager.enemy[j].collisionReaction(lvlManager.objects[i]);
			}
			for(var k = 0;k<enemyManager.enemy[j].bullets.length; ++k){
				if(this.circleOnCircle(enemyManager.enemy[j].bullets[k].radius,enemyManager.enemy[j].bullets[k].x,enemyManager.enemy[j].bullets[k].y,
					lvlManager.objects[i].width/2,lvlManager.objects[i].x+lvlManager.objects[i].width/2,lvlManager.objects[i].y+lvlManager.objects[i].width/2)){
					enemyManager.enemy[j].bullets[k].kill();
				}
			}
		}
		for(var j =0; j<player.bullets.length; ++j){
			if(this.circleOnCircle(player.bullets[j].radius,player.bullets[j].x,player.bullets[j].y,
				lvlManager.objects[i].width/2,lvlManager.objects[i].x+lvlManager.objects[i].width/2,lvlManager.objects[i].y+lvlManager.objects[i].width/2)){
				player.bullets[j].kill();	
			}
		}
		if(this.circleOnCircle(player.radius, player.x,player.y,
			lvlManager.objects[i].width/2,lvlManager.objects[i].x+lvlManager.objects[i].width/2,lvlManager.objects[i].y+lvlManager.objects[i].width/2)){
			player.x = player.oldX;
			player.y = player.oldY;
			tempbool =true;
		}
			
	}//simples
	if(tempbool===false){
		player.oldX = player.x;
		player.oldY = player.y;
	}
}

CollisionManager.prototype.bossCol = function(amount){
	
	if(this.bossColTimer>100){
		player.health-=amount;
		this.bossColTimer =0;
		//loseHealthSnd.play();
		player.lastHitTime = Date.now();
	}
}

CollisionManager.prototype.playerVsBoss = function(enemyManager,player){
	if(this.circleOnCircle(player.radius,player.x,player.y,enemyManager.boss1.height,enemyManager.boss1.x,enemyManager.boss1.y)&&
		enemyManager.boss1.state ==="attack"){
		this.bossCol(15);
	player.xVel = 20;
	}
	this.bossColTimer++;
	for(var i = 0; i<enemyManager.boss1.hitAreas.length; ++i){
		if(this.circleOnCircle(100,enemyManager.boss1.hitAreas[i][0],
		enemyManager.boss1.hitAreas[i][1],player.radius,player.x,player.y) &&  player.flash === false){
			this.bossCol(10);
    		enemyManager.boss1.hitAreas.splice(i, 1);
    		i--;
		}
	}
	for(var i = 0; i<enemyManager.boss1.bullets.length; ++i){
		if(this.circleOnCircle(enemyManager.boss1.bullets[i].radius,enemyManager.boss1.bullets[i].x,
		enemyManager.boss1.bullets[i].y,player.radius,player.x,player.y) && enemyManager.boss1.bullets[i].alive&& player.flash === false){
			player.takeDmg(2);
			player.lastHitTime = Date.now();
			enemyManager.boss1.bullets[i].kill();
		}
		if(multiplayer){
			if(this.circleOnCircle(enemyManager.boss1.bullets[i].radius,enemyManager.boss1.bullets[i].x,
			enemyManager.boss1.bullets[i].y,player2.radius,player2.x,player2.y) &&  player2.flash === false){
				enemyManager.boss1.bullets[i].kill();
			}
		}
	}
}


CollisionManager.prototype.killEnemy = function(j,bool){
	var x = enemyManager.enemy[j].x; var y = enemyManager.enemy[j].y;
	if(multiplayer&& bool ===true){
		client.killEnemy(j);
	}
	
	var killType =enemyManager.kill(j);
	if(killType===1&& player.pickupAbility[0]!== "NULL"){//&& !pickUp.alive){
		var pickUp = new Pickup();
		pickUp.spawn(player.pickupAbility[0],x,y);
		pickUps.push(pickUp);
	}
	else if(killType===2&& player.pickupAbility[1]!== "NULL"){//&& !pickUp.alive){
		var pickUp = new Pickup();
		pickUp.spawn(player.pickupAbility[1],x,y);
		pickUps.push(pickUp);
	}
	else if(killType===3){//&& !pickUp.alive){
		var pickUp = new Pickup();
		pickUp.spawn("health",x,y);
		pickUps.push(pickUp);
	}
	else{
		var pickUp = new Pickup();
		pickUp.spawn("coin",x,y);
		pickUps.push(pickUp);
	}
}

CollisionManager.prototype.collisionCall = function(enemyManager,player,lvlManager){
	
	this.enemy(enemyManager,player,lvlManager);

	//temp only one pick up will become a list
	for(var i =0; i < pickUps.length; ++i){
		if(this.circleOnCircle(player.radius, player.x,player.y,pickUps[i].radius,pickUps[i].x,pickUps[i].y)&&
			pickUps[i].alive){
			this.currPickup++;
			if(this.currPickup>3){
				this.currPickup=0;
			}
			if(pickUps.length===1){
				this.currPickup=4;
			}
			if(allowSound){
				soundManager.playSound(pickUpSndArr[this.currPickup]);
			}
			pickUps[i].alive = false;
			if(pickUps[i].type ==="health"){
				player.health+=20;
			}
			else if(pickUps[i].type ==="coin"){
				tempCoins+=100;
			}
			else{
				player.setPickup(pickUps[i].type);
			}
		}
		if(multiplayer){
			if(this.circleOnCircle(player2.radius, player2.x,player2.y,pickUps[i].radius,pickUps[i].x,pickUps[i].y)&&
			pickUps[i].alive){
				pickUps[i].alive = false;
			}
		}
	}
	if(enemyManager.boss1.alive){
		this.playerVsBoss(enemyManager,player);
	}
	for(var i = 0;i< player.bullets.length;++i){
		if(player.bullets[i].alive){
			if(enemyManager.boss1.alive){
				if(enemyManager.boss1.state === "attack" && this.circleOnCircle(player.bullets[i].radius,player.bullets[i].x,player.bullets[i].y,enemyManager.boss1.height,enemyManager.boss1.x,enemyManager.boss1.y)){
					enemyManager.boss1.health-=1;
					if(multiplayer){
						client.bossState("bossHit",0,0);
					}
					player.bullets[i].kill();
				}
			}
			for (var j = 0; j < enemyManager.enemy.length; ++j) {//enemy.length
				if(this.circleOnCircle(player.bullets[i].radius,player.bullets[i].x,player.bullets[i].y,enemyManager.enemy[j].hitRadius,enemyManager.enemy[j].x,enemyManager.enemy[j].y)){
						enemyManager.enemy[j].health--;
						if(enemyManager.enemy[j].health <=0){
							this.killEnemy(j,true);
						}
					player.bullets[i].kill();
				}
				/*if(!enemyManager.enemy[j].alive){
    				var index = enemyManager.enemy.indexOf(j);
    				enemyManager.enemy.splice(j, 1);
    				j--;
    				
   				}*/
			}
		}
	}
	this.obstacleCol(enemyManager,player,lvlManager);
	
};


CollisionManager.prototype.circleOnCircle = function(r1,x1,y1,r2,x2,y2){
	var radius1 = r1;
	var radius2 = r2;

	var dx = x1 - x2;
	var dy = y1 - y2;
	var radii = radius1 + radius2;
	if ((dx * dx) + (dy * dy) < radii * radii){
		return true;
	}
	return false;
    
}

/* REXX
parse upper arg x y x1 y1 x2 y2 x3 y3
if fAB()*fBC()>0 & fBC()*fCA()>0 then say "Inside"
else say "Not Inside"
exit

fAB: return (y-y1)*(x2-x1) - (x-x1)*(y2-y1)
fCA: return (y-y3)*(x1-x3) - (x-x3)*(y1-y3)
fBC: return (y-y2)*(x3-x2) - (x-x2)*(y3-y2)
*/
CollisionManager.prototype.circleOnTriangle = function(x,y,x1,y1,x2,y2,x3,y3){

	/*if(!this.onSideOfLine(x1,y1,x2,y2,x,y) &&
		!this.onSideOfLine(x2,y2,x3,y3,x,y)&&
		!this.onSideOfLine(x3,y3,x1,y1,x,y)){
		return true;
	}
	return false;*/
	if( this.fAB(x,y,x1,y1,x2,y2)*this.fBC(x,y,x2,y2,x3,y3)>0 && this.fBC(x,y,x2,y2,x3,y3)*this.fCA(x,y,x1,y1,x3,y3)>0){
		return true;
	}
	else{
		return false;
	}
}

CollisionManager.prototype.fAB = function(x,y,x1,y1,x2,y2){
	return (y-y1)*(x2-x1) - (x-x1)*(y2-y1);
}

CollisionManager.prototype.fCA = function(x,y,x1,y1,x3,y3){
	return (y-y3)*(x1-x3) - (x-x3)*(y1-y3);
}
CollisionManager.prototype.fBC = function(x,y,x2,y2,x3,y3){
	return (y-y2)*(x3-x2) - (x-x2)*(y3-y2);
}

CollisionManager.prototype.onSideOfLine = function(aX,aY,bX,bY,cX,cY){
	if(((bX-aX)* (cY - aY)) - ((bY-aY)*(cX-aX))>0){
		return true;
	}
	return false;
}

CollisionManager.prototype.circleOnBox = function(cir,box){

  	var dx = box.x - cir.x;
	var dy = box.y - cir.y;
	var dist = Math.sqrt(dx * dx + dy * dy);

	if (dist < cir.viewRadius/2) {
  		return true;
	}


  	dx = box.x+box.width - cir.x;
	dy = box.y - cir.y;
	dist = Math.sqrt(dx * dx + dy * dy);

	if (dist < cir.viewRadius/2) {
  		return true;
	}

	dx = box.x - cir.x;
	dy = box.y+box.height - cir.y;
	dist = Math.sqrt(dx * dx + dy * dy);

	if (dist < cir.viewRadius/2) {
  		return true;
	}
	dx = box.x+box.width - cir.x;
	dy = box.y+box.height  - cir.y;
	dist = Math.sqrt(dx * dx + dy * dy);

	if (dist < cir.viewRadius/2) {
  		return true;
	}
	return false
};


CollisionManager.prototype.boxOnBox = function(b1,b2){

  	if ((b1.x < b2.x + b2.width) &&
        (b1.x + b1.width > b2.x) &&
        (b1.y + b1.height > b2.y) &&
        (b1.y < b2.y + b2.height) )
        {           
             
            return true;
                     
        }
        return false;
};
