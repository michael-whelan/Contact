

var CollisionManager=function ()
{
	this.x = 100;
	this.y = 100;
	this.width = 50;
	this.height = 50;
	this.angle = -2.87;
	this.xVel = 0;
	this.yVel = 0;
	this.alive = false;
	this.xDirect = 0;
	this.yDirect = 0;
	this.speed = 5;
	//this.timeOfBirth = 0;
};


CollisionManager.prototype.update = function(){

 	
}



CollisionManager.prototype.collisionCall = function(enemyManager,player){
	for (var j = 0; j < enemyManager.enemy.length; ++j) {
		enemyManager.moveControl(j,collisionManager.circleOnCircle(player.radius,player.x,player.y,enemyManager.enemy[j].viewRadius,enemyManager.enemy[j].x,enemyManager.enemy[j].y),
			player.x,player.y);
		
		enemyManager.moveControl(j,collisionManager.circleOnTriangle(player.x,player.y,enemyManager.enemy[j].aX,enemyManager.enemy[j].aY,
			enemyManager.enemy[j].bX,enemyManager.enemy[j].bY,
			enemyManager.enemy[j].cX,enemyManager.enemy[j].cY),
			player.x,player.y);

		if(player.shot){
			enemyManager.hearShot(player.x,player.y);
			player.shot = false;
		}
	}
	
	for (var j = 0; j < enemyManager.enemy.length; ++j) {
		for(var i = 0; i < enemyManager.enemy[j].bullets.length; ++i){
			if(collisionManager.circleOnCircle(enemyManager.enemy[j].bullets[i].radius,enemyManager.enemy[j].bullets[i].x,
				enemyManager.enemy[j].bullets[i].y,player.radius,player.x,player.y) && player.flash === false){
				player.health-=1;
				loseHealthSnd.play();
				player.lastHitTime = Date.now();
				enemyManager.enemy[j].bullets[i].kill();
			}
		}
	}

	//temp only one pick up will become a list
	if(collisionManager.circleOnCircle(player.radius, player.x,player.y,pickUp.radius,pickUp.x,pickUp.y)&&
		pickUp.alive){
		pickUp.alive = false;
		player.radar = true;
	}

	for(var i = 0;i< player.bullets.length;++i){
		if(player.bullets[i].alive){
			for (var j = 0; j < enemyManager.enemy.length; ++j) {//enemy.length
				if(collisionManager.circleOnCircle(player.bullets[i].radius,player.bullets[i].x,player.bullets[i].y,enemyManager.enemy[j].hitRadius,enemyManager.enemy[j].x,enemyManager.enemy[j].y)){
					var x = enemyManager.enemy[j].x; var y = enemyManager.enemy[j].y;
					if(enemyManager.kill(j)===1 && !pickUp.alive && !player.radar){
						pickUp.spawn("radar",x,y);
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
}


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
	//console.log(x,y,x1,y1,x2,y2,x3,y3);
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
	//	console.log(aX,aY,bX,bY);
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
