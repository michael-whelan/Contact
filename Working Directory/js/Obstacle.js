var imgCircle= new Image();

var imgSquare = new Audio();

var Obstacle=function ()
{
	this.x = 0;
	this.y = 0;
	this.width = 5;
	this.height = 5;
	this.obj_id;
};

Obstacle.prototype.set = function(x,y,w,h,t){
	this.x = x;
	this.y = y;
	this.width = w;
	this.height = h;
	this.obj_id = t;


	this.n1X = x-50; this.n1Y = y - 50;
	this.n2X = x+w+50; this.n2Y = y +w +50;
}

Obstacle.prototype.update = function(){

}

Obstacle.prototype.draw = function(){
	if(this.obj_id === "circle"){
		ctx.drawImage(imgCircle,this.x, this.y, this.width, this.height);
	}
	else{
		ctx.drawImage(imgSquare,this.x, this.y, this.width, this.height);
	}
	//Draw Nodes
	ctx.drawImage(imgCircle,this.n1X, this.n1Y, 10, 10);
	ctx.drawImage(imgCircle,this.n2X, this.n1Y, 10, 10);
	ctx.drawImage(imgCircle,this.n2X, this.n2Y, 10, 10);
	ctx.drawImage(imgCircle,this.n1X, this.n2Y, 10, 10);
}


