var Bomb=function (){ 
	this.x = 0;
	this.y = 0;
	this.radius = 300;
	this.alive = false;
	this.release = false;
	this.damage = 40;
};

Bomb.prototype.reset = function(){
	this.alive = false;
	this.release = false;
}

Bomb.prototype.update = function(x,y){
	this.x = x;
	this.y = y;
	this.alive = true;
}

Bomb.prototype.draw = function(){
	if(this.alive){
		ctx.drawImage(imgViewRad,this.x-this.radius, this.y-this.radius, this.radius*2, this.radius*2);
	}
}