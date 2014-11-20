var imgRadarPUp = new Image();



var Pickup=function (){
	this.pickupType ="Null"; 
	this.x = 0;
	this.y = 0;
	this.alive = false;
	this.radius = 15;
};


Pickup.prototype.spawn = function(id,x,y){
	this.pickupType =id; 
	this.x = x;
	this.y = y;
	this.alive = true;
}

Pickup.prototype.update = function(){
}


Pickup.prototype.draw = function(){
	if(this.alive){
		ctx.drawImage(imgRadarPUp,this.x, this.y, this.radius*2, this.radius*2);
	}
}