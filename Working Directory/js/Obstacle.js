var imgCircle= new Image();
var imgTree1= new Image();
var imgSquare = new Image();
var imgRock = new Image();
var imgBlankSquare = new Image();

var Obstacle=function (){
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


	this.n1X = x-80; this.n1Y = y - 80;
	this.n2X = x+w+80; this.n2Y = y +w +80;

	this.x1 = this.x-5; this.y1 = this.y-5;
	this.x2 =this.x +this.width-5; this.y2= this.y+this.height-5;
	this.x3 =this.x+this.width/2-5; this.y3= this.y+this.height/2-5;

}

Obstacle.prototype.update = function(){

}


Obstacle.prototype.debugDraw = function(){
	//Draw Nodes
	ctx.drawImage(imgCircle,this.n1X, this.n1Y, 10, 10);
	ctx.drawImage(imgCircle,this.n2X, this.n1Y, 10, 10);
	ctx.drawImage(imgCircle,this.n2X, this.n2Y, 10, 10);
	ctx.drawImage(imgCircle,this.n1X, this.n2Y, 10, 10);
	if(this.obj_id==="square"){
		ctx.drawImage(imgCircle,this.x1, this.y1, 10, 10);
		ctx.drawImage(imgCircle,this.x2, this.y1, 10, 10);
		ctx.drawImage(imgCircle,this.x2, this.y2, 10, 10);
		ctx.drawImage(imgCircle,this.x1, this.y2, 10, 10);
	}
	else{
		ctx.drawImage(imgCircle,this.x1, this.y3, 10, 10);
		ctx.drawImage(imgCircle,this.x3, this.y1, 10, 10);
		ctx.drawImage(imgCircle,this.x2, this.y3, 10, 10);
		ctx.drawImage(imgCircle,this.x3, this.y2, 10, 10);
	}
}

Obstacle.prototype.draw = function(){
	if(this.obj_id === "circle"){
		ctx.drawImage(imgTree1,this.x, this.y, this.width, this.height);
	}
	else if(this.obj_id === "rock"){
		ctx.drawImage(imgRock,this.x, this.y, this.width, this.height);
	}
	else{
		ctx.drawImage(imgSquare,this.x, this.y, this.width, this.height);
	}

}