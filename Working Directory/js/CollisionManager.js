

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
