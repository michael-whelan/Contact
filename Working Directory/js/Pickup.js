var imgRadarPUp = new Image();
var imgbombP = new Image();
var imgCoin = new Image();
var pickUpSnd1 = null;
var pickUpSnd2 = null;
var pickUpSnd3 = null;
var pickUpSnd4 = null;
var pickUpSndLast = null;

var pickUpSndArr =[];

var Pickup=function (){
	pickUpSndArr = [pickUpSnd1,pickUpSnd2,pickUpSnd3,pickUpSnd4,pickUpSndLast];
	this.type ="Null"; 
	this.x = 0;
	this.y = 0;
	this.alive = false;
	this.radius = 15;
	this.timeToLive = 2500;
	this.timer=0;
};


Pickup.prototype.spawn = function(id,x,y){
	if(typeof id === "undefined"){
		id = "coin";
	}
	this.type =id; 
	this.x = x;
	this.y = y;
	this.alive = true;
}

Pickup.prototype.update = function(){
		this.timer++;
	if(this.timer > this.timeToLive){
		this.alive = false;
	}
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