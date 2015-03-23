var imgRadarPUp = new Image();
var imgbombP = new Image();
var imgCoin = new Image();

var Pickup=function (){
	this.type ="Null"; 
	this.x = 0;
	this.y = 0;
	this.alive = false;
	this.radius = 15;
};


Pickup.prototype.spawn = function(id,x,y){
	this.type =id; 
	this.x = x;
	this.y = y;
	this.alive = true;
}

Pickup.prototype.update = function(){
}


Pickup.prototype.draw = function(){
	if(this.alive){
		if(this.type ==="radar"){
			ctx.drawImage(imgRadarPUp,this.x, this.y, this.radius*2, this.radius*2);
		}
		else if(this.type ==="health"){
			ctx.drawImage(imgViewRad,this.x, this.y, this.radius*2, this.radius*2);
		}
		else if(this.type ==="bomb"){
			ctx.drawImage(imgbombP,this.x, this.y, this.radius*2, this.radius*2);
		}
		else if(this.type ==="shield"){
			ctx.drawImage(imgShield,this.x, this.y, this.radius*2, this.radius*2);
		}
		else if(this.type ==="coin"){
			ctx.drawImage(imgCoin,this.x, this.y, this.radius*2, this.radius*2);
		}
	}
}