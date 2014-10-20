

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

CollisionManager.prototype.circleOnCircle = function(c1,c2){
	var radius1 = c1.radius;
	var radius2 = c2.viewRadius/2;

	var dx = c1.x - c2.x;
	var dy = c1.y - c2.y;
	var radii = radius1 + radius2;
	if ((dx * dx) + (dy * dy) < radii * radii){
		return true;
	}
	return false;
    
}

CollisionManager.prototype.circleOnTriangle = function(cir,triX1,triY1,triX2,triY2,triX3,triY3){
	var centreX = cir.x + cir.width/2;
	var centreY = cir.y + cir.height/2;

	//var check1 = false,check2= false,check3 = false;

	if(!this.onSideOfLine(triX1,triY1,triX2,triY2,centreX,centreY) &&
		!this.onSideOfLine(triX2,triY2,triX3,triY3,centreX,centreY)&&
		!this.onSideOfLine(triX3,triY3,triX1,triY1,centreX,centreY)){
		return true;
	}
	return false;
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
