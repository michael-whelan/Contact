var waterAnimStat = new Image();
waterAnimStat.src = "images/water-static.png";



var WaterAnimation=function(){
	this.animX = -1000;
	this.animY = -1000;
	this.alive = false;
	this.animate;
	this.stage;
	this.waterFall = false;
	this.timer =0;
	this.statX = -1000;
	this.statY = -1000;
}

	
WaterAnimation.prototype.start = function(){
	this.stage = new createjs.Stage(canvas);
 	var ss = new createjs.SpriteSheet({
        frames: {
            width: 120,
            numFrames: 80,
            height: 240
        },
        animations:{
        instance1: [0, 79] // sample end frame is "25"
    },
    images: ["images/spritesheet-water.png"]
});
    this.animate = new createjs.Sprite(ss);
    this.animate.scaleX = 1.2;
    this.animate.scaleY = 1.2;

    //ss.getAnimation("instance1").frequency = 20;
   // ss.getAnimation("instance1").next = "instance1";
    this.animate.gotoAndPlay("instance1");
    this.stage.addChild(this.animate);

   createjs.Ticker.setFPS(30);
   //createjs.Ticker.addEventListener("tick", stage);
   this.stage.update();
}



WaterAnimation.prototype.setAnimPos = function(x,y){
	this.animX = x;
	this.animY = y;

}
WaterAnimation.prototype.setLive = function(b){
	this.alive = b;
}

WaterAnimation.prototype.update = function(){

	if(this.alive){
			this.animate.x =this.animX;
			this.animate.y =this.animY;
			if(!this.waterFall){
				this.statX = this.animate.x;
				this.statY = this.animate.y;
			}
		}
	else{
		this.animate.x = -1000;
		this.animate.y = -1000;
		this.statY+=8;
	}
	this.stage.update();
}

WaterAnimation.prototype.draw = function(){
	if(this.alive){
		this.stage.draw(ctx);
	}
	else{
		this.waterFall = true;
	}
	if(this.waterFall){
		this.timer++;
		if(this.timer< 20 ){
			ctx.drawImage(waterAnimStat,this.statX,this.statY,140,250);
			//this.timer=0;
			this.waterFall = false;
		}
	}
	
}